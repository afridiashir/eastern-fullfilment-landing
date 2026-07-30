import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { gaAttrs } from "@/lib/analytics";

const plans = [
  {
    name: "Starter",
    price: "$2.75",
    cadence: "/order",
    tagline: "New & growing brands",
    description:
      "Everything you need to launch fulfillment, with no long-term contract.",
    features: [
      "Up to 500 orders / mo",
      "Pick & pack included",
      "Standard storage & receiving",
      "Live carrier rates",
      "Shopify & marketplace sync",
      "Email & chat support",
    ],
    cta: "Get started",
    featured: false,
  },
  {
    name: "Growth",
    price: "$1.95",
    cadence: "/order",
    tagline: "Best for scaling DTC brands",
    description:
      "Lower per-order rates and pro tooling as your volume ramps up.",
    features: [
      "500 – 5,000 orders / mo",
      "Discounted carrier rates",
      "Same-day receiving",
      "Branded packaging & inserts",
      "Returns processing included",
      "Dedicated account manager",
    ],
    cta: "Get started",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    tagline: "High-volume & B2B/retail",
    description:
      "Volume-based pricing with multi-warehouse distribution and custom SLAs.",
    features: [
      "5,000+ orders / mo",
      "Multi-warehouse distribution",
      "EDI & B2B/retail routing",
      "Kitting & custom projects",
      "Custom SLAs & reporting",
      "24/7 priority support",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

const feeBreakdown = [
  { label: "Receiving", value: "from $35 / hr" },
  { label: "Storage", value: "from $18 / pallet / mo" },
  { label: "Pick & pack", value: "1st item free, +$0.35 each" },
  { label: "Returns", value: "from $3.50 / order" },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      data-ga-view="pricing"
      className="container-px py-20 lg:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Fulfillment pricing that scales with you
        </h2>
        <p className="mt-4 text-muted-foreground">
          Transparent per-order rates that drop as you grow — no hidden fees, no
          long-term contracts.
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
              {plan.cadence && (
                <span className="mb-1 mr-0.5 text-sm text-muted-foreground">
                  from
                </span>
              )}
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
              {...gaAttrs("select_plan", {
                cta_location: "pricing",
                cta_text: plan.cta,
                cta_destination: "#contact",
                plan_name: plan.name,
                plan_price: plan.price,
              })}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-border bg-card p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Transparent storage & handling</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Only pay for what you use. Common add-on fees, billed at cost.
          </p>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {feeBreakdown.map((fee) => (
            <div
              key={fee.label}
              className="rounded-2xl border border-border bg-background p-4 text-center"
            >
              <dt className="text-sm text-muted-foreground">{fee.label}</dt>
              <dd className="mt-1 font-semibold">{fee.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
