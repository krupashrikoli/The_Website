import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";
import { getSmtpPasswordFromEnv } from "@/lib/mailEnv";

const MAIL_CANONICAL_HOST = "mail.ghdhotels.in";
/** Reachable cPanel/provider SMTP host when mail.* DNS points at the public website CDN. */
const DEFAULT_SMTP_CONNECT_HOST = "mail.mysecurecloudhost.com";

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  authMethod?: "LOGIN" | "PLAIN";
  /** TLS SNI hostname (often mail.domain); may differ from TCP connect host. */
  tlsServername: string;
};

function parsePort(raw: string | undefined, fallback: number): number {
  if (raw == null || raw.trim() === "") return fallback;
  const n = Number(raw.trim());
  return Number.isFinite(n) && n > 0 && n <= 65535 ? n : fallback;
}

function parseSecure(raw: string | undefined, port: number): boolean {
  if (raw == null || raw.trim() === "") return port === 465;
  const v = raw.trim().toLowerCase();
  if (v === "false" || v === "0" || v === "no") return false;
  if (v === "true" || v === "1" || v === "yes") return true;
  return port === 465;
}

function stripEnvValue(raw: string): string {
  let s = raw.trim();
  if (
    (s.startsWith('"') && s.endsWith('"') && s.length >= 2) ||
    (s.startsWith("'") && s.endsWith("'") && s.length >= 2)
  ) {
    s = s.slice(1, -1);
  }
  return s;
}

function normalizeCredential(raw: string): string {
  let s = stripEnvValue(raw);
  s = s.replace(/^\uFEFF/, "").replace(/[\u200B-\u200D\uFEFF]/g, "");
  s = s.replace(/\r\n/g, "").replace(/\r/g, "").replace(/\n/g, "");
  return s.trim();
}

function parseAuthMethod(
  raw: string | undefined,
): "LOGIN" | "PLAIN" | undefined {
  const v = raw?.trim().toUpperCase();
  if (v === "LOGIN" || v === "PLAIN") return v;
  return undefined;
}

function resolveSmtpConnectHost(requestedHost: string): {
  connectHost: string;
  tlsServername: string;
} {
  const tlsServername =
    normalizeCredential(process.env.SMTP_TLS_SERVERNAME || "") ||
    MAIL_CANONICAL_HOST;

  const connectOverride = normalizeCredential(
    process.env.SMTP_CONNECT_HOST || "",
  );
  if (connectOverride) {
    return { connectHost: connectOverride, tlsServername };
  }

  if (requestedHost === MAIL_CANONICAL_HOST) {
    const fallback =
      normalizeCredential(process.env.SMTP_HOST_FALLBACK || "") ||
      DEFAULT_SMTP_CONNECT_HOST;
    return { connectHost: fallback, tlsServername };
  }

  return { connectHost: requestedHost, tlsServername };
}

export function getSmtpConfigFromEnv(): SmtpConfig {
  const requestedHost = normalizeCredential(
    process.env.SMTP_HOST || MAIL_CANONICAL_HOST,
  );
  const { connectHost, tlsServername } = resolveSmtpConnectHost(requestedHost);
  const port = parsePort(process.env.SMTP_PORT, 465);
  const secure = parseSecure(process.env.SMTP_SECURE, port);
  const user = normalizeCredential(
    process.env.SMTP_USER || "website@ghdhotels.in",
  );
  const pass = normalizeCredential(getSmtpPasswordFromEnv());
  const authMethod = parseAuthMethod(process.env.SMTP_AUTH_METHOD);

  if (!pass) {
    throw new Error("Missing SMTP_PASS");
  }

  return {
    host: connectHost,
    port,
    secure,
    user,
    pass,
    authMethod,
    tlsServername,
  };
}

const SMTP_CONNECT_MS = 5_000;
const SMTP_ATTEMPT_MS = 8_000;

function errCode(err: unknown): string {
  if (err && typeof err === "object" && "code" in err) {
    return String((err as { code: unknown }).code);
  }
  return "";
}

function isConnectionError(err: unknown): boolean {
  const m = err instanceof Error ? err.message : String(err);
  const code = errCode(err);
  return /ETIMEDOUT|ECONNREFUSED|ECONNRESET|ESOCKET|ETIMEOUT|ENOTFOUND|EHOSTUNREACH|ECONNABORTED|timed out|timeout/i.test(
    `${code} ${m}`,
  );
}

async function sendMailAttempt(
  transport: nodemailer.Transporter,
  mail: SendMailOptions,
): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      transport.sendMail(mail),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          transport.close();
          reject(
            new Error(`SMTP timed out after ${SMTP_ATTEMPT_MS / 1000}s`),
          );
        }, SMTP_ATTEMPT_MS);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

