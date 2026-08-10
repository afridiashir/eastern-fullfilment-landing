"use client";

import Script from "next/script";
import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/**
 * Opens every "Book a Demo" CTA as a Calendly overlay instead of navigating.
 *
 * The CTAs stay plain `<a href={siteConfig.demoUrl}>` links scattered across the
 * site, so this listens at the document level rather than asking each one to
 * wire itself up. If the widget script hasn't loaded (or JS is off), the click
 * isn't intercepted and the link opens Calendly in a new tab as normal.
 */
export function CalendlyPopup() {
  // The widget renders its overlay with its own stylesheet.
  useEffect(() => {
    if (document.querySelector(`link[href="${WIDGET_CSS}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Leave modified clicks alone so "open in new tab" still works.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      if (!href.startsWith(siteConfig.demoUrl)) return;

      // Not ready yet — let the browser follow the link instead.
      if (!window.Calendly) return;

      event.preventDefault();
      window.Calendly.initPopupWidget({ url: href });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Script id="calendly-widget" strategy="afterInteractive" src={WIDGET_JS} />;
}
