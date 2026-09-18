"use client";

import { usePathname } from "next/navigation";
import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import {
  parseContactResponseJson,
} from "@/lib/contactFormDiagnostics";
import {
  DEFAULT_INDIAN_PHONE,
  emailFormatHint,
  indianMobileDigits,
  indianPhoneHint,
  isValidEmailFormat,
  isValidIndianMobile,
  normalizeIndianPhoneInput,
  toE164IndianMobile,
} from "@/lib/contactFieldValidation";
import { sectionBodyClass } from "@/lib/section-typography";
import { cn } from "@/lib/utils";

const SEND_ERROR_MESSAGE = "Error in sending.";

export type ContactEnquirySource = "ghd" | "nivaara";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldKey = "name" | "email" | "phone" | "message";

const fieldClass =
  "w-full border bg-white px-3 py-2.5 font-body text-sm font-light text-charcoal outline-none transition-colors placeholder:text-grey/70 disabled:opacity-60";

const fieldOkClass = "border-border focus:border-charcoal";
const fieldErrorClass =
  "border-red-500 bg-red-50/40 text-charcoal focus:border-red-600 focus:ring-1 focus:ring-red-500";

const idPrefixDefault = "contact";

const CORPORATE_ROUTES = new Set([
  "/",
  "/about",
  "/brands",
  "/culture",
  "/careers",
  "/contact",
  "/leadership",
]);

function resolveSource(
  explicit: ContactEnquirySource | undefined,
  pathname: string,
): ContactEnquirySource {
  if (explicit) return explicit;
  return CORPORATE_ROUTES.has(pathname) ? "ghd" : "nivaara";
}

function emailErrorFor(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!isValidEmailFormat(trimmed)) return emailFormatHint();
  return undefined;
}

function phoneErrorFor(value: string): string | undefined {
  const digits = indianMobileDigits(value);
  if (!digits) return "Phone number is required.";
  if (!isValidIndianMobile(value)) return indianPhoneHint();
  return undefined;
}

function nameErrorFor(value: string): string | undefined {
  if (!value.trim()) return "Full name is required.";
  return undefined;
}

function messageErrorFor(value: string): string | undefined {
  if (!value.trim()) return "Message is required.";
  return undefined;
}

type ContactMessageFormProps = {
  idPrefix?: string;
  className?: string;
  title?: string;
  description?: string;
  /** Which site this form belongs to. Defaults from the current route. */
  source?: ContactEnquirySource;
};

