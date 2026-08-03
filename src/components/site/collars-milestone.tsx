"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronRight } from "lucide-react";
import { gaAttrs } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Milestone = {
  period: string;
  title: string;
  body: string;
  /** Optional emphasised line rendered under the body copy. */
  callout?: string;
  image: { src: string; alt: string; aspect: string };
};

const milestones: Milestone[] = [
  {
    period: "July 2021",
    title: "The start",
    body: "A men's clothing startup hands us three SKUs to see how we handle them. We ship their first order that week. Twelve months later, their cost per order is down 30%.",
    image: {
      src: "/collars-co/warehouse-racking.jpeg",
      alt: "Warehouse crew installing pallet racking at the Eastern Fulfillment facility",
      aspect: "aspect-[4/3]",
    },
  },
  {
    period: "November 2022",
    title: "The spike",
    body: "Justin Baer pitches on Shark Tank. Mark Cuban and Peter Jones invest. Traffic quadruples overnight, and daily orders go from 50 to 300 inside a week.",
    callout: "No backlog. No missed cutoff. No 2 a.m. phone call.",
    image: {
      src: "/collars-co/leadership.jpeg",
      alt: "Collars & Co and Eastern Fulfillment leadership together at an evening event",
      aspect: "aspect-[4/5]",
    },
  },
  {
    period: "November 2023",
    title: "The catalog",
    body: "Sweaters, outerwear, new collar styles — 100+ SKUs added in twelve months. We re-slotted the pick faces and rebuilt the pick paths, so a catalog thirty times larger didn't mean pick times thirty times longer.",
    image: {
      src: "/collars-co/warehouse-build.jpeg",
      alt: "Team rebuilding shelving levels to re-slot an expanded Collars & Co catalog",
      aspect: "aspect-[4/3]",
    },
  },
  {
    period: "2024–2025",
    title: "The ceiling moves",
    body: "Daily capacity clears 2,500 orders. Q4 peaks and TV-driven surges absorbed without a temp-labor scramble.",
    image: {
      src: "/collars-co/team.jpeg",
      alt: "The Eastern Fulfillment floor team on the warehouse stairs",
      aspect: "aspect-[4/5]",
    },
  },
  {
    period: "July 2026",
    title: "One million",
    body: "250+ SKUs. 0.40% order-issue rate across the life of the account.",
    image: {
      src: "/collars-co/showroom.jpeg",
      alt: "Collars & Co and Eastern Fulfillment at the Collars & Co showroom",
      aspect: "aspect-[4/5]",
    },
  },
];

type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
};

const stats: Stat[] = [
  { value: 1_000_000, label: "Orders shipped since 2021" },
  { value: 250, suffix: "+", label: "Active SKUs" },
  { value: 0.4, suffix: "%", decimals: 2, label: "Order-issue rate, lifetime" },
  { value: 2500, suffix: "+", label: "Daily order capacity" },
];

function formatStat(value: number, decimals = 0, suffix = "") {
  return (
    value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix
  );
}

