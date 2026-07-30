"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Target,
  PiggyBank,
  Gauge,
  Eye,
  Layers,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { gaAttrs } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Benefit = {
  icon: LucideIcon;
  title: string;
};

const benefits: Benefit[] = [
  { icon: Target, title: "Increase fulfillment accuracy" },
  { icon: PiggyBank, title: "Reduce operational costs" },
  { icon: Gauge, title: "Improve warehouse productivity" },
  { icon: Eye, title: "Deliver real-time visibility to clients" },
  { icon: Layers, title: "Scale without adding complexity" },
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const intro = gsap.utils.toArray<HTMLElement>(".why-intro");
      const cards = gsap.utils.toArray<HTMLElement>(".why-card");

      gsap.from(intro, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(cards, {
        y: 32,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".why-list",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="container-px py-20 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Intro */}
        <div>
          <h2 className="why-intro text-3xl font-bold tracking-tight sm:text-4xl">
            Built for Modern Fulfillment Operations
          </h2>
          <p className="why-intro mt-5 text-lg text-muted-foreground">
            Whether you&apos;re managing a single warehouse or a nationwide
            fulfillment network, our platform helps you streamline operations,
            reduce manual work, and scale confidently.
          </p>
          <p className="why-intro mt-6 text-muted-foreground">
            Join fulfillment providers who trust our platform to power their
            daily operations.
          </p>
          <Button
            render={<Link href="#contact" />}
            className="why-intro mt-8 rounded-full"
            {...gaAttrs("cta_click", {
              cta_location: "why_choose_us",
              cta_text: "Get started",
              cta_destination: "#contact",
              cta_type: "primary",
            })}
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Benefit list */}
        <ul className="why-list flex flex-col gap-3">
          {benefits.map((benefit) => (
            <li
              key={benefit.title}
              className="why-card group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm hover:shadow-primary/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <benefit.icon className="h-5 w-5" />
              </span>
              <span className="flex-1 font-semibold">{benefit.title}</span>
              <Check className="h-5 w-5 shrink-0 text-primary" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
