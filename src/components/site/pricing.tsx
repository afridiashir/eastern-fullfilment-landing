import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Consult Plan",
    price: "$0",
    cadence: "/mo",
    tagline: "No Credit, No Charge",
    description: "A free discovery call to map out your project and roadmap.",
    features: [
      "30-min strategy session",
      "Project scope & roadmap",
      "Tech stack recommendation",
      "No commitment required",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Website Plan",
    price: "$99",
    cadence: "/mo",
    tagline: "Best for startups",
    description: "A managed website built and maintained by certified engineers.",
    features: [
      "Delivered in 48–72 hours",
      "3 Google Meet sessions / mo",
      "Lifetime email support",
      "Ongoing updates & hosting",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "AI Voice Agent Plan",
    price: "$149",
    cadence: "/mo",
    tagline: "Automate every call",
    description: "An AI agent that handles calls, follow-ups, and bookings 24/7.",
    features: [
      "24/7 inbound & outbound calls",
      "Automated follow-ups",
      "Appointment scheduling",
      "CRM integration",
    ],
    cta: "Get started",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="container-px py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Badge
          variant="secondary"
          className="mb-4 rounded-full border border-primary/20 bg-primary/10 text-primary"
        >
          Pricing
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Simple plans that scale with you
        </h2>
        <p className="mt-4 text-muted-foreground">
          Start free, then pick a plan with no hidden fees. Cancel anytime.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-col rounded-3xl border bg-card p-8 transition-shadow",
              plan.featured
                ? "border-primary shadow-xl shadow-primary/10 lg:scale-[1.03]"
                : "border-border hover:shadow-lg"
            )}
          >
            {plan.featured && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4">
                Most popular
              </Badge>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-bold tracking-tight">
                {plan.price}
              </span>
              <span className="mb-1 text-muted-foreground">{plan.cadence}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {plan.description}
            </p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              render={<Link href="#contact" />}
              variant={plan.featured ? "default" : "outline"}
              className="mt-8 w-full rounded-full"
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
