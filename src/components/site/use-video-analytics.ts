"use client";

import { useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/** GA4's enhanced-measurement progress thresholds. */
const PROGRESS_THRESHOLDS = [10, 25, 50, 75] as const;

/**
 * Handlers for a self-hosted `<video>` that emit GA4's recommended video
 * events (`video_start`, `video_progress`, `video_complete`).
 *
 * ```tsx
 * <video src={src} controls {...useVideoAnalytics("Product walkthrough")} />
 * ```
 */
export function useVideoAnalytics(title: string, provider = "self_hosted") {
  const startedRef = useRef(false);
  const reachedRef = useRef<Set<number>>(new Set());

  const base = (el: HTMLVideoElement) => ({
    video_title: title,
    video_provider: provider,
    video_url: el.currentSrc || el.src,
    video_duration: Number.isFinite(el.duration) ? Math.round(el.duration) : undefined,
    visible: true,
  });

  return {
    onPlay: (event: React.SyntheticEvent<HTMLVideoElement>) => {
      if (startedRef.current) return;
      startedRef.current = true;
      trackEvent("video_start", base(event.currentTarget));
    },
    onTimeUpdate: (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const el = event.currentTarget;
      if (!Number.isFinite(el.duration) || el.duration <= 0) return;
      const percent = (el.currentTime / el.duration) * 100;

      for (const threshold of PROGRESS_THRESHOLDS) {
        if (percent >= threshold && !reachedRef.current.has(threshold)) {
          reachedRef.current.add(threshold);
          trackEvent("video_progress", {
            ...base(el),
            video_percent: threshold,
            video_current_time: Math.round(el.currentTime),
          });
        }
      }
    },
    onEnded: (event: React.SyntheticEvent<HTMLVideoElement>) => {
      trackEvent("video_complete", { ...base(event.currentTarget), video_percent: 100 });
      // Allow a replay to be counted as a fresh view.
      startedRef.current = false;
      reachedRef.current = new Set();
    },
  };
}
