import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="container-px py-20 lg:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Talk to our agent!
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Book a free appointment and let&apos;s map out your next build
            together.
          </p>
          <Button
            render={<Link href="#contact" />}
            size="lg"
            variant="secondary"
            className="mt-8 rounded-full"
          >
            <CalendarCheck className="h-4 w-4" /> Book Appointment
          </Button>
        </div>
      </div>
    </section>
  );
}
