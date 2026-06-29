/**
 * Integrations catalog — drives the /integrations page.
 *
 * `featured` entries each render a full section. `categories` render the
 * "and many more" logo grid. Logos live in `public/logos/<file>.svg`; when a
 * logo is missing the UI falls back to a monogram, so you can add the SVG
 * later (e.g. drop `public/logos/amazon.svg` and set `logo` below).
 */

import { ShoppingBag, Truck, Wallet, type LucideIcon } from "lucide-react";

export type Integration = {
  name: string;
  /** Site-relative path, e.g. "/logos/shopify.svg". Omit to use a monogram. */
  logo?: string;
};

export type FeaturedIntegration = Integration & {
  slug: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
};

export type IntegrationCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  items: Integration[];
};

export const featuredIntegrations: FeaturedIntegration[] = [
  {
    slug: "shopify",
    name: "Shopify",
    category: "Sales Channel",
    logo: "/logos/shopify.svg",
    tagline: "Sync your Shopify store in minutes",
    description:
      "Orders flow from Shopify straight into fulfillment, inventory stays in sync both ways, and tracking is pushed back to your customers automatically.",
    features: [
      "Automatic order import",
      "Two-way inventory sync",
      "Tracking & fulfillment write-back",
      "Multi-store support",
    ],
  },
  {
    slug: "amazon",
    name: "Amazon",
    category: "Marketplace",
    // Add public/logos/amazon.svg, then set: logo: "/logos/amazon.svg"
    tagline: "Stay Prime-ready on Amazon",
    description:
      "Fulfill Seller-Fulfilled Prime and FBM orders on time, keep inventory accurate to avoid oversells, and meet Amazon's strict shipping SLAs every time.",
    features: [
      "FBM & Seller-Fulfilled Prime",
      "Inventory sync to prevent oversells",
      "On-time SLA compliance",
      "Valid tracking uploads",
    ],
  },
  {
    slug: "dhl",
    name: "DHL",
    category: "Carrier",
    logo: "/logos/dhl.svg",
    tagline: "Ship worldwide with DHL",
    description:
      "Rate-shop DHL services, print compliant labels, and track every domestic and international parcel without ever leaving your dashboard.",
    features: [
      "Live rate shopping",
      "Domestic & international labels",
      "Automated customs paperwork",
      "End-to-end tracking",
    ],
  },
  {
    slug: "fedex",
    name: "FedEx",
    category: "Carrier",
    logo: "/logos/fedex.svg",
    tagline: "Fast, reliable FedEx delivery",
    description:
      "Generate FedEx labels, compare service levels, and give customers accurate delivery estimates from the moment they check out.",
    features: [
      "Ground, Express & Freight",
      "Automated label generation",
      "Delivery date estimates",
      "Real-time tracking events",
    ],
  },
];

export const integrationCategories: IntegrationCategory[] = [
  {
    title: "Sales channels & marketplaces",
    description: "Sell everywhere and fulfill from one place.",
    icon: ShoppingBag,
    items: [
      { name: "Shopify", logo: "/logos/shopify.svg" },
      { name: "Amazon" },
      { name: "eBay", logo: "/logos/ebay.svg" },
      { name: "WooCommerce", logo: "/logos/woocommerce.svg" },
      { name: "BigCommerce", logo: "/logos/bigcommerce.svg" },
      { name: "Etsy", logo: "/logos/etsy.svg" },
      { name: "Squarespace", logo: "/logos/squarespace.svg" },
      { name: "Wix", logo: "/logos/wix.svg" },
      { name: "TikTok Shop", logo: "/logos/tiktok.svg" },
    ],
  },
  {
    title: "Shipping carriers",
    description: "Rate-shop and print labels across carriers.",
    icon: Truck,
    items: [
      { name: "DHL", logo: "/logos/dhl.svg" },
      { name: "FedEx", logo: "/logos/fedex.svg" },
      { name: "UPS", logo: "/logos/ups.svg" },
    ],
  },
  {
    title: "Accounting & payments",
    description: "Keep finance in sync automatically.",
    icon: Wallet,
    items: [
      { name: "QuickBooks", logo: "/logos/quickbooks.svg" },
      { name: "Xero", logo: "/logos/xero.svg" },
      { name: "Stripe", logo: "/logos/stripe.svg" },
      { name: "PayPal", logo: "/logos/paypal.svg" },
    ],
  },
];
