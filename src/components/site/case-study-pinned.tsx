"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { gaAttrs, trackEvent } from "@/lib/analytics";
import { useIsDesktop } from "@/components/site/use-is-desktop";
import { milestones, type Milestone } from "@/components/site/collars-story-data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Scroll distance the pin holds for, as a % of viewport height per milestone.
const SCROLL_PER_STEP = 100;

/**
 * The Collars & Co client story as a pinned panel: the section holds the
 * screen while scroll steps through the milestones, crossfading photo and copy.
 * Shares its data with the long-form timeline in <CollarsMilestone />.
 */
export function CaseStudyPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  // Tablet and below get the plain stacked list — pinning a full-height,
  // two-column panel on a short viewport hides half of it.
  const isDesktop = useIsDesktop();
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pinned = isDesktop === true && !reduceMotion;

  // Pin the panel and map scroll progress onto the active milestone.
  useGSAP(
    () => {
      if (!pinned) return;

      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${milestones.length * SCROLL_PER_STEP}%`,
        pin: pinRef.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * milestones.length),
            milestones.length - 1
          );
          if (idx === activeRef.current) return;
          activeRef.current = idx;
          setActive(idx);
          trackEvent("carousel_slide_view", {
            carousel_name: "collars_story_pinned",
            slide_index: idx + 1,
            case_study: "Collars & Co",
            milestone: milestones[idx]?.period,
          });
        },
      });

      return () => {
        triggerRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [pinned], revertOnUpdate: true }
  );

  // Crossfade the layers, then stagger the copy and settle the photo's scale.
  useGSAP(
    () => {
      if (!pinned) return;
      const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
      const current = layersRef.current[active];
      if (!current) return;

      layers.forEach((layer) => {
        if (layer === current) return;
        gsap.to(layer, { autoAlpha: 0, duration: 0.35, ease: "power2.out" });
      });

      gsap
        .timeline()
        .to(current, { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 0)
        .fromTo(
          current.querySelectorAll("[data-reveal]"),
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power2.out",
          },
          0.05
        )
        .fromTo(
          current.querySelector("[data-reveal-image]"),
          { scale: 1.08 },
          { scale: 1, duration: 0.9, ease: "power2.out" },
          0
        );
    },
    { scope: pinRef, dependencies: [active, pinned] }
  );

  // Period labels double as the progress rail — click to jump to that step.
  const goTo = (index: number) => {
    const st = triggerRef.current;
    trackEvent("carousel_navigate", {
      carousel_name: "collars_story_pinned",
      direction: "step",
      slide_index: index + 1,
      milestone: milestones[index]?.period,
    });
    if (!st) return;
    const span = st.end - st.start;
    window.scrollTo({
      top: st.start + (span * (index + 0.5)) / milestones.length,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="case-study"
      data-ga-view="collars_story_pinned"
      className="relative bg-background"
    >
      {pinned ? (
        <div
          ref={pinRef}
          className="relative flex h-dvh w-full flex-col justify-center items-center overflow-hidden pb-6 pt-24 wide:pt-28 tall:pb-10"
        >
          {/* Panel is 80dvh, centred in a full-height pin so the sections above
              and below stay off-screen while it holds. `max-h-full` + `min-h-0`
              let it shrink instead of spilling past the pin once the viewport is
              short enough that 80dvh no longer clears the padding. */}
          <div className="container-px flex h-[80dvh] max-h-full min-h-0 flex-col">
            <div className="flex h-full flex-col overflow-hidden rounded-[2rem] bg-secondary/50 px-6 py-6 sm:px-12 lg:px-16 tall:py-10">
              <StoryHeader compact />

              {/* One absolutely-stacked layer per milestone, so they crossfade. */}
              <div className="relative mt-4 min-h-0 flex-1 tall:mt-8">
                {milestones.map((milestone, i) => (
                  <div
                    key={milestone.period}
                    ref={(el) => {
                      layersRef.current[i] = el;
                    }}
                    aria-hidden={i !== active}
                    // Hidden layers must start `invisible`, not just transparent
                    // — they stack over layer 0 and would swallow its clicks.
                    // GSAP's autoAlpha owns visibility after the first crossfade.
                    className={`absolute inset-0 ${
                      i === 0 ? "" : "invisible opacity-0"
                    }`}
                  >
                    <MilestonePanel milestone={milestone} compact />
                  </div>
                ))}
              </div>

              {/* Timeline rail: the periods, with the active one filled. */}
              <div className="mt-4 flex items-center justify-between gap-2 tall:mt-8">
                {milestones.map((milestone, i) => (
                  <button
                    key={milestone.period}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active}
                    aria-label={`Go to ${milestone.period} — ${milestone.title}`}
                    className="group flex flex-1 flex-col gap-2 text-left"
                  >
                    <span
                      className={`h-1 w-full rounded-full transition-colors ${
                        i <= active
                          ? "bg-primary"
                          : "bg-border group-hover:bg-primary/40"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                        i === active ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {milestone.period}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-px py-20 lg:py-28">
          <div className="overflow-hidden rounded-[2rem] bg-secondary/50 px-6 py-14 sm:px-12 lg:px-16">
            <StoryHeader />
            <div className="mt-12 flex flex-col gap-16">
              {milestones.map((milestone) => (
                <MilestonePanel key={milestone.period} milestone={milestone} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * `compact` is for the pinned panel, where the header competes with the
 * milestone content for a fixed slice of viewport height. A 14" 1080p laptop at
 * 150% scale only leaves the panel ~460px, so the header has to give some back.
 */
function StoryHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex shrink-0 flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span
          className={cn(
            "inline-flex items-center rounded-full bg-primary/10 font-medium text-primary",
            compact
              ? "px-3 py-1 text-xs tall:px-4 tall:py-1.5 tall:text-sm"
              : "px-4 py-1.5 text-sm"
          )}
        >
          Client Story
        </span>
        <h2
          className={cn(
            "font-bold tracking-tight",
            compact
              ? "mt-2 text-2xl tall:mt-4 tall:text-4xl"
              : "mt-4 text-3xl sm:text-4xl"
          )}
        >
          Three SKUs to a <span className="text-primary">million orders</span>
        </h2>
        <p
          className={cn(
            "font-semibold uppercase tracking-[0.22em] text-muted-foreground",
            compact ? "mt-1.5 text-[10px] tall:mt-3 tall:text-xs" : "mt-3 text-xs"
          )}
        >
          Collars &amp; Co · 2021–2026
        </p>
      </div>

      {/* <Link
        href="/resources/case-studies"
        {...gaAttrs("cta_click", {
          cta_location: "collars_story_pinned",
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
      </Link> */}
    </div>
  );
}

/**
 * Same milestone content either way. `compact` is the pinned panel, which has
 * to fit a fixed slice of viewport height: it steps the type down a notch below
 * `wide` and lets the photo fill its grid cell rather than sizing itself from
 * the leftover height.
 */
function MilestonePanel({
  milestone,
  compact = false,
}: {
  milestone: Milestone;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid items-center lg:grid-cols-2",
        compact
          ? "h-full min-h-0 gap-6 tall:gap-12"
          : "gap-10 lg:gap-16"
      )}
    >
      {/* Copy */}
      <div className={compact ? "min-h-0" : undefined}>
        <p
          data-reveal
          className="text-xs font-semibold uppercase tracking-[0.18em] text-primary"
        >
          {milestone.period}
        </p>
        <h3
          data-reveal
          className={cn(
            "font-bold tracking-tight",
            compact
              ? "mt-1.5 text-xl tall:mt-2 tall:text-3xl"
              : "mt-2 text-2xl sm:text-3xl"
          )}
        >
          {milestone.title}
        </h3>
        <p
          data-reveal
          className={cn(
            "leading-relaxed text-muted-foreground",
            compact ? "mt-2 text-sm tall:mt-4 tall:text-base" : "mt-4"
          )}
        >
          {milestone.body}
        </p>
        {milestone.callout && (
          <p
            data-reveal
            className={cn(
              "inline-block rounded-xl bg-primary/10 font-medium text-primary",
              compact
                ? "mt-3 px-3 py-2 text-xs tall:mt-5 tall:px-4 tall:py-3 tall:text-sm"
                : "mt-5 px-4 py-3 text-sm"
            )}
          >
            {milestone.callout}
          </p>
        )}
      </div>

      {/* Photo. Standalone it is a 1:1 square driven by the column width. Pinned
          it fills the whole grid cell instead — a height-driven square wastes
          most of the column on a short viewport, which is where this section is
          tightest. */}
      <div className={compact ? "h-full min-h-0" : undefined}>
        <div
          data-reveal-image
          className={cn(
            "relative overflow-hidden rounded-2xl",
            compact ? "h-full w-full" : "aspect-square w-full"
          )}
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
    </div>
  );
}
