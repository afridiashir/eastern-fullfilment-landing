import type { Metadata } from "next";
import { Mail, Megaphone, MapPin, Phone } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { ContactForm } from "@/components/site/contact-form";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Speak with the Eastern Fullfilment team. Reach out for sales, platform, or press inquiries and we'll get back to you shortly.",
  path: "/contact",
});

type Office = {
  flag: string;
  country: string;
  address: string[];
  phone: string;
  phoneHref: string;
};

const offices: Office[] = [
  {
    flag: "🇺🇸",
    country: "United States",
    address: ["235 Mitchell St SW, Suite 235A", "Atlanta, GA 30303", "United States"],
    phone: "+1 (470) 123-45678",
    phoneHref: "tel:+14701234567",
  },
  {
    flag: "🇵🇰",
    country: "Pakistan",
    address: ["Vogue Towers, MM Alam Road", "Block C2, Gulberg III", "Lahore, 54000, Pakistan"],
    phone: "+92 310 1234 567",
    phoneHref: "tel:+923101234567",
  },
];

const inquiries = [
  {
    icon: Mail,
    label: "Write to us",
    value: "hello@easternfullfilment.com",
    href: "mailto:hello@easternfullfilment.com",
  },
  {
    icon: Megaphone,
    label: "Media enquiries",
    value: "press@easternfullfilment.com",
    href: "mailto:press@easternfullfilment.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 pb-16 text-center lg:pt-40 lg:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Mail className="h-4 w-4" />
              Contact Us
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Speak with us
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Fill in the form for any sales, platform, or press inquiries and
              our team will get in touch with you shortly.
            </p>
          </div>
        </section>

        {/* Form + contact details */}
        <section className="container-px py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <ContactForm />

            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Prefer email?
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Reach the right team directly — we typically reply within one
                  business day.
                </p>
                <ul className="mt-6 space-y-4">
                  {inquiries.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                            {item.label}
                          </span>
                          <span className="font-medium">{item.value}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="border-y border-border bg-secondary/30">
          <div className="container-px py-20 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our offices
              </h2>
              <p className="mt-4 text-muted-foreground">
                Reach us at either of our locations.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
              {offices.map((office) => (
                <div
                  key={office.country}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{office.flag}</span>
                    <h3 className="font-semibold">{office.country}</h3>
                  </div>
                  <div className="mt-4 flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {office.address.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-primary" />
                    <a
                      href={office.phoneHref}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {office.phone}
                    </a>
                  </div>
                </div>
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
