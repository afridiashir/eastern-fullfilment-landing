"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { INTRO_DONE_EVENT, type IntroWindow } from "@/lib/intro";

/**
 * Full-screen intro loader showing only the logo icon, then sliding up off the
 * top of the viewport to reveal the page. Renders nothing after it finishes.
 */
export function Loader() {
  // "loading" -> "leaving" (slide up) -> "done" (unmount)
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">("loading");

  useEffect(() => {
    const leave = setTimeout(() => setPhase("leaving"), 1200);
    return () => clearTimeout(leave);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    // Let the hero (and anything else gated on the intro) start animating
    // as the loader slides away.
    (window as IntroWindow).__introDone = true;
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));

    const done = setTimeout(() => setPhase("done"), 800);
    return () => clearTimeout(done);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "leaving" ? "-translate-y-full" : "translate-y-0"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo_light.png"
        alt={`${siteConfig.name} logo`}
        width={72}
        height={72}
        className={cn(
          "h-20 w-auto object-contain dark:hidden",
          phase === "loading" && "animate-pulse",
          phase === "leaving" && "opacity-0 transition-opacity duration-300"
        )}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo_dark.png"
        alt={`${siteConfig.name} logo`}
        width={72}
        height={72}
        className={cn(
          "hidden h-20 w-auto object-contain dark:block",
          phase === "loading" && "animate-pulse",
          phase === "leaving" && "opacity-0 transition-opacity duration-300"
        )}
      />
    </div>
  );
}
