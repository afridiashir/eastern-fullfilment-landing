"use client";

import { useEffect, useState } from "react";

/**
 * Matches Tailwind's `lg:` breakpoint — the line where the homepage swaps the
 * scroll-scrubbed intro reel (desktop) for the static hero + demo video
 * (tablet and below). Keep in sync with the `lg:` classes in app/page.tsx.
 */
export const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * `null` until the viewport is measured on the client, then true/false.
 *
 * The tri-state matters: both breakpoint-gated sections are hidden with CSS on
 * the side they don't belong to, so a plain boolean default would make one of
 * them ship a `src` in the server HTML and download its clip behind a
 * `display:none` wrapper. Callers should load media only on an explicit
 * `=== true` / `=== false`, never on the `null` first paint.
 */
export function useIsDesktop(): boolean | null {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}
