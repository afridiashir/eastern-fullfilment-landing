/**
 * Central site configuration — single source of truth for SEO metadata,
 * structured data, sitemap, robots, and the web manifest.
 *
 * Override the production URL by setting NEXT_PUBLIC_SITE_URL at build time.
 */

export const siteConfig = {
  name: "Eastern Fullfilment",
  legalName: "Eastern Fullfilment",
  // No trailing slash. metadataBase + canonical URLs are derived from this.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.easternfulfillment.com").replace(
    /\/$/,
    "",
  ),
  title: "Eastern Fullfilment — Order Fulfillment & 3PL for Growing Brands",
  shortName: "Eastern",
  tagline: "Order Fulfillment & 3PL for Growing Brands",
  description:
    "Faster shipping, accurate inventory, and per-order pricing that scales with you. Pick & pack, storage, returns, and multi-warehouse distribution with no long-term contract.",
  // Used by OpenGraph/Twitter cards and the PWA theme color.
  themeColor: "#3b5bdb",
  locale: "en_US",
  email: "hello@easternfulfillment.com",
  telephone: "+1-555-012-3456",
  // Social profiles — update hrefs as accounts go live (used for sameAs in JSON-LD).
  socials: {
    facebook: "https://www.facebook.com/easternfulfillment",
    twitter: "https://twitter.com/easternfulfillment",
    linkedin: "https://www.linkedin.com/company/easternfulfillment",
  },
  // @handle for Twitter/X cards. Update once the account exists.
  twitterHandle: "@easternfulfill",
  keywords: [
    "order fulfillment",
    "3PL",
    "third-party logistics",
    "ecommerce fulfillment",
    "pick and pack",
    "warehousing",
    "inventory management",
    "returns processing",
    "kitting and bundling",
    "multi-warehouse distribution",
    "fulfillment center",
    "Shopify fulfillment",
    "Amazon fulfillment",
    "DTC fulfillment",
  ],
  // Physical fulfillment centers — surfaced as PostalAddress nodes in JSON-LD.
  locations: [
    { city: "Dallas", region: "TX", country: "US" },
    { city: "Newark", region: "NJ", country: "US" },
  ],
} as const;

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
