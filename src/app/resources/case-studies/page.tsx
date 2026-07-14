import type { Metadata } from "next";
import { CaseStudiesIndex } from "@/components/site/case-studies-index";
import { client } from "@/sanity/client";
import { CASE_STUDIES_QUERY } from "@/sanity/queries";
import { pageMetadata } from "@/lib/site";
import type { CaseStudyListItem } from "@/sanity/types";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Case Studies",
  description:
    "Real results from brands scaling their fulfillment with Eastern Fullfilment.",
  path: "/resources/case-studies",
});

export default async function Page() {
  const caseStudies = await client.fetch<CaseStudyListItem[]>(CASE_STUDIES_QUERY);
  return <CaseStudiesIndex caseStudies={caseStudies} />;
}
