import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Cpu,
  Building2,
  HeartHandshake,
  Leaf,
  MapPin,
  Target,
  Sparkles,
  ShieldCheck,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Eastern Fullfilment builds scalable fulfillment and logistics for high-growth brands. Meet the team and the story behind effortless order-to-delivery.",
  path: "/about",
});

/* ---------- Page data ---------- */

type Milestone = { year: string; title: string; body: string };

const journey: Milestone[] = [
  {
    year: "2022",
    title: "The journey begins",
    body: "Eastern Fulfillment Co is founded in Maryland with a simple goal — make fulfillment effortless for high-growth brands.",
  },
  {
    year: "2023",
    title: "Building the network",
    body: "Expanded into multi-warehouse distribution and launched real-time inventory sync across every sales channel.",
  },
  {
    year: "2024",
    title: "Automating the all-mile",
    body: "Rolled out dispatch automation, track & trace, and a dedicated 3PL client portal for full account visibility.",
  },
  {
    year: "2025",
    title: "Scaling with intent",
    body: "Powering analytics-driven fulfillment for brands across e-commerce, FMCG/CPG, manufacturing, and 3PL networks nationwide.",
  },
];

type Value = { icon: LucideIcon; title: string; body: string };

const coreValues: Value[] = [
  {
    icon: Cpu,
    title: "Technology",
    body: "Innovation, beautifully engineered — automation that removes friction from every mile.",
  },
  {
    icon: Building2,
    title: "Enterprise",
    body: "Igniting growth and expanding futures for the brands we fulfill for.",
  },
  {
    icon: HeartHandshake,
    title: "Human",
    body: "People first — responsive partners who treat your operation as our own.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    body: "Leaner routes, smarter packaging, and a commitment to lower-impact logistics.",
  },
];

const principles: { icon: LucideIcon; text: string }[] = [
  { icon: Target, text: "Bringing exact precision to everything we do is our hallmark." },
  { icon: Sparkles, text: "With intelligent analytics, we craft personalized fulfillment experiences." },
  { icon: Gauge, text: "Our unrelenting spirit tackles complex challenges and delivers real value." },
  { icon: ShieldCheck, text: "Reliability and transparency in every order, every route, every mile." },
];

const stats = [
  { value: "130k+", label: "Orders fulfilled" },
  { value: "99.8%", label: "Order accuracy" },
  { value: "500+", label: "Brands onboarded" },
  { value: "150+", label: "Carrier integrations" },
];

/* ---------- Page ---------- */

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 pb-16 text-center lg:pt-40 lg:pb-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              About Eastern Fullfilment
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              We are fulfillment &amp; logistics experts for every mile
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Our mission is to simplify logistics decision-making with deep-tech
              solutions — the fulfillment partner of choice for e-commerce,
              FMCG/CPG, manufacturing, and 3PL teams that want efficiency,
              consistency, and transparency in every operation.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A leading-edge fulfillment company, committed to enabling
              excellence across every industry
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground">
              <p>
                Eastern Fullfilment was founded in 2022 with a conviction that
                fast-growing brands deserve enterprise-grade logistics without
                enterprise-grade complexity. What began as a single fulfillment
                operation in Maryland has grown into a technology-driven,
                all-mile platform.
              </p>
              <p>
                Today our solutions span the entire order-to-delivery journey —
                fulfillment automation, dispatch planning, track &amp; trace,
                analytics, and a dedicated 3PL client portal — driving
                real-world growth for brands across e-commerce, FMCG/CPG,
                manufacturing, and third-party logistics.
              </p>
            </div>
          </div>

          {/* Stats band */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey timeline */}
        <section className="border-y border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A glimpse at our journey so far
              </h2>
              <p className="mt-4 text-muted-foreground">
                From a single warehouse to an all-mile fulfillment platform.
              </p>
            </div>

            <div className="relative mx-auto mt-16 max-w-3xl">
              {/* Connector line */}
              <div className="pointer-events-none absolute bottom-2 left-[21px] top-2 w-0.5 bg-border" />
              <ul className="space-y-10">
                {journey.map((m) => (
                  <li key={m.year} className="relative flex items-start gap-6">
                    <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary bg-primary text-xs font-bold text-primary-foreground">
                      {m.year}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-semibold">{m.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {m.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our core business values
            </h2>
          </div>
          <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-white">
                  <value.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.body}
                </p>
              </div>
            ))}
          </div>

          {/* Principles */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <div
                key={p.text}
                className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/30 p-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="h-4 w-4" />
                </span>
                <span className="text-sm text-foreground">{p.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Founder */}
        <section className="border-t border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Meet our founder
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl items-center gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
              {/* Founder photo */}
              <div className="relative mx-auto w-full max-w-[320px]">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/15 to-purple-400/15 blur-2xl" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-secondary to-accent">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/syed-osama.jpg"
                    alt="Syed Osama, Founder & CEO of Eastern Fullfilment"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  Syed Osama
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  Founder &amp; CEO
                </p>
                <div className="mt-5 space-y-4 text-muted-foreground">
                  <p>
                    Syed founded Eastern Fullfilment in 2022 to build scalable
                    fulfillment and logistics solutions for high-growth brands.
                    Driven by an entrepreneurial spirit, he leads the company&apos;s
                    strategy and growth — forging partnerships, expanding market
                    reach, and pushing the team to ship customer-obsessed
                    solutions.
                  </p>
                  <p>
                    With a background spanning business development, sales, and
                    marketing, Syed has a track record of taking companies to new
                    heights. He studied engineering and industrial management at
                    Politecnico di Torino and went on to complete an MBA.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    Maryland, United States
                  </span>
                  <a
                    href="https://www.linkedin.com/in/syedsaleem890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors hover:text-primary"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>


        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
