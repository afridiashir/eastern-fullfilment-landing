"use client";

import { useState } from "react";
import {
  Check,
  GripVertical,
  MessageSquare,
  Mail,
  Star,
  CalendarCheck,
  Truck,
  Package,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import type { ProductSolution, SolutionBlock } from "@/lib/products";

/* ---------- Built-in mock visuals (no images required) ---------- */

function PreviewHeader({ title, badge }: { title: string; badge: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h5 className="text-sm font-semibold">{title}</h5>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        {badge}
      </span>
    </div>
  );
}

// "Orchestrate your fulfillment life cycle" — a pipeline of stages.
function LifecycleVisual() {
  const stages = [
    { name: "Order received", state: "done" },
    { name: "Picked", state: "done" },
    { name: "Packed", state: "done" },
    { name: "Shipped", state: "active" },
    { name: "Delivered", state: "todo" },
  ];
  return (
    <div>
      <PreviewHeader title="Fulfillment life cycle" badge="Automated" />
      <div className="space-y-1">
        {stages.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full border text-[10px]",
                  s.state === "done"
                    ? "border-primary bg-primary text-white"
                    : s.state === "active"
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                )}
              >
                {s.state === "done" ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              {i < stages.length - 1 && (
                <span
                  className={cn(
                    "h-5 w-px",
                    s.state === "done" ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                s.state === "todo" ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {s.name}
            </span>
            {s.state === "active" && (
              <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                In progress
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2.5">
        <span className="text-xs text-muted-foreground">
          Auto-retry failed deliveries
        </span>
        <span className="relative h-5 w-9 rounded-full bg-primary">
          <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
        </span>
      </div>
    </div>
  );
}

// "Greater efficiencies by tracking orders" — drag-and-drop list + activity log.
function ActivityVisual() {
  const rows = [
    { id: "#10482", time: "09:24" },
    { id: "#10485", time: "09:31" },
    { id: "#10487", time: "09:38" },
  ];
  const log = [
    "Order #10482 re-sequenced to route B",
    "Order #10485 packed",
    "Order #10487 created",
  ];
  return (
    <div>
      <PreviewHeader title="Dispatch board" badge="Drag & drop" />
      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-sm font-medium">{r.id}</span>
            <span className="ml-auto text-xs text-muted-foreground">
              {r.time}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Activity log
        </div>
        <div className="space-y-2 border-l border-border pl-3">
          {log.map((l) => (
            <div key={l} className="relative text-xs text-muted-foreground">
              <span className="absolute -left-[15px] top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// "Consistently delightful delivery experiences" — multi-channel updates.
function UpdatesVisual() {
  return (
    <div>
      <PreviewHeader title="Customer updates" badge="Real-time" />
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <MessageSquare className="h-4 w-4" />
          </span>
          <div>
            <div className="text-xs font-medium">SMS · Out for delivery</div>
            <div className="text-[11px] text-muted-foreground">
              Your order arrives today between 2–4 PM.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Mail className="h-4 w-4" />
          </span>
          <div>
            <div className="text-xs font-medium">Email · Delivered</div>
            <div className="text-[11px] text-muted-foreground">
              How was your delivery experience?
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2.5">
        <span className="text-xs text-muted-foreground">Customer rating</span>
        <span className="flex gap-0.5 text-primary">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
      </div>
    </div>
  );
}

// "Show real delivery dates at checkout" — slot picker.
function CheckoutDatesVisual() {
  const dates = [
    { day: "Tue", date: "12", sel: false },
    { day: "Wed", date: "13", sel: true },
    { day: "Thu", date: "14", sel: false },
  ];
  return (
    <div>
      <PreviewHeader title="Choose a delivery date" badge="At checkout" />
      <div className="grid grid-cols-3 gap-3">
        {dates.map((d) => (
          <div
            key={d.date}
            className={cn(
              "flex flex-col items-center rounded-xl border p-4",
              d.sel
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-foreground"
            )}
          >
            <span className="text-xs text-muted-foreground">{d.day}</span>
            <span className="mt-1 text-xl font-bold">{d.date}</span>
            {d.sel && <CalendarCheck className="mt-2 h-4 w-4" />}
          </div>
        ))}
      </div>
      <button className="mt-4 w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-white">
        Confirm Wed, 13th
      </button>
    </div>
  );
}

// "Balance speed against cost" — selectable shipping options.
function SpeedCostVisual() {
  const options = [
    { name: "Express", eta: "Tomorrow", price: "$14.99", sel: false },
    { name: "Standard", eta: "2–3 days", price: "$6.99", sel: true },
    { name: "Economy", eta: "5–7 days", price: "Free", sel: false },
  ];
  return (
    <div>
      <PreviewHeader title="Shipping options" badge="Customer choice" />
      <div className="space-y-2.5">
        {options.map((o) => (
          <div
            key={o.name}
            className={cn(
              "flex items-center gap-3 rounded-xl border p-3",
              o.sel ? "border-primary bg-primary/5" : "border-border bg-card"
            )}
          >
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-full border",
                o.sel ? "border-primary bg-primary text-white" : "border-border"
              )}
            >
              {o.sel && <Check className="h-3 w-3" />}
            </span>
            <div className="flex-1">
              <div className="text-sm font-medium">{o.name}</div>
              <div className="text-[11px] text-muted-foreground">{o.eta}</div>
            </div>
            <span className="text-sm font-semibold">{o.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// "Keep every promise you make" — order-to-doorstep tracking.
function PromiseVisual() {
  const steps = [
    { name: "Order placed", icon: Check, state: "done" },
    { name: "Packed", icon: Package, state: "done" },
    { name: "Shipped", icon: Truck, state: "done" },
    { name: "Out for delivery", icon: MapPin, state: "active" },
    { name: "Delivered", icon: Check, state: "todo" },
  ];
  return (
    <div>
      <PreviewHeader title="Delivery tracking" badge="On time" />
      <div className="space-y-1">
        {steps.map((s, i) => (
          <div key={s.name} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full",
                  s.state === "done"
                    ? "bg-primary text-white"
                    : s.state === "active"
                      ? "bg-primary/15 text-primary ring-2 ring-primary"
                      : "bg-muted text-muted-foreground"
                )}
              >
                <s.icon className="h-3.5 w-3.5" />
              </span>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "h-4 w-px",
                    s.state === "done" ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-sm",
                s.state === "todo" ? "text-muted-foreground" : "text-foreground"
              )}
            >
              {s.name}
            </span>
            {s.state === "active" && (
              <span className="ml-auto text-[11px] text-muted-foreground">
                ETA 2:40 PM
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// "Eliminate routing errors with intelligent geocoding" — address → coordinates.
function GeocodeVisual() {
  const rows = [
    { raw: "12 Baker St, apt", coords: "40.7129, -74.0061", ok: true },
    { raw: "5th Ave & 42 — NYC", coords: "40.7546, -73.9840", ok: true },
    { raw: "Unit 9, no zip code", coords: "Needs review", ok: false },
  ];
  return (
    <div>
      <PreviewHeader title="Address validation" badge="Geocoded" />
      <div className="space-y-2.5">
        {rows.map((r) => (
          <div
            key={r.raw}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
          >
            <MapPin
              className={cn(
                "h-4 w-4 shrink-0",
                r.ok ? "text-primary" : "text-yellow-500"
              )}
            />
            <span className="truncate text-xs text-muted-foreground">
              {r.raw}
            </span>
            <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span
              className={cn(
                "shrink-0 font-mono text-[11px]",
                r.ok ? "text-foreground" : "text-yellow-600"
              )}
            >
              {r.coords}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2.5">
        <span className="text-xs text-muted-foreground">
          Resolved before dispatch
        </span>
        <span className="text-xs font-semibold text-primary">98.7%</span>
      </div>
    </div>
  );
}

// "Accelerate hub operations with faster parcel sorting" — sort lanes by route.
function SortingVisual() {
  const lanes = [
    { route: "Route A · North", count: 42, pct: 90 },
    { route: "Route B · Central", count: 31, pct: 70 },
    { route: "Route C · South", count: 18, pct: 45 },
  ];
  return (
    <div>
      <PreviewHeader title="Hub sorting" badge="Optimized" />
      <div className="space-y-3">
        {lanes.map((l) => (
          <div key={l.route}>
            <div className="mb-1.5 flex items-center gap-2 text-xs">
              <Package className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{l.route}</span>
              <span className="ml-auto text-muted-foreground">
                {l.count} parcels
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${l.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-3 py-2.5">
        <span className="text-xs text-muted-foreground">Loaded & dispatched</span>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
          <Truck className="h-3.5 w-3.5" />
          On schedule
        </span>
      </div>
    </div>
  );
}

const visuals: Record<string, () => React.ReactNode> = {
  lifecycle: LifecycleVisual,
  activity: ActivityVisual,
  updates: UpdatesVisual,
  "checkout-dates": CheckoutDatesVisual,
  "speed-cost": SpeedCostVisual,
  promise: PromiseVisual,
  geocode: GeocodeVisual,
  sorting: SortingVisual,
};

/** Screenshot slot — manually-added image, or a built-in mock visual. */
export function BlockVisual({ block }: { block: SolutionBlock }) {
  const Visual = block.visual ? visuals[block.visual] : undefined;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-green-400/80" />
      </div>
      {block.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.image}
          alt={block.imageAlt ?? block.title}
          className="w-full object-cover"
        />
      ) : (
        <div className="bg-background p-5">
          {Visual ? <Visual /> : <div className="h-56" />}
        </div>
      )}
    </div>
  );
}

export function ProductSolutions({
  solutions,
  heading,
}: {
  solutions: ProductSolution[];
  heading: string;
}) {
  const [activeTab, setActiveTab] = useState(0);
  const active = solutions[activeTab] ?? solutions[0];

  if (!active) return null;

  return (
    <section className="border-y border-border bg-secondary/30">
      <div className="container-px py-20 lg:py-28">
        <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}
        </h2>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {solutions.map((solution, i) => (
            <button
              key={solution.name}
              type="button"
              onClick={() => {
                trackEvent("tab_select", {
                  tab_group: heading,
                  tab_name: solution.name,
                  tab_index: i + 1,
                });
                setActiveTab(i);
              }}
              aria-pressed={i === activeTab}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                i === activeTab
                  ? "bg-primary text-white"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {solution.name}
            </button>
          ))}
        </div>

        {/* Active solution */}
        <div key={active.name} className="mx-auto mt-12 max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-2xl font-bold tracking-tight">{active.title}</h3>
            <p className="mt-4 text-muted-foreground">{active.description}</p>
            <p className="mt-6 text-lg font-semibold">{active.subheading}</p>
          </div>

          <div className="mt-14 flex flex-col gap-16 lg:gap-24">
            {active.blocks.map((block, i) => {
              const reversed = i % 2 === 1;
              return (
                <div
                  key={block.title}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={cn(reversed && "lg:order-2")}>
                    <h4 className="text-xl font-semibold tracking-tight">
                      {block.title}
                    </h4>
                    {block.body.map((para) => (
                      <p key={para} className="mt-4 text-muted-foreground">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className={cn(reversed && "lg:order-1")}>
                    <BlockVisual block={block} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
