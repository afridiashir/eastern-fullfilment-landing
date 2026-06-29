/**
 * Industry catalog — single source of truth for the /industries/* pages.
 *
 * Each entry drives a page rendered by <IndustryPage> and its SEO metadata.
 * Keep the `slug` in sync with the Industries dropdown in the navbar.
 */

import {
  ShoppingCart,
  ShoppingBasket,
  Factory,
  Warehouse,
  Boxes,
  Truck,
  Globe,
  BarChart3,
  Layers,
  Clock,
  ShieldCheck,
  Users,
  Workflow,
  Receipt,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type IndustryFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type IndustryStep = {
  title: string;
  description: string;
};

export type IndustryStat = {
  value: string;
  label: string;
};

export type IndustryFaq = {
  question: string;
  answer: string;
};

/* ---------- Rich-layout building blocks (used by IndustryRichPage) ---------- */

export type IndustryEdgeBlock = {
  /** Small eyebrow tag shown above the block title, e.g. "Automated scheduling". */
  tag: string;
  title: string;
  /** One or more paragraphs of supporting copy. */
  body: string[];
  /**
   * Optional screenshot, added manually. Drop a file in `public/industries/`
   * and set the path here. Takes priority over `visual` when both are set.
   */
  image?: string;
  imageAlt?: string;
  /**
   * Key of a built-in mock visual to render when no `image` is provided
   * (see the visuals registry in product-solutions.tsx).
   */
  visual?: string;
};

export type IndustryFlowStage = {
  /** Key into the order-flow icon registry (see industry-order-flow.tsx). */
  icon: string;
  title: string;
  description: string;
};

export type IndustryGalleryItem = {
  /** Site-relative path or absolute image URL. */
  image: string;
  alt: string;
  /** Optional caption overlaid on the image. */
  label?: string;
};

export type IndustryTestimonial = {
  quote: string;
  author: string;
  role: string;
  /** Headline result, e.g. "99.5% on-time delivery". */
  metric?: string;
};

export type Industry = {
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
   * Optional hero image, added manually. Drop a file in `public/industries/`
   * and set the site-relative path here, e.g. "/industries/ecommerce-hero.png".
   * When omitted, the hero falls back to the live stat panel.
   */
  heroImage?: string;
  /** Alt text for the hero image (used only when heroImage is set). */
  heroImageAlt?: string;
  faqs: IndustryFaq[];

  /* ---------- Standard layout (IndustryPage) ---------- */
  stats?: IndustryStat[];
  /** Pain points this industry faces, framed as the section heading copy. */
  challengesHeading?: string;
  features?: IndustryFeature[];
  steps?: IndustryStep[];
  benefits?: string[];

  /**
   * Optional rich-layout content. When present, the page renders the detailed
   * "edge" layout (intro statement + alternating feature blocks + testimonial +
   * impact metrics) instead of the standard layout.
   */
  intro?: { heading: string; body?: string };
  /** Scroll-driven order-flow visualization shown under the intro. */
  orderFlow?: { caption?: string; stages: IndustryFlowStage[] };
  galleryHeading?: string;
  gallery?: IndustryGalleryItem[];
  edgeHeading?: string;
  edge?: IndustryEdgeBlock[];
  testimonial?: IndustryTestimonial;
  impactHeading?: string;
  impact?: IndustryStat[];
};

export const industries: Industry[] = [
  {
    slug: "ecommerce",
    name: "E-commerce",
    eyebrow: "E-commerce Logistics",
    icon: ShoppingCart,
    title: "E-commerce logistics software for high-volume delivery operations",
    subtitle:
      "Scale high-volume e-commerce delivery operations without increasing logistics costs. Eastern automates dispatch planning, routing, and fleet allocation so your team processes more orders per day while keeping every delivery promise.",
    metaDescription:
      "E-commerce logistics software that automates dispatch planning, routing, and fleet allocation. Eastern Fullfilment scales high-volume delivery without raising costs.",
    intro: {
      heading: "The complete order-to-delivery system for e-commerce logistics",
      body: "From the moment an order is placed to the instant it reaches the doorstep, Eastern coordinates routing, scheduling, fleet allocation, and delivery visibility in one platform — so high-volume operations stay efficient, predictable, and reliable at scale.",
    },
    orderFlow: {
      caption:
        "Every order moves through the same automated path — from checkout to doorstep.",
      stages: [
        {
          icon: "shopping-bag",
          title: "Order placed",
          description:
            "Orders are captured from every sales channel into one unified queue.",
        },
        {
          icon: "map-pin",
          title: "Address validated",
          description:
            "Each address is geocoded into precise coordinates before routing.",
        },
        {
          icon: "route",
          title: "Dispatch planned",
          description:
            "Routes, delivery slots, and the optimal fleet are assigned automatically.",
        },
        {
          icon: "package",
          title: "Sorted & loaded",
          description:
            "Parcels are sorted and load-sequenced at the hub for fast dispatch.",
        },
        {
          icon: "truck",
          title: "Out for delivery",
          description:
            "Vehicles leave on schedule and are tracked across the all-mile route.",
        },
        {
          icon: "check-circle",
          title: "Delivered",
          description:
            "Proof of delivery is captured and the customer is notified in real time.",
        },
      ],
    },
    galleryHeading: "Fulfillment, from checkout to doorstep",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=70",
        alt: "Customer paying for an online order with a credit card and laptop",
        label: "Order placed online",
      },
      {
        image:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=70",
        alt: "Aisle of tall warehouse shelving stocked with inventory",
        label: "Stored across the network",
      },
      {
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=70",
        alt: "Fulfillment center with sorted parcels ready for dispatch",
        label: "Picked & fulfilled",
      },
      {
        image:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=70",
        alt: "Freight truck carrying deliveries on the highway",
        label: "Out for delivery",
      },
    ],
    edgeHeading: "The Eastern edge",
    edge: [
      {
        tag: "Automated scheduling",
        title: "Automate delivery scheduling at scale",
        visual: "activity",
        body: [
          "Eastern groups orders, plans routes, and schedules deliveries from a centralized dispatch interface, reducing manual planning effort for high-volume operations.",
          "Teams can process more daily orders while keeping fleet utilization and SLA performance under control.",
        ],
      },
      {
        tag: "Flexible delivery options",
        title: "Offer the flexible delivery options customers expect",
        visual: "checkout-dates",
        body: [
          "Connect delivery-slot selection and rescheduling workflows with capacity-aware planning, so customers can choose convenient delivery windows without creating operational bottlenecks.",
          "Retailers can offer more flexibility while keeping delivery promises realistic.",
        ],
      },
      {
        tag: "Address accuracy",
        title: "Eliminate routing errors with intelligent geocoding",
        visual: "geocode",
        body: [
          "Eastern converts incomplete or inaccurate addresses into precise geographic coordinates before routes are assigned.",
          "Dispatch teams can identify address issues early, reducing failed deliveries, route deviations, and avoidable service delays.",
        ],
      },
      {
        tag: "Multiple delivery channels",
        title: "Utilize fleets efficiently across delivery channels",
        visual: "speed-cost",
        body: [
          "Eastern allocates orders across captive fleets and third-party carriers based on cost, delivery window, location, and available capacity — automatically, at dispatch time.",
          "Operations teams can absorb demand variation without relying on manual reallocation or underutilizing fleet capacity.",
        ],
      },
      {
        tag: "Faster parcel sorting",
        title: "Accelerate hub operations with faster parcel sorting",
        visual: "sorting",
        body: [
          "Eastern improves dispatch readiness through automated parcel sorting and optimized load sequencing at fulfillment centers.",
          "Faster sorting and loading reduce vehicle idle time and help more vehicles leave on schedule, even during peak volume periods.",
        ],
      },
      {
        tag: "Route productivity",
        title: "Increase route productivity across fulfillment networks",
        visual: "promise",
        body: [
          "Eastern aligns routing plans, delivery windows, and fleet schedules so vehicles spend less time waiting at hubs and more time completing deliveries.",
          "This increases daily route productivity and helps operations teams complete more orders per shift.",
        ],
      },
    ],
    testimonial: {
      quote:
        "We use Eastern to automatically plan our delivery routes and track our all-mile delivery. The real-time alerts and planned-vs-actual comparison have helped our operations team manage last-mile deliveries far more effectively.",
      author: "Operations Director",
      role: "High-volume e-commerce retailer",
      metric: "99.5% on-time delivery and 14% reduction in distance travelled",
    },
    impactHeading: "Proven operational impact",
    impact: [
      { value: "81%", label: "Reduction in dispatch planning time" },
      { value: "65%", label: "Reduction in sorting time" },
      { value: "27%", label: "Reduction in operational costs" },
    ],
    faqs: [
      {
        question: "How does Eastern improve e-commerce delivery operations?",
        answer:
          "Eastern automates order-to-delivery workflows by coordinating routing, dispatch planning, fleet allocation, and delivery tracking in one platform. This lets e-commerce businesses manage high delivery volumes while maintaining SLA compliance and operational efficiency.",
      },
      {
        question: "How does Eastern help reduce failed deliveries?",
        answer:
          "Eastern validates and geocodes addresses before routes are assigned, surfacing incomplete or inaccurate addresses early. Combined with capacity-aware scheduling and real-time tracking, this reduces failed deliveries, route deviations, and avoidable service delays.",
      },
      {
        question: "How does Eastern support scalable e-commerce logistics?",
        answer:
          "Eastern allocates orders across captive fleets and third-party carriers based on cost, capacity, and delivery windows, and automates sorting and load sequencing at hubs — so operations absorb demand spikes and process more orders per shift without adding manual effort.",
      },
    ],
  },
  {
    slug: "fmcg-cpg",
    name: "FMCG/CPG",
    eyebrow: "FMCG/CPG Logistics",
    icon: ShoppingBasket,
    title: "FMCG and CPG logistics excellence",
    subtitle:
      "Plan daily restocking across stores, distributors, and dark stores with capacity-aware routing, retailer-compliant delivery windows, multi-carrier dispatch, and real-time visibility — all in one platform.",
    metaDescription:
      "FMCG and CPG logistics software for daily restocking: capacity-aware routing, retailer-compliant delivery windows, multi-carrier dispatch, and real-time visibility from Eastern Fullfilment.",
    intro: {
      heading: "The complete order-to-delivery system for FMCG/CPG enterprises",
      body: "From distribution center to store shelf, distributor, and doorstep, Eastern orchestrates restocking, routing, multi-carrier dispatch, and real-time visibility in one platform — so high-frequency distribution stays compliant, efficient, and resilient through every demand cycle.",
    },
    orderFlow: {
      caption:
        "Every shipment moves through one orchestration layer — from distribution center to store shelf.",
      stages: [
        {
          icon: "clipboard-list",
          title: "Order received",
          description:
            "Restock and DTC orders are captured from every channel into a single queue.",
        },
        {
          icon: "route",
          title: "Capacity & route planned",
          description:
            "Routes are built against 250+ constraints — load type, time windows, and capacity.",
        },
        {
          icon: "truck",
          title: "Multi-carrier dispatch",
          description:
            "Orders are allocated across captive fleets and carriers by cost and delivery window.",
        },
        {
          icon: "map-pin",
          title: "In transit & tracked",
          description:
            "Every shipment is tracked across all miles with geofenced alerts on exceptions.",
        },
        {
          icon: "store",
          title: "Delivered to store & DTC",
          description:
            "Deliveries land within retailer time windows to protect on-shelf availability.",
        },
        {
          icon: "check-circle",
          title: "Proof & resolution",
          description:
            "Verified proof-of-delivery is captured and on-ground exceptions are resolved fast.",
        },
      ],
    },
    edgeHeading: "The Eastern edge",
    edge: [
      {
        tag: "Unified distribution",
        title: "Unify fulfillment across the entire distribution chain",
        visual: "lifecycle",
        body: [
          "Manage every leg — from manufacturer to distributor to retail store to DTC — within a single orchestration layer.",
          "Align order inflow with fleet capacity, carrier contracts, and route feasibility to maintain consistent service levels across warehouses, distributors, and doorstep deliveries.",
        ],
      },
      {
        tag: "Smarter restocking",
        title: "Elevate the restocking experience",
        visual: "checkout-dates",
        body: [
          "Optimize store and distributor restocking by aligning deliveries with strict retailer time windows, temperature constraints, and promo-driven demand spikes.",
          "Reduce chargebacks and protect on-shelf availability across every outlet.",
        ],
      },
      {
        tag: "Constraint-based routing",
        title: "Optimize routes using 250+ real-world constraints",
        visual: "sorting",
        body: [
          "Replace static beats with algorithmic route planning that accounts for load type, time windows, capacity, and service levels.",
          "Increase drops per route, manage mixed pallet and parcel deliveries in one trip, and reduce fleet requirements while maintaining SLA adherence.",
        ],
      },
      {
        tag: "Elastic capacity",
        title: "Handle promo spikes and seasonal demand without expanding fleet",
        visual: "speed-cost",
        body: [
          "Promotions and seasonal cycles increase volume unpredictably.",
          "Reallocate capacity dynamically and orchestrate on-demand carrier support to absorb demand surges — maintaining margins without permanent fleet expansion.",
        ],
      },
      {
        tag: "Exception control",
        title: "Track and resolve exceptions from DC to doorstep",
        visual: "promise",
        body: [
          "Monitor execution across DC → store → distributor → DTC in real time.",
          "Use geofenced alerts, automated updates, and verified proof-of-delivery for retailers to resolve on-ground exceptions quickly and protect service commitments across all miles.",
        ],
      },
    ],
    testimonial: {
      quote:
        "We use Eastern for dynamic planning to support our delivery routes, as well as for tracking all-mile delivery. Its powerful routing solution handles a wide range of business constraints — helping us increase delivery SLA to 95% and reduce the number of vehicles in use by 18% in a single year.",
      author: "GM, Supply Chain",
      role: "National FMCG distributor",
      metric: "18% reduction in vehicle expenses and 95% delivery SLA",
    },
    impactHeading: "Global results in FMCG & CPG logistics",
    impact: [
      { value: "15%", label: "Reduction in freight costs" },
      { value: "84%", label: "Reduction in planning time" },
      { value: "20%", label: "Reduction in vehicles used" },
    ],
    faqs: [
      {
        question: "How does Eastern help optimize FMCG/CPG distribution networks?",
        answer:
          "Eastern unifies planning, routing, dispatch, and tracking across the entire chain — manufacturer to distributor to store to DTC. Constraint-based optimization increases drops per route and reduces fleet needs while keeping deliveries within retailer time windows.",
      },
      {
        question: "How does Eastern ensure visibility in FMCG supply chain operations?",
        answer:
          "End-to-end visibility across all miles with real-time tracking, geofenced alerts, and turn-by-turn updates. Dispatchers see every shipment and driver and can respond to exceptions in real time to maintain speed and reliability.",
      },
      {
        question: "What FMCG logistics challenges can technology solve?",
        answer:
          "Strict retailer delivery windows, temperature constraints, unpredictable promo and seasonal spikes, chargebacks, and underused fleet capacity — all addressed through capacity-aware routing, multi-carrier dispatch, and proof-of-delivery.",
      },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    eyebrow: "Manufacturing & Distribution",
    icon: Factory,
    title: "Warehousing and distribution that keeps lines moving",
    subtitle:
      "From raw-material storage to finished-goods distribution, we handle the logistics so your team can focus on production — with lot tracking and B2B fulfillment built in.",
    metaDescription:
      "Manufacturing logistics with raw-material and finished-goods warehousing, lot tracking, kitting, and B2B distribution. Eastern Fullfilment keeps production lines moving.",
    challengesHeading:
      "What we solve for manufacturers",
    stats: [
      { value: "Lot-level", label: "Traceability" },
      { value: "B2B", label: "Distribution" },
      { value: "Kitting", label: "& assembly" },
      { value: "99.4%", label: "Pick accuracy" },
    ],
    features: [
      {
        icon: Warehouse,
        title: "Material & goods storage",
        description:
          "Store raw materials and finished goods with the space and handling each requires.",
      },
      {
        icon: Layers,
        title: "Lot & batch tracking",
        description:
          "Track inventory by lot and batch for full traceability and recall readiness.",
      },
      {
        icon: Workflow,
        title: "Kitting & assembly",
        description:
          "Bundle components into finished kits and ready-to-sell units before they ship.",
      },
      {
        icon: Truck,
        title: "B2B distribution",
        description:
          "Ship to distributors, retailers, and job sites with LTL, FTL, and parcel options.",
      },
      {
        icon: Clock,
        title: "Just-in-time delivery",
        description:
          "Schedule shipments to arrive exactly when your partners need them.",
      },
      {
        icon: ShieldCheck,
        title: "Quality & compliance",
        description:
          "Inspect inbound goods and maintain the documentation your contracts require.",
      },
    ],
    steps: [
      {
        title: "Receive inbound",
        description:
          "We take in raw materials and finished goods, inspect, and shelve them.",
      },
      {
        title: "Track by lot",
        description:
          "Every unit is recorded by lot and batch for end-to-end traceability.",
      },
      {
        title: "Kit and assemble",
        description:
          "Components are bundled into finished, ready-to-ship units on demand.",
      },
      {
        title: "Distribute on time",
        description:
          "Orders ship to partners and customers on the schedule you set.",
      },
    ],
    benefits: [
      "Free your team from warehousing and shipping overhead",
      "Stay recall-ready with full lot and batch traceability",
      "Offload kitting and assembly to a dedicated team",
      "Reach distributors and retailers with flexible freight",
      "Hit just-in-time windows your partners depend on",
    ],
    faqs: [
      {
        question: "Do you track inventory by lot or batch?",
        answer:
          "Yes. Every unit is recorded by lot and batch, giving you full traceability and recall readiness across raw materials and finished goods.",
      },
      {
        question: "Can you handle kitting and assembly?",
        answer:
          "We bundle components into finished kits and ready-to-sell units, so products leave the warehouse complete and ready to ship.",
      },
      {
        question: "What shipping options do you offer?",
        answer:
          "LTL, FTL, and parcel — we route each B2B and B2C order to the right freight mode for cost and timing.",
      },
      {
        question: "Can you support just-in-time delivery?",
        answer:
          "Yes. Shipments are scheduled to arrive exactly when your distributors, retailers, or job sites need them.",
      },
    ],
  },
  {
    slug: "3pl",
    name: "Third-Party Logistics",
    eyebrow: "3PL & Logistics Providers",
    icon: Boxes,
    title: "The platform behind your logistics business",
    subtitle:
      "Run your fulfillment operation on infrastructure built for 3PLs — multi-client inventory, branded client portals, and usage-based billing that scales as you grow.",
    metaDescription:
      "3PL fulfillment infrastructure with multi-client inventory, branded client portals, and automated billing. Eastern Fullfilment powers logistics providers at scale.",
    challengesHeading:
      "What we solve for 3PL providers",
    stats: [
      { value: "Multi-client", label: "Inventory" },
      { value: "Branded", label: "Client portals" },
      { value: "24/7", label: "Client access" },
      { value: "Usage-based", label: "Billing" },
    ],
    features: [
      {
        icon: Users,
        title: "Multi-client management",
        description:
          "Keep every client's inventory, orders, and billing cleanly separated under one operation.",
      },
      {
        icon: Globe,
        title: "Branded client portals",
        description:
          "Give each client a portal in your brand to track inventory, orders, and shipments 24/7.",
      },
      {
        icon: Receipt,
        title: "Automated billing",
        description:
          "Meter storage, pick-pack, and shipping per client and generate invoices automatically.",
      },
      {
        icon: Workflow,
        title: "Configurable workflows",
        description:
          "Set per-client rules for receiving, packing, and shipping without custom code.",
      },
      {
        icon: TrendingUp,
        title: "Scale on demand",
        description:
          "Onboard new clients fast and grow volume without re-platforming your stack.",
      },
      {
        icon: BarChart3,
        title: "Operational visibility",
        description:
          "Monitor SLAs, throughput, and margins across your whole book of clients.",
      },
    ],
    steps: [
      {
        title: "Onboard a client",
        description:
          "Spin up a new client with their own inventory, rules, and branded portal.",
      },
      {
        title: "Configure workflows",
        description:
          "Set receiving, packing, and shipping rules per client — no engineering needed.",
      },
      {
        title: "Run operations",
        description:
          "Fulfill every client's orders from one system with clean separation.",
      },
      {
        title: "Bill automatically",
        description:
          "Usage is metered per client and invoiced without manual reconciliation.",
      },
    ],
    benefits: [
      "Manage every client cleanly from one operation",
      "Offer branded, self-serve portals your clients love",
      "Bill accurately with automated usage metering",
      "Onboard new clients without re-platforming",
      "See SLAs and margins across your whole book",
    ],
    faqs: [
      {
        question: "Can I keep clients' inventory separated?",
        answer:
          "Yes. Each client's inventory, orders, and billing are cleanly separated while you run everything from one operation.",
      },
      {
        question: "Do my clients get their own portal?",
        answer:
          "Each client gets a portal in your brand to track inventory, orders, shipments, and billing 24/7 — no calls or emails needed.",
      },
      {
        question: "How does billing work?",
        answer:
          "Storage, pick-pack, and shipping are metered per client and invoiced automatically, so your billing scales with your volume.",
      },
      {
        question: "Can I configure workflows per client?",
        answer:
          "Yes. Set receiving, packing, and shipping rules for each client without writing custom code.",
      },
    ],
  },
];

/** Look up an industry by its URL slug. */
export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
