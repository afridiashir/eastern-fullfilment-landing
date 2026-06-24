import { Plug, RefreshCw, Zap } from "lucide-react";

type MarqueeColumn = {
  logos: string[];
  animation: string;
};

const base = "/landing-page/integrations";

const columns: MarqueeColumn[] = [
  {
    animation: "marquee-down 26s linear infinite",
    logos: [
      "airtable_logo",
      "azure_logo",
      "cal.com_logo",
      "calendar_logo",
      "calendly_logo",
      "discord_logo",
      "docs_logo",
      "square_logo",
    ],
  },
  {
    animation: "marquee-up 32s linear infinite",
    logos: [
      "drive_logo",
      "dropbox_logo",
      "excel_logo",
      "facebook_logo",
      "gmail_logo",
      "google_slides_logo",
      "instagram_logo",
      "stripe_logo",
    ],
  },
  {
    animation: "marquee-down 29s linear infinite",
    logos: [
      "notion_logo",
      "outlook_logo",
      "powerpoint_logo",
      "sheets_logo",
      "shopify_logo",
      "slack_logo",
      "teams_logo",
      "acuity_logo",
    ],
  },
  {
    animation: "marquee-up 35s linear infinite",
    logos: [
      "telegram_logo",
      "tiktok_logo",
      "twilio_logo",
      "whatsapp_logo",
      "word_logo",
      "x_logo",
      "youtube_logo",
      "woo_commerce_logo",
    ],
  },
];

const highlights = [
  { icon: Plug, label: "60+ pre-built connectors, zero code" },
  { icon: RefreshCw, label: "Two-way sync for orders & inventory" },
  { icon: Zap, label: "Real-time webhooks, no polling delays" },
];

const maskStyle = {
  maskImage:
    "radial-gradient(ellipse 80% 46% at center, black 60%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 80% 46% at center, black 60%, transparent 100%)",
};

export function Integrations() {
  return (
    <section id="integrations" className="container-px py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div
            className="relative flex h-[360px] justify-center gap-6 sm:gap-10 lg:h-[520px] lg:gap-10"
            style={maskStyle}
          >
            {columns.map((col, i) => (
              <div key={i} className="flex-none overflow-hidden">
                <div
                  data-marquee-col="true"
                  className="flex flex-col gap-6 sm:gap-7 lg:gap-8"
                  style={{ animation: col.animation }}
                >
                  {[...col.logos, ...col.logos].map((logo, j) => (
                    <div
                      key={`${logo}-${j}`}
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border-light bg-white p-3 shadow-sm lg:h-[72px] lg:w-[72px]"
                    >
                      <div
                        aria-hidden="true"
                        className="h-full w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${base}/${logo}.svg)` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Connect Every Channel, Carrier, and Tool You Already Use
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Plug straight into your storefronts, marketplaces, carriers, and
            accounting systems. Orders flow in, inventory stays in sync, and
            shipments update automatically — no spreadsheets, no manual exports.
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-foreground">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="font-medium text-foreground">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
