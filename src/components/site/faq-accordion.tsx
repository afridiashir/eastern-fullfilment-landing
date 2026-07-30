"use client";

import { useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * FAQ list wrapped as a client component purely so open/close can be reported
 * to analytics — which questions people actually read is the useful signal
 * here, so both `faq_open` and `faq_close` carry the question text.
 */
export function FaqAccordion({
  faqs,
  location = "faq",
}: {
  faqs: { question: string; answer: string }[];
  /** Where the accordion lives, so page-level FAQs stay distinguishable. */
  location?: string;
}) {
  const openRef = useRef<Set<number>>(new Set([0]));

  function handleValueChange(value: unknown) {
    const next = new Set(
      (Array.isArray(value) ? value : [value]).filter(
        (item): item is number => typeof item === "number",
      ),
    );

    for (const index of next) {
      if (!openRef.current.has(index)) {
        trackEvent("faq_open", {
          faq_question: faqs[index]?.question,
          faq_index: index + 1,
          faq_location: location,
        });
      }
    }
    for (const index of openRef.current) {
      if (!next.has(index)) {
        trackEvent("faq_close", {
          faq_question: faqs[index]?.question,
          faq_index: index + 1,
          faq_location: location,
        });
      }
    }

    openRef.current = next;
  }

  return (
    <Accordion
      defaultValue={[0]}
      onValueChange={handleValueChange}
      className="w-full"
    >
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
  );
}
