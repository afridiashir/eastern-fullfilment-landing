"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  {
    name: "Maya Chen",
    role: "Founder, Lumi Skincare",
    quote:
      "We switched to Eastern and same-day shipping became the norm. Our delivery complaints dropped to almost zero in the first month.",
  },
  {
    name: "Daniel Brooks",
    role: "Ops Lead, Trailhead Outdoors",
    quote:
      "They absorbed our Black Friday volume without a single delayed order. Scaling through peak season finally stopped being terrifying.",
  },
  {
    name: "Priya Natarajan",
    role: "COO, Verde Home Goods",
    quote:
      "Inventory counts are finally accurate to the unit. The client portal gives us real-time stock visibility we never had with our old 3PL.",
  },
  {
    name: "Marcus Webb",
    role: "Founder, Crate & Co.",
    quote:
      "Order accuracy sits at 99.8%. Fewer reships and refunds meant the per-order cost paid for itself within weeks.",
  },
  {
    name: "Sofia Reyes",
    role: "Ecommerce Manager, Bloom Apparel",
    quote:
      "The Shopify and Amazon integrations just work. Orders flow straight to the warehouse with zero manual exports on our end.",
  },
  {
    name: "James Okafor",
    role: "Director of Ops, NorthPeak Supplements",
    quote:
      "Returns used to be a black hole. Now every return is processed and restocked within a day, with full tracking in the dashboard.",
  },
  {
    name: "Hannah Liu",
    role: "Founder, Petal & Press",
    quote:
      "Branded packaging and custom inserts kept our unboxing experience intact after outsourcing. Our customers can't tell we don't ship it ourselves.",
  },
];

const testimonialsAlt = [
  {
    name: "Olivia Grant",
    role: "Founder, Coastline Candle Co.",
    quote:
      "Switching warehouses is supposed to be painful. They migrated our SKUs over a weekend and we didn't miss a single ship date.",
  },
  {
    name: "Tariq Hassan",
    role: "Head of Ops, Forge Fitness Gear",
    quote:
      "Heavy, bulky equipment used to wreck our shipping margins. Their carrier mix and zone-skipping cut our freight costs by 22%.",
  },
  {
    name: "Nina Petrova",
    role: "Founder, Aurora Jewelry",
    quote:
      "High-value, fragile pieces need careful handling. Their pick teams pack like it's their own product — breakage is basically gone.",
  },
  {
    name: "Greg Sullivan",
    role: "Director, Harbor Coffee Roasters",
    quote:
      "Lot tracking and FEFO on perishables was non-negotiable for us. They handled expiration management right out of the box.",
  },
  {
    name: "Amara Diallo",
    role: "Founder, Wildroot Botanicals",
    quote:
      "Subscription boxes with rotating inserts sounded complex. They built the kitting workflow and every box now ships flawlessly.",
  },
  {
    name: "Ben Foster",
    role: "Ops Manager, Summit Cycle",
    quote:
      "Real-time inventory sync across our three sales channels ended the overselling headaches we used to get every weekend.",
  },
  {
    name: "Lena Park",
    role: "Founder, Hearth & Hue",
    quote:
      "Their team flagged a carrier delay before our customers even noticed. That kind of proactive support is genuinely rare.",
  },
];

const brands = [
  "Lumi Skincare",
  "Trailhead Outdoors",
  "Verde Home Goods",
  "Crate & Co.",
  "Bloom Apparel",
  "NorthPeak Supplements",
  "Petal & Press",
  "Atlas Pet Supply",
  "Saffron Kitchen",
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackReverseRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeReverseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const trackReverse = trackReverseRef.current;
      const pin = pinRef.current;
      if (track && trackReverse && pin) {
        // Pin the section and scrub the two card rows horizontally as the user
        // scrolls vertically — the rows travel in opposite directions.
        const dist = (el: HTMLElement) =>
          Math.max(0, el.scrollWidth - window.innerWidth);
        const getMaxDistance = () => Math.max(dist(track), dist(trackReverse));

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getMaxDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Row 1 drifts left, Row 2 starts shifted left and drifts back right.
        tl.fromTo(track, { x: 0 }, { x: () => -dist(track), ease: "none" }, 0);
        tl.fromTo(
          trackReverse,
          { x: () => -dist(trackReverse) },
          { x: 0, ease: "none" },
          0
        );
      }

      // Full-width brand marquees. Each row is rendered twice, so wrapping at
      // 50% is seamless. The two rows scroll in opposite directions.
      const marquee = marqueeRef.current;
      if (marquee) {
        gsap.fromTo(
          marquee,
          { xPercent: 0 },
          { xPercent: -50, ease: "none", duration: 28, repeat: -1 }
        );
      }

      const marqueeReverse = marqueeReverseRef.current;
      if (marqueeReverse) {
        gsap.fromTo(
          marqueeReverse,
          { xPercent: -50 },
          { xPercent: 0, ease: "none", duration: 28, repeat: -1 }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="overflow-hidden bg-secondary/40 py-20 lg:py-28"
    >
      {/* Pinned horizontal-scroll stage */}
      <div
        ref={pinRef}
        className="flex h-screen flex-col justify-center gap-10 lg:gap-14"
      >
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by the brands we ship for
            </h2>
            <p className="mt-4 text-muted-foreground">
              From first order to peak season — faster shipping, accurate
              inventory, and fulfillment that scales with your growth.
            </p>
          </div>
        </div>

        {/* Horizontal card tracks — two rows, opposite directions */}
        <div className="flex flex-col gap-6">
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-6 px-5 sm:px-8"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={`row1-${t.name}`} {...t} />
            ))}
          </div>
          <div
            ref={trackReverseRef}
            className="flex w-max items-stretch gap-6 px-5 sm:px-8"
          >
            {testimonialsAlt.map((t) => (
              <TestimonialCard key={`row2-${t.name}`} {...t} />
            ))}
          </div>
        </div>
      </div>

      {/* Full-width brand marquee — two rotated bands, opposite directions */}
      <div className="relative mt-20 overflow-hidden py-6">
        {/* Band 1 → rotated left, scrolls left */}
        <div className="-ml-[5%] w-[110%] -rotate-2 border-y border-border/60 bg-card/60 py-5">
          <div ref={marqueeRef} className="flex w-max shrink-0">
            {[...brands, ...brands].map((brand, i) => (
              <span
                key={`row1-${brand}-${i}`}
                className="flex items-center whitespace-nowrap px-10 text-2xl font-semibold tracking-tight text-muted-foreground/70 sm:text-3xl"
              >
                {brand}
                <span className="ml-10 h-1.5 w-1.5 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        </div>

        {/* Band 2 → rotated right, scrolls right, primary fill */}
        <div className="relative z-10 -ml-[5%] mt-8 w-[110%] rotate-2 bg-primary py-5 text-primary-foreground shadow-lg shadow-primary/20">
          <div ref={marqueeReverseRef} className="flex w-max shrink-0">
            {[...[...brands].reverse(), ...[...brands].reverse()].map(
              (brand, i) => (
                <span
                  key={`row2-${brand}-${i}`}
                  className="flex items-center whitespace-nowrap px-10 text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {brand}
                  <span className="ml-10 h-1.5 w-1.5 rounded-full bg-primary-foreground/50" />
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  quote,
}: {
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <figure className="flex w-[300px] flex-col rounded-2xl border border-border bg-card p-7 sm:w-[360px]">
      <div className="flex gap-0.5 text-primary">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
        “{quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {name.charAt(0)}
        </span>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
