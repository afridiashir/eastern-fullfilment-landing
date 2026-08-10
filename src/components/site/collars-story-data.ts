/**
 * Shared source for the Collars & Co client story — used by both the long-form
 * timeline section and the pinned case-study section.
 */

export type Milestone = {
  period: string;
  title: string;
  body: string;
  /** Optional emphasised line rendered under the body copy. */
  callout?: string;
  image: { src: string; alt: string; aspect: string };
};

export const milestones: Milestone[] = [
  {
    period: "July 2021",
    title: "The start",
    body: "A men's clothing startup hands us three SKUs to see how we handle them. We ship their first order that week. Twelve months later, their cost per order is down 30%.",
    image: {
      src: "/collars-co/warehouse.jpeg",
      alt: "Warehouse crew installing pallet racking at the Eastern Fulfillment facility",
      aspect: "aspect-[4/3]",
    },
  },
  {
    period: "November 2022",
    title: "The spike",
    body: "Justin Baer pitches on Shark Tank. Mark Cuban and Peter Jones invest. Traffic quadruples overnight, and daily orders go from 50 to 300 inside a week.",
    callout: "No backlog. No missed cutoff. No 2 a.m. phone call.",
    image: {
      src: "/collars-co/leadership.jpeg",
      alt: "Collars & Co and Eastern Fulfillment leadership together at an evening event",
      aspect: "aspect-[4/5]",
    },
  },
  {
    period: "November 2023",
    title: "The catalog",
    body: "Sweaters, outerwear, new collar styles â€” 100+ SKUs added in twelve months. We re-slotted the pick faces and rebuilt the pick paths, so a catalog thirty times larger didn't mean pick times thirty times longer.",
    image: {
      src: "/collars-co/warehouse-build.jpeg",
      alt: "Team rebuilding shelving levels to re-slot an expanded Collars & Co catalog",
      aspect: "aspect-[4/3]",
    },
  },
  {
    period: "2024 to 2025",
    title: "The ceiling moves",
    body: "Daily capacity clears 2,500 orders. Q4 peaks and TV-driven surges absorbed without a temp-labor scramble.",
    image: {
      src: "/collars-co/team.jpeg",
      alt: "The Eastern Fulfillment floor team on the warehouse stairs",
      aspect: "aspect-[4/5]",
    },
  },
  {
    period: "July 2026",
    title: "One million",
    body: "250+ SKUs. 0.40% order-issue rate across the life of the account.",
    image: {
      src: "/collars-co/showroom.jpeg",
      alt: "Collars & Co and Eastern Fulfillment at the Collars & Co showroom",
      aspect: "aspect-[4/5]",
    },
  },
];

export type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
};

export const stats: Stat[] = [
  { value: 1_000_000, label: "Orders shipped since 2021" },
  { value: 250, suffix: "+", label: "Active SKUs" },
  { value: 0.4, suffix: "%", decimals: 2, label: "Order-issue rate, lifetime" },
  { value: 2500, suffix: "+", label: "Daily order capacity" },
];

export function formatStat(value: number, decimals = 0, suffix = "") {
  return (
    value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + suffix
  );
}
