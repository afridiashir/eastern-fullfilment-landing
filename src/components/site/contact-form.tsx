"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Shared sizing for inputs/selects so every field is the same comfortable height.
const inputClass = "h-12 px-3.5 text-base md:text-sm";

const orderVolumes = [
  "Less than 500 / mo",
  "500 – 2,000 / mo",
  "2,000 – 10,000 / mo",
  "10,000 – 50,000 / mo",
  "50,000+ / mo",
];

const FORM_NAME = "contact";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // `form_start` is only meaningful once per visit to the form.
  const startedRef = useRef(false);

  function handleStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", { form_name: FORM_NAME });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    // Volume band only — never send names/emails to GA.
    const monthlyOrders = String(payload.monthlyOrders ?? "");

    trackEvent("form_submit", {
      form_name: FORM_NAME,
      monthly_orders: monthlyOrders,
    });

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

      // GA4 recommended conversion event.
      trackEvent("generate_lead", {
        form_name: FORM_NAME,
        monthly_orders: monthlyOrders,
        lead_type: "contact_request",
      });
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      trackEvent("form_error", { form_name: FORM_NAME, error_message: message });
      setError(message);
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
      onFocus={handleStart}
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
        <Select name="monthlyOrders" required>
          <SelectTrigger id="monthlyOrders" className="w-full px-3.5 text-base md:text-sm data-[size=default]:h-12">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {orderVolumes.map((band) => (
              <SelectItem key={band} value={band}>
                {band}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
