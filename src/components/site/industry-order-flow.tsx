"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShoppingBag,
  MapPin,
  Route,
  Package,
  Truck,
  CheckCircle2,
  ClipboardList,
  Store,
  type LucideIcon,
} from "lucide-react";
import type { IndustryFlowStage } from "@/lib/industries";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Icon keys referenced by `orderFlow.stages[].icon` in the industry data.
const icons: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  "map-pin": MapPin,
  route: Route,
  package: Package,
  truck: Truck,
  "check-circle": CheckCircle2,
  "clipboard-list": ClipboardList,
  store: Store,
};

export function IndustryOrderFlow({ stages }: { stages: IndustryFlowStage[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fill = ".order-flow-fill";
      const actives = gsap.utils.toArray<HTMLElement>(".order-flow-active");
      const nodes = gsap.utils.toArray<HTMLElement>(".order-flow-node");

      // Reduced motion: show the completed flow with no scroll animation.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(fill, { scaleY: 1 });
        gsap.set(actives, { autoAlpha: 1, scale: 1 });
        gsap.set(nodes, { opacity: 1 });
        return;
      }

      gsap.set(fill, { scaleY: 0 });
      gsap.set(actives, { autoAlpha: 0, scale: 0.6 });
      gsap.set(nodes, { opacity: 0.45 });

      const last = stages.length - 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      });

      // The connector fills top-to-bottom across the whole timeline…
      tl.to(fill, { scaleY: 1, ease: "none", duration: last }, 0);

      // …and each stage lights up as the fill reaches it.
      nodes.forEach((node, i) => {
        const active = node.querySelector(".order-flow-active");
        tl.to(node, { opacity: 1, duration: 0.25 }, i);
        tl.to(active, { autoAlpha: 1, scale: 1, duration: 0.3 }, i);
      });
    },
    { scope: sectionRef }
  );

  return (
    <div ref={sectionRef} className="mx-auto mt-12 max-w-2xl">
      <div className="relative">
        {/* Connector track + scroll-driven fill */}
        <div className="pointer-events-none absolute bottom-6 left-[21px] top-6 w-0.5 bg-border" />
        <div className="order-flow-fill pointer-events-none absolute bottom-6 left-[21px] top-6 w-0.5 origin-top bg-primary" />

        <ul className="space-y-8">
          {stages.map((stage) => {
            const Icon = icons[stage.icon] ?? Package;
            return (
              <li
                key={stage.title}
                className="order-flow-node relative flex items-start gap-5"
              >
                {/* Node marker — inactive base with an active overlay that fades in */}
                <div className="relative h-11 w-11 shrink-0">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="order-flow-active absolute inset-0 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm shadow-primary/30">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="pt-1">
                  <h4 className="font-semibold leading-tight">{stage.title}</h4>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
