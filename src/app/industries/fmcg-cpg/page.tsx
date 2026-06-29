import type { Metadata } from "next";
import { IndustryRichPage } from "@/components/site/industry-rich-page";
import { getIndustry } from "@/lib/industries";
import { pageMetadata } from "@/lib/site";

const industry = getIndustry("fmcg-cpg")!;

export const metadata: Metadata = pageMetadata({
  title: industry.name,
  description: industry.metaDescription,
  path: `/industries/${industry.slug}`,
});

export default function Page() {
  return <IndustryRichPage industry={industry} />;
}
