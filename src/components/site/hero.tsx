import Link from "next/link";
import { ArrowRight, ChevronRight, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedHeading } from "@/components/site/animated-heading";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="container-px min-h-[80vh] md:min-h-[65dvh] flex flex-col items-center justify-end relative py-20  ">
        <div className="flex flex-col items-center">
          

          <AnimatedHeading
            text="Your Trusted Third-Party Logistics Partner"
            className="text-4xl text-center font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-5xl [perspective:600px]"
          />

          <p className="mt-6 max-w-2xl text-center text-lg sm:text-xl text-muted-foreground">
            Eastern Fulfillment provides end-to-end 3PL services, helping ecommerce brands store inventory, fulfill orders faster, and deliver exceptional customer experiences at scale.
          </p>

          <div className="mt-8 flex flex-col gap-3 flex-row">
            <a
            href="#contact"
            className=" group inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium text-black transition-colors border-primary border bg-primary text-white xl:px-8"
          >
            <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
            </span>
            Get Started
            <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
              <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </span>
          </a>
          <a
            href="#contact"
            className=" group inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors border bg-secondary text-secondary-foreground hover:bg-accent xl:px-8"
          >
            <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
            </span>
            Book a Demo
            <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
              <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </span>
          </a>
          </div>

        </div>
      </div>
    </section>
  );
}
