import type { Metadata } from "next";
import { IntegrationsPage } from "@/components/site/integrations-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Integrations",
  description:
    "Connect Shopify, Amazon, DHL, FedEx, and 60+ more channels, carriers, and tools. Orders, inventory, and shipments stay in sync automatically with Eastern Fullfilment.",
  path: "/integrations",
  keywords: [
    "ecommerce integrations",
    "Shopify integration",
    "Amazon integration",
    "carrier integrations",
    "DHL",
    "FedEx",
    "fulfillment API",
    "order sync",
    "inventory sync",
  ],
});

export default function Page() {
  return <IntegrationsPage />;
}
