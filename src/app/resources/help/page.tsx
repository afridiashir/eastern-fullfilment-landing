import type { Metadata } from "next";
import { HelpCircle } from "lucide-react";
import { ResourceSectionsIndex } from "@/components/site/resource-sections-index";
import { client } from "@/sanity/client";
import { HELP_TOPICS_QUERY } from "@/sanity/queries";
import { pageMetadata } from "@/lib/site";
import type { DocSection } from "@/sanity/types";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Help Center",
  description:
    "Answers and support for your fulfillment operation, organized by topic.",
  path: "/resources/help",
});

export default async function Page() {
  const topics = await client.fetch<DocSection[]>(HELP_TOPICS_QUERY);
  return (
    <ResourceSectionsIndex
      icon={HelpCircle}
      eyebrow="Resources"
      title="Help Center"
      description="Answers, walkthroughs, and support for your fulfillment operation."
      basePath="/resources/help"
      sections={topics}
      emptyMessage="Answers and walkthroughs are on the way — check back soon."
    />
  );
}
