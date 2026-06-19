"use client";

import { useState } from "react";
import {
  Boxes,
  ClipboardList,
  Warehouse,
  LayoutDashboard,
  Truck,
  BarChart3,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  preview: () => React.ReactNode;
};

const services: Service[] = [
  {
    id: "inventory",
    icon: Boxes,
    title: "Inventory Management",
    description:
      "Monitor stock levels across warehouses with real-time inventory tracking and automated updates.",
    path: "inventory",
    preview: InventoryPreview,
  },
  {
    id: "orders",
    icon: ClipboardList,
    title: "Order Management",
    description:
      "Automatically receive, process, and fulfill orders from multiple sales channels.",
    path: "orders",
    preview: OrdersPreview,
  },
  {
    id: "warehouse",
    icon: Warehouse,
    title: "Warehouse Operations",
    description:
      "Optimize picking, packing, receiving, and shipping workflows to improve efficiency and accuracy.",
    path: "operations",
    preview: WarehousePreview,
  },
  {
    id: "portal",
    icon: LayoutDashboard,
    title: "Client Portal",
    description:
      "Give customers real-time visibility into inventory, orders, shipments, and performance metrics.",
    path: "portal",
    preview: PortalPreview,
  },
  {
    id: "shipping",
    icon: Truck,
    title: "Shipping Integrations",
    description:
      "Connect with leading carriers to generate labels, track shipments, and reduce delivery times.",
    path: "shipping",
    preview: ShippingPreview,
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Access operational insights, fulfillment performance, inventory trends, and business metrics.",
    path: "analytics",
    preview: AnalyticsPreview,
  },
];

export function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((s) => s.id === activeId) ?? services[0];

  return (
    <section id="services" className="container-px py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything You Need to Scale Fulfillment
        </h2>
        <p className="mt-4 text-muted-foreground">
          A complete fulfillment platform — explore each capability and see it
          in action.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center">
        {/* Clickable list */}
        <ul className="flex flex-col gap-3">
          {services.map((service) => {
            const isActive = service.id === activeId;
            return (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(service.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all",
                    isActive
                      ? "border bg-muted shadow-sm shadow-primary/5"
                      : "border-border bg-card hover:-translate-y-0.5 hover:border hover:shadow-sm"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive
                        ? "bg-muted text-black dark:text-white "
                        : "bg-muted text-muted-foreground group-hover:bg-white group-hover:text-black dark:group-hover:bg-white dark:group-hover:text-black"
                    )}
                  >
                    <service.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-semibold">{service.title}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 hidden md:block shrink-0 text-muted-foreground transition-transform",
                          isActive
                            ? "translate-x-0 text-primary"
                            : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        )}
                      />
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {service.description}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Interactive browser window */}
        <div>
          <BrowserFrame path={active.path}>
            <div
              key={active.id}
              className="animate-in fade-in-50 slide-in-from-bottom-1 duration-300"
            >
              <active.preview />
            </div>
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}

/* ---------- Browser chrome ---------- */

function BrowserFrame({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
      <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="truncate">app.easternfulfillment.com/{path}</span>
        </div>
      </div>
      <div className="min-h-[360px] bg-background p-5">{children}</div>
    </div>
  );
}

/* ---------- Per-feature previews ---------- */

// Staggered entrance for list items — re-runs whenever the preview remounts.
const stagger = "animate-in fade-in slide-in-from-bottom-2 fill-mode-both";
const delay = (i: number) => ({ animationDelay: `${i * 70}ms` });

function PreviewHeader({ title, badge }: { title: string; badge: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-sm font-semibold">{title}</h4>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
        {badge}
      </span>
    </div>
  );
}

