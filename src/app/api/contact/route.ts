import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import {
  contactConfirmationEmail,
  contactNotificationEmail,
  type ContactSubmission,
} from "@/lib/contact-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REQUIRED_FIELDS = [
  "firstName",
  "email",
  "phone",
  "company",
  "monthlyOrders",
  "message",
] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json(
        { error: `Missing required field: ${field}.` },
        { status: 400 },
      );
    }
  }

  if (!EMAIL_RE.test(body.email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const submission: ContactSubmission = {
    firstName: body.firstName.trim(),
    lastName: typeof body.lastName === "string" ? body.lastName.trim() : "",
    email: body.email.trim(),
    phone: body.phone.trim(),
    country: typeof body.country === "string" ? body.country.trim() : "US",
    company: body.company.trim(),
    monthlyOrders: body.monthlyOrders.trim(),
    message: body.message.trim(),
  };

  const notifyTo = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER;
  if (!notifyTo) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  try {
    const notification = contactNotificationEmail(submission);
    const confirmation = contactConfirmationEmail(submission);

    await Promise.all([
      sendMail({
        to: notifyTo,
        replyTo: submission.email,
        ...notification,
      }),
      sendMail({
        to: submission.email,
        ...confirmation,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again shortly." },
      { status: 502 },
    );
  }
}
