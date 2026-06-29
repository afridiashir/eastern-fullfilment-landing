import type { Metadata } from "next";
import { IndustryPage } from "@/components/site/industry-page";
import { getIndustry } from "@/lib/industries";
import { pageMetadata } from "@/lib/site";

const industry = getIndustry("3pl")!;

export const metadata: Metadata = pageMetadata({
  title: industry.name,
  description: industry.metaDescription,
  path: `/industries/${industry.slug}`,
});

export default function Page() {
  return <IndustryPage industry={industry} />;
}
