"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@easternfulfillment.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 012-3456" },
  { icon: MapPin, label: "Fulfillment centers", value: "Dallas, TX · Newark, NJ" },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="container-px py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s get your fulfillment running
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us about your order volume and sales channels, and we&apos;ll
            send a custom quote within one business day.
          </p>

          <ul className="mt-10 space-y-5">
            {contactInfo.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="font-medium">{item.value}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Send className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">Thanks for reaching out!</h3>
              <p className="mt-2 text-muted-foreground">
                We&apos;ve received your details and will send your custom quote
                shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input id="name" name="name" placeholder="Jane Doe" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="volume" className="text-sm font-medium">
                    Monthly orders
                  </label>
                  <Input
                    id="volume"
                    name="volume"
                    placeholder="e.g. 1,500 / mo"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="channels" className="text-sm font-medium">
                    Sales channels
                  </label>
                  <Input
                    id="channels"
                    name="channels"
                    placeholder="Shopify, Amazon…"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Tell us about your business
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Product type, current 3PL, what you're looking to improve..."
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-full" size="lg">
                Get my quote <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
