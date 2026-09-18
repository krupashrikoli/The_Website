import { NextResponse } from "next/server";
import {
  emailFormatHint,
  indianPhoneHint,
  isValidEmailFormat,
  isValidIndianMobile,
  toE164IndianMobile,
} from "@/lib/contactFieldValidation";
import { isMailConfigured, missingMailHint, sendAppMail } from "@/lib/sendMail";

type ContactSource = "ghd" | "nivaara";

const SOURCE_META: Record<
  ContactSource,
  { label: string; subjectPrefix: string; defaultRecipient: string }
> = {
  ghd: {
    label: "GHD Hotels (main website)",
    subjectPrefix: "[GHD Hotels]",
    defaultRecipient: "website@ghdhotels.in",
  },
  nivaara: {
    label: "Nivaãra by GHD Hotels",
    subjectPrefix: "[Nivaãra]",
    defaultRecipient: "website@ghdhotels.in",
  },
};

function parseSource(raw: unknown): ContactSource {
  const value = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (value === "nivaara" || value === "nivaãra") return "nivaara";
  return "ghd";
}

function recipientFor(source: ContactSource): string {
  if (source === "nivaara") {
    return String(
      process.env.CONTACT_RECIPIENT_NIVAARA ||
        process.env.NIVAARA_CONTACT_RECIPIENT ||
        SOURCE_META.nivaara.defaultRecipient,
    ).trim();
  }

  return String(
    process.env.CONTACT_RECIPIENT_GHD ||
      process.env.CONTACT_RECIPIENT ||
      process.env.MAILBOX ||
      SOURCE_META.ghd.defaultRecipient,
  ).trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      source?: string;
      page?: string;
    };

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phoneRaw = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();
    const page = String(body.page ?? "").trim() || "unknown";
    const source = parseSource(body.source);
    const meta = SOURCE_META[source];
    const to = recipientFor(source);

    if (!name || !email || !phoneRaw || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!isValidEmailFormat(email)) {
      return NextResponse.json(
        { ok: false, error: emailFormatHint() },
        { status: 400 },
      );
    }

    if (!isValidIndianMobile(phoneRaw)) {
      return NextResponse.json(
        { ok: false, error: indianPhoneHint() },
        { status: 400 },
      );
    }

    const phone = toE164IndianMobile(phoneRaw);

    if (!isMailConfigured()) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email not configured",
          hint: missingMailHint(),
        },
        { status: 400 },
      );
    }

    const subject = `${meta.subjectPrefix} New enquiry from ${name}`;
    const text = [
      `Source: ${meta.label}`,
      `Page: ${page}`,
      `Delivered to: ${to}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await sendAppMail({
      from:
        process.env.RESEND_FROM?.trim() ||
        process.env.SMTP_FROM?.trim() ||
        process.env.SMTP_USER?.trim() ||
        to,
      to,
      subject,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true, source });
  } catch (error) {
    if (
      error instanceof Error &&
      (/Missing SMTP_PASS/i.test(error.message) ||
        /Missing RESEND_API_KEY/i.test(error.message) ||
        /Email not configured/i.test(error.message))
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "Email not configured",
          hint: missingMailHint(),
        },
        { status: 400 },
      );
    }

    const msg =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Failed to send email";

    console.error("Contact form error:", error);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
