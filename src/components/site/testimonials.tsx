import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Apex Freight Systems",
    role: "Logistics",
    quote:
      "They rebuilt our entire booking portal in under a week. The quality matched agencies charging 10x more.",
  },
  {
    name: "MidWest Manufacturing",
    role: "Industrial",
    quote:
      "The AI voice agent now handles every after-hours call. We stopped losing leads overnight.",
  },
  {
    name: "Ascend Fintech",
    role: "Finance",
    quote:
      "Responsive, sharp, and fast. It genuinely feels like having a senior team on retainer for $99.",
  },
  {
    name: "BluePeak Financial",
    role: "Finance",
    quote:
      "Our internal tools were automated end-to-end. The cost savings paid for the plan many times over.",
  },
  {
    name: "Nova B2B Consulting",
    role: "Consulting",
    quote:
      "From idea to launch in days. Communication was clear and delivery was always ahead of schedule.",
  },
  {
    name: "Horizon Medical Billing",
    role: "Healthcare",
    quote:
      "They automated our claims workflow flawlessly. Support has been responsive every single time.",
  },
  {
    name: "Hale Retail Technologies",
    role: "Retail",
    quote:
      "Beautiful storefront, rock-solid backend, and a team that actually understands our business.",
  },
  {
    name: "Cole Energy Services",
    role: "Energy",
    quote:
      "Reliable delivery and great engineering. We've moved three more projects to their team.",
  },
  {
    name: "Reyes Tech Innovations",
    role: "Technology",
    quote:
      "The full-stack transformation modernized everything. Scalable, clean, and easy to maintain.",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-secondary/40 py-20 lg:py-28"
    >
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border border-primary/20 bg-primary/10 text-primary"
          >
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by teams across industries
          </h2>
          <p className="mt-4 text-muted-foreground">
            Real results from real businesses — quality work, fast delivery, and
            dependable support.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
