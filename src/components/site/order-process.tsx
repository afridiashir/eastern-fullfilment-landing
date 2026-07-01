"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Swap for a dedicated process clip when ready.
const PROCESS_SRC = "/order-process.mp4";

export function OrderProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      const box = boxRef.current;
      const holder = holderRef.current;
      const pin = pinRef.current;
      if (!video || !box || !holder || !pin) return;

      // Rest = sit exactly over the in-flow placeholder. Full = fill the
      // viewport rectangle so object-cover crops the video minimally.
      const rest = {
        left: () => holder.offsetLeft,
        top: () => holder.offsetTop,
        width: () => holder.offsetWidth,
        height: () => holder.offsetHeight,
      };
      const full = {
        width: () => pin.clientWidth,
        height: () => pin.clientHeight,
      };

      // Reduced-motion: no pin/scrub, just loop the clip in its rest box.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(box, {
          left: rest.left(),
          top: rest.top(),
          width: rest.width(),
          height: rest.height(),
        });
        video.muted = true;
        video.loop = true;
        void video.play().catch(() => {});
        return;
      }

      const build = () => {
        const duration = video.duration || 1;
        const scrubState = { time: 0 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%",
            pin: pin,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1 — the video box grows from under the heading into a
        // viewport-sized rectangle (width AND height animated, so the video is
        // never stretched), while the heading + eyebrow fade out.
        tl.fromTo(
          box,
          {
            left: rest.left,
            top: rest.top,
            width: rest.width,
            height: rest.height,
          },
          {
            left: 0,
            top: 0,
            width: full.width,
            height: full.height,
            ease: "none",
            duration: 1,
          },
          0
        );
        // Keep rounded corners through most of the growth, then square off as
        // it reaches full screen.
        tl.fromTo(
          box,
          { borderRadius: 28 },
          { borderRadius: 28, ease: "none", duration: 0.6 },
          0
        );
        tl.to(box, { borderRadius: 0, ease: "power2.in", duration: 0.4 }, 0.6);
        tl.to(".op-text", { autoAlpha: 0, ease: "none", duration: 0.5 }, 0);

        // Phase 2 — only once the box fills the screen does the video begin to
        // scrub. Appended after phase 1, so it starts on completion.
        tl.to(scrubState, {
          time: duration,
          ease: "none",
          duration: 2.5,
          onUpdate: () => {
            if (video.readyState >= 2) video.currentTime = scrubState.time;
          },
        });

        ScrollTrigger.refresh();
      };

      if (video.readyState >= 1) build();
      else video.addEventListener("loadedmetadata", build, { once: true });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="order-process" className="relative w-full bg-white">
      <div
        ref={pinRef}
        className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-white px-5 py-16"
      >
        <p className="op-text text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          At Eastern Fullfilment
        </p>
        <h2 className="op-text max-w-4xl text-center font-bold uppercase leading-[1.05] tracking-tight text-neutral-900 text-4xl sm:text-6xl lg:text-7xl">
          How we pick, pack &amp; ship your order
        </h2>

        {/* Invisible spacer holding the video box's place in the layout. */}
        <div
          ref={holderRef}
          aria-hidden
          className="invisible aspect-video w-full max-w-3xl"
        />

        {/* Expanding video box — overlays the spacer, then fills the viewport
            and scrubs. Position/size driven by GSAP. */}
        <div
          ref={boxRef}
          className="absolute left-0 top-0 z-50 overflow-hidden rounded-[28px] bg-neutral-900 shadow-2xl shadow-neutral-900/20 will-change-[width,height,left,top]"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={PROCESS_SRC}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
          />
        </div>
      </div>
    </section>
  );
}
