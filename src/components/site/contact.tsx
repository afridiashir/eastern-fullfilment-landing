"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@indicho.com" },
  { icon: Phone, label: "WhatsApp", value: "+1 (555) 012-3456" },
  { icon: MapPin, label: "Offices", value: "Lahore, PK · Austin, US" },
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
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border border-primary/20 bg-primary/10 text-primary"
          >
            Contact
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            We are here to assist you with all your queries
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us what you&apos;re building and we&apos;ll get back to you
            within one business day.
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
                We&apos;ve received your query and will be in touch shortly.
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
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Contact Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="query" className="text-sm font-medium">
                  Your Query
                </label>
                <Textarea
                  id="query"
                  name="query"
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-full" size="lg">
                Submit <Send className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
