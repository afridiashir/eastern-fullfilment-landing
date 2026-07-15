import { siteConfig } from "@/lib/site";
import {
  BRAND_COLOR,
  BORDER_COLOR,
  MUTED_COLOR,
  TEXT_COLOR,
  escapeHtml,
  emailLayout,
  emailRow,
} from "@/lib/email-layout";

export type QuoteSubmission = {
  name: string;
  email: string;
  volume: string;
  channels: string;
  message: string;
};

/** Internal notification sent to the fulfillment team for a homepage quote request. */
export function quoteNotificationEmail(data: QuoteSubmission) {
  const bodyHtml = `
    <p style="margin:0 0 4px; font-size:13px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${BRAND_COLOR};">New quote request</p>
    <h1 style="margin:0 0 20px; font-size:20px; line-height:28px; color:${TEXT_COLOR};">${escapeHtml(data.name)} wants a custom quote</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${emailRow("Name", data.name)}
      ${emailRow("Email", data.email)}
      ${data.volume ? emailRow("Monthly orders", data.volume) : ""}
      ${data.channels ? emailRow("Sales channels", data.channels) : ""}
    </table>
    <p style="margin:20px 0 8px; font-size:13px; color:${MUTED_COLOR};">Message</p>
    <p style="margin:0; padding:16px; background-color:#fafbfc; border:1px solid ${BORDER_COLOR}; border-radius:10px; font-size:14px; line-height:22px; color:${TEXT_COLOR}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr>
        <td style="border-radius:8px; background-color:${BRAND_COLOR};">
          <a href="mailto:${data.email}" style="display:inline-block; padding:11px 20px; font-size:14px; font-weight:600; color:#ffffff; text-decoration:none;">Reply to ${escapeHtml(data.name)}</a>
        </td>
      </tr>
    </table>
  `;

  return {
    subject: `New quote request from ${data.name}`,
    html: emailLayout({
      preheader: `${data.name} just requested a custom fulfillment quote.`,
      bodyHtml,
    }),
    text: [
      "New quote request",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.volume ? `Monthly orders: ${data.volume}` : null,
      data.channels ? `Sales channels: ${data.channels}` : null,
      "",
      "Message:",
      data.message,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
  };
}

/** Confirmation email sent back to the person who requested a quote on the homepage. */
export function quoteConfirmationEmail(data: QuoteSubmission) {
  const bodyHtml = `
    <p style="margin:0 0 4px; font-size:13px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:${BRAND_COLOR};">Thanks for reaching out</p>
    <h1 style="margin:0 0 16px; font-size:20px; line-height:28px; color:${TEXT_COLOR};">We're putting your quote together</h1>
    <p style="margin:0 0 20px; font-size:14px; line-height:22px; color:${MUTED_COLOR};">
      Thanks for telling us about your fulfillment needs. A member of the ${escapeHtml(siteConfig.name)} team
      will send your custom quote within one business day.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${data.volume ? emailRow("Monthly orders", data.volume) : ""}
      ${data.channels ? emailRow("Sales channels", data.channels) : ""}
    </table>
    <p style="margin:20px 0 8px; font-size:13px; color:${MUTED_COLOR};">Your message</p>
    <p style="margin:0; padding:16px; background-color:#fafbfc; border:1px solid ${BORDER_COLOR}; border-radius:10px; font-size:14px; line-height:22px; color:${TEXT_COLOR}; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
    <p style="margin:24px 0 0; font-size:14px; line-height:22px; color:${MUTED_COLOR};">
      Need to add anything in the meantime? Just reply to this email — it comes straight to our team.
    </p>
  `;

  return {
    subject: `We're preparing your fulfillment quote`,
    html: emailLayout({
      preheader: `Thanks for reaching out to ${siteConfig.name} — your quote is on the way.`,
      bodyHtml,
    }),
    text: [
      `Hi ${data.name},`,
      "",
      `Thanks for reaching out to ${siteConfig.name}. We'll send your custom quote within one business day.`,
      "",
      "Your message:",
      data.message,
      "",
      `— ${siteConfig.name}`,
    ].join("\n"),
  };
}
