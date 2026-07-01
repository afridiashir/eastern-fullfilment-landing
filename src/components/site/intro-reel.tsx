"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const INTRO_SRC = "/intro-reel.mp4";

// Bottom-left captions — advance one every 5 seconds of scrubbed video.
const captions = [
  "Your order, received in real time",
  "Picked with precision",
  "Packed to protect",
  "Shipped on the next wave",
  "Delivered, on time",
];

const SECONDS_PER_CAPTION = 5;

export function IntroReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      // Reduced-motion: no pin/scrub. Loop the clip and cycle captions on a timer.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.muted = true;
        video.loop = true;
        void video.play().catch(() => {});
        const id = setInterval(
          () => setActive((i) => (i + 1) % captions.length),
          SECONDS_PER_CAPTION * 1000
        );
        return () => clearInterval(id);
      }

      const build = () => {
        const duration = video.duration || 1;
        const scrubState = { time: 0 };

        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: pinRef.current,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }).to(scrubState, {
          time: duration,
          ease: "none",
          onUpdate: () => {
            if (video.readyState >= 2) video.currentTime = scrubState.time;
            // Change the caption every 5 seconds of scrubbed footage.
            const idx =
              Math.floor(scrubState.time / SECONDS_PER_CAPTION) % captions.length;
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          },
        });

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) build();
      else video.addEventListener("loadedmetadata", build, { once: true });
    },
    { scope: sectionRef }
  );

  // Fade/slide the caption in whenever it changes.
  useEffect(() => {
    if (!captionRef.current) return;
    gsap.fromTo(
      captionRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section ref={sectionRef} id="intro-reel" className="relative w-full bg-black">
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={INTRO_SRC}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
        />

        {/* Legibility gradient for the caption. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Bottom-left caption. */}
        <div className="absolute bottom-8 left-6 z-10 max-w-md sm:bottom-12 sm:left-12">
          <div ref={captionRef}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(captions.length).padStart(2, "0")}
            </p>
            <p className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-4xl">
              {captions[active]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
