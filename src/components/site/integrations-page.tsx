import Link from "next/link";
import { ChevronRight, Check, Plug, RefreshCw, Zap } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { cn } from "@/lib/utils";
import {
  featuredIntegrations,
  integrationCategories,
  type Integration,
} from "@/lib/integrations";

const highlights = [
  { icon: Plug, label: "60+ pre-built connectors, zero code" },
  { icon: RefreshCw, label: "Two-way sync for orders & inventory" },
  { icon: Zap, label: "Real-time webhooks, no polling delays" },
];

/** White logo tile with a monogram fallback when no SVG is provided. */
function LogoTile({
  item,
  className,
}: {
  item: Integration;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border border-border-light bg-white shadow-sm",
        className
      )}
    >
      {item.logo ? (
        <div
          aria-hidden="true"
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${item.logo})` }}
        />
      ) : (
        <span className="text-lg font-bold text-neutral-700">
          {item.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export function IntegrationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 pb-20 text-center lg:pt-40 lg:pb-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Plug className="h-4 w-4" />
              Integrations
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Connect every channel, carrier, and tool you already use
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Plug straight into your storefronts, marketplaces, carriers, and
              accounting systems. Orders flow in, inventory stays in sync, and
              shipments update automatically — no spreadsheets, no manual exports.
            </p>

            {/* Featured logos row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {featuredIntegrations.map((item) => (
                <LogoTile
                  key={item.slug}
                  item={item}
                  className="h-16 w-16 p-3 lg:h-[72px] lg:w-[72px]"
                />
              ))}
            </div>

            <ul className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
              {highlights.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured integration sections */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto flex max-w-6xl flex-col gap-20 lg:gap-28">
            {featuredIntegrations.map((item, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={item.slug}
                  id={item.slug}
                  className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Copy */}
                  <div className={cn(reversed && "lg:order-2")}>
                    <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {item.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                      {item.tagline}
                    </h2>
                    <p className="mt-4 text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-sm text-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/#contact"
                      className="group mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                    >
                      Connect {item.name}
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Visual */}
                  <div className={cn(reversed && "lg:order-1")}>
                    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-primary/10 to-card p-10">
                      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/10 blur-2xl" />
                      <div className="relative flex flex-col items-center justify-center gap-5 py-6">
                        <LogoTile
                          item={item}
                          className="h-24 w-24 p-5 lg:h-28 lg:w-28"
                        />
                        <div className="text-center">
                          <div className="text-lg font-semibold">
                            {item.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* And many more */}
        <section className="border-t border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                And many more
              </h2>
              <p className="mt-4 text-muted-foreground">
                A growing library of connectors across every part of your stack.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
              {integrationCategories.map((category) => (
                <div
                  key={category.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <category.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {category.items.map((item) => (
                      <LogoTile
                        key={item.name}
                        item={item}
                        className="aspect-square p-2.5"
                      />
                    ))}
                  </div>
                </div>
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
