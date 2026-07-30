import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { ProductSolutions } from "@/components/site/product-solutions";
import { gaAttrs } from "@/lib/analytics";
import type { Product } from "@/lib/products";

export function ProductRichPage({ product }: { product: Product }) {
  const { icon: Icon, solutions = [], metrics = [] } = product;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b  bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 text-center lg:pt-40">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Icon className="h-4 w-4" />
              {product.eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {product.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {product.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#contact"
                {...gaAttrs("cta_click", {
                  cta_location: "product_hero",
                  cta_text: "Get Started",
                  cta_destination: "/#contact",
                  cta_type: "primary",
                  product_name: product.name,
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
                  cta_location: "product_hero",
                  cta_text: "Book a Demo",
                  cta_destination: "/#contact",
                  cta_type: "secondary",
                  product_name: product.name,
                })}
                className="inline-flex items-center justify-center rounded-full border bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent xl:px-8"
              >
                Book a Demo
              </Link>
            </div>

            {product.heroImage && (
              <div className="mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl rounded-b-none  border border-border border-b-none bg-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.heroImage}
                  alt={product.heroImageAlt ?? `${product.name} dashboard`}
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Intro + headline metrics */}
        {product.intro && (
          <section className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {product.intro.heading}
              </h2>
              <p className="mt-6 text-muted-foreground">{product.intro.body}</p>
            </div>

            {metrics.length > 0 && (
              <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
                {metrics.map((metric) => (
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
            )}
          </section>
        )}

        {/* Solutions with tabs (client) */}
        {solutions.length > 0 && (
          <ProductSolutions
            solutions={solutions}
            heading={product.solutionsHeading ?? "Solutions"}
          />
        )}

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
