import Link from "next/link";
import { ArrowRight, Star, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background"
    >
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="container-px relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col items-start">
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-primary"
          >
            <Star className="h-3.5 w-3.5 fill-primary" />
            Trusted by 3,000+ businesses worldwide
          </Badge>

          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Hire <span className="text-gradient">230+ Engineers</span>
            <br />
            in just $99/mo
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Top-tier engineers, AI-powered systems, and real team support — all
            in one plan. We build and manage your websites, custom web apps, and
            AI bots so you can focus on growth.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              render={<Link href="#pricing" />}
              size="lg"
              className="rounded-full"
            >
              Discover Plans <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              render={<Link href="#contact" />}
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              Request a Quote
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {[
              { icon: Users, value: "230+", label: "Certified engineers" },
              { icon: Zap, value: "48–72h", label: "Avg. delivery" },
              { icon: Star, value: "98%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-lg font-semibold leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-purple-400/20 blur-2xl" />
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="text-xs text-muted-foreground">
                indicho.dashboard
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-secondary/70 p-4">
                <div className="text-xs text-muted-foreground">
                  Monthly cost saved
                </div>
                <div className="mt-1 text-3xl font-bold text-primary">
                  $48,200
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border">
                  <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-primary to-purple-500" />
                </div>
                <div className="mt-1.5 text-xs text-muted-foreground">
                  Up to 90% cheaper than in-house teams
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border p-4">
                  <div className="text-2xl font-bold">3,000+</div>
                  <div className="text-xs text-muted-foreground">
                    Platforms built
                  </div>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs text-muted-foreground">
                    AI voice agents
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
