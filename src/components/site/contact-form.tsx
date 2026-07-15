"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { countries, flagEmoji } from "@/lib/countries";
import { cn } from "@/lib/utils";

// Shared sizing for inputs/selects so every field is the same comfortable height.
const inputClass = "h-12 px-3.5 text-base md:text-sm";

const fieldClass =
  "h-12 w-full min-w-0 rounded-lg border border-input bg-transparent px-3.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30";

const orderVolumes = [
  "Less than 500 / mo",
  "500 – 2,000 / mo",
  "2,000 – 10,000 / mo",
  "10,000 – 50,000 / mo",
  "50,000+ / mo",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Send className="h-6 w-6" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Thanks for reaching out!</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          We&apos;ve received your details and a member of our team will get in
          touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            First name <span className="text-primary">*</span>
          </label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Jane"
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last name
          </label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Business email <span className="text-primary">*</span>
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          className={inputClass}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone number <span className="text-primary">*</span>
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            name="country"
            aria-label="Country"
            defaultValue="US"
            className={cn(fieldClass, "shrink-0 sm:w-44")}
          >
            {countries.map((c) => (
              <option key={c.iso2} value={c.iso2}>
                {flagEmoji(c.iso2)} {c.name} ({c.dial})
              </option>
            ))}
          </select>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder="(555) 012-3456"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium">
          Company name <span className="text-primary">*</span>
        </label>
        <Input
          id="company"
          name="company"
          placeholder="Company name"
          className={inputClass}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="monthlyOrders" className="text-sm font-medium">
          Monthly orders <span className="text-primary">*</span>
        </label>
        <select
          id="monthlyOrders"
          name="monthlyOrders"
          required
          defaultValue=""
          className={cn(fieldClass, "text-muted-foreground")}
        >
          <option value="" disabled>
            Select
          </option>
          {orderVolumes.map((band) => (
            <option key={band} value={band} className="text-foreground">
              {band}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Your message <span className="text-primary">*</span>
        </label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your fulfillment needs, order volume, and what you'd like to improve..."
          required
        />
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full rounded-full"
        size="lg"
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Send message"} <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
