import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { cn } from "@/lib/utils";
import type { Industry } from "@/lib/industries";

export function IndustryPage({ industry }: { industry: Industry }) {
  const {
    icon: Icon,
    stats = [],
    features = [],
    steps = [],
    benefits = [],
  } = industry;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background border-b">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 lg:pt-40">
            <div className="flex flex-col items-center justify-center gap-12">
              {/* Copy */}
              <div className="w-full lg:max-w-4xl flex flex-col item-center justify-center">
                <span className="inline-flex mx-auto items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  <Icon className="h-4 w-4" />
                  {industry.eyebrow}
                </span>
                <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-center tracking-tight sm:text-5xl">
                  {industry.title}
                </h1>
                <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground text-center">
                  {industry.subtitle}
                </p>
                <div className="mt-8 flex flex-col mx-auto gap-3 sm:flex-row">
                  <Link
                    href="/#contact"
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
                    className="group inline-flex items-center justify-center rounded-full border bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent xl:px-8"
                  >
                    <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
                    </span>
                    Book a Demo
                    <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                      <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Hero visual: manually-added image, or the stat panel fallback */}
              {industry.heroImage ? (
                <div className="overflow-hidden rounded-sm rounded-b-none border border-b-0 border-border bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={industry.heroImage}
                    alt={industry.heroImageAlt ?? `${industry.name} preview`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
                  <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-red-400/80" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                      <span className="h-3 w-3 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      <span className="truncate">
                        app.easternfulfillment.com/industries/{industry.slug}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 bg-background p-5">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-border bg-card p-4"
                      >
                        <div className="text-2xl font-bold tracking-tight">
                          {stat.value}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features / what we solve */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {industry.challengesHeading}
            </h2>
            <p className="mt-4 text-muted-foreground">
              The capabilities {industry.name.toLowerCase()} teams rely on to
              grow without the logistics headaches.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-white">
                  <feature.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How it works
              </h2>
              <p className="mt-4 text-muted-foreground">
                From onboarding to scale in four steps.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={step.title} className="relative">
                  <div className="text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why {industry.name} teams choose us
              </h2>
              <p className="mt-4 text-muted-foreground">
                Built to remove friction from fulfillment so you can grow without
                growing your overhead.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative metric card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 to-card p-8">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
              <div className="relative grid gap-4">
                {stats.slice(0, 3).map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-2xl border border-border bg-card/80 px-5 py-4 backdrop-blur"
                  >
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                    <span className="text-xl font-bold tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
