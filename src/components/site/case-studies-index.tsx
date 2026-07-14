import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { ResourceHero, EmptyState } from "@/components/site/resource-hero";
import { Badge } from "@/components/ui/badge";
import { hasImageAsset, urlFor } from "@/sanity/image";
import type { CaseStudyListItem } from "@/sanity/types";

const industryLabels: Record<string, string> = {
  ecommerce: "E-commerce",
  "fmcg-cpg": "FMCG/CPG",
  manufacturing: "Manufacturing",
  "3pl": "3PL & CEP",
};

export function CaseStudiesIndex({
  caseStudies,
}: {
  caseStudies: CaseStudyListItem[];
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ResourceHero
          eyebrow="Resources"
          icon={Award}
          title="Case studies"
          description="Real results from brands that scaled their fulfillment with Eastern."
        />
        <section className="container-px py-20 lg:py-28">
          {caseStudies.length === 0 ? (
            <EmptyState message="We're gathering stories of brands that scaled with Eastern — check back soon." />
          ) : (
            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy._id}
                  href={`/resources/case-studies/${caseStudy.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    {hasImageAsset(caseStudy.mainImage) ? (
                      <Image
                        src={urlFor(caseStudy.mainImage)
                          .width(640)
                          .height(400)
                          .fit("crop")
                          .url()}
                        alt={caseStudy.mainImage.alt ?? caseStudy.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    {caseStudy.industry ? (
                      <Badge variant="secondary">
                        {industryLabels[caseStudy.industry] ?? caseStudy.industry}
                      </Badge>
                    ) : null}
                    <h2 className="font-semibold leading-snug transition-colors group-hover:text-primary">
                      {caseStudy.title}
                    </h2>
                    {caseStudy.summary ? (
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {caseStudy.summary}
                      </p>
                    ) : null}
                    <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                      {hasImageAsset(caseStudy.clientLogo) ? (
                        <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-muted">
                          <Image
                            src={urlFor(caseStudy.clientLogo).width(48).height(48).fit("crop").url()}
                            alt={caseStudy.client}
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <span>{caseStudy.client}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
