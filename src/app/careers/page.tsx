import type { Metadata } from "next";
import Link from "next/link";
import {
  BriefcaseBusiness,
  ChevronRight,
  Mail,
  MapPin,
  SearchX,
  HeartHandshake,
  Rocket,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { pageMetadata } from "@/lib/site";
import { gaAttrs } from "@/lib/analytics";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "There are no open positions at Eastern Fullfilment right now. Send us your resume and we'll reach out when a role opens up that fits.",
  path: "/careers",
  keywords: ["careers", "jobs", "hiring", "open positions", "work with us"],
});

const CAREERS_EMAIL = "careers@easternfullfilment.com";

/** Shown in place of a job list while we're not actively hiring. */
const whyJoin = [
  {
    icon: Rocket,
    title: "Real ownership",
    body: "Small team, wide scope. You own outcomes end to end rather than a narrow slice of a ticket queue.",
  },
  {
    icon: HeartHandshake,
    title: "People first",
    body: "We treat our team the way we treat our clients' operations — with care, transparency, and follow-through.",
  },
  {
    icon: Users,
    title: "Built to scale",
    body: "Warehouse floor to dispatch software, we're building the systems that move hundreds of thousands of orders.",
  },
];

const locations = [
  { flag: "🇺🇸", label: "Atlanta, GA — United States" },
  { flag: "🇵🇰", label: "Lahore — Pakistan" },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 pb-16 text-center lg:pt-40 lg:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <BriefcaseBusiness className="h-4 w-4" />
              Careers
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Build the future of fulfillment with us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We&rsquo;re a team of operators and engineers making order-to-delivery
              effortless for growing brands. When we hire, we hire carefully.
            </p>
          </div>
        </section>

        {/* Open positions — currently none */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Open positions
            </h2>

            <div className="mt-10 rounded-3xl border border-border bg-card p-10 text-center sm:p-14">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <SearchX className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                No open positions right now
              </h3>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                We don&rsquo;t have any roles open at the moment. We&rsquo;re still
                glad to hear from great people — send us your resume and we&rsquo;ll
                get in touch when something opens up that fits.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${CAREERS_EMAIL}?subject=General%20application`}
                  {...gaAttrs("cta_click", {
                    cta_location: "careers",
                    cta_text: "Send us your resume",
                    cta_destination: `mailto:${CAREERS_EMAIL}`,
                    cta_type: "primary",
                    page_section: "open_positions",
                  })}
                  className="group inline-flex items-center justify-center rounded-full border border-primary bg-primary px-6 py-3 text-sm font-medium text-white transition-colors xl:px-8"
                >
                  <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                    <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
                  </span>
                  Send us your resume
                  <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                    <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  </span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent xl:px-8"
                >
                  Contact us
                </Link>
              </div>

              <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                {CAREERS_EMAIL}
              </p>
            </div>
          </div>
        </section>

        {/* Why join */}
        <section className="border-t border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What it&rsquo;s like to work here
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyJoin.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-white">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-8">
              <span className="inline-flex items-center gap-2 font-medium text-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                Where we work
              </span>
              {locations.map((location) => (
                <span key={location.label} className="inline-flex items-center gap-2">
                  <span aria-hidden>{location.flag}</span>
                  {location.label}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
