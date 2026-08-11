/**
 * Site search — shared types, the static page index, and the ranking function.
 *
 * This module is dependency-light on purpose: it's imported by the search API
 * route, the /search page, and (for its types only) the client-side search bar.
 * Anything that talks to Sanity lives in `search-content.ts` instead.
 *
 * Ranking is deliberately simple. Every query term has to appear somewhere in a
 * result for it to match at all, and terms matching the title outrank terms that
 * only appear in the body — good enough for a site of this size, and it behaves
 * identically for static pages and CMS content.
 */

import { products } from "@/lib/products";
import { industries } from "@/lib/industries";
import { featuredIntegrations, integrationCategories } from "@/lib/integrations";
import { shippingServices } from "@/lib/shipping-rates";

/** Result sections, in the order they're rendered. */
export const SEARCH_GROUPS = [
  "Product",
  "Industries",
  "Blog",
  "Case Studies",
  "Documentation",
  "Help Center",
  "Company",
] as const;

export type SearchGroup = (typeof SEARCH_GROUPS)[number];

export type SearchResult = {
  id: string;
  title: string;
  description?: string;
  href: string;
  group: SearchGroup;
  /** Relevance, higher is better. Assigned by `rankResults`. */
  score: number;
};

/** Minimum query length before we bother searching. */
export const MIN_QUERY_LENGTH = 2;

/* -------------------------------------------------------------------------- */
/* Ranking                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Split a raw query into comparable terms. Punctuation is dropped so that
 * "track & trace" and "track trace" behave the same.
 */
export function parseTerms(query: string): string[] {
  return query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

const tokenize = (text: string) =>
  text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/**
 * Score one candidate against the query terms. Returns 0 when any term is
 * missing from both title and body, which drops the candidate entirely.
 */
export function scoreMatch(
  title: string,
  body: string,
  terms: string[],
): number {
  if (terms.length === 0) return 0;

  const titleText = title.toLowerCase();
  const titleTokens = tokenize(title);
  const bodyText = body.toLowerCase();

  let score = 0;
  for (const term of terms) {
    if (titleText === term) score += 120;
    else if (titleTokens.includes(term)) score += 60;
    else if (titleTokens.some((token) => token.startsWith(term))) score += 40;
    else if (titleText.includes(term)) score += 25;
    else if (bodyText.includes(term)) score += 8;
    else return 0;
  }

  // Nudge shorter titles up: "Track & Trace" should beat a blog post that
  // happens to mention tracking in passing.
  return score + Math.max(0, 20 - titleTokens.length);
}

/** Sort by score, then alphabetically so equal scores are stable. */
export function rankResults(results: SearchResult[], limit?: number) {
  const sorted = [...results].sort(
    (a, b) => b.score - a.score || a.title.localeCompare(b.title),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Group ranked results for display, preserving `SEARCH_GROUPS` order. */
export function groupResults(results: SearchResult[]) {
  return SEARCH_GROUPS.map((group) => ({
    group,
    results: results.filter((result) => result.group === group),
  })).filter((section) => section.results.length > 0);
}

/* -------------------------------------------------------------------------- */
/* Static page index                                                           */
/* -------------------------------------------------------------------------- */

type StaticEntry = {
  title: string;
  description: string;
  href: string;
  group: SearchGroup;
  /** Extra text that should match but isn't worth showing in the result. */
  keywords?: string[];
};

const staticEntries: StaticEntry[] = [
  {
    title: "Home",
    description: "Order fulfillment and 3PL for growing brands.",
    href: "/",
    group: "Company",
    keywords: ["homepage", "fulfillment", "3pl", "logistics"],
  },
  ...products.map((product) => ({
    title: product.name,
    description: product.metaDescription,
    href: `/product/${product.slug}`,
    group: "Product" as const,
    keywords: [product.eyebrow, product.title, ...product.features.map((f) => f.title)],
  })),
  {
    title: "Shipping Calculator",
    description:
      "Estimate US shipping costs by destination ZIP and package weight, with every service priced side by side.",
    href: "/product/shipping-calculator",
    group: "Product",
    keywords: [
      "rates",
      "shipping cost",
      "zone",
      "estimate",
      "quote",
      ...shippingServices.map((service) => service.name),
    ],
  },
  {
    title: "Integrations",
    description:
      "Connect your sales channels, carriers, and tools — orders, inventory, and shipments stay in sync automatically.",
    href: "/integrations",
    group: "Product",
    keywords: [
      ...featuredIntegrations.map((integration) => integration.name),
      ...integrationCategories.flatMap((category) => [
        category.title,
        ...category.items.map((item) => item.name),
      ]),
    ],
  },
  ...industries.map((industry) => ({
    title: industry.name,
    description: industry.metaDescription,
    href: `/industries/${industry.slug}`,
    group: "Industries" as const,
    keywords: [industry.eyebrow, industry.title],
  })),
  {
    title: "Blog",
    description: "Fulfillment and logistics writing from the Eastern team.",
    href: "/resources/blog",
    group: "Blog",
    keywords: ["articles", "news", "insights"],
  },
  {
    title: "Case Studies",
    description: "How brands run their fulfillment with Eastern.",
    href: "/resources/case-studies",
    group: "Case Studies",
    keywords: ["customers", "results", "stories"],
  },
  {
    title: "Documentation",
    description: "Technical guides for integrating and operating on Eastern.",
    href: "/resources/docs",
    group: "Documentation",
    keywords: ["api", "developer", "guides", "reference"],
  },
  {
    title: "Help Center",
    description: "Answers to common questions about your account and shipments.",
    href: "/resources/help",
    group: "Help Center",
    keywords: ["support", "faq", "troubleshooting"],
  },
  {
    title: "About Us",
    description: "Who we are, where we operate, and how we work.",
    href: "/about",
    group: "Company",
    keywords: ["team", "company", "warehouses", "locations"],
  },
  {
    title: "Careers",
    description: "Open roles at Eastern Fullfilment and how to apply.",
    href: "/careers",
    group: "Company",
    keywords: ["jobs", "hiring", "openings", "apply", "resume", "work"],
  },
  {
    title: "Terms and Conditions",
    description:
      "Terms covering fulfillment, storage, shipping, payment, and termination.",
    href: "/terms-and-conditions",
    group: "Company",
    keywords: [
      "terms",
      "conditions",
      "agreement",
      "legal",
      "policy",
      "liability",
      "insurance",
    ],
  },
  {
    title: "Contact",
    description: "Talk to our team about fulfillment, pricing, or onboarding.",
    href: "/contact",
    group: "Company",
    keywords: ["sales", "demo", "quote", "support", "email", "phone"],
  },
];

/** Search the pages that live in the codebase rather than the CMS. */
export function searchStaticPages(terms: string[]): SearchResult[] {
  const results: SearchResult[] = [];

  for (const entry of staticEntries) {
    const body = [entry.description, ...(entry.keywords ?? [])].join(" ");
    const score = scoreMatch(entry.title, body, terms);
    if (score > 0) {
      results.push({
        id: `page:${entry.href}`,
        title: entry.title,
        description: entry.description,
        href: entry.href,
        group: entry.group,
        // Static pages are the destinations most visitors are actually after,
        // so they edge out CMS articles that score the same.
        score: score + 10,
      });
    }
  }

  return results;
}
