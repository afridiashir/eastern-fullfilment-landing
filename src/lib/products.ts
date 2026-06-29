/**
 * Product catalog — single source of truth for the /product/* pages.
 *
 * Each entry drives a page rendered by <ProductPage> and its SEO metadata.
 * Keep the `slug` in sync with the Product dropdown in the navbar.
 */

import {
  Boxes,
  Workflow,
  Truck,
  RefreshCw,
  Undo2,
  ShieldAlert,
  Route,
  Gauge,
  Layers,
  Clock,
  Warehouse,
  MapPin,
  Globe,
  BellRing,
  Radar,
  CheckCircle2,
  MessageSquare,
  LayoutDashboard,
  Wallet,
  FileBarChart,
  Activity,
  PanelsTopLeft,
  PackageSearch,
  ShieldCheck,
  Receipt,
  type LucideIcon,
} from "lucide-react";

export type ProductFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ProductStep = {
  title: string;
  description: string;
};

export type ProductStat = {
  value: string;
  label: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

/* ---------- Rich-layout building blocks (used by ProductRichPage) ---------- */

export type ProductMetric = { value: string; label: string };

export type SolutionBlock = {
  title: string;
  /** One or more paragraphs of supporting copy. */
  body: string[];
  /**
   * Optional screenshot, added manually. Drop a file in `public/product/` and
   * set the path here. Takes priority over `visual` when both are set.
   */
  image?: string;
  imageAlt?: string;
  /**
   * Key of a built-in mock visual to render when no `image` is provided
   * (see the visuals registry in product-solutions.tsx).
   */
  visual?: string;
};

export type ProductSolution = {
  /** Tab label. */
  name: string;
  title: string;
  description: string;
  subheading: string;
  blocks: SolutionBlock[];
};

export type ProductInsight = {
  /** Small category tag, e.g. "Blog" or "Guide". */
  tag: string;
  title: string;
  href?: string;
};

export type Product = {
  slug: string;
  /** Short label used in the navbar / breadcrumbs. */
  name: string;
  /** Eyebrow text shown above the hero title. */
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** One-line summary used for SEO meta descriptions. */
  metaDescription: string;
  /**
   * Optional hero image, added manually. Drop a file in `public/product/`
   * and set the site-relative path here, e.g. "/product/track-trace-hero.png".
   * When omitted, the hero falls back to the live stat panel.
   */
  heroImage?: string;
  /** Alt text for the hero image (used only when heroImage is set). */
  heroImageAlt?: string;
  stats: ProductStat[];
  features: ProductFeature[];
  steps: ProductStep[];
  benefits: string[];
  faqs: ProductFaq[];

  /**
   * Optional rich-layout content. When present, the page renders the detailed
   * "solutions" layout (intro + headline metrics + tabbed solution blocks +
   * insights) instead of the standard layout.
   */
  intro?: { heading: string; body: string };
  metrics?: ProductMetric[];
  solutionsHeading?: string;
  solutions?: ProductSolution[];
  insights?: ProductInsight[];
};

export const products: Product[] = [
  {
    slug: "fullfilment-automation",
    name: "Fullfilment Automation",
    eyebrow: "Automated Order Fulfillment",
    icon: Workflow,
    title: "Redefining fulfillment with intelligent logistics",
    subtitle:
      "Drive growth and efficiency in logistics operations at every stage of fulfillment, from inbound to outbound — across all miles.",
    metaDescription:
      "Scale all-mile efficiency with automated order fulfillment — improved SLAs, real-time order updates, and automated returns and exchanges from Eastern Fullfilment.",
    heroImage: "/product/fullfilment-automation.png",
    heroImageAlt: "Fulfillment Automation dashboard",
    intro: {
      heading:
        "Enhance daily dispatch operations with an advanced automated fulfillment system",
      body: "Fulfillment Automation is the ideal automated fulfillment system for scaling all-mile efficiency and maximizing resource usage through automation. It powers industry-leading consumer experiences through automated order fulfillment that leads to improved SLAs, real-time updates on orders, and automated returns and exchange processes — bringing unparalleled convenience.",
    },
    metrics: [
      { value: "1.22B+", label: "Total deliveries optimized" },
      { value: "$303M+", label: "Savings in logistics costs" },
      { value: "99.5%", label: "On-time deliveries" },
    ],
    solutionsHeading: "Fulfillment Automation solutions",
    solutions: [
      {
        name: "Order Management",
        title: "Order Management",
        description:
          "Leverage advanced algorithms to automatically schedule daily pick-ups and deliveries, and manage cancellations and returns most efficiently — while maintaining SLAs and peak resource utilization.",
        subheading: "Maximize logistics efficiency with intelligent automation",
        blocks: [
          {
            title: "Orchestrate your fulfillment life cycle",
            visual: "lifecycle",
            body: [
              "Automatically move orders through customizable stages, ensuring deliveries stay on track even with exceptions on the ground.",
              "Use pre-configurable rules to define how order cancellations and re-attempted failed deliveries are managed with minimal human intervention.",
            ],
          },
          {
            title: "Greater efficiencies by tracking orders",
            visual: "activity",
            body: [
              "Combat exceptions with flexible planning by adding or re-sequencing deliveries with an intuitive drag-and-drop interface.",
              "Automatically maintain rich logs of order activity across planning, execution, and other stages.",
            ],
          },
          {
            title: "Consistently delightful delivery experiences",
            visual: "updates",
            body: [
              "Provide customers with real-time delivery updates across various communication channels, irrespective of the shipping channel used.",
              "Improve first-attempt delivery rates by letting customers share special instructions, and capture their feedback through a customized questionnaire.",
            ],
          },
        ],
      },
      {
        name: "Delivery Linked Checkout",
        title: "Delivery Linked Checkout",
        description:
          "Show accurate, date-specific delivery options right at checkout, so customers choose the slot that works for them while you stay in control of fulfillment cost and capacity.",
        subheading: "Turn the checkout into a delivery promise you can keep",
        blocks: [
          {
            title: "Show real delivery dates at checkout",
            visual: "checkout-dates",
            body: [
              "Surface accurate delivery dates and slots based on live capacity, location, and SLAs.",
              "Reduce cart abandonment by giving customers the certainty of a clear delivery promise.",
            ],
          },
          {
            title: "Balance speed against cost",
            visual: "speed-cost",
            body: [
              "Offer express, standard, and economy options and let customers self-select the trade-off.",
              "Protect margins by steering demand toward the most efficient slots and routes.",
            ],
          },
          {
            title: "Keep every promise you make",
            visual: "promise",
            body: [
              "Feed checkout selections straight into automated planning so the chosen slot is honored.",
              "Keep customers informed from order to doorstep with proactive status updates.",
            ],
          },
        ],
      },
    ],
    stats: [
      { value: "99.6%", label: "Order accuracy" },
      { value: "1.2d", label: "Avg. ship time" },
      { value: "70%", label: "Less manual work" },
      { value: "6+", label: "Sales channels" },
    ],
    features: [
      {
        icon: Workflow,
        title: "Order orchestration",
        description:
          "Ingest orders from every sales channel and route them automatically with rules you control.",
      },
      {
        icon: Boxes,
        title: "Smart pick & pack",
        description:
          "Generate optimized pick paths and packing instructions for every order in the warehouse.",
      },
      {
        icon: Truck,
        title: "Carrier rate shopping",
        description:
          "Auto-select the cheapest compliant carrier and print the right label in a single pass.",
      },
      {
        icon: RefreshCw,
        title: "Real-time inventory sync",
        description:
          "Keep stock levels accurate across stores in real time to prevent oversells and stockouts.",
      },
      {
        icon: Undo2,
        title: "Returns automation",
        description:
          "Trigger return labels, restocking, and refunds automatically — no manual touchpoints.",
      },
      {
        icon: ShieldAlert,
        title: "Exception handling",
        description:
          "Flag address, stock, and payment issues before they ever delay a shipment.",
      },
    ],
    steps: [
      {
        title: "Connect your channels",
        description:
          "Link Shopify, Amazon, and your other stores in minutes with native integrations.",
      },
      {
        title: "Set your rules",
        description:
          "Define routing, packaging, and carrier logic once — the engine applies it to every order.",
      },
      {
        title: "Orders flow automatically",
        description:
          "Each order is picked, packed, and labeled hands-free across your fulfillment centers.",
      },
      {
        title: "Ship and sync",
        description:
          "Tracking and inventory update everywhere the instant a parcel leaves the dock.",
      },
    ],
    benefits: [
      "Cut manual data entry and the errors that come with it",
      "Ship same-day by removing bottlenecks between order and pick",
      "Scale peak-season volume without adding headcount",
      "Give customers accurate delivery promises every time",
      "Free your team to focus on exceptions, not routine orders",
    ],
    faqs: [
      {
        question: "Which sales channels can I connect?",
        answer:
          "Shopify, Amazon, eBay, WooCommerce, and custom storefronts via API. Orders from every channel flow into one queue.",
      },
      {
        question: "How long does it take to go live?",
        answer:
          "Most brands connect their store and start sending us orders in under 30 minutes. Custom rules can be added anytime.",
      },
      {
        question: "Can I keep my own packaging and inserts?",
        answer:
          "Yes. Branded boxes, custom inserts, and kitting instructions are all part of the automated pack workflow.",
      },
      {
        question: "What happens when an order has a problem?",
        answer:
          "The engine flags address, inventory, and payment exceptions instantly so your team can resolve them before they delay shipping.",
      },
    ],
  },
  {
    slug: "dispatch-planning",
    name: "Dispatch Planning",
    eyebrow: "Dispatch Planning",
    icon: Route,
    title: "Plan smarter routes and dispatch with confidence",
    subtitle:
      "Batch, sequence, and assign every shipment to the optimal carrier and route — balancing cost, speed, and capacity across all of your fulfillment centers.",
    metaDescription:
      "Optimize routes, allocate carriers, and plan capacity across warehouses. Eastern Fullfilment's dispatch planning hits every carrier cut-off at the lowest cost.",
    heroImage: "/product/dispatch-planing.png",
    heroImageAlt: "Dispatch Planning dashboard",
    stats: [
      { value: "23%", label: "Lower shipping cost" },
      { value: "99.1%", label: "On-time dispatch" },
      { value: "2x", label: "Faster wave planning" },
      { value: "100%", label: "Cut-offs hit" },
    ],
    features: [
      {
        icon: Route,
        title: "Route optimization",
        description:
          "Build the most efficient delivery routes automatically from live order and address data.",
      },
      {
        icon: Truck,
        title: "Carrier allocation",
        description:
          "Assign each parcel to the best carrier by zone, cost, and service-level agreement.",
      },
      {
        icon: Gauge,
        title: "Capacity planning",
        description:
          "Forecast daily volume and staff your docks and pick teams accordingly.",
      },
      {
        icon: Layers,
        title: "Wave & batch picking",
        description:
          "Group orders into efficient dispatch waves to keep the floor moving.",
      },
      {
        icon: Clock,
        title: "Cut-off management",
        description:
          "Hit every carrier cut-off with automated scheduling and countdowns.",
      },
      {
        icon: Warehouse,
        title: "Multi-warehouse routing",
        description:
          "Fulfill from the location closest to the customer to cut transit time and cost.",
      },
    ],
    steps: [
      {
        title: "Pool the day's orders",
        description:
          "Incoming orders are aggregated across every channel and fulfillment center.",
      },
      {
        title: "Optimize the plan",
        description:
          "Routes, carriers, and waves are calculated to balance cost, speed, and capacity.",
      },
      {
        title: "Release to the floor",
        description:
          "Dispatch waves and pick lists are sent to your team with clear cut-off targets.",
      },
      {
        title: "Dispatch on time",
        description:
          "Parcels leave on the optimal carrier, every cut-off met, with full audit history.",
      },
    ],
    benefits: [
      "Spend less on shipping with zone-aware carrier selection",
      "Never miss a carrier cut-off with automated scheduling",
      "Balance workload evenly across docks and shifts",
      "React to volume spikes with live capacity forecasts",
      "Shorten transit times by shipping from the nearest warehouse",
    ],
    faqs: [
      {
        question: "Can it plan across multiple warehouses?",
        answer:
          "Yes. Dispatch planning routes each order to the optimal fulfillment center based on inventory, distance, and capacity.",
      },
      {
        question: "Do you support our existing carriers?",
        answer:
          "We integrate with major and regional carriers. Allocation rules respect your negotiated rates and service levels.",
      },
      {
        question: "How are cut-offs handled?",
        answer:
          "Each carrier's cut-off is tracked with live countdowns, and waves are scheduled automatically to hit them.",
      },
      {
        question: "Can I override the plan?",
        answer:
          "Always. Planners can adjust routes, carriers, and waves manually before releasing them to the floor.",
      },
    ],
  },
  {
    slug: "track-trace",
    name: "Track & Trace",
    eyebrow: "Track & Trace",
    icon: MapPin,
    title: "Real-time visibility from warehouse to doorstep",
    subtitle:
      "Give your team and customers live tracking on every parcel, with proactive alerts the moment a shipment goes off-plan.",
    metaDescription:
      "Live shipment tracking, branded tracking pages, and proactive delay alerts across every carrier. Eastern Fullfilment keeps teams and customers in the loop.",
    heroImage: "/product/track-trace.png",
    heroImageAlt: "Track & Trace dashboard",
    stats: [
      { value: "Real-time", label: "Tracking updates" },
      { value: "40%", label: "Fewer WISMO tickets" },
      { value: "100%", label: "Carrier coverage" },
      { value: "98.6%", label: "On-time delivery" },
    ],
    features: [
      {
        icon: MapPin,
        title: "Live shipment tracking",
        description:
          "Follow every parcel across carriers on one unified map and timeline.",
      },
      {
        icon: Globe,
        title: "Branded tracking pages",
        description:
          "Give customers a tracking experience in your own brand, not the carrier's.",
      },
      {
        icon: BellRing,
        title: "Proactive alerts",
        description:
          "Get notified about delays, exceptions, and failed deliveries before customers ask.",
      },
      {
        icon: Radar,
        title: "Unified carrier feed",
        description:
          "Normalize tracking events from every carrier into one consistent timeline.",
      },
      {
        icon: CheckCircle2,
        title: "Delivery confirmation",
        description:
          "Capture proof of delivery, photos, and signatures automatically.",
      },
      {
        icon: MessageSquare,
        title: "Customer notifications",
        description:
          "Send automated SMS and email status updates at every milestone.",
      },
    ],
    steps: [
      {
        title: "Parcel leaves the dock",
        description:
          "Each shipment is registered the moment its label is scanned out.",
      },
      {
        title: "Events stream in",
        description:
          "Tracking updates from every carrier are normalized into one live feed.",
      },
      {
        title: "Customers stay informed",
        description:
          "Branded pages and automated notifications keep buyers up to date.",
      },
      {
        title: "Exceptions get flagged",
        description:
          "Delays and failed deliveries trigger alerts so your team can act fast.",
      },
    ],
    benefits: [
      "Cut 'where is my order' tickets with proactive updates",
      "Build trust with a fully branded tracking experience",
      "Catch delays early and resolve them before they escalate",
      "See every carrier's status in one place, no tab-switching",
      "Prove delivery with captured signatures and photos",
    ],
    faqs: [
      {
        question: "Which carriers are supported?",
        answer:
          "All major carriers and many regional ones. Tracking events are normalized into a single consistent timeline.",
      },
      {
        question: "Can the tracking page match my brand?",
        answer:
          "Yes. Tracking pages use your logo, colors, and domain so customers stay in your brand experience.",
      },
      {
        question: "How are customers notified?",
        answer:
          "Automated SMS and email updates fire at key milestones — shipped, out for delivery, delivered, and on exceptions.",
      },
      {
        question: "Do I get alerted about problems?",
        answer:
          "Your team receives proactive alerts for delays, failed deliveries, and stuck shipments so you can intervene early.",
      },
    ],
  },
  {
    slug: "analytics-insight",
    name: "Analytics and Insight",
    eyebrow: "Analytics & Insight",
    icon: LayoutDashboard,
    title: "Turn fulfillment data into decisions",
    subtitle:
      "Measure cost-to-serve, carrier performance, and inventory health with dashboards built for operators — and spot problems before they cost you.",
    metaDescription:
      "Operations dashboards, cost-to-serve analytics, carrier scorecards, and demand forecasting. Eastern Fullfilment turns fulfillment data into clear decisions.",
    heroImage: "/product/analytics-report.png",
    heroImageAlt: "Analytics and Insight dashboard",
    stats: [
      { value: "1,284", label: "Orders / day tracked" },
      { value: "99.4%", label: "Data accuracy" },
      { value: "30+", label: "Operational metrics" },
      { value: "Live", label: "Dashboard refresh" },
    ],
    features: [
      {
        icon: LayoutDashboard,
        title: "Operations dashboards",
        description:
          "Track throughput, accuracy, and SLAs in real time across every warehouse.",
      },
      {
        icon: Wallet,
        title: "Cost-to-serve analytics",
        description:
          "Understand the true cost of every order, SKU, and channel down to the cent.",
      },
      {
        icon: Truck,
        title: "Carrier scorecards",
        description:
          "Compare carriers on cost, speed, and reliability to negotiate better rates.",
      },
      {
        icon: Boxes,
        title: "Inventory intelligence",
        description:
          "Forecast demand and prevent stockouts before they hit your bottom line.",
      },
      {
        icon: FileBarChart,
        title: "Custom reports",
        description:
          "Build and schedule the exact reports your team and clients need.",
      },
      {
        icon: Activity,
        title: "Anomaly detection",
        description:
          "Surface unusual trends automatically before they become expensive problems.",
      },
    ],
    steps: [
      {
        title: "Capture every event",
        description:
          "Each order, pick, pack, and shipment is recorded as it happens.",
      },
      {
        title: "Unify the data",
        description:
          "Operations, cost, and carrier data are blended into one model.",
      },
      {
        title: "Surface the insight",
        description:
          "Dashboards and scorecards highlight what's working and what isn't.",
      },
      {
        title: "Act with confidence",
        description:
          "Schedule reports, set alerts, and make decisions backed by real numbers.",
      },
    ],
    benefits: [
      "Know your true cost-to-serve for every order and SKU",
      "Negotiate better carrier rates with hard performance data",
      "Forecast demand to keep inventory lean but in stock",
      "Spot anomalies before they turn into costly problems",
      "Share clear, scheduled reports with your team and clients",
    ],
    faqs: [
      {
        question: "Is the data real-time?",
        answer:
          "Dashboards refresh live as orders move through fulfillment, so you're never looking at stale numbers.",
      },
      {
        question: "Can I export or schedule reports?",
        answer:
          "Yes. Build custom reports, export them, or schedule recurring delivery to your inbox or clients.",
      },
      {
        question: "What metrics are available?",
        answer:
          "Throughput, accuracy, SLA attainment, cost-to-serve, carrier performance, inventory health, and more — 30+ metrics out of the box.",
      },
      {
        question: "Does it work across multiple warehouses?",
        answer:
          "Absolutely. Compare locations side by side or roll everything up into a single network-wide view.",
      },
    ],
  },
  {
    slug: "3pl-client-portal",
    name: "3PL Client Portal",
    eyebrow: "3PL Client Portal",
    icon: PanelsTopLeft,
    title: "Your own portal to manage and track your records",
    subtitle:
      "Get a dedicated portal where you manage and track everything we handle for you — inventory, orders, shipments, returns, and billing — all in real time, 24/7.",
    metaDescription:
      "Get your own 3PL client portal to manage and track inventory, orders, shipments, returns, and billing in real time. Full visibility into your records, 24/7.",
    heroImage: "/product/3pl-client-portal2.png",
    heroImageAlt: "3PL Client Portal dashboard",
    stats: [
      { value: "24/7", label: "Portal access" },
      { value: "Real-time", label: "Records & inventory" },
      { value: "One", label: "Place for everything" },
      { value: "Full", label: "Account visibility" },
    ],
    features: [
      {
        icon: Boxes,
        title: "Manage your inventory",
        description:
          "Monitor and manage stock levels by SKU and location in real time.",
      },
      {
        icon: PackageSearch,
        title: "Track every order",
        description:
          "View, manage, and track all of your orders from a single dashboard.",
      },
      {
        icon: Truck,
        title: "Follow your shipments",
        description:
          "Trace every parcel from dispatch to doorstep without leaving the portal.",
      },
      {
        icon: FileBarChart,
        title: "Your records & reports",
        description:
          "Pull and download your performance, history, and reports anytime.",
      },
      {
        icon: ShieldCheck,
        title: "Your whole team",
        description:
          "Invite teammates with role-based access to exactly the records they need.",
      },
      {
        icon: Receipt,
        title: "Account & billing",
        description:
          "See usage, statements, and downloadable invoices in one transparent view.",
      },
    ],
    steps: [
      {
        title: "Get your login",
        description:
          "We set you up with your own portal account in minutes — no setup on your end.",
      },
      {
        title: "Your account syncs",
        description:
          "Your inventory, orders, shipments, and billing flow into the portal automatically.",
      },
      {
        title: "Manage and track",
        description:
          "Handle everything in real time, from stock to shipments, whenever you need to.",
      },
      {
        title: "Stay in control",
        description:
          "Full visibility into your records means no waiting on emails or status updates.",
      },
    ],
    benefits: [
      "Manage and track all of your records in one place",
      "See live inventory, orders, and shipments around the clock",
      "Pull your own reports without waiting on our team",
      "Give your team role-based access to the records they need",
      "Stay on top of billing with clear, downloadable invoices",
    ],
    faqs: [
      {
        question: "Is this my own dedicated portal?",
        answer:
          "Yes. You get your own secure portal account to manage and track everything we handle for you, available 24/7.",
      },
      {
        question: "What can I manage and track from it?",
        answer:
          "Inventory, orders, shipments, returns, reports, and billing — your full account, all in one place.",
      },
      {
        question: "Is the data real-time?",
        answer:
          "Your records and stock levels update live as orders are picked, packed, and received, so you always see accurate numbers.",
      },
      {
        question: "Can my whole team have access?",
        answer:
          "Yes. Invite teammates and use role-based permissions to control exactly which records each person can see.",
      },
    ],
  },
];

/** Look up a product by its URL slug. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
