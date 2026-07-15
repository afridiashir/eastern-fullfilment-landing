"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Bars for the inventory throughput chart. Classes preserve the responsive
// bar-count + highlight behavior across lg / xl breakpoints.
const bars: { h: number; cls: string }[] = [
  { h: 18, cls: "bento-bar-dim" },
  { h: 38, cls: "bento-bar-dim" },
  { h: 24, cls: "bento-bar-dim" },
  { h: 52, cls: "bento-bar-dim" },
  { h: 35, cls: "bento-bar-dim" },
  { h: 60, cls: "bento-bar-dim" },
  { h: 45, cls: "bento-bar-dim" },
  { h: 68, cls: "bento-bar-dim" },
  { h: 72, cls: "bento-bar-lg-only" },
  { h: 85, cls: "bento-bar-lg-only" },
  { h: 62, cls: "lg:hidden xl:block bento-bar-dim" },
  { h: 82, cls: "lg:hidden xl:block bento-bar-dim" },
  { h: 68, cls: "lg:hidden xl:block bento-bar-dim" },
  { h: 78, cls: "lg:hidden xl:block bento-bar-dim" },
  { h: 88, cls: "lg:hidden xl:block bento-bar-xl-only" },
  { h: 95, cls: "lg:hidden xl:block bento-bar-xl-only" },
  { h: 70, cls: "lg:hidden bento-bar-dim" },
  { h: 55, cls: "lg:hidden bento-bar-dim" },
  { h: 80, cls: "lg:hidden bento-bar-dim" },
  { h: 62, cls: "lg:hidden bento-bar-dim" },
  { h: 85, cls: "lg:hidden bento-bar-dim" },
  { h: 72, cls: "lg:hidden bento-bar-dim" },
  { h: 78, cls: "lg:hidden bento-bar-dim" },
  { h: 88, cls: "lg:hidden bento-bar-dim" },
  { h: 82, cls: "lg:hidden bento-bar-bright" },
  { h: 96, cls: "lg:hidden bento-bar-bright" },
];

const dispatchWaves = [
  { name: "Wave A — UPS Ground", meta: "240 parcels", stat: "Dispatched", tone: "text-accent-green" },
  { name: "Wave B — FedEx 2Day", meta: "180 parcels", stat: "Picking", tone: "text-accent-blue" },
  { name: "Wave C — DHL Express", meta: "95 parcels", stat: "Cut-off 4:00", tone: "text-accent-yellow" },
  { name: "Wave D — USPS", meta: "310 parcels", stat: "Queued", tone: "text-accent-green" },
];

