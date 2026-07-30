import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gaAttrs } from "@/lib/analytics";

const steps = [
  { step: "01", label: "Tell us your volume", detail: "Share your order volume, SKUs, and channels." },
  { step: "02", label: "Get a custom quote", detail: "We map the right plan and warehouse mix." },
  { step: "03", label: "Go live in 30 minutes", detail: "Connect your store and start sending us orders in under 30 minutes." },
];

export function CtaBanner() {
  return (
    <section data-ga-view="cta_banner" className="container-px py-20 lg:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to outsource your fulfillment?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Get faster shipping, accurate inventory, and per-order rates that
            scale with you — with no long-term contract.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              render={<Link href="#contact" />}
              size="lg"
              variant="secondary"
              className="rounded-full"
              {...gaAttrs("cta_click", {
                cta_location: "cta_banner",
                cta_text: "Get started",
                cta_destination: "#contact",
                cta_type: "primary",
              })}
            >
              Get started <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              render={<Link href="#contact" />}
              size="lg"
              variant="outline"
              {...gaAttrs("cta_click", {
                cta_location: "cta_banner",
                cta_text: "Book a call",
                cta_destination: "#contact",
                cta_type: "secondary",
              })}
              className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <CalendarCheck className="h-4 w-4" /> Book a call
            </Button>
          </div>
        </div>

        {/* <div className="relative mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="text-center sm:text-left">
              <div className="text-sm font-semibold text-primary-foreground/60">
                {s.step}
              </div>
              <div className="mt-1 font-semibold">{s.label}</div>
              <p className="mt-1 text-sm text-primary-foreground/70">
                {s.detail}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
