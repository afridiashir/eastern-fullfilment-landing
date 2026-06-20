import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Single-page site: the on-page sections are anchors, not crawlable URLs, so the
// sitemap lists the home page. Add new routes here as real pages are introduced.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
