import type { Metadata } from "next";
import { IntegrationsPage } from "@/components/site/integrations-page";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Shopify, Amazon, DHL, FedEx, and 60+ more channels, carriers, and tools. Orders, inventory, and shipments stay in sync automatically with Eastern Fullfilment.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Integrations — Eastern Fullfilment",
    description:
      "Connect Shopify, Amazon, DHL, FedEx, and 60+ more channels, carriers, and tools — orders, inventory, and shipments in sync automatically.",
    url: "/integrations",
  },
};

export default function Page() {
  return <IntegrationsPage />;
}