export function CollarsMilestone() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = sectionRef.current;
      if (!root) return;

      // Everything is visible by default in CSS, so reduced-motion users (and
      // anyone without JS) simply get the section with no scroll animation.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);

        // Header: text column and media column drift up as the section enters.
        gsap.from(q("[data-reveal='header']"), {
          autoAlpha: 0,
          y: 48,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-header]")[0],
            start: "top 90%",
            end: "top 45%",
            scrub: 0.6,
          },
        });

        // Timeline rail draws itself down as you scroll through the milestones.
        const list = q("[data-timeline]")[0];
        gsap.fromTo(
          q("[data-rail-fill]"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          }
        );

        // Each milestone: marker pops, copy lifts, photo lifts and settles.
        q("[data-milestone]").forEach((item) => {
          const scoped = gsap.utils.selector(item);

          gsap.from(scoped("[data-reveal='marker']"), {
            scale: 0,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "top 68%",
              scrub: 0.6,
            },
          });

          gsap.from(scoped("[data-reveal='text']"), {
            autoAlpha: 0,
            y: 44,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              end: "top 48%",
              scrub: 0.6,
            },
          });

          gsap.from(scoped("[data-reveal='media']"), {
            autoAlpha: 0,
            y: 64,
            scale: 0.96,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 92%",
              end: "top 42%",
              scrub: 0.6,
            },
          });
        });

        // Stat cards lift in, and their numbers count up tied to scroll position.
        const statsGrid = q("[data-stats]")[0];

        gsap.from(q("[data-stat-card]"), {
          autoAlpha: 0,
          y: 36,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: statsGrid,
            start: "top 92%",
            end: "top 55%",
            scrub: 0.6,
          },
        });

        q("[data-stat-value]").forEach((el) => {
          const target = Number(el.dataset.statValue);
          const decimals = Number(el.dataset.statDecimals ?? 0);
          const suffix = el.dataset.statSuffix ?? "";
          const counter = { v: 0 };

          gsap.to(counter, {
            v: target,
            ease: "none",
            scrollTrigger: {
              trigger: statsGrid,
              start: "top 92%",
              end: "top 50%",
              scrub: 0.6,
            },
            onUpdate: () => {
              el.textContent = formatStat(counter.v, decimals, suffix);
            },
          });
        });

        // Closing row.
        gsap.from(q("[data-reveal='outro']"), {
          autoAlpha: 0,
          y: 32,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: {
            trigger: q("[data-outro]")[0],
            start: "top 95%",
            end: "top 65%",
            scrub: 0.6,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="collars-co-story"
      data-ga-view="collars_milestone"
      className="container-px py-20 lg:py-28"
    >
      <div className="overflow-hidden rounded-[2rem] bg-secondary/50 px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
        {/* Header */}
        <div
          data-header
          className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        >
          <div data-reveal="header">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Client Story
            </span>
            <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Three SKUs to a <span className="text-primary">million orders</span>
            </h2>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Collars &amp; Co · 2021–2026
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              In July 2021, Collars &amp; Co sent us three SKUs and a few dozen
              orders a day. It was a test. This month we shipped their millionth
              order.
            </p>
          </div>

          <div data-reveal="header">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="/collars-co/brand-jet.jpeg"
                alt="Collars & Co branded cabin interior"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-background/85 p-4 backdrop-blur">
                <p className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                  1,000,000
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    th order
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Shipped July 2026 — five years after order one.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <ol data-timeline className="relative mt-20 lg:mt-28">
          {/* Rail track + scrubbed fill */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[9px] top-2 w-px bg-border lg:left-1/2 lg:-translate-x-1/2"
          >
            <div
              data-rail-fill
              className="h-full w-full origin-top bg-primary"
            />
          </div>

          {milestones.map((milestone, i) => {
            const textFirst = i % 2 === 0;

            return (
              <li
                key={milestone.period}
                data-milestone
                className="relative pb-16 pl-12 last:pb-0 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:pb-24 lg:pl-0"
              >
                <span
                  aria-hidden
                  data-reveal="marker"
                  className="absolute left-0 top-1.5 flex h-[19px] w-[19px] items-center justify-center rounded-full bg-secondary lg:left-1/2 lg:-translate-x-1/2"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                </span>

                <div
                  data-reveal="text"
                  className={
                    textFirst
                      ? "lg:col-start-1 lg:row-start-1 lg:pr-4 lg:text-right"
                      : "lg:col-start-2 lg:row-start-1 lg:pl-4"
                  }
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {milestone.period}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {milestone.body}
                  </p>
                  {milestone.callout && (
                    <p className="mt-5 inline-block rounded-xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                      {milestone.callout}
                    </p>
                  )}
                </div>

                <div
                  data-reveal="media"
                  className={
                    textFirst
                      ? "lg:col-start-2 lg:row-start-1 lg:pl-4"
                      : "lg:col-start-1 lg:row-start-1 lg:pr-4"
                  }
                >
                  <div
                    className={`relative mt-6 w-full overflow-hidden rounded-2xl lg:mt-0 ${milestone.image.aspect}`}
                  >
                    <Image
                      src={milestone.image.src}
                      alt={milestone.image.alt}
                      fill
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Closing numbers */}
        <div
          data-stats
          className="mt-16 grid grid-cols-2 gap-4 pt-12 lg:mt-20 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat-card
              className="rounded-2xl bg-card p-6 text-center"
            >
              <div className="text-2xl font-bold tracking-tight text-primary sm:text-3xl lg:text-4xl">
                <span
                  data-stat-value={stat.value}
                  data-stat-decimals={stat.decimals ?? 0}
                  data-stat-suffix={stat.suffix ?? ""}
                >
                  {formatStat(stat.value, stat.decimals, stat.suffix)}
                </span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          data-outro
          className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p data-reveal="outro" className="max-w-lg text-muted-foreground">
            Five years, one account, zero handoffs. That is what a fulfillment
            partner is supposed to look like.
          </p>
          <Link
            href="/resources/case-studies"
            data-reveal="outro"
            {...gaAttrs("cta_click", {
              cta_location: "collars_milestone",
              cta_text: "Read the full case study",
              cta_destination: "/resources/case-studies",
              cta_type: "primary",
              case_study: "Collars & Co",
            })}
            className="group inline-flex shrink-0 items-center rounded-full bg-primary px-5 py-3 text-sm font-medium uppercase text-white transition-colors xl:px-8"
          >
            <span className="mr-2 inline-flex h-4 w-4 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:mr-0 group-hover:w-0">
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
            </span>
            Read the full case study
            <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:ml-2 group-hover:w-4">
              <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
