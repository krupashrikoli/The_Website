/** Local-part @ domain . tld — e.g. name@example.com */
const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const INDIA_DIAL = "+91";

export function isValidEmailFormat(email: string): boolean {
  const value = email.trim();
  if (!EMAIL_PATTERN.test(value)) return false;
  const [local, domain] = value.split("@");
  if (!local || !domain) return false;
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) {
    return false;
  }
  if (domain.startsWith("-") || domain.startsWith(".") || domain.includes("..")) {
    return false;
  }
  return true;
}

/** 10-digit Indian mobile body (no country code). */
export function indianMobileDigits(phone: string): string {
  const trimmed = phone.trim();
  const hasExplicitCountry =
    /^\+91\b/i.test(trimmed) || /^91[\s-]/.test(trimmed);

  let digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (hasExplicitCountry && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("91") && digits.length >= 12) {
    digits = digits.slice(2);
  }

  return digits.slice(0, 10);
}

/** Indian mobile: 10 digits starting with 6–9. */
export function isValidIndianMobile(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(indianMobileDigits(phone));
}

function formatFromMobileDigits(mobile: string): string {
  if (!mobile) return `${INDIA_DIAL} `;
  if (mobile.length <= 5) return `${INDIA_DIAL} ${mobile}`;
  return `${INDIA_DIAL} ${mobile.slice(0, 5)} ${mobile.slice(5, 10)}`;
}

export function formatIndianPhoneDisplay(phone: string): string {
  return formatFromMobileDigits(indianMobileDigits(phone));
}

/**
 * Keep +91 as the default country code while the user types digits.
 */
export function normalizeIndianPhoneInput(raw: string): string {
  return formatFromMobileDigits(indianMobileDigits(raw));
}

export function toE164IndianMobile(phone: string): string {
  const mobile = indianMobileDigits(phone);
  return mobile ? `${INDIA_DIAL}${mobile}` : INDIA_DIAL;
}

export const DEFAULT_INDIAN_PHONE = `${INDIA_DIAL} `;

export function emailFormatHint(): string {
  return "Use a valid email like name@example.com";
}

export function indianPhoneHint(): string {
  return "Enter a valid Indian mobile number (+91 XXXXX XXXXX)";
}
