"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Source played inside the lightbox. Swap for the real product walkthrough.
const DEMO_SRC = "/cloud-BOyPb80F.webm";

export function VideoSection() {
  const [open, setOpen] = useState(false);

  // Close on Escape and lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section className="container-px">
      <div className="group relative mx-auto mt-12 overflow-hidden rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-secondary to-purple-400/10 shadow-xl shadow-primary/5">
        <video
          className="h-full w-full object-cover lg:hidden"
          src="/cloud.mobile-BiHR-WV1.webm"
          autoPlay
          muted
          loop
          playsInline
        />
        <video
          className="hidden h-full w-full object-cover lg:block"
          src="/cloud-BOyPb80F.webm"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Watch demo overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button
            type="button"
            size="lg"
            onClick={() => setOpen(true)}
            className="h-12 gap-2.5 rounded-full px-6 text-base shadow-lg shadow-primary/20"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/20">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            Watch demo
          </Button>
        </div>

        <div className="absolute bottom-5 left-6 rounded-full bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur">
          2:14 — Product walkthrough
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product demo video"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <button
            type="button"
            aria-label="Close demo"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <video
              className="aspect-video h-full w-full"
              src={DEMO_SRC}
              controls
              autoPlay
              playsInline
            />
          </div>
        </div>
      )}
    </section>
  );
}
