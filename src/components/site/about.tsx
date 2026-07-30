"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { gaAttrs } from "@/lib/analytics";

type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
};

const stats: Stat[] = [
  { value: 130, suffix: "k+", label: "Orders fulfilled" },
  { value: 99.8, suffix: "%", decimals: 1, label: "Order accuracy" },
  { value: 500, suffix: "+", label: "Brands onboarded" },
  { value: 150, suffix: "+", label: "Carrier integrations" },
];

function Counter({
  value,
  suffix = "",
  decimals = 0,
  start,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const duration = 1600;
    let frame = 0;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <span>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-choose-us" className="container-px py-20 lg:py-28">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-secondary/50 px-6 py-14 sm:px-12 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for Modern Fulfillment Operations
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Whether you&apos;re managing a single warehouse or a nationwide
              fulfillment network, our platform helps you streamline operations,
              reduce manual work, and scale confidently.
            </p>
            <p className="mt-6 text-muted-foreground">
              Join fulfillment providers who trust our platform to power their
              daily operations.
            </p>
            <a
              href="#contact"
              {...gaAttrs("cta_click", {
                cta_location: "about",
                cta_text: "Get Started",
                cta_destination: "#contact",
                cta_type: "primary",
              })}
              className="group mt-8 inline-flex items-center rounded-full uppercase px-5 py-3 text-sm font-medium transition-colors border-primary border bg-primary text-white xl:px-8"
            >
              <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
              </span>
              Get Started
              <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </span>
            </a>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="text-3xl font-bold text-primary sm:text-4xl">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    start={inView}
                  />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
