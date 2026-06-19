import { Plug, RefreshCw, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Platform = {
  name: string;
  logo: string;
};

const platforms: Platform[] = [
  { name: "Shopify", logo: "/logos/shopify.svg" },
  { name: "WooCommerce", logo: "/logos/woocommerce.svg" },
  { name: "BigCommerce", logo: "/logos/bigcommerce.svg" },
  { name: "eBay", logo: "/logos/ebay.svg" },
  { name: "Etsy", logo: "/logos/etsy.svg" },
  { name: "TikTok Shop", logo: "/logos/tiktok.svg" },
  { name: "UPS", logo: "/logos/ups.svg" },
  { name: "FedEx", logo: "/logos/fedex.svg" },
  { name: "DHL", logo: "/logos/dhl.svg" },
];

const highlights = [
  { icon: Plug, label: "60+ pre-built connectors, zero code" },
  { icon: RefreshCw, label: "Two-way sync for orders & inventory" },
  { icon: Zap, label: "Real-time webhooks, no polling delays" },
];

export function Integrations() {
  return (
    <section id="integrations" className="container-px py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/15 to-purple-400/15 blur-2xl" />
          <div className="relative grid grid-cols-3 gap-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-2 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm hover:shadow-primary/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="h-12 w-12 object-contain"
                />
                <span className="truncate text-xs font-medium text-muted-foreground">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-lg">
            <div className="text-2xl font-bold text-foreground">60+</div>
            <div className="text-xs text-muted-foreground">Integrations</div>
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
