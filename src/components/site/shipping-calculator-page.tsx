import Link from "next/link";
import { Calculator, ChevronRight, Check } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { ShippingCalculator } from "@/components/site/shipping-calculator";
import { cn } from "@/lib/utils";
import { gaAttrs, gaViewAttrs } from "@/lib/analytics";
import {
  AIR_MAX_WEIGHT,
  GROUND_MIN_WEIGHT,
  WEIGHT_LIMITS,
  shippingServices,
} from "@/lib/shipping-rates";

const highlights = [
  "Our own negotiated carrier rates, passed straight through",
  "Every service priced side by side — no guessing which is cheapest",
  "Zone and weight bands applied exactly as they're billed",
  "We own the mistake: if we ship it wrong, we pay for it",
];

const steps = [
  {
    title: "Enter the destination",
    description:
      "The first three digits of the ZIP put your parcel in a shipping zone — the further it travels, the higher the band.",
  },
  {
    title: "Add the weight",
    description:
      "Rates are billed in one-pound bands. We price the band your parcel actually falls into, not a rounded estimate.",
  },
  {
    title: "Compare every service",
    description: `Overnight through ground, priced together. Under ${GROUND_MIN_WEIGHT} lb ground doesn't run; over ${AIR_MAX_WEIGHT} lb it's the only service we quote online.`,
  },
  {
    title: "Ship it with us",
    description:
      "Onboard your account and these are the rates you pay — the same table drives your invoices.",
  },
];

const faqs = [
  {
    question: "Are these the rates I actually pay?",
    answer:
      "Yes. The calculator uses the same rate card that bills your account, including our negotiated carrier discount. Dimensional weight, residential surcharges, and fuel adjustments are the only things quoted separately, because they depend on the parcel and the address.",
  },
  {
    question: "Why does the price jump between two nearby ZIP codes?",
    answer:
      "Carriers price by zone, not by mileage. Two ZIPs a few miles apart can sit in different zones, which moves the whole rate band. The calculator resolves the zone from your ZIP prefix, so what you see is what the carrier bills.",
  },
  {
    question: "What about Alaska, Hawaii, and Puerto Rico?",
    answer: `AK, HI, and PR ship on their own rate table, cap at ${WEIGHT_LIMITS.territory} lb per parcel, and don't move by ground — air and mail services only. Enter a ZIP in those regions and the calculator switches tables automatically.`,
  },
  {
    question: "Can you ship parcels heavier than 150 lb?",
    answer: `We can, but not at these rates. ${WEIGHT_LIMITS.domestic} lb is the online parcel ceiling — anything heavier moves as freight and we price it by hand. Send us the details and we'll quote it the same day.`,
  },
  {
    question: "Do you handle international shipments?",
    answer:
      "This calculator covers US destinations from our IAD fulfillment center. International rates depend on the lane, commodity, and duties, so we quote those directly — get in touch and we'll put a rate card together.",
  },
];

export function ShippingCalculatorPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 pb-16 lg:pt-40 lg:pb-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Calculator className="h-4 w-4" />
                Shipping Calculator
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
                Know what shipping costs before you commit
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Unlike other 3PLs, we own and stand by our services. Enter a
                destination and a weight to see every option we can run, priced
                at the rate you&apos;d actually pay.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section
          id="calculator"
          {...gaViewAttrs("shipping_calculator")}
          className="container-px mt-8 pb-20 lg:pb-28"
        >
          <div className="mx-auto max-w-6xl">
            <ShippingCalculator />
          </div>
        </section>

        {/* Why these rates */}
        <section className="border-y border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Transparent rates, no surprises on the invoice
                </h2>
                <p className="mt-4 text-muted-foreground">
                  We keep it simple. The rate card behind this calculator is the
                  same one that bills your account — so the number you see here
                  is the number you plan your margins around.
                </p>
                <ul className="mt-8 space-y-4">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-4 w-4" />
                      </span>
                      <span className="text-sm text-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service overview */}
              <div className="overflow-hidden rounded-3xl border border-border bg-card">
                <div className="border-b border-border px-6 py-4">
                  <h3 className="font-semibold">Services we quote</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Every parcel service on your account, in one table.
                  </p>
                </div>
                <ul className="divide-y divide-border">
                  {shippingServices.map((service) => (
                    <li
                      key={service.id}
                      className="flex items-center justify-between gap-4 px-6 py-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{service.name}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {service.transit}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        −{service.discount}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How rates are worked out */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How the quote is worked out
            </h2>
            <p className="mt-4 text-muted-foreground">
              Four inputs decide what a parcel costs. Here&apos;s what each one
              does.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step.title}>
                <div className="text-sm font-semibold text-primary">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 flex max-w-6xl justify-center">
            <Link
              href="/contact"
              {...gaAttrs("cta_click", {
                cta_location: "shipping_calculator_steps",
                cta_text: "Get a custom rate card",
                cta_destination: "/contact",
                cta_type: "primary",
              })}
              className="group inline-flex items-center justify-center rounded-full border border-primary bg-primary px-5 py-3 text-sm font-medium text-white transition-colors xl:px-8"
            >
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:mr-0 group-hover:w-0">
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
              </span>
              Get a custom rate card
              <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:ml-2 group-hover:w-4">
                <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </span>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl divide-y divide-border">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group py-5 [&_summary]:list-none"
                >
                  <summary
                    {...gaAttrs("faq_toggle", {
                      faq_question: faq.question,
                      faq_location: "shipping_calculator",
                    })}
                    className={cn(
                      "flex cursor-pointer items-center justify-between gap-4 font-medium",
                      "transition-colors hover:text-primary",
                    )}
                  >
                    {faq.question}
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
