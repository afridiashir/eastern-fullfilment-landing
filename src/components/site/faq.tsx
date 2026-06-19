import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does onboarding take?",
    answer:
      "Most brands are live and shipping within 7–10 days. We handle the integration setup, inbound receiving of your inventory, and SKU mapping — then run a short test batch before going fully live.",
  },
  {
    question: "Where are your fulfillment centers located?",
    answer:
      "We operate a network of strategically placed warehouses, so your inventory can be split across regions to shorten transit times and lower shipping costs. We'll recommend the best distribution mix based on where your customers are.",
  },
  {
    question: "Which sales channels and platforms do you integrate with?",
    answer:
      "We connect directly to Shopify, Amazon, eBay, Walmart, WooCommerce, and most major marketplaces and carts. Orders sync automatically to the warehouse — no manual exports — and tracking flows straight back to your store.",
  },
  {
    question: "How is pricing calculated?",
    answer:
      "Pricing is transparent and usage-based: a per-order pick & pack rate that drops as your volume grows, plus pass-through costs for storage, receiving, and shipping. There are no hidden platform fees — see our pricing section for the full breakdown.",
  },
  {
    question: "Is there a minimum order volume or long-term contract?",
    answer:
      "No long-term contracts and no rigid minimums to get started. Our Starter plan is built for newer brands, and you can scale into lower per-order rates as your volume increases.",
  },
  {
    question: "How do you handle returns?",
    answer:
      "Returns are received, inspected, and restocked — usually within a day — with full visibility in your client portal. We can also apply custom rules for grading, refurbishing, or quarantining items based on your policy.",
  },
  {
    question: "Can you handle peak season and sudden volume spikes?",
    answer:
      "Yes. Our capacity and staffing flex with your demand, so events like Black Friday, product launches, and viral spikes ship on time without you scrambling for extra headcount.",
  },
  {
    question: "Do you support kitting, subscriptions, and custom packaging?",
    answer:
      "Absolutely. We handle kitting and bundling, recurring subscription boxes, branded packaging, custom inserts, and special projects so your unboxing experience stays on-brand.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="container-px py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        {/* Intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about outsourcing fulfillment to Eastern.
            Can&apos;t find your answer?
          </p>
          <Button
            render={<Link href="#contact" />}
            variant="outline"
            className="mt-6 rounded-full"
          >
            Talk to our team
          </Button>
        </div>

        {/* Questions */}
        <Accordion defaultValue={[0]} className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={i}
              className="border-b border-border"
            >
              <AccordionTrigger className="py-5 text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pr-6 text-muted-foreground">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