function connectionErrorMessage(cfg: SmtpConfig, err: unknown): string {
  const detail = err instanceof Error ? err.message : String(err);
  return (
    `Cannot reach mail server ${cfg.host}:${cfg.port} (${detail}). ` +
    `Check SMTP_CONNECT_HOST / SMTP_HOST and outbound SMTP from this server.`
  );
}

export function createSmtpTransport(cfg: SmtpConfig) {
  const useSsl = cfg.secure || cfg.port === 465;
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    // Port 465 = implicit SSL/TLS from connect
    secure: useSsl,
    ...(cfg.authMethod ? { authMethod: cfg.authMethod } : {}),
    connectionTimeout: SMTP_CONNECT_MS,
    greetingTimeout: SMTP_CONNECT_MS,
    socketTimeout: SMTP_CONNECT_MS,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
    tls: {
      servername: cfg.tlsServername,
      // Enforce TLS for SMTPS
      minVersion: "TLSv1.2",
    },
    ...(cfg.port === 587 && !useSsl ? { requireTLS: true } : {}),
  });
}

function isAuth535(err: unknown): boolean {
  const m = err instanceof Error ? err.message : String(err);
  return /535|incorrect authentication|invalid login|authentication failed|auth failed/i.test(
    m,
  );
}

function configKey(c: SmtpConfig): string {
  return `${c.host}|${c.tlsServername}|${c.port}|${c.secure}|${c.user}|${c.authMethod ?? "default"}`;
}

function authFailureMessage(err: unknown): string {
  const detail = err instanceof Error ? err.message : String(err);
  return (
    `SMTP login failed (${detail}). Verify SMTP_USER and SMTP_PASS in .env match ` +
    `the mailbox password in your hosting panel (Email Accounts). Quote passwords that contain #.`
  );
}

function smtpAuthVariants(base: SmtpConfig): SmtpConfig[] {
  const out: SmtpConfig[] = [];
  const seen = new Set<string>();

  const push = (c: SmtpConfig) => {
    const k = configKey(c);
    if (seen.has(k)) return;
    seen.add(k);
    out.push(c);
  };

  const explicitAuth = parseAuthMethod(process.env.SMTP_AUTH_METHOD);

  if (explicitAuth) {
    push({ ...base, authMethod: explicitAuth });
    return out;
  }

  push({ ...base, authMethod: "LOGIN" });
  push({ ...base, authMethod: "PLAIN" });

  const at = base.user.indexOf("@");
  if (at > 0) {
    const local = base.user.slice(0, at);
    push({ ...base, user: local, authMethod: "LOGIN" });
    push({ ...base, user: local, authMethod: "PLAIN" });
  }

  return out;
}

async function trySendWithVariants(
  variants: SmtpConfig[],
  mail: SendMailOptions,
): Promise<boolean> {
  let last535: unknown;
  for (const cfg of variants) {
    const transport = createSmtpTransport(cfg);
    try {
      await sendMailAttempt(transport, mail);
      return true;
    } catch (e) {
      if (isConnectionError(e)) {
        throw new Error(connectionErrorMessage(cfg, e));
      }
      if (!isAuth535(e)) throw e;
      last535 = e;
    }
  }
  if (last535) throw new Error(authFailureMessage(last535));
  return false;
}

export async function sendMailViaSmtp(mail: SendMailOptions): Promise<void> {
  const base = getSmtpConfigFromEnv();

  const connectHosts = Array.from(
    new Set(
      [
        normalizeCredential(process.env.SMTP_CONNECT_HOST || ""),
        base.host !== DEFAULT_SMTP_CONNECT_HOST &&
        base.host !== MAIL_CANONICAL_HOST
          ? base.host
          : "",
        "mail.mysecurecloudhost.com",
        DEFAULT_SMTP_CONNECT_HOST,
      ].filter(Boolean),
    ),
  ).slice(0, 3);

  let lastError: unknown;

  for (const connectHost of connectHosts) {
    const tlsServername =
      connectHost.includes("mysecurecloudhost.com") ||
      connectHost.includes("stableserver.net")
        ? connectHost
        : base.tlsServername;

    const candidate: SmtpConfig = {
      ...base,
      host: connectHost,
      tlsServername,
    };

    try {
      const variants = smtpAuthVariants(candidate);
      if (await trySendWithVariants(variants, mail)) return;

      if (candidate.port === 465 && candidate.secure) {
        const alt: SmtpConfig = {
          ...candidate,
          port: 587,
          secure: false,
        };
        if (await trySendWithVariants(smtpAuthVariants(alt), mail)) return;
      }
    } catch (e) {
      lastError = e;
      if (isConnectionError(e) || /Cannot reach mail server/i.test(String(e))) {
        continue;
      }
      if (isAuth535(e)) {
        continue;
      }
      throw e;
    }
  }

  if (lastError) throw lastError instanceof Error ? lastError : new Error(String(lastError));
  throw new Error("SMTP authentication failed after all attempts");
}
