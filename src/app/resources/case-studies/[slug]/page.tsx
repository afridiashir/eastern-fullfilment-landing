import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/site/case-study-page";
import { client } from "@/sanity/client";
import { CASE_STUDY_QUERY, CASE_STUDY_SLUGS_QUERY } from "@/sanity/queries";
import { pageMetadata, siteConfig } from "@/lib/site";
import type { CaseStudy, SlugEntry } from "@/sanity/types";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch<SlugEntry[]>(CASE_STUDY_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await client.fetch<CaseStudy | null>(CASE_STUDY_QUERY, { slug });
  if (!caseStudy) return {};

  return {
    ...pageMetadata({
      title: caseStudy.seo?.seoTitle || caseStudy.title,
      description:
        caseStudy.seo?.seoDescription || caseStudy.summary || siteConfig.description,
      path: `/resources/case-studies/${caseStudy.slug}`,
    }),
    ...(caseStudy.seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const caseStudy = await client.fetch<CaseStudy | null>(CASE_STUDY_QUERY, { slug });
  if (!caseStudy) notFound();
  return <CaseStudyPage caseStudy={caseStudy} />;
}
