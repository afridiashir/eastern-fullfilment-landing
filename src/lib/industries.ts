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
  Boxes,
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
        image:
          "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1000&q=70",
        imageAlt:
          "Aerial view of delivery trucks lined up at warehouse loading docks",
        visual: "activity",
        body: [
          "Eastern groups orders, plans routes, and schedules deliveries from a centralized dispatch interface, reducing manual planning effort for high-volume operations.",
          "Teams can process more daily orders while keeping fleet utilization and SLA performance under control.",
        ],
      },
      {
        tag: "Flexible delivery options",
        title: "Offer the flexible delivery options customers expect",
        image:
          "https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Customer placing an online order on a laptop",
        visual: "checkout-dates",
        body: [
          "Connect delivery-slot selection and rescheduling workflows with capacity-aware planning, so customers can choose convenient delivery windows without creating operational bottlenecks.",
          "Retailers can offer more flexibility while keeping delivery promises realistic.",
        ],
      },
      {
        tag: "Address accuracy",
        title: "Eliminate routing errors with intelligent geocoding",
        image:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=70",
        imageAlt:
          "Detailed world map representing address geocoding and coverage",
        visual: "geocode",
        body: [
          "Eastern converts incomplete or inaccurate addresses into precise geographic coordinates before routes are assigned.",
          "Dispatch teams can identify address issues early, reducing failed deliveries, route deviations, and avoidable service delays.",
        ],
      },
      {
        tag: "Multiple delivery channels",
        title: "Utilize fleets efficiently across delivery channels",
        image:
          "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Container ships and cranes at a busy shipping port",
        visual: "speed-cost",
        body: [
          "Eastern allocates orders across captive fleets and third-party carriers based on cost, delivery window, location, and available capacity — automatically, at dispatch time.",
          "Operations teams can absorb demand variation without relying on manual reallocation or underutilizing fleet capacity.",
        ],
      },
      {
        tag: "Faster parcel sorting",
        title: "Accelerate hub operations with faster parcel sorting",
        image:
          "https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&w=1000&q=70",
        imageAlt:
          "Workers moving cartons across a busy fulfillment warehouse floor",
        visual: "sorting",
        body: [
          "Eastern improves dispatch readiness through automated parcel sorting and optimized load sequencing at fulfillment centers.",
          "Faster sorting and loading reduce vehicle idle time and help more vehicles leave on schedule, even during peak volume periods.",
        ],
      },
      {
        tag: "Route productivity",
        title: "Increase route productivity across fulfillment networks",
        image:
          "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Delivery truck traveling a highway route at dusk",
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
        image:
          "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Container ships and cranes at a shipping port",
        visual: "lifecycle",
        body: [
          "Manage every leg — from manufacturer to distributor to retail store to DTC — within a single orchestration layer.",
          "Align order inflow with fleet capacity, carrier contracts, and route feasibility to maintain consistent service levels across warehouses, distributors, and doorstep deliveries.",
        ],
      },
      {
        tag: "Smarter restocking",
        title: "Elevate the restocking experience",
        image:
          "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Fully stocked supermarket aisle shelves",
        visual: "checkout-dates",
        body: [
          "Optimize store and distributor restocking by aligning deliveries with strict retailer time windows, temperature constraints, and promo-driven demand spikes.",
          "Reduce chargebacks and protect on-shelf availability across every outlet.",
        ],
      },
      {
        tag: "Constraint-based routing",
        title: "Optimize routes using 250+ real-world constraints",
        image:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=70",
        imageAlt:
          "World map representing multi-stop route planning across regions",
        visual: "sorting",
        body: [
          "Replace static beats with algorithmic route planning that accounts for load type, time windows, capacity, and service levels.",
          "Increase drops per route, manage mixed pallet and parcel deliveries in one trip, and reduce fleet requirements while maintaining SLA adherence.",
        ],
      },
      {
        tag: "Elastic capacity",
        title: "Handle promo spikes and seasonal demand without expanding fleet",
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=70",
        imageAlt:
          "Busy fulfillment center with sorted parcels during peak volume",
        visual: "speed-cost",
        body: [
          "Promotions and seasonal cycles increase volume unpredictably.",
          "Reallocate capacity dynamically and orchestrate on-demand carrier support to absorb demand surges — maintaining margins without permanent fleet expansion.",
        ],
      },
      {
        tag: "Exception control",
        title: "Track and resolve exceptions from DC to doorstep",
        image:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Freight truck delivering goods across the all-mile route",
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
    eyebrow: "Manufacturing Logistics",
    icon: Factory,
    title:
      "Cut logistics costs and hit SLAs across every delivery with a manufacturing TMS",
    subtitle:
      "Manufacturers running thousands of daily deliveries across plants, distribution centers, and third-party carriers carry enterprise logistics complexity. Eastern is a decision-intelligent TMS that connects dispatch planning, carrier allocation, route optimization, and delivery execution — so teams cut logistics costs, improve SLA adherence, and scale with control.",
    metaDescription:
      "A decision-intelligent manufacturing TMS connecting dispatch planning, carrier allocation, route optimization, and delivery execution. Eastern Fullfilment cuts logistics costs and improves SLA adherence.",
    intro: {
      heading:
        "Manufacturing logistics breaks without coordinated planning and execution",
      body: "Manufacturing distribution is fragmented by design — multiple plants, fluctuating output, mixed fleets, and strict delivery commitments. When dispatch, fleet, carrier, and SLA decisions are made in isolation, plans fail in execution, capacity goes underused, and visibility disappears once shipments leave the facility. Eastern replaces fragmented workflows with a single decision layer across planning and execution.",
    },
    orderFlow: {
      caption:
        "From ERP order intake to proof of delivery — one decision layer across planning and execution.",
      stages: [
        {
          icon: "clipboard-list",
          title: "Consolidate dispatch demand",
          description:
            "Ingest order volumes from ERP and OMS and prioritize dispatch by commitment, capacity, and constraints.",
        },
        {
          icon: "truck",
          title: "Assign fleets & carriers",
          description:
            "Allocate shipments across owned fleets and carriers by capacity, cost, and lane performance — automatically.",
        },
        {
          icon: "route",
          title: "Generate constraint-based routes",
          description:
            "Build feasible plans from delivery windows, volumes, vehicle capacity, and driver shifts.",
        },
        {
          icon: "map-pin",
          title: "Execute with live visibility",
          description:
            "Track shipments with predictive ETAs and exception alerts so teams intervene before delays hit.",
        },
        {
          icon: "check-circle",
          title: "Close the loop",
          description:
            "Capture proof of delivery and execution data to monitor SLA adherence and settlement accuracy.",
        },
      ],
    },
    edgeHeading: "The Eastern edge",
    edge: [
      {
        tag: "Control tower",
        title: "Operate with a unified logistics control tower",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=70",
        imageAlt:
          "Operations engineer monitoring live logistics data on a screen",
        visual: "updates",
        body: [
          "Get a centralized view across dispatch, routing, and delivery execution with predictive ETAs, real-time tracking, and exception alerts.",
          "Identify delays early and improve SLA adherence across every shipment.",
        ],
      },
      {
        tag: "Carrier allocation",
        title: "Automate carrier allocation across 1,000+ partners",
        image:
          "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Container ships and cranes at a shipping port",
        visual: "speed-cost",
        body: [
          "Automated tendering spans owned fleets and 1,000+ pre-integrated carriers.",
          "Allocation decisions weigh capacity, contracted rates, lane performance, and delivery timelines so the right carrier handles each shipment.",
        ],
      },
      {
        tag: "Constraint-based decisions",
        title: "Optimize logistics decisions across 250+ constraints",
        image:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "World map representing network-wide routing constraints",
        visual: "geocode",
        body: [
          "Dispatch and routing decisions account for delivery windows, shipment size, vehicle capacity, driver shifts, and network constraints together — not in isolation.",
          "Plans stay feasible at scale, so dispatch decisions hold up in execution.",
        ],
      },
      {
        tag: "Planning + execution",
        title: "Connect planning systems with execution workflows",
        image:
          "https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Workers and goods moving across a manufacturing floor",
        visual: "lifecycle",
        body: [
          "Eastern integrates with ERP and OMS systems to ingest order volumes, capacity inputs, and delivery commitments.",
          "Plans are continuously updated as real-world conditions change on the ground.",
        ],
      },
      {
        tag: "Faster planning",
        title: "Plan capacity and schedules faster",
        image:
          "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Aerial view of trucks staged at warehouse loading docks",
        visual: "activity",
        body: [
          "Shift from manual planning to automated schedule generation.",
          "Align fleet capacity, driver schedules, and dispatch plans ahead of demand spikes, holidays, and seasonal cycles.",
        ],
      },
    ],
    testimonial: {
      quote:
        "We leveraged Eastern's intelligent dispatch management to maintain high levels of operational efficiency. With Eastern, we were able to plan, execute, and streamline our entire supply chain — from managing customers, drivers, and locations to sellers.",
      author: "Deputy Supply Chain Director",
      role: "Enterprise manufacturer",
      metric: "90% increase in SLA adherence and 100% digitized proof-of-delivery",
    },
    faqs: [
      {
        question: "How does Eastern help manufacturers manage high-volume distribution?",
        answer:
          "Eastern plans dispatch, allocates shipments, optimizes routes, and tracks deliveries across plants, distribution centers, owned fleets, and third-party carriers — giving operations teams control over large distribution networks and the ability to execute at scale.",
      },
      {
        question: "Can Eastern manage both owned fleets and third-party carriers?",
        answer:
          "Yes. Automated tendering allocates each shipment across owned fleets and 1,000+ pre-integrated carriers based on capacity, contracted rates, lane performance, and delivery timelines.",
      },
      {
        question: "How does Eastern improve visibility across manufacturing deliveries?",
        answer:
          "Shipments are tracked with predictive ETAs, live status updates, and exception alerts, with digital proof-of-delivery captured at the doorstep — so teams intervene before delays affect downstream schedules or customers.",
      },
      {
        question: "What results have manufacturers achieved with Eastern?",
        answer:
          "Manufacturers use Eastern to cut logistics costs, raise SLA adherence, and digitize proof-of-delivery while scaling distribution without proportionally increasing overhead.",
      },
    ],
  },
  {
    slug: "3pl",
    name: "3PL & CEP",
    eyebrow: "3PL & CEP Logistics",
    icon: Boxes,
    title:
      "3PL and CEP logistics management software for high-performance fulfillment",
    subtitle:
      "Operate every hub and route with real-time visibility, accurate ETAs, and digital proof-of-delivery. Eastern coordinates order intake, parcel sortation, route planning, transporter management, and driver workflows in one system — so your network moves more packages per day at lower cost.",
    metaDescription:
      "3PL and CEP logistics software: multi-shipper orchestration, parcel sortation, dynamic routing, carrier management, and real-time visibility with digital proof-of-delivery from Eastern Fullfilment.",
    intro: {
      heading: "The complete order-to-delivery system for 3PL & CEP enterprises",
      body: "Eastern coordinates order intake, parcel sortation, route planning, transporter management, and driver workflows in one platform — so 3PL and CEP networks run every hub and route with real-time visibility, accurate ETAs, and digital proof-of-delivery, moving more packages per day at lower cost.",
    },
    orderFlow: {
      caption:
        "Every parcel moves through one platform — from multi-shipper intake to digital proof-of-delivery.",
      stages: [
        {
          icon: "clipboard-list",
          title: "Order intake",
          description:
            "Multi-shipper orders are received and prioritized by SLA in one queue.",
        },
        {
          icon: "package",
          title: "Parcel sortation",
          description:
            "Parcels are sorted and load-sequenced directly against route logic.",
        },
        {
          icon: "route",
          title: "Route planned",
          description:
            "Routes adapt to traffic, capacity, dock availability, and service levels.",
        },
        {
          icon: "truck",
          title: "Dispatched",
          description:
            "Volume is allocated across captive fleets and carriers at dispatch time.",
        },
        {
          icon: "map-pin",
          title: "Tracked to doorstep",
          description:
            "Every shipment streams live ETAs and geofenced exception alerts.",
        },
        {
          icon: "check-circle",
          title: "Proof of delivery",
          description:
            "Drivers capture digital proof-of-delivery for full shipper transparency.",
        },
      ],
    },
    edgeHeading: "The Eastern edge",
    edge: [
      {
        tag: "Multi-shipper orchestration",
        title: "Centralize multi-shipper order orchestration",
        image:
          "https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Operator managing shipment orders on a laptop",
        visual: "lifecycle",
        body: [
          "Manage on-demand and scheduled shipments for multiple shippers within a single platform. Configure workflows by SLA, contract, and service model without switching systems.",
          "Unify order intake, prioritization, dispatch planning, and proof-of-delivery in one system — reducing manual handoffs while delivering a consistent fulfillment experience across clients.",
        ],
      },
      {
        tag: "Dynamic routing",
        title: "Increase deliveries per route with dynamic route optimization",
        image:
          "https://images.unsplash.com/photo-1473445730015-841f29a9490b?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Delivery truck traveling a highway route at dusk",
        visual: "promise",
        body: [
          "Plan routes that adapt to traffic, dock availability, vehicle capacity, and service-level commitments in real time.",
          "Continuous optimization improves route density, accommodates on-demand orders, and lowers cost per order — moving more packages per vehicle without adding fleet.",
        ],
      },
      {
        tag: "Hub sortation",
        title: "Optimize hub sortation and load planning",
        image:
          "https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Workers sorting cartons across a busy hub floor",
        visual: "sorting",
        body: [
          "Reduce time-under-roof with automated parcel sortation aligned directly to route logic. Allocate orders dynamically based on vehicle type, capacity, shipper SLAs, traffic patterns, and dock constraints.",
          "Balance on-demand and scheduled volumes while maintaining service levels and improving fleet productivity.",
        ],
      },
      {
        tag: "Address accuracy",
        title: "Improve first-attempt delivery rates with intelligent geocoding",
        image:
          "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "World map representing precise address geocoding",
        visual: "geocode",
        body: [
          "Convert incomplete or unclear addresses into precise coordinates with built-in geocoding and location-learning technology.",
          "By aligning address intelligence with route allocation, reduce failed deliveries and costly re-attempts while improving first-attempt delivery rates (FADR).",
        ],
      },
      {
        tag: "Carrier management",
        title: "Automate carrier and transporter management",
        image:
          "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Container ships and cranes at a shipping port",
        visual: "speed-cost",
        body: [
          "Control carrier contracts, performance, and reconciliations with integrated carrier-management software.",
          "Validate transporter rates automatically, benchmark performance across lanes, and reduce billing disputes to protect margins as volume scales across regional and national networks.",
        ],
      },
      {
        tag: "Elastic scale",
        title: "Scale 3PL and courier operations without increasing cost",
        image:
          "https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Aerial view of trucks lined up at warehouse loading docks",
        visual: "activity",
        body: [
          "Allocate capacity dynamically across hubs, fleets, and carriers during seasonal spikes and demand surges.",
          "Scale nodes, routes, and shipment volumes without proportionally increasing overhead or cost per order.",
        ],
      },
      {
        tag: "Real-time visibility",
        title: "Deliver real-time visibility across every hub and route",
        image:
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Operator monitoring live shipment data on a screen",
        visual: "updates",
        body: [
          "Monitor shipments across hubs and last-mile routes with live tracking, accurate ETAs, and automated exception alerts.",
          "Capture digital proof-of-delivery to give shippers transparency and reduce disputes — resolving issues before they impact SLA adherence or customer satisfaction.",
        ],
      },
      {
        tag: "Driver enablement",
        title: "Equip drivers with integrated fleet management",
        visual: "activity",
        body: [
          "Give drivers a dedicated mobile app for task sequencing, real-time navigation, and digital proof-of-delivery capture.",
          "Integrated fleet-management software improves route adherence, increases first-attempt success, and strengthens operational control across high-volume courier networks.",
        ],
      },
      {
        tag: "Shipper experience",
        title: "Deliver a captive-fleet experience to shippers",
        image:
          "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=70",
        imageAlt: "Freight truck delivering goods across the all-mile route",
        visual: "promise",
        body: [
          "Provide white-labeled tracking, accurate ETAs, and real-time status updates across every shipment.",
          "Offer shippers visibility and control comparable to a captive fleet, even across multi-carrier networks.",
        ],
      },
    ],
    testimonial: {
      quote:
        "Eastern has elevated our logistics operations to new heights of performance and productivity. Advanced parcel sorting, combined with geocoding and route allocation, has transformed our order processing — delivering faster order cycle times and 95% route-mapping accuracy.",
      author: "GM, Operations",
      role: "National courier & 3PL network",
      metric: "65% reduction in sorting time and 27% more deliveries per day",
    },
    impactHeading: "Our global impact",
    impact: [
      { value: "81%", label: "Reduction in dispatch planning time" },
      { value: "65%", label: "Reduction in sorting time" },
      { value: "27%", label: "Reduction in operational costs" },
    ],
    faqs: [
      {
        question:
          "How does Eastern help 3PL and CEP operators move more packages at lower cost?",
        answer:
          "Eastern coordinates order intake, parcel sortation, dynamic routing, carrier management, and driver workflows in one platform. Continuous route optimization increases deliveries per vehicle while automated sortation reduces time-under-roof — moving more packages per day without adding fleet.",
      },
      {
        question: "Can Eastern manage multiple shippers from one system?",
        answer:
          "Yes. Manage on-demand and scheduled shipments for many shippers in a single platform, with workflows configured by SLA, contract, and service model — and a consistent fulfillment experience across every client.",
      },
      {
        question: "How does Eastern give shippers visibility into their shipments?",
        answer:
          "Eastern provides white-labeled tracking, accurate ETAs, real-time status, and digital proof-of-delivery across multi-carrier networks — giving shippers visibility and control comparable to a captive fleet, with exception alerts that resolve issues before they impact SLAs.",
      },
    ],
  },
];

/** Look up an industry by its URL slug. */
export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
