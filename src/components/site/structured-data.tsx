import { siteConfig, absoluteUrl } from "@/lib/site";

/**
 * JSON-LD structured data for the landing page.
 *
 * Emits a single @graph so Organization / WebSite / WebPage / Service / FAQ
 * nodes can cross-reference each other via @id. Rendered server-side into the
 * page so crawlers (and rich-result previews) get it without executing JS.
 */

const orgId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const webpageId = `${siteConfig.url}/#webpage`;

// Mirrors the services advertised across the site (services + footer sections).
const services = [
  {
    name: "Pick & Pack",
    description:
      "Accurate per-order picking and packing with branded packaging and custom inserts.",
  },
  {
    name: "Storage & Receiving",
    description:
      "Inbound receiving, SKU mapping, and real-time inventory storage across our warehouse network.",
  },
  {
    name: "Returns Processing",
    description:
      "Returns received, inspected, and restocked — usually within a day — with full portal visibility.",
  },
  {
    name: "Kitting & Bundling",
    description:
      "Kitting, bundling, subscription boxes, and special projects to keep your unboxing on-brand.",
  },
  {
    name: "Multi-Warehouse Distribution",
    description:
      "Inventory split across strategically placed warehouses to shorten transit times and lower shipping costs.",
  },
];

// Mirrors the FAQ copy in components/site/faq.tsx — keep in sync.
const faqs = [
  {
    question: "How long does onboarding take?",
    answer:
      "Most brands are live and shipping within 7–10 days. We handle the integration setup, inbound receiving of your inventory, and SKU mapping — then run a short test batch before going fully live.",
  },
  {
    question: "Where are your fulfillment centers located?",
    answer:
      "We operate a network of strategically placed warehouses, so your inventory can be split across regions to shorten transit times and lower shipping costs. We'll recommend the best distribution mix based on where your customers are.",
  },
  {
    question: "Which sales channels and platforms do you integrate with?",
    answer:
      "We connect directly to Shopify, Amazon, eBay, Walmart, WooCommerce, and most major marketplaces and carts. Orders sync automatically to the warehouse — no manual exports — and tracking flows straight back to your store.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is transparent and usage-based: a per-order pick & pack rate that drops as your volume grows, plus pass-through costs for storage, receiving, and shipping. There are no hidden platform fees — see our pricing section for the full breakdown.",
  },
  {
    question: "Is there a minimum order volume or long-term contract?",
    answer:
      "No long-term contracts and no rigid minimums to get started. Our Starter plan is built for newer brands, and you can scale into lower per-order rates as your volume increases.",
  },
  {
    question: "How do you handle returns?",
    answer:
      "Returns are received, inspected, and restocked — usually within a day — with full visibility in your client portal. We can also apply custom rules for grading, refurbishing, or quarantining items based on your policy.",
  },
  {
    question: "Can you handle peak season and sudden volume spikes?",
    answer:
      "Yes. Our capacity and staffing flex with your demand, so events like Black Friday, product launches, and viral spikes ship on time without you scrambling for extra headcount.",
  },
  {
    question: "Do you support kitting, subscriptions, and custom packaging?",
    answer:
      "Absolutely. We handle kitting and bundling, recurring subscription boxes, branded packaging, custom inserts, and special projects so your unboxing experience stays on-brand.",
  },
];

export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.legalName,
        url: siteConfig.url,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.telephone,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icon"),
        },
        image: absoluteUrl("/opengraph-image"),
        sameAs: Object.values(siteConfig.socials),
        address: siteConfig.locations.map((loc) => ({
          "@type": "PostalAddress",
          addressLocality: loc.city,
          addressRegion: loc.region,
          addressCountry: loc.country,
        })),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: siteConfig.email,
          telephone: siteConfig.telephone,
          areaServed: "US",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": orgId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfessionalService",
        name: siteConfig.name,
        "@id": `${siteConfig.url}/#service`,
        url: siteConfig.url,
        description: siteConfig.description,
        provider: { "@id": orgId },
        areaServed: { "@type": "Country", name: "United States" },
        serviceType: "Order fulfillment and third-party logistics (3PL)",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Fulfillment Services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Structured data is static, server-rendered JSON — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
