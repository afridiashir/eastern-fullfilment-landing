"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  GA_MEASUREMENT_ID,
  analyticsEnabled,
  labelOf,
  trackEvent,
  trackPageView,
} from "@/lib/analytics";

/** Extensions treated as a `file_download` when linked to. */
const DOWNLOAD_EXTENSIONS =
  /\.(pdf|docx?|xlsx?|pptx?|csv|txt|zip|rar|7z|gz|dmg|exe|pkg|mp3|mp4|mov)$/i;

/** Scroll milestones reported once per page view. */
const SCROLL_MILESTONES = [25, 50, 75, 90] as const;

/**
 * Loads gtag.js and reports every event that can be observed from the DOM:
 *
 * - `page_view`      — on first load and on every App Router navigation
 * - `click`          — outbound links (`outbound: true`)
 * - `file_download`  — links to documents/media
 * - `contact_click`  — `mailto:` and `tel:` links
 * - `scroll_depth`   — 25 / 50 / 75 / 90% of the page
 * - `view_section`   — first time a `data-ga-view` section is seen
 * - anything tagged with `data-ga-event` (see `gaAttrs` in lib/analytics)
 *
 * Interactions that only exist in React state (form submits, video progress,
 * accordion toggles…) are reported by the owning component via `trackEvent`.
 */
export function Analytics() {
  if (!analyticsEnabled) return null;

  return (
    <>
      <Script
        id="ga-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`}
      </Script>
      {/* useSearchParams needs a boundary so pages can still be prerendered. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      <InteractionTracker />
    </>
  );
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    trackPageView(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

function InteractionTracker() {
  // Milestones and section views reset on every navigation.
  const pathname = usePathname();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const tagged = target.closest<HTMLElement>("[data-ga-event]");
      if (tagged) {
        const name = tagged.getAttribute("data-ga-event");
        if (name) trackEvent(resolveEventName(name, tagged), readGaParams(tagged));
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const text = labelOf(link) || link.getAttribute("aria-label") || "";

      if (href.startsWith("mailto:")) {
        trackEvent("contact_click", {
          method: "email",
          contact_target: href.slice(7),
          link_text: text,
        });
        return;
      }

      if (href.startsWith("tel:")) {
        trackEvent("contact_click", {
          method: "phone",
          contact_target: href.slice(4),
          link_text: text,
        });
        return;
      }

      // Anchors, `#`, and javascript: links aren't navigations worth counting.
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;

      let url: URL;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") return;

      if (DOWNLOAD_EXTENSIONS.test(url.pathname)) {
        const file = url.pathname.split("/").pop() ?? url.pathname;
        trackEvent("file_download", {
          file_name: file,
          file_extension: file.split(".").pop(),
          link_url: url.href,
          link_text: text,
        });
        return;
      }

      if (url.hostname !== window.location.hostname) {
        trackEvent("click", {
          outbound: true,
          link_url: url.href,
          link_domain: url.hostname,
          link_text: text,
        });
      }
    };

    // Capture phase, so a handler that stops propagation can't hide the click.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Scroll depth.
  useEffect(() => {
    const reached = new Set<number>();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const percent = ((window.scrollY || doc.scrollTop) / scrollable) * 100;

      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent("scroll_depth", {
            percent_scrolled: milestone,
            page_path: pathname,
          });
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Section visibility (`data-ga-view="pricing"` → view_section).
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-ga-view]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          trackEvent("view_section", {
            section: el.getAttribute("data-ga-view") ?? "",
            page_path: pathname,
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

/**
 * `faq_toggle` on a native `<details>` disclosure is split into `faq_open` /
 * `faq_close` so it lines up with the accordion-driven FAQ. The listener runs
 * in the capture phase, so `open` is still the pre-click state.
 */
function resolveEventName(name: string, el: HTMLElement): string {
  if (name !== "faq_toggle") return name;
  const details = el.closest("details");
  if (!details) return name;
  return details.open ? "faq_close" : "faq_open";
}

/** Turn `data-ga-cta-location="hero"` into `{ cta_location: "hero" }`. */
function readGaParams(el: HTMLElement) {
  const params: Record<string, string> = {};
  for (const name of el.getAttributeNames()) {
    if (!name.startsWith("data-ga-") || name === "data-ga-event") continue;
    const key = name.slice("data-ga-".length).replace(/-/g, "_");
    params[key] = el.getAttribute(name) ?? "";
  }
  return params;
}
