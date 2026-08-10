import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  PackageSearch,
  Boxes,
  Building2,
  Plug,
  BookOpen,
  Calculator,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { gaAttrs } from "@/lib/analytics";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you are looking for does not exist or has been moved.",
  // 404s are already noindex'd by Next.js, but be explicit for crawlers that
  // reach this UI through a soft redirect.
  robots: { index: false, follow: true },
};

/** Popular destinations offered as a way back into the site. */
const destinations = [
  {
    href: "/product/fullfilment-automation",
    icon: Boxes,
    title: "Fulfillment automation",
    description: "Pick, pack, and ship without the manual handoffs.",
  },
  {
    href: "/product/shipping-calculator",
    icon: Calculator,
    title: "Shipping calculator",
    description: "Estimate per-order costs across zones and carriers.",
  },
  {
    href: "/integrations",
    icon: Plug,
    title: "Integrations",
    description: "Connect Shopify, Amazon, and the rest of your stack.",
  },
  {
    href: "/industries/ecommerce",
    icon: Building2,
    title: "Industries",
    description: "How we run fulfillment for ecommerce, FMCG, and 3PL.",
  },
  {
    href: "/resources/blog",
    icon: BookOpen,
    title: "Resources",
    description: "Guides, case studies, and product documentation.",
  },
  {
    href: "/contact",
    icon: PackageSearch,
    title: "Talk to us",
    description: "Tell us what you were looking for and we'll point you to it.",
  },
] as const;

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative flex min-h-[80vh] flex-col items-center justify-center py-32 text-center lg:py-40">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <PackageSearch className="h-4 w-4" />
              Error 404
            </span>

            <p
              aria-hidden
              className="mt-8 select-none text-[5.5rem] font-bold leading-none tracking-tighter text-primary/15 sm:text-[8rem]"
            >
              404
            </p>

            <h1 className="mx-auto -mt-2 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              This package never arrived
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              The page you&rsquo;re looking for doesn&rsquo;t exist, or it moved
              to a new address. Let&rsquo;s get you back on route.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                {...gaAttrs("cta_click", {
                  cta_location: "not_found",
                  cta_text: "Back to home",
                  cta_destination: "/",
                  cta_type: "primary",
                  page_section: "404",
                })}
                className="group inline-flex items-center justify-center rounded-full border border-primary bg-primary px-6 py-3 text-sm font-medium text-white transition-colors xl:px-8"
              >
                <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
                </span>
                Back to home
                <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                  <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </span>
              </Link>
              <Link
                href="/contact"
                {...gaAttrs("cta_click", {
                  cta_location: "not_found",
                  cta_text: "Contact support",
                  cta_destination: "/contact",
                  cta_type: "secondary",
                  page_section: "404",
                })}
                className="inline-flex items-center justify-center gap-2 rounded-full border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent xl:px-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Contact support
              </Link>
            </div>

            <div className="mt-20 w-full max-w-5xl">
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Popular destinations
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map(({ href, icon: Icon, title, description }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      {...gaAttrs("select_content", {
                        content_type: "not_found_link",
                        item_id: href,
                        cta_text: title,
                        page_section: "404",
                      })}
                      className="group flex h-full flex-col rounded-2xl border bg-background/60 p-5 text-left transition-colors hover:border-primary/40 hover:bg-accent"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="mt-4 flex items-center gap-1 font-medium">
                        {title}
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out group-hover:translate-x-1" />
                      </span>
                      <span className="mt-1 text-sm text-muted-foreground">
                        {description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
