import { siteConfig, absoluteUrl } from "@/lib/site";

export const BRAND_COLOR = "#3b5bdb";
export const BORDER_COLOR = "#e6e8ef";
export const MUTED_COLOR = "#667085";
export const TEXT_COLOR = "#1a1d29";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Shared table-based HTML shell so emails render consistently across clients. */
export function emailLayout({
  preheader,
  bodyHtml,
}: {
  preheader: string;
  bodyHtml: string;
}): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(siteConfig.name)}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f5f8; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f8; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid ${BORDER_COLOR};">
            <tr>
  <td style="padding:28px 32px; border-bottom:1px solid ${BORDER_COLOR};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="middle" style="padding-right:8px;">
          <img src="${absoluteUrl("/logo_light.png")}" width="28" height="32" alt="${escapeHtml(siteConfig.name)}" style="display:block;" />
        </td>
        <td valign="middle">
          <span style="font-size:16px; font-weight:600; color:${TEXT_COLOR};">
            ${escapeHtml(siteConfig.name)}
          </span>
        </td>
            </tr>
          </table>
        </td>
      </tr>
            <tr>
              <td style="padding:32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px; background-color:#fafbfc; border-top:1px solid ${BORDER_COLOR};">
                <p style="margin:0; font-size:12px; line-height:18px; color:${MUTED_COLOR};">
                  ${escapeHtml(siteConfig.name)} &middot; ${escapeHtml(siteConfig.tagline)}<br />
                  <a href="mailto:${siteConfig.email}" style="color:${MUTED_COLOR};">${siteConfig.email}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** A label/value row inside the details table used by notification & confirmation emails. */
export function emailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0; border-bottom:1px solid ${BORDER_COLOR}; font-size:13px; color:${MUTED_COLOR}; width:140px; vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0; border-bottom:1px solid ${BORDER_COLOR}; font-size:14px; color:${TEXT_COLOR}; vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}
