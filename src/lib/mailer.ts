import nodemailer, { type Transporter } from "nodemailer";

let transporter: Transporter | null = null;

/** Lazily creates a singleton SMTP transporter from env vars. */
function getTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured — set SMTP_HOST, SMTP_USER, and SMTP_PASS.",
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendMail(message: MailMessage): Promise<void> {
  const from = process.env.SMTP_USER;
  await getTransporter().sendMail({ from, ...message });
}
