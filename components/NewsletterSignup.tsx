"use client";

import { FormEvent, useState } from "react";
import { SoftReveal } from "@/components/SoftReveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { sectionBodyClass, sectionHeadingClass } from "@/lib/section-typography";
import { SITE } from "@/lib/constants";
import {
  formatContactFetchFailure,
  formatContactSubmitFailure,
  mailApiHtmlError,
  parseContactResponseJson,
} from "@/lib/contactFormDiagnostics";

type NewsletterSignupProps = {
  idSuffix?: string;
};

export function NewsletterSignup({ idSuffix = "" }: NewsletterSignupProps) {
  const emailId = `newsletter-email${idSuffix}`;
  const ageId = `newsletter-age${idSuffix}`;
  const [email, setEmail] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const formReady = Boolean(email.trim() && ageConfirmed);
  const canSubmit = formReady && status !== "loading";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      setStatus("error");
      return;
    }

    if (!ageConfirmed) {
      setErrorMessage("Please confirm you are over the age of 18.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const url = "/api/newsletter";
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          ageConfirmed,
          marketingConsent,
        }),
        signal: controller.signal,
      });

      const raw = await response.text();
      const contentType = response.headers.get("content-type") || "";
      const data =
        parseContactResponseJson(raw, contentType) ??
        ({} as { ok?: boolean; error?: string; hint?: string });

      if (
        !data.error &&
        (raw.trim().startsWith("<!") || contentType.includes("text/html"))
      ) {
        throw new Error(mailApiHtmlError(url));
      }

      if (!response.ok || data.ok !== true) {
        throw new Error(
          formatContactSubmitFailure({
            requestUrl: url,
            response,
            rawBody: raw,
          }),
        );
      }

      setStatus("success");
      setEmail("");
      setAgeConfirmed(false);
      setMarketingConsent(false);
    } catch (error) {
      const isNetwork =
        error instanceof TypeError ||
        (error instanceof DOMException && error.name === "AbortError") ||
        (error instanceof Error &&
          /failed to fetch|networkerror|load failed|aborted/i.test(
            error.message,
          ));

      setErrorMessage(
        isNetwork
          ? formatContactFetchFailure(url, error)
          : error instanceof Error
            ? error.message
            : "Failed to submit signup.",
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return (
    <section className="border-t border-border bg-muted py-10 md:py-12">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
        <SoftReveal>
          <SectionIntro
            label="Newsletter"
            title="Be the First to Know"
            description="Sign up to receive news and offers from Nivaãra by GHD Hotels in your inbox."
          />
        </SoftReveal>

        {status === "success" ? (
          <SoftReveal>
            <div
              role="status"
              aria-live="polite"
              className="mx-auto mt-6 max-w-lg border border-[#543119]/20 bg-white px-6 py-8 text-center sm:px-8 sm:py-10"
            >
              <p className={sectionHeadingClass(false, "mt-0")}>
                Thank you for signing up
              </p>
              <p className={sectionBodyClass(false, "mt-3")}>
                Your subscription has been received. We&apos;ll share news and
                offers from Nivaãra by GHD Hotels in your inbox soon.
              </p>
            </div>
          </SoftReveal>
        ) : (
          <SoftReveal index={1}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-6 max-w-lg text-left"
          >
            <label htmlFor={emailId} className="sr-only">
              Email address
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id={emailId}
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter Email Address"
                autoComplete="email"
                required
                disabled={status === "loading"}
                className="h-10 flex-1 border border-border bg-white px-3 font-body text-sm font-light text-charcoal outline-none transition-colors placeholder:text-grey/70 focus:border-charcoal disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!canSubmit}
                className="h-10 shrink-0 rounded-none bg-[#543119] px-6 font-body text-[0.65rem] font-medium uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#543119]/90 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xs"
              >
                {status === "loading" ? "Submitting…" : "Sign Up"}
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              <label
                htmlFor={ageId}
                className="flex items-start gap-2.5 font-body text-[0.6875rem] font-light leading-snug text-grey sm:text-xs"
              >
                <input
                  id={ageId}
                  type="checkbox"
                  name="ageConfirmed"
                  checked={ageConfirmed}
                  onChange={(event) => setAgeConfirmed(event.target.checked)}
                  disabled={status === "loading"}
                  required
                  className="mt-0.5 size-3.5 shrink-0 accent-[#543119]"
                />
                <span>
                  I am over the age of 18 and have read the{" "}
                  <a
                    href="/privacy"
                    className="text-charcoal underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  <span className="text-charcoal"> *</span>
                </span>
              </label>

              <label className="flex items-start gap-2.5 font-body text-[0.6875rem] font-light leading-snug text-grey sm:text-xs">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(event) => setMarketingConsent(event.target.checked)}
                  disabled={status === "loading"}
                  className="mt-0.5 size-3.5 shrink-0 accent-[#543119]"
                />
                <span>
                  By submitting this form, I confirm I would like to receive emails
                  on promotions, special offers and updates from {SITE.name} and its
                  affiliated brands.
                </span>
              </label>
            </div>

            {status === "error" && errorMessage ? (
              <div
                role="alert"
                className="mt-3 border border-red-500/30 px-4 py-3 text-left"
              >
                <p className="mb-2 font-body text-sm font-medium text-red-600">
                  Could not complete signup. Details:
                </p>
                <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-red-600/90">
                  {errorMessage}
                </pre>
              </div>
            ) : null}
          </form>
          </SoftReveal>
        )}
      </div>
    </section>
  );
}