const pipeline = [
  { initials: "SM", name: "Sarah M.", time: "2m ago", status: "Out for delivery", tone: "text-accent-blue border-accent-blue" },
  { initials: "JR", name: "James R.", time: "15m ago", status: "Delivered", tone: "text-accent-green border-accent-green" },
  { initials: "LK", name: "Lisa K.", time: "1h ago", status: "Packing", tone: "text-accent-yellow border-accent-yellow" },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Staggered reveal for each bento cell.
  const reveal = () =>
    cn(
      "transition-all duration-700 ease-out",
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    );
  const revealDelay = (i: number) => ({ transitionDelay: inView ? `${i * 110}ms` : "0ms" });

  return (
    <section id="services" className="container-px pt-16 lg:pt-24 pb-4 lg:pb-5">
      <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything You Need to Scale Fulfillment
        </h2>
        <p className="mt-4 text-muted-foreground">
          From the moment an order lands to the instant it&apos;s delivered — automated,
          tracked, and in sync across every channel.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[520px_520px] gap-3 lg:gap-4"
        >
          {/* Automate Order Fulfillment */}
          <div className={cn("lg:col-span-8 group", reveal())} style={revealDelay(0)}>
            <div className="border border-border-light relative h-full rounded-[12px] overflow-hidden min-h-[300px] sm:min-h-[360px] lg:min-h-0 transition-transform duration-300 ease-out group-hover:-translate-y-1 flex flex-col sm:block">
              <div className="relative z-10 flex flex-col gap-4 p-6 lg:p-8 sm:max-w-[55%] md:max-w-[48%] lg:max-w-[50%] sm:h-full overflow-visible">
                <div className="self-start">
                  <div className="relative">
                    <div
                      className="inline-flex px-3 py-1 sm:px-4 sm:py-1.5 rounded-[12px] sm:rounded-[16px] rounded-bl-[4px] sm:rounded-bl-[6px] whitespace-nowrap"
                      style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    >
                      <span
                        className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium"
                        style={{ color: "#3b82f6" }}
                      >
                        &ldquo;I want to ship orders faster&rdquo;
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary leading-[1.1] tracking-tight">
                  Automate Your
                  <br />
                  Order Fulfillment
                </h3>
                <div className="flex-1 hidden sm:block" />
                <a
                  className="self-start inline-flex items-center justify-center px-5 py-2.5 sm:px-7 sm:py-3.5 text-[13px] sm:text-[15px] font-semibold rounded-full text-text-primary bg-white border border-border-subtle dark:bg-background dark:hover:bg-foreground/10 hover:bg-black/5 transition-colors duration-200"
                  href="#contact"
                >
                  Book a demo
                </a>
              </div>
              <div className="relative sm:absolute sm:right-4 md:right-6 lg:right-8 sm:bottom-0 w-full sm:w-[58%] md:w-[55%] lg:w-[50%] sm:max-w-[380px] sm:origin-bottom-right sm:scale-[0.72] md:scale-[0.78] lg:scale-[0.85] xl:scale-100 px-4 sm:px-0 mt-4 sm:mt-0">
                <div className="rounded-t-[16px] overflow-hidden shadow-2xl bg-black/70 px-5 pt-5">
                  <div className="rounded-t-[16px] overflow-hidden shadow-2xl bg-white/15 px-5 pt-5">
                    <div className="pb-3">
                      <p className="text-[13px] font-medium text-[#FAFAFA]">Order Pipeline</p>
                    </div>
                    <div className="pb-3">
                      <p className="text-[13px] font-semibold text-white/80 mb-2.5">Ready to ship</p>
                      <div
                        className="rounded-[16px] px-4 py-3.5 space-y-2 border border-white/15"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[13px] font-semibold text-[#FAFAFA]">
                            #10482 · Wireless Earbuds ×2
                          </p>
                        </div>
                        <p className="text-[11px] text-[#FAFAFA] leading-relaxed">
                          Picked &amp; packed, UPS label printed. Dispatching on the next wave...
                        </p>
                      </div>
                    </div>
                    <div className="pb-5">
                      <p className="text-[13px] font-medium text-[#FAFAFA] mb-2.5">Queued</p>
                      <div
                        className="rounded-[16px] px-4 py-3.5 space-y-2 border border-white/15"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[13px] font-semibold text-[#FAFAFA]">
                              #10481 · Phone Case — Black
                            </p>
                            <p className="text-[11px] text-[#FAFAFA] mt-0.5">Scheduled for 9:00 AM dispatch</p>
                          </div>
                          <span className="text-[11px] font-medium text-white/80">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Every Shipment */}
          <div className={cn("lg:col-span-4", reveal())} style={revealDelay(1)}>
            <div
              className="relative h-full rounded-[12px] overflow-hidden isolate min-h-[380px] lg:min-h-0 flex flex-col transition-transform duration-300 ease-out hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(160deg, rgb(192, 132, 252) 0%, rgb(232, 121, 168) 20%, rgb(249, 115, 22) 40%, rgb(232, 121, 168) 55%, rgb(167, 139, 250) 70%, rgb(59, 130, 246) 100%)",
              }}
            >
              <div className="relative z-10 p-6 lg:p-8">
                <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-[1.1] tracking-tight">
                  Track Every
                  <br />
                  Shipment
                </h3>
              </div>
              <div className="relative z-10 mx-6 lg:mx-8 mb-6 lg:mb-8 flex-1 flex flex-col justify-end">
                <div className="bg-black/70 rounded-[16px] overflow-hidden px-4 py-4 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <div
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-white/15 mt-0.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <TruckGlyph />
                    </div>
                    <div
                      className="rounded-[16px] border border-white/15 px-3.5 py-2.5 max-w-[85%]"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[11px] font-semibold text-[#FAFAFA] mb-1">Track &amp; Trace</p>
                      <span className="text-[12px] lg:text-[13px] text-white/80 leading-relaxed block">
                        Parcel #1Z99 is out for delivery — ETA 2:40 PM today.
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div
                      className="rounded-[16px] border border-white/15 px-3.5 py-2.5 max-w-[85%]"
                      style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                    >
                      <p className="text-[12px] lg:text-[13px] text-white/80 leading-relaxed">
                        Any exceptions on today&rsquo;s routes?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-white/15 mt-0.5"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <TruckGlyph />
                    </div>
                    <div
                      className="rounded-[16px] border border-white/15 px-3.5 py-2.5 max-w-[85%]"
                      style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                    >
                      <p className="text-[11px] font-semibold text-[#FAFAFA] mb-1">Track &amp; Trace</p>
                      <span className="text-[12px] lg:text-[13px] text-white/80 leading-relaxed block">
                        All clear — 142 of 142 parcels on time, 0 delays flagged.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Inventory */}
          <div className={cn("lg:col-span-4 group", reveal())} style={revealDelay(2)}>
            <div className="h-full min-h-[440px] lg:min-h-0 rounded-[12px] p-6 lg:p-8 flex flex-col gap-5 bg-secondary transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <div className="relative">
                <div
                  className="inline-flex px-3 py-1 sm:px-4 sm:py-1.5 rounded-[12px] sm:rounded-[16px] rounded-bl-[4px] sm:rounded-bl-[6px] whitespace-nowrap"
                  style={{ backgroundColor: "#3b82f6" }}
                >
                  <span
                    className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium"
                    style={{ color: "#ffffff" }}
                  >
                    &ldquo;I want accurate stock counts&rdquo;
                  </span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary leading-[1.1] tracking-tight">
                Real-Time Inventory
              </h3>
              <div className="flex-1 bg-black/70 rounded-[16px] overflow-hidden flex flex-col">
                <div className="p-4 flex flex-col flex-1 gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-[#FAFAFA]">Orders Fulfilled</p>
                    <span className="text-[10px] font-medium border border-accent-green text-accent-green px-2 py-0.5 rounded-full">
                      +8.2%
                    </span>
                  </div>
                  <div>
                    <p className="text-[22px] font-bold text-[#FAFAFA] tracking-tight">8,412</p>
                    <p className="text-[10px] text-white/80 mt-0.5">SKUs in stock across warehouses</p>
                  </div>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
            .bento-bar-dim { background-color: rgba(96,165,250,0.35); }
            .bento-bar-bright { background-color: rgba(96,165,250,0.8); }
            .bento-bar-lg-only { background-color: rgba(96,165,250,0.35); }
            .bento-bar-xl-only { background-color: rgba(96,165,250,0.35); }
            @media (min-width: 1024px) {
              .bento-bar-lg-only { background-color: rgba(96,165,250,0.8); }
            }
            @media (min-width: 1280px) {
              .bento-bar-lg-only { background-color: rgba(96,165,250,0.35); }
              .bento-bar-xl-only { background-color: rgba(96,165,250,0.8); }
            }
          `,
                    }}
                  />
                  <div className="flex items-end gap-1 sm:gap-1.5 flex-1 pt-2">
                    {bars.map((bar, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex-1 rounded-full transition-[height] duration-700 ease-out",
                          bar.cls
                        )}
                        style={{
                          height: inView ? `${bar.h}%` : "0%",
                          transitionDelay: inView ? `${i * 25}ms` : "0ms",
                        }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="text-center">
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">126</p>
                      <p className="text-[9px] text-white/80">Open Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">43</p>
                      <p className="text-[9px] text-white/80">In Transit</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[12px] font-semibold text-[#FAFAFA]">99.6%</p>
                      <p className="text-[9px] text-white/80">Accuracy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Smarter Dispatch */}
          <div className={cn("lg:col-span-4 group", reveal())} style={revealDelay(3)}>
            <div
              className="relative h-full rounded-[12px] overflow-hidden isolate flex flex-col min-h-[340px] lg:min-h-0 transition-transform duration-300 ease-out group-hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(160deg, #a78bfa 0%, #818cf8 25%, #f87171 50%, #fb923c 70%, #fbbf24 100%)",
              }}
            >
              <div className="relative lg:absolute lg:top-0 lg:left-0 z-20 p-6 lg:p-8 pb-0">
                <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-[1.1] tracking-tight">
                  Plan Smarter
                  <br />
                  Dispatch
                </h3>
              </div>
              <div className="relative z-10 lg:flex-1 lg:flex lg:items-center mx-6 lg:mx-8 mt-4 lg:mt-0 mb-6 lg:mb-0">
                <div className="w-full bg-black/70 rounded-[16px] overflow-hidden p-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    {dispatchWaves.map((w) => (
                      <div
                        key={w.name}
                        className="rounded-[12px] px-3.5 py-3 border border-white/15"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <p className="text-[12px] font-semibold text-[#FAFAFA]">{w.name}</p>
                        <p className="text-[10px] text-white/80 mt-0.5">{w.meta}</p>
                        <p className={cn("text-[11px] font-semibold mt-2", w.tone)}>{w.stat}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deliver On Time */}
          <div className={cn("lg:col-span-4 group", reveal())} style={revealDelay(4)}>
            <div className="h-full min-h-[380px] lg:min-h-0 rounded-[12px] p-6 lg:p-8 flex flex-col gap-5 border border-border-light transition-transform duration-300 ease-out group-hover:-translate-y-1">
              <div className="relative">
                <div
                  className="inline-flex px-3 py-1 sm:px-4 sm:py-1.5 rounded-[12px] sm:rounded-[16px] rounded-bl-[4px] sm:rounded-bl-[6px] whitespace-nowrap"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <span
                    className="text-[12px] sm:text-[13px] lg:text-[14px] font-medium"
                    style={{ color: "#3b82f6" }}
                  >
                    &ldquo;I want to hit every carrier cut-off&rdquo;
                  </span>
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-semibold text-text-primary leading-[1.1] tracking-tight">
                Deliver On <br /> Time
              </h3>
              <div className="flex-1 bg-black/70 rounded-[16px] overflow-hidden">
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-[#FAFAFA]">Delivery Pipeline</p>
                    <span className="text-[10px] font-medium text-accent-blue">12 shipped today</span>
                  </div>
                  <div className="space-y-2">
                    {pipeline.map((p) => (
                      <div
                        key={p.initials}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 border border-white/15"
                        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-[#FAFAFA]"
                            style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                          >
                            {p.initials}
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-[#FAFAFA]">{p.name}</p>
                            <p className="text-[9px] text-white/80">{p.time}</p>
                          </div>
                        </div>
                        <span
                          className={cn(
                            "text-[9px] font-semibold border px-2 py-1 rounded-full",
                            p.tone
                          )}
                        >
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-[10px] text-white/80">On-time rate</p>
                    <p className="text-[13px] font-bold text-accent-green">98.6%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TruckGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}
