import type { MetadataRoute } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { products } from "@/lib/products";
import { industries } from "@/lib/industries";
import { client } from "@/sanity/client";
import {
  BLOG_CATEGORIES_QUERY,
  CASE_STUDY_SLUGS_QUERY,
  DOC_ARTICLE_SLUGS_QUERY,
  HELP_ARTICLE_SLUGS_QUERY,
  POST_SLUGS_QUERY,
} from "@/sanity/queries";
import type { BlogCategory, SlugEntry } from "@/sanity/types";

// The home page sections are anchors, not crawlable URLs. Real routes (like the
// product pages) are listed explicitly. Add new routes here as they're introduced.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const [postSlugs, blogCategories, caseStudySlugs, docArticleSlugs, helpArticleSlugs] =
    await Promise.all([
      client.fetch<SlugEntry[]>(POST_SLUGS_QUERY),
      client.fetch<BlogCategory[]>(BLOG_CATEGORIES_QUERY),
      client.fetch<SlugEntry[]>(CASE_STUDY_SLUGS_QUERY),
      client.fetch<SlugEntry[]>(DOC_ARTICLE_SLUGS_QUERY),
      client.fetch<SlugEntry[]>(HELP_ARTICLE_SLUGS_QUERY),
    ]);

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${product.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...industries.map((industry) => ({
      url: absoluteUrl(`/industries/${industry.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/product/shipping-calculator"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl("/integrations"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: absoluteUrl("/careers"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: absoluteUrl("/resources/blog"),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl("/resources/case-studies"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl("/resources/docs"),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: absoluteUrl("/resources/help"),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...postSlugs.map(({ slug }) => ({
      url: absoluteUrl(`/resources/blog/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...blogCategories.map(({ slug }) => ({
      url: absoluteUrl(`/resources/blog/category/${slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...caseStudySlugs.map(({ slug }) => ({
      url: absoluteUrl(`/resources/case-studies/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...docArticleSlugs.map(({ slug }) => ({
      url: absoluteUrl(`/resources/docs/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...helpArticleSlugs.map(({ slug }) => ({
      url: absoluteUrl(`/resources/help/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
