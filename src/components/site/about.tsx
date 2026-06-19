import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "3,000+", label: "Platforms built" },
  { value: "98%", label: "Customer satisfaction" },
  { value: "90%", label: "Cost savings" },
  { value: "230+", label: "Certified engineers" },
];

export function About() {
  return (
    <section id="about" className="container-px py-20 lg:py-28">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-secondary/50 px-6 py-14 sm:px-12 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From Websites to Custom Web Apps and AI Bots
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              We build and manage your entire digital presence for{" "}
              <span className="font-semibold text-foreground">$99/month</span>.
              With 3,000+ builds delivered, our certified global engineers ship
              fast, scale reliably, and save you up to 90% versus an in-house
              team.
            </p>
            <Button
              render={<Link href="#services" />}
              className="mt-8 rounded-full"
            >
              Explore our services <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-6 text-center"
              >
                <div className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
