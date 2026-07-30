"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight, Play, Quote, X } from "lucide-react";
import { gaAttrs, trackEvent } from "@/lib/analytics";
import { useVideoAnalytics } from "@/components/site/use-video-analytics";

type CaseStudy = {
  brand: string;
  heading: string;
  body: string[];
  stats: { value: string; label: string }[];
  quote: string;
  name: string;
  role: string;
  thumbnail: string;
  // Placeholder — swap for the real client testimonial clip per brand.
  videoSrc: string;
};

const caseStudies: CaseStudy[] = [
  {
    brand: "Collars & Co",
    heading:
      "How Collars & Co scaled to 9-figure sales without breaking fulfillment",
    body: [
      "Collars & Co went from a fast-growing DTC menswear brand to a 9-figure business in under three years. As order volume multiplied — especially during peak launches — Eastern kept pace with multi-warehouse coverage, real-time inventory sync, and surge capacity that scaled up without adding lead time.",
      "No stockouts, no shipping delays, no fulfillment bottleneck slowing down marketing — just consistent, on-time delivery at every stage of their growth.",
    ],
    stats: [
      { value: "9-figure", label: "Annual revenue milestone" },
      { value: "6x", label: "Order volume growth" },
      { value: "99.9%", label: "On-time shipment rate" },
      { value: "0", label: "Stockouts during peak season" },
    ],
    quote:
      "Eastern didn’t just keep up with our growth — they made it possible.",
    name: "Ryan Bennett",
    role: "Co-Founder, Collars & Co",
    thumbnail:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
  {
    brand: "Aurelia Skincare",
    heading:
      "How Aurelia Skincare absorbed a 40x order spike without missing a ship date",
    body: [
      "When a single video sent Aurelia Skincare viral overnight, daily orders jumped 40x in under a week. Eastern’s on-demand warehouse capacity and cross-dock network meant fulfillment never paused — inventory synced live and every order still shipped same day.",
      "What could have been a customer-experience disaster became their biggest month ever.",
    ],
    stats: [
      { value: "40x", label: "Order spike absorbed" },
      { value: "98%", label: "Same-day ship rate in the surge" },
      { value: "3", label: "Warehouses added in 60 days" },
      { value: "4.8/5", label: "Post-purchase rating" },
    ],
    quote:
      "The spike could have sunk us. Instead it became our biggest month ever.",
    name: "Sofia Marsh",
    role: "Founder, Aurelia Skincare",
    thumbnail:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
  {
    brand: "Trail & Summit Outdoor Co.",
    heading:
      "How Trail & Summit hit every Black Friday cutoff — three years running",
    body: [
      "Bulky outdoor gear and holiday peak volume used to mean missed cutoffs and rising freight costs. Eastern’s carrier mix, zone-skipping, and dedicated peak-season staffing let Trail & Summit ship every BFCM order on time while cutting freight spend.",
    ],
    stats: [
      { value: "0", label: "Missed Black Friday cutoffs" },
      { value: "35%", label: "Reduction in freight cost" },
      { value: "2-day", label: "Nationwide delivery coverage" },
      { value: "3 yrs", label: "Running without a peak delay" },
    ],
    quote:
      "Every other 3PL told us peak season was just going to be rough. Eastern made it a non-event.",
    name: "Derek Holloway",
    role: "VP Operations, Trail & Summit Outdoor Co.",
    thumbnail:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
  {
    brand: "Home & Hearth Living",
    heading: "How Home & Hearth Living turned returns into repeat customers",
    body: [
      "Returns were a black hole before Eastern — slow refunds, no visibility, unhappy customers. With automated reverse logistics and same-day return processing, Home & Hearth turned a pain point into a retention driver.",
    ],
    stats: [
      { value: "92%", label: "Returns processed within 24h" },
      { value: "4.9/5", label: "Post-purchase satisfaction" },
      { value: "18%", label: "Increase in repeat purchases" },
      { value: "100%", label: "Return visibility for the team" },
    ],
    quote:
      "Customers now expect fast returns as much as fast shipping. Eastern lets us deliver both.",
    name: "Priya Chandran",
    role: "COO, Home & Hearth Living",
    thumbnail:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
];

export function CaseStudySpotlight() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openVideo, setOpenVideo] = useState<CaseStudy | null>(null);
  // Last index reported to analytics, so the initial sync isn't counted.
  const reportedIndexRef = useRef(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    if (index !== reportedIndexRef.current) {
      reportedIndexRef.current = index;
      trackEvent("carousel_slide_view", {
        carousel_name: "case_studies",
        slide_index: index + 1,
        case_study: caseStudies[index]?.brand,
      });
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!openVideo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenVideo(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openVideo]);

  return (
    <section
      id="case-study"
      data-ga-view="case_studies"
      className="container-px py-20 lg:py-28"
    >
      <div className="mx-auto mb-12 flex flex-col items-center gap-4 text-center lg:mb-16">
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          Case Studies
        </span>
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          Real brands, real fulfillment results
        </h2>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {caseStudies.map((study) => (
            <div key={study.brand} className="min-w-0 flex-[0_0_100%] px-1">
              <div className="overflow-hidden rounded-[2rem] border border-border bg-secondary/50 px-6 py-14 sm:px-12 lg:px-16">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  {/* Story + stats */}
                  <div>
                    <span className="text-sm font-semibold text-primary">
                      {study.brand}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                      {study.heading}
                    </h3>
                    {study.body.map((paragraph, i) => (
                      <p
                        key={i}
                        className="mt-4 text-muted-foreground first:mt-5"
                      >
                        {paragraph}
                      </p>
                    ))}

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {study.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl border border-border bg-card p-6 text-center"
                        >
                          <div className="text-3xl font-bold text-primary sm:text-4xl">
                            {stat.value}
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/resources/case-studies"
                      {...gaAttrs("cta_click", {
                        cta_location: "case_study_spotlight",
                        cta_text: "Read more customer stories",
                        cta_destination: "/resources/case-studies",
                        cta_type: "inline",
                        case_study: study.brand,
                      })}
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      Read more customer stories
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Video testimonial */}
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent("video_open", {
                          video_title: `${study.brand} testimonial`,
                          video_provider: "self_hosted",
                          cta_location: "case_study_spotlight",
                          case_study: study.brand,
                        });
                        setOpenVideo(study);
                      }}
                      aria-label={`Play client testimonial from ${study.brand}`}
                      className="group relative block lg:aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border shadow-xl shadow-primary/5 sm:aspect-video"
                    >
                      <Image
                        src={study.thumbnail}
                        alt={`${study.brand} testimonial thumbnail`}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform group-hover:scale-105">
                          <Play className="h-6 w-6 fill-current" />
                        </span>
                      </div>

                      <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-background/85 p-4 text-left backdrop-blur">
                        <Quote className="h-4 w-4 text-primary" />
                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                          &ldquo;{study.quote}&rdquo;
                        </p>
                        <p className="mt-2 text-xs font-semibold">
                          {study.name}
                          <span className="ml-1 font-normal text-muted-foreground">
                            — {study.role}
                          </span>
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous case study"
          onClick={() => {
            trackEvent("carousel_navigate", {
              carousel_name: "case_studies",
              direction: "previous",
            });
            emblaApi?.scrollPrev();
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          {caseStudies.map((study, i) => (
            <button
              key={study.brand}
              type="button"
              aria-label={`Go to ${study.brand} case study`}
              onClick={() => {
                trackEvent("carousel_navigate", {
                  carousel_name: "case_studies",
                  direction: "dot",
                  slide_index: i + 1,
                  case_study: study.brand,
                });
                emblaApi?.scrollTo(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-border hover:bg-primary/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next case study"
          onClick={() => {
            trackEvent("carousel_navigate", {
              carousel_name: "case_studies",
              direction: "next",
            });
            emblaApi?.scrollNext();
          }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-secondary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Lightbox */}
      {openVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Client testimonial video"
          onClick={() => setOpenVideo(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <button
            type="button"
            aria-label="Close testimonial"
            onClick={() => setOpenVideo(null)}
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <LightboxVideo
              key={openVideo.brand}
              src={openVideo.videoSrc}
              title={`${openVideo.brand} testimonial`}
            />
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Split out so the analytics hook's progress state is keyed to one video —
 * remounting on a different case study restarts the start/progress tracking.
 */
function LightboxVideo({ src, title }: { src: string; title: string }) {
  const videoAnalytics = useVideoAnalytics(title);

  return (
    <video
      className="aspect-video h-full w-full"
      src={src}
      controls
      autoPlay
      playsInline
      {...videoAnalytics}
    />
  );
}
