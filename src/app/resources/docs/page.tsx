import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { ResourceSectionsIndex } from "@/components/site/resource-sections-index";
import { client } from "@/sanity/client";
import { DOC_SECTIONS_QUERY } from "@/sanity/queries";
import { pageMetadata } from "@/lib/site";
import type { DocSection } from "@/sanity/types";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Documentation",
  description:
    "Guides and API references for integrating with the Eastern platform.",
  path: "/resources/docs",
});

export default async function Page() {
  const sections = await client.fetch<DocSection[]>(DOC_SECTIONS_QUERY);
  return (
    <ResourceSectionsIndex
      icon={BookOpen}
      eyebrow="Resources"
      title="Documentation"
      description="Guides and references for integrating with the Eastern platform."
      basePath="/resources/docs"
      sections={sections}
      emptyMessage="Guides and references are on the way — check back soon."
    />
  );
}
