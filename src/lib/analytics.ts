/**
 * Google Analytics 4 (gtag.js) plumbing.
 *
 * The tag itself is loaded by `<Analytics />` (see components/site/analytics.tsx),
 * which also handles the events that can be derived from the DOM — page views,
 * outbound/mailto/tel clicks, downloads, scroll depth, and section visibility.
 *
 * Everything else is reported explicitly from the component that owns the
 * interaction, either by calling `trackEvent` (client components) or by
 * spreading `gaAttrs()` onto an element (server components, no JS shipped).
 *
 * Event names follow GA4 conventions: snake_case, and the
 * "recommended event" names (page_view, generate_lead, search, select_content,
 * video_*, file_download) are reused wherever the interaction matches so the
 * data lines up with GA's built-in reports.
 */

/** Measurement ID. Override per-environment with NEXT_PUBLIC_GA_MEASUREMENT_ID. */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-M1V15MW8B4";

/** Set NEXT_PUBLIC_GA_MEASUREMENT_ID="" to disable analytics (e.g. previews). */
export const analyticsEnabled = GA_MEASUREMENT_ID.length > 0;

type GaParamValue = string | number | boolean | null | undefined;
export type GaParams = Record<string, GaParamValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Call the gtag shim installed by the init script. Falls back to pushing onto
 * `dataLayer` directly for the window between the init script running and
 * gtag.js finishing its download.
 */
export function gtag(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(args);
}

/** Drop empty params so GA never records `undefined`/`null` strings. */
function clean(params: GaParams): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    out[key] = value;
  }
  return out;
}

/** Send a GA4 event. No-op on the server or when analytics is disabled. */
export function trackEvent(name: string, params: GaParams = {}): void {
  if (!analyticsEnabled || typeof window === "undefined") return;
  gtag("event", name, clean(params));
}

/**
 * Send a manual `page_view`. The tag is configured with `send_page_view: false`
 * so the App Router — not gtag's history heuristics — decides when a view
 * happened, which keeps client-side navigations from being double counted.
 */
export function trackPageView(path: string): void {
  if (!analyticsEnabled || typeof window === "undefined") return;
  gtag("event", "page_view", {
    page_location: `${window.location.origin}${path}`,
    page_path: path,
    page_title: document.title,
  });
}

/** Text label for an element, trimmed to something GA won't truncate oddly. */
export function labelOf(el: Element | null | undefined, max = 100): string {
  const text = (el?.textContent ?? "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function toKebab(key: string): string {
  return key.replace(/_/g, "-").toLowerCase();
}

/**
 * Build `data-ga-*` attributes for an element so `<Analytics />` can report the
 * click. Lets server components stay server components:
 *
 * ```tsx
 * <a href="#contact" {...gaAttrs("cta_click", { cta_location: "hero" })}>…</a>
 * ```
 *
 * Keys round-trip: `cta_location` → `data-ga-cta-location` → `cta_location`.
 */
export function gaAttrs(
  event: string,
  params: GaParams = {},
): Record<string, string> {
  const attrs: Record<string, string> = { "data-ga-event": event };
  for (const [key, value] of Object.entries(clean(params))) {
    attrs[`data-ga-${toKebab(key)}`] = String(value);
  }
  return attrs;
}

/**
 * Mark a section so a `view_section` event fires the first time it scrolls
 * into view. Used to measure how far down the page visitors actually get.
 */
export function gaViewAttrs(section: string): Record<string, string> {
  return { "data-ga-view": section };
}