export function ContactMessageForm({
  idPrefix = idPrefixDefault,
  className,
  title = "Send Us a Message",
  description = "For enquiries, partnerships, or investment discussions.",
  source,
}: ContactMessageFormProps) {
  const pathname = usePathname() || "/";
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: DEFAULT_INDIAN_PHONE,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>(
    {},
  );
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<FieldKey, string>>
  >({});
  const [showErrors, setShowErrors] = useState(false);

  const emailOk = isValidEmailFormat(form.email);
  const phoneOk = isValidIndianMobile(form.phone);
  const formReady = Boolean(
    form.name.trim() && emailOk && phoneOk && form.message.trim(),
  );
  const canSend = formReady && status !== "loading";

  function errorVisible(field: FieldKey): boolean {
    return Boolean(fieldErrors[field] && (showErrors || touched[field]));
  }

  function syncFieldError(field: FieldKey, value: string) {
    let message: string | undefined;
    if (field === "email") message = emailErrorFor(value);
    else if (field === "phone") message = phoneErrorFor(value);
    else if (field === "name") message = nameErrorFor(value);
    else if (field === "message") message = messageErrorFor(value);

    setFieldErrors((prev) => {
      if (prev[field] === message) return prev;
      return { ...prev, [field]: message };
    });
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    const field = name as FieldKey;

    let nextValue = value;
    if (field === "phone") {
      nextValue = normalizeIndianPhoneInput(value);
    }

    setForm((prev) => ({ ...prev, [field]: nextValue }));

    if (showErrors || touched[field]) {
      syncFieldError(field, nextValue);
    }
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as FieldKey;
    setTouched((prev) => ({ ...prev, [field]: true }));
    syncFieldError(field, form[field]);
  }

  function validateAllFields(): boolean {
    const next: Partial<Record<FieldKey, string>> = {
      name: nameErrorFor(form.name),
      email: emailErrorFor(form.email),
      phone: phoneErrorFor(form.phone),
      message: messageErrorFor(form.message),
    };
    (Object.keys(next) as FieldKey[]).forEach((key) => {
      if (!next[key]) delete next[key];
    });
    setFieldErrors(next);
    setShowErrors(true);
    setTouched({ name: true, email: true, phone: true, message: true });
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateAllFields()) {
      setErrorMessage("Please correct the highlighted fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const url = "/api/contact";
    const enquirySource = resolveSource(source, pathname);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: toE164IndianMobile(form.phone),
          message: form.message.trim(),
          source: enquirySource,
          page: pathname,
        }),
        signal: controller.signal,
      });

      const raw = await response.text();
      const contentType = response.headers.get("content-type") || "";
      const data =
        parseContactResponseJson(raw, contentType) ??
        ({} as { ok?: boolean; error?: string; hint?: string });

      if (
        !response.ok ||
        data.ok !== true ||
        raw.trim().startsWith("<!") ||
        contentType.includes("text/html")
      ) {
        console.error("Contact form send failed:", {
          status: response.status,
          error: data.error,
        });
        setErrorMessage(SEND_ERROR_MESSAGE);
        setStatus("error");
        return;
      }

      setForm({
        name: "",
        email: "",
        phone: DEFAULT_INDIAN_PHONE,
        message: "",
      });
      setFieldErrors({});
      setTouched({});
      setShowErrors(false);
      setStatus("success");
    } catch (error) {
      console.error("Contact form send failed:", error);
      setErrorMessage(SEND_ERROR_MESSAGE);
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return (
    <div className={className}>
      <h3 className="font-heading text-xl font-thin text-charcoal sm:text-2xl">
        {title}
      </h3>
      <p className={sectionBodyClass(false, "mt-2 text-left")}>{description}</p>

      {status === "success" ? (
        <div className="mt-6 border border-[#543119]/20 bg-muted/30 px-6 py-8 text-center">
          <p className="font-heading text-xl font-thin text-charcoal">
            Message Received
          </p>
          <p className={sectionBodyClass(false, "mt-3 text-center")}>
            Thank you for reaching out. A member of the GHD Hotels team will be
            in touch shortly.
          </p>
          <button
            type="button"
            className="mt-6 h-10 rounded-none border border-charcoal bg-white px-6 font-body text-[0.65rem] font-medium uppercase tracking-[0.1em] text-charcoal sm:text-xs"
            onClick={() => setStatus("idle")}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
          <div>
            <label
              htmlFor={`${idPrefix}-name`}
              className={cn(
                "mb-2 block font-body text-[10px] font-medium uppercase tracking-[0.14em]",
                errorVisible("name") ? "text-red-600" : "text-charcoal",
              )}
            >
              Full Name *
            </label>
            <input
              id={`${idPrefix}-name`}
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your full name"
              autoComplete="name"
              required
              disabled={status === "loading"}
              aria-invalid={errorVisible("name")}
              className={cn(
                fieldClass,
                errorVisible("name") ? fieldErrorClass : fieldOkClass,
              )}
            />
            {errorVisible("name") ? (
              <p className="mt-1.5 font-body text-xs text-red-600">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-email`}
              className={cn(
                "mb-2 block font-body text-[10px] font-medium uppercase tracking-[0.14em]",
                errorVisible("email") ? "text-red-600" : "text-charcoal",
              )}
            >
              Email Address *
            </label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="name@example.com"
              autoComplete="email"
              inputMode="email"
              pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
              required
              disabled={status === "loading"}
              aria-invalid={errorVisible("email")}
              className={cn(
                fieldClass,
                errorVisible("email") ? fieldErrorClass : fieldOkClass,
              )}
            />
            {errorVisible("email") ? (
              <p className="mt-1.5 font-body text-xs text-red-600">
                {fieldErrors.email}
              </p>
            ) : (
              <p className="mt-1.5 font-body text-xs text-charcoal/50">
                Format: name@domain.com
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-phone`}
              className={cn(
                "mb-2 block font-body text-[10px] font-medium uppercase tracking-[0.14em]",
                errorVisible("phone") ? "text-red-600" : "text-charcoal",
              )}
            >
              Phone Number *
            </label>
            <input
              id={`${idPrefix}-phone`}
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+91 98765 43210"
              autoComplete="tel-national"
              inputMode="numeric"
              required
              disabled={status === "loading"}
              aria-invalid={errorVisible("phone")}
              className={cn(
                fieldClass,
                errorVisible("phone") ? fieldErrorClass : fieldOkClass,
              )}
            />
            {errorVisible("phone") ? (
              <p className="mt-1.5 font-body text-xs text-red-600">
                {fieldErrors.phone}
              </p>
            ) : (
              <p className="mt-1.5 font-body text-xs text-charcoal/50">
                Indian mobile with +91 (10 digits)
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor={`${idPrefix}-message`}
              className={cn(
                "mb-2 block font-body text-[10px] font-medium uppercase tracking-[0.14em]",
                errorVisible("message") ? "text-red-600" : "text-charcoal",
              )}
            >
              Message *
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="How can we assist you?"
              rows={5}
              required
              disabled={status === "loading"}
              aria-invalid={errorVisible("message")}
              className={cn(
                fieldClass,
                "min-h-[6.5rem] resize-none",
                errorVisible("message") ? fieldErrorClass : fieldOkClass,
              )}
            />
            {errorVisible("message") ? (
              <p className="mt-1.5 font-body text-xs text-red-600">
                {fieldErrors.message}
              </p>
            ) : null}
          </div>

          {status === "error" && errorMessage ? (
            <div className="border border-red-500/30 px-4 py-3 text-left">
              <p className="font-body text-sm font-medium text-red-600">
                {errorMessage}
              </p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSend}
            className="mt-2 h-10 w-full rounded-none bg-[#543119] px-6 font-body text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#543119]/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-xs"
          >
            {status === "loading"
              ? "Sending..."
              : !formReady
                ? "Fill in the form to continue"
                : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
