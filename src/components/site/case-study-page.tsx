import Image from "next/image";
import { Award } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { PortableText } from "@/components/site/portable-text";
import { Badge } from "@/components/ui/badge";
import { hasImageAsset, urlFor } from "@/sanity/image";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { CaseStudy } from "@/sanity/types";

const industryLabels: Record<string, string> = {
  ecommerce: "E-commerce",
  "fmcg-cpg": "FMCG/CPG",
  manufacturing: "Manufacturing",
  "3pl": "3PL & CEP",
};

export function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.summary,
    datePublished: caseStudy.publishedAt,
    image: hasImageAsset(caseStudy.mainImage)
      ? urlFor(caseStudy.mainImage).width(1600).url()
      : undefined,
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    mainEntityOfPage: absoluteUrl(`/resources/case-studies/${caseStudy.slug}`),
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="container-px pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Award className="h-4 w-4" />
              Case Study
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {caseStudy.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{caseStudy.client}</span>
              {caseStudy.industry ? (
                <Badge variant="secondary">
                  {industryLabels[caseStudy.industry] ?? caseStudy.industry}
                </Badge>
              ) : null}
            </div>
          </div>

          {hasImageAsset(caseStudy.mainImage) ? (
            <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={urlFor(caseStudy.mainImage).width(1600).height(900).fit("crop").url()}
                alt={caseStudy.mainImage.alt ?? caseStudy.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          {caseStudy.results && caseStudy.results.length > 0 ? (
            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {caseStudy.results.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-card p-5 text-center"
                >
                  <div className="text-2xl font-bold tracking-tight text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mx-auto mt-10 max-w-3xl">
            <PortableText value={caseStudy.body} />
          </div>
        </article>
        <CtaBanner />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        // Structured data is static, server-rendered JSON — safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
