import { siteConfig } from "@/lib/site";
import { countries } from "@/lib/countries";
import {
  BRAND_COLOR,
  BORDER_COLOR,
  MUTED_COLOR,
  TEXT_COLOR,
  escapeHtml,
  emailLayout,
  emailRow,
} from "@/lib/email-layout";

export type ContactSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  monthlyOrders: string;
  message: string;
};

function dialCode(iso2: string): string {
  return countries.find((c) => c.iso2 === iso2)?.dial ?? "";
}

/** Internal notification sent to the fulfillment team when a lead submits the contact form. */
export function contactNotificationEmail(data: ContactSubmission) {
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const phone = `${dialCode(data.country)} ${data.phone}`.trim();

  const bodyHtml = `
    <p style="margin:0 0 4px; font-size:13px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${BRAND_COLOR};">New contact form submission</p>
    <h1 style="margin:0 0 20px; font-size:20px; line-height:28px; color:${TEXT_COLOR};">${escapeHtml(fullName)} from ${escapeHtml(data.company)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${emailRow("Name", fullName)}
      ${emailRow("Email", data.email)}
      ${emailRow("Phone", phone)}
      ${emailRow("Company", data.company)}
      ${emailRow("Monthly orders", data.monthlyOrders)}
    </table>
    <p style="margin:20px 0 8px; font-size:13px; color:${MUTED_COLOR};">Message</p>
    <p style="margin:0; padding:16px; background-color:#fafbfc; border:1px solid ${BORDER_COLOR}; border-radius:10px; font-size:14px; line-height:22px; color:${TEXT_COLOR}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr>
        <td style="border-radius:8px; background-color:${BRAND_COLOR};">
          <a href="mailto:${data.email}" style="display:inline-block; padding:11px 20px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">Reply to ${escapeHtml(data.firstName)}</a>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `New inquiry from ${fullName} (${data.company})`,
    html: emailLayout({
      preheader: `${fullName} at ${data.company} just submitted the contact form.`,
      bodyHtml,
    }),
    text: [
      "New contact form submission",
      `Name: ${fullName}`,
      `Email: ${data.email}`,
      `Phone: ${phone}`,
      `Company: ${data.company}`,
      `Monthly orders: ${data.monthlyOrders}`,
      "",
      "Message:",
      data.message,
    ].join("\n"),
  };
}

/** Confirmation email sent back to the person who submitted the contact form. */
export function contactConfirmationEmail(data: ContactSubmission) {
  const bodyHtml = `
    <p style="margin:0 0 4px; font-size:13px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${BRAND_COLOR};">Thanks for reaching out</p>
    <h1 style="margin:0 0 16px; font-size:20px; line-height:28px; color:${TEXT_COLOR};">Hi ${escapeHtml(data.firstName)}, we've got your message</h1>
    <p style="margin:0 0 20px; font-size:14px; line-height:22px; color:${MUTED_COLOR};">
      A member of the ${escapeHtml(siteConfig.name)} team will review your details and get back to you shortly.
      Here's a copy of what you sent us:
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${emailRow("Company", data.company)}
      ${emailRow("Monthly orders", data.monthlyOrders)}
    </table>
    <p style="margin:20px 0 8px; font-size:13px; color:${MUTED_COLOR};">Your message</p>
    <p style="margin:0; padding:16px; background-color:#fafbfc; border:1px solid ${BORDER_COLOR}; border-radius:10px; font-size:14px; line-height:22px; color:${TEXT_COLOR}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    <p style="margin:24px 0 0; font-size:14px; line-height:22px; color:${MUTED_COLOR};">
      Need to add anything in the meantime? Just reply to this email — it comes straight to our team.
    </p>
  `;

  return {
    subject: `We've received your message, ${data.firstName}`,
    html: emailLayout({
      preheader: `Thanks for contacting ${siteConfig.name} — we'll be in touch shortly.`,
      bodyHtml,
    }),
    text: [
      `Hi ${data.firstName},`,
      "",
      `Thanks for reaching out to ${siteConfig.name}. A member of our team will get back to you shortly.`,
      "",
      "Your message:",
      data.message,
      "",
      `— ${siteConfig.name}`,
    ].join("\n"),
  };
}