function InventoryPreview() {
  const rows = [
    { sku: "EF-1042", name: "Wireless Earbuds", stock: 86, level: 86 },
    { sku: "EF-2210", name: "Phone Case — Black", stock: 24, level: 24 },
    { sku: "EF-3388", name: "USB-C Cable 2m", stock: 62, level: 62 },
    { sku: "EF-4501", name: "Laptop Stand", stock: 9, level: 9 },
  ];
  return (
    <div>
      <PreviewHeader title="Inventory Overview" badge="Live sync" />
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div
            key={r.sku}
            style={delay(i)}
            className={cn("rounded-xl border border-border bg-card p-3", stagger)}
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{r.name}</span>
              <span className="font-mono text-xs text-muted-foreground">
                {r.sku}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full",
                    r.level < 15
                      ? "bg-red-500"
                      : r.level < 40
                        ? "bg-yellow-500"
                        : "bg-primary"
                  )}
                  style={{ width: `${r.level}%` }}
                />
              </div>
              <span className="w-16 text-right text-xs text-muted-foreground">
                {r.stock} units
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersPreview() {
  const orders = [
    { id: "#10482", channel: "Shopify", status: "Fulfilled", tone: "green" },
    { id: "#10481", channel: "Amazon", status: "Packing", tone: "blue" },
    { id: "#10480", channel: "Website", status: "Processing", tone: "yellow" },
    { id: "#10479", channel: "eBay", status: "Received", tone: "muted" },
  ];
  const tones: Record<string, string> = {
    green: "bg-green-500/10 text-green-600 dark:text-green-400",
    blue: "bg-primary/10 text-primary",
    yellow: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <div>
      <PreviewHeader title="Incoming Orders" badge="Multi-channel" />
      <div className="overflow-hidden rounded-xl border border-border">
        {orders.map((o, i) => (
          <div
            key={o.id}
            style={delay(i)}
            className={cn(
              "flex items-center justify-between px-4 py-3 text-sm",
              stagger,
              i !== orders.length - 1 && "border-b border-border"
            )}
          >
            <span className="font-mono font-medium">{o.id}</span>
            <span className="text-muted-foreground">{o.channel}</span>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-medium",
                tones[o.tone]
              )}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WarehousePreview() {
  const columns = [
    { title: "Picking", count: 12, items: ["#10482", "#10485"] },
    { title: "Packing", count: 7, items: ["#10481"] },
    { title: "Shipping", count: 5, items: ["#10477", "#10478"] },
  ];
  return (
    <div>
      <PreviewHeader title="Fulfillment Workflow" badge="Real-time" />
      <div className="grid grid-cols-3 gap-3">
        {columns.map((c, i) => (
          <div
            key={c.title}
            style={delay(i)}
            className={cn("rounded-xl border border-border bg-card p-3", stagger)}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold">{c.title}</span>
              <span className="rounded-full bg-primary/10 px-1.5 text-[10px] font-medium text-primary">
                {c.count}
              </span>
            </div>
            <div className="space-y-2">
              {c.items.map((it) => (
                <div
                  key={it}
                  className="rounded-lg border border-border bg-background px-2 py-1.5 font-mono text-[11px] text-muted-foreground"
                >
                  {it}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortalPreview() {
  const stats = [
    { label: "In Stock", value: "8,412", sub: "SKUs" },
    { label: "Open Orders", value: "126", sub: "this week" },
    { label: "In Transit", value: "43", sub: "shipments" },
    { label: "On-time Rate", value: "98.6%", sub: "last 30d" },
  ];
  return (
    <div>
      <PreviewHeader title="Client Dashboard" badge="Your account" />
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={delay(i)}
            className={cn("rounded-xl border border-border bg-card p-4", stagger)}
          >
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-2xl font-bold tracking-tight">
              {s.value}
            </div>
            <div className="text-[11px] text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShippingPreview() {
  const carriers = [
    { name: "UPS", tracking: "1Z999AA10123456784", status: "Out for delivery" },
    { name: "FedEx", tracking: "7712 3456 7890", status: "In transit" },
    { name: "DHL", tracking: "JD0149855372", status: "Label created" },
  ];
  return (
    <div>
      <PreviewHeader title="Carrier Connections" badge="Integrated" />
      <div className="space-y-3">
        {carriers.map((c, i) => (
          <div
            key={c.name}
            style={delay(i)}
            className={cn(
              "flex items-center gap-3 rounded-xl border border-border bg-card p-3",
              stagger
            )}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Truck className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{c.name}</span>
                <span className="text-[11px] text-primary">{c.status}</span>
              </div>
              <div className="truncate font-mono text-xs text-muted-foreground">
                {c.tracking}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPreview() {
  const data = [120, 168, 142, 196, 175, 232, 210];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [active, setActive] = useState<number | null>(data.length - 1);

  // Chart geometry (SVG user units)
  const W = 320;
  const H = 150;
  const pl = 30; // left padding (y labels)
  const pr = 8;
  const pt = 12;
  const pb = 22; // bottom padding (x labels)
  const plotW = W - pl - pr;
  const plotH = H - pt - pb;

  const max = 250;
  const ticks = [0, 125, 250];
  const x = (i: number) => pl + (i / (data.length - 1)) * plotW;
  const y = (v: number) => pt + (1 - v / max) * plotH;

  const points = data.map((v, i) => [x(i), y(v)] as const);

  // Smooth curve through points (Catmull-Rom → cubic bézier)
  const linePath = points.reduce((acc, [px, py], i) => {
    if (i === 0) return `M${px.toFixed(1)},${py.toFixed(1)}`;
    const [x0, y0] = points[i - 1];
    const [xp, yp] = points[i - 2] ?? points[i - 1];
    const [xn, yn] = points[i + 1] ?? points[i];
    const c1x = x0 + (px - xp) / 6;
    const c1y = y0 + (py - yp) / 6;
    const c2x = px - (xn - x0) / 6;
    const c2y = py - (yn - y0) / 6;
    return `${acc} C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${px.toFixed(1)},${py.toFixed(1)}`;
  }, "");

  const areaPath = `${linePath} L${x(data.length - 1).toFixed(1)},${(
    pt + plotH
  ).toFixed(1)} L${x(0).toFixed(1)},${(pt + plotH).toFixed(1)} Z`;

  // Tooltip geometry for the active point
  const tipW = 58;
  const tipH = 30;
  const tipX =
    active !== null
      ? Math.min(Math.max(x(active) - tipW / 2, pl), W - pr - tipW)
      : 0;
  const tipBelow = active !== null && y(data[active]) - tipH - 10 < pt;
  const tipY =
    active !== null
      ? tipBelow
        ? y(data[active]) + 10
        : y(data[active]) - tipH - 10
      : 0;

  return (
    <div>
      <PreviewHeader title="Performance Report" badge="Last 7 days" />
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { label: "Orders", value: "1,284" },
          { label: "Accuracy", value: "99.4%" },
          { label: "Avg. Ship", value: "1.2d" },
        ].map((m, i) => (
          <div
            key={m.label}
            style={delay(i)}
            className={cn("rounded-xl border border-border bg-card p-3", stagger)}
          >
            <div className="text-[11px] text-muted-foreground">{m.label}</div>
            <div className="mt-0.5 text-lg font-bold">{m.value}</div>
          </div>
        ))}
      </div>
      <div
        style={delay(3)}
        className={cn("rounded-xl border border-border bg-card p-4", stagger)}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium">Orders fulfilled / day</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            This week
          </span>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-40 w-full text-primary"
          preserveAspectRatio="none"
          role="img"
          aria-label="Line chart of orders fulfilled per day"
        >
          <defs>
            <linearGradient id="ef-analytics-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Gridlines + y-axis labels */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={pl}
                x2={W - pr}
                y1={y(t)}
                y2={y(t)}
                className="stroke-border"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text
                x={pl - 6}
                y={y(t) + 3}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize={9}
              >
                {t}
              </text>
            </g>
          ))}

          {/* Area + line */}
          <path
            d={areaPath}
            fill="url(#ef-analytics-fill)"
            className="animate-in fade-in fill-mode-both duration-700 delay-500"
          />
          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="[stroke-dasharray:1] [animation:ef-draw-line_900ms_ease-out_forwards] [stroke-dashoffset:1]"
          />

          {/* Active guide line */}
          {active !== null && (
            <line
              x1={x(active)}
              x2={x(active)}
              y1={y(data[active])}
              y2={pt + plotH}
              className="stroke-primary/30"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}

          {/* X-axis labels */}
          {days.map((d, i) => (
            <text
              key={d + i}
              x={x(i)}
              y={H - 6}
              textAnchor="middle"
              className={cn(
                "transition-colors",
                active === i ? "fill-primary font-medium" : "fill-muted-foreground"
              )}
              fontSize={9}
            >
              {d}
            </text>
          ))}

          {/* Tooltip */}
          {active !== null && (
            <g className="pointer-events-none">
              <rect
                x={tipX}
                y={tipY}
                width={tipW}
                height={tipH}
                rx={6}
                className="fill-primary"
              />
              <text
                x={tipX + tipW / 2}
                y={tipY + 12}
                textAnchor="middle"
                className="fill-primary-foreground/80"
                fontSize={8}
              >
                {days[active]}
              </text>
              <text
                x={tipX + tipW / 2}
                y={tipY + 23}
                textAnchor="middle"
                className="fill-primary-foreground font-semibold"
                fontSize={10}
              >
                {data[active]} orders
              </text>
            </g>
          )}

          {/* Tap / hover targets */}
          {points.map(([px], i) => (
            <rect
              key={`hit-${i}`}
              x={px - plotW / (data.length - 1) / 2}
              y={pt}
              width={plotW / (data.length - 1)}
              height={plotH}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => setActive(i === active ? null : i)}
              onMouseEnter={() => setActive(i)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
