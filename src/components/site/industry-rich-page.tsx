import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { BlockVisual } from "@/components/site/product-solutions";
import { IndustryOrderFlow } from "@/components/site/industry-order-flow";
import { cn } from "@/lib/utils";
import { gaAttrs } from "@/lib/analytics";
import type { Industry } from "@/lib/industries";

export function IndustryRichPage({ industry }: { industry: Industry }) {
  const { icon: Icon, edge = [], impact = [], gallery = [] } = industry;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 text-center lg:pt-40 pb-16 lg:pb-40">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Icon className="h-4 w-4" />
              {industry.eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {industry.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {industry.subtitle}
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-row">
              <Link
                href="/#contact"
                {...gaAttrs("cta_click", {
                  cta_location: "industry_hero",
                  cta_text: "Get Started",
                  cta_destination: "/#contact",
                  cta_type: "primary",
                  industry_name: industry.name,
                })}
                className="group inline-flex items-center justify-center rounded-full border border-primary bg-primary px-5 py-3 text-sm font-medium text-white transition-colors xl:px-8"
              >
                <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
                </span>
                Get Started
                <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                  <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </span>
              </Link>
              <Link
                href="/#contact"
                {...gaAttrs("cta_click", {
                  cta_location: "industry_hero",
                  cta_text: "Book a Demo",
                  cta_destination: "/#contact",
                  cta_type: "secondary",
                  industry_name: industry.name,
                })}
                className="inline-flex items-center justify-center rounded-full border bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent xl:px-8"
              >
                Book a Demo
              </Link>
            </div>

            {industry.heroImage && (
              <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl rounded-b-none border border-b-none border-border bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={industry.heroImage}
                  alt={industry.heroImageAlt ?? `${industry.name} dashboard`}
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Intro statement + scroll-driven order flow */}
        {industry.intro && (
          <section className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {industry.intro.heading}
              </h2>
              {industry.intro.body && (
                <p className="mt-6 text-muted-foreground">
                  {industry.intro.body}
                </p>
              )}
            </div>

            {industry.orderFlow && (
              <>
                <div className="mx-auto mt-16 max-w-2xl text-center">
                  <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                    How order flow works
                  </span>
                  {industry.orderFlow.caption && (
                    <p className="mt-3 text-muted-foreground">
                      {industry.orderFlow.caption}
                    </p>
                  )}
                </div>

                <IndustryOrderFlow stages={industry.orderFlow.stages} />
              </>
            )}

            {/* Image showcase */}
            {gallery.length > 0 && (
              <div className="mx-auto mt-20 max-w-6xl">
                {industry.galleryHeading && (
                  <h3 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                    {industry.galleryHeading}
                  </h3>
                )}
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {gallery.map((item) => (
                    <figure
                      key={item.image}
                      className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.label && (
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">
                          {item.label}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* The edge — alternating feature blocks */}
        {edge.length > 0 && (
          <section className="border-y border-border bg-secondary/30">
            <div className="container-px py-20 lg:py-28">
              {industry.edgeHeading && (
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                  {industry.edgeHeading}
                </h2>
              )}

              <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-16 lg:gap-24">
                {edge.map((block, i) => {
                  const reversed = i % 2 === 1;
                  return (
                    <div
                      key={block.title}
                      className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                    >
                      <div className={cn(reversed && "lg:order-2")}>
                        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                          {block.tag}
                        </span>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                          {block.title}
                        </h3>
                        {block.body.map((para) => (
                          <p key={para} className="mt-4 text-muted-foreground">
                            {para}
                          </p>
                        ))}
                      </div>
                      <div className={cn(reversed && "lg:order-1")}>
                        <BlockVisual block={block} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {industry.testimonial && (
          <section className="container-px py-20 lg:py-28">
            <figure className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto h-10 w-10 text-primary/30" />
              <blockquote className="mt-6 text-xl font-medium leading-relaxed tracking-tight sm:text-2xl">
                “{industry.testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold">
                  {industry.testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {industry.testimonial.role}
                </div>
              </figcaption>
              {industry.testimonial.metric && (
                <p className="mx-auto mt-6 max-w-xl rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary">
                  {industry.testimonial.metric}
                </p>
              )}
            </figure>
          </section>
        )}

        {/* Proven operational impact */}
        {impact.length > 0 && (
          <section className="border-y border-border bg-secondary/30">
            <div className="container-px py-20 lg:py-28">
              {industry.impactHeading && (
                <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
                  {industry.impactHeading}
                </h2>
              )}
              <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
                {impact.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-border bg-card p-8 text-center"
                  >
                    <div className="text-4xl font-bold tracking-tight text-primary">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {industry.faqs.length > 0 && (
          <section className="border-t border-border bg-secondary/30">
            <div className="container-px py-20 lg:py-28">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Frequently asked questions
                </h2>
              </div>
              <div className="mx-auto mt-12 max-w-3xl divide-y divide-border">
                {industry.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group py-5 [&_summary]:list-none"
                  >
                    <summary
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-4 font-medium",
                        "transition-colors hover:text-primary"
                      )}
                    >
                      {faq.question}
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
