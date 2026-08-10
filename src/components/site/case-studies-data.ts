export type CaseStudy = {
  brand: string;
  heading: string;
  body: string[];
  stats: { value: string; label: string }[];
  quote: string;
  name: string;
  role: string;
  thumbnail: string;
  // Placeholder — swap for the real client testimonial clip per brand.
  videoSrc: string;
};

export const caseStudies: CaseStudy[] = [
  {
    brand: "Collars & Co",
    heading:
      "How Collars & Co scaled to 9-figure sales without breaking fulfillment",
    body: [
      "Collars & Co went from a fast-growing DTC menswear brand to a 9-figure business in under three years. As order volume multiplied — especially during peak launches — Eastern kept pace with multi-warehouse coverage, real-time inventory sync, and surge capacity that scaled up without adding lead time.",
      "No stockouts, no shipping delays, no fulfillment bottleneck slowing down marketing — just consistent, on-time delivery at every stage of their growth.",
    ],
    stats: [
      { value: "9-figure", label: "Annual revenue milestone" },
      { value: "6x", label: "Order volume growth" },
      { value: "99.9%", label: "On-time shipment rate" },
      { value: "0", label: "Stockouts during peak season" },
    ],
    quote:
      "Eastern didn’t just keep up with our growth — they made it possible.",
    name: "Ryan Bennett",
    role: "Co-Founder, Collars & Co",
    thumbnail:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
  {
    brand: "Aurelia Skincare",
    heading:
      "How Aurelia Skincare absorbed a 40x order spike without missing a ship date",
    body: [
      "When a single video sent Aurelia Skincare viral overnight, daily orders jumped 40x in under a week. Eastern’s on-demand warehouse capacity and cross-dock network meant fulfillment never paused — inventory synced live and every order still shipped same day.",
      "What could have been a customer-experience disaster became their biggest month ever.",
    ],
    stats: [
      { value: "40x", label: "Order spike absorbed" },
      { value: "98%", label: "Same-day ship rate in the surge" },
      { value: "3", label: "Warehouses added in 60 days" },
      { value: "4.8/5", label: "Post-purchase rating" },
    ],
    quote:
      "The spike could have sunk us. Instead it became our biggest month ever.",
    name: "Sofia Marsh",
    role: "Founder, Aurelia Skincare",
    thumbnail:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
  {
    brand: "Trail & Summit Outdoor Co.",
    heading:
      "How Trail & Summit hit every Black Friday cutoff — three years running",
    body: [
      "Bulky outdoor gear and holiday peak volume used to mean missed cutoffs and rising freight costs. Eastern’s carrier mix, zone-skipping, and dedicated peak-season staffing let Trail & Summit ship every BFCM order on time while cutting freight spend.",
    ],
    stats: [
      { value: "0", label: "Missed Black Friday cutoffs" },
      { value: "35%", label: "Reduction in freight cost" },
      { value: "2-day", label: "Nationwide delivery coverage" },
      { value: "3 yrs", label: "Running without a peak delay" },
    ],
    quote:
      "Every other 3PL told us peak season was just going to be rough. Eastern made it a non-event.",
    name: "Derek Holloway",
    role: "VP Operations, Trail & Summit Outdoor Co.",
    thumbnail:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
  {
    brand: "Home & Hearth Living",
    heading: "How Home & Hearth Living turned returns into repeat customers",
    body: [
      "Returns were a black hole before Eastern — slow refunds, no visibility, unhappy customers. With automated reverse logistics and same-day return processing, Home & Hearth turned a pain point into a retention driver.",
    ],
    stats: [
      { value: "92%", label: "Returns processed within 24h" },
      { value: "4.9/5", label: "Post-purchase satisfaction" },
      { value: "18%", label: "Increase in repeat purchases" },
      { value: "100%", label: "Return visibility for the team" },
    ],
    quote:
      "Customers now expect fast returns as much as fast shipping. Eastern lets us deliver both.",
    name: "Priya Chandran",
    role: "COO, Home & Hearth Living",
    thumbnail:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80&auto=format&fit=crop",
    videoSrc: "/eastern-demo.mp4",
  },
];
