import {
  PiggyBank,
  PhoneCall,
  Workflow,
  Headphones,
  Bot,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: PiggyBank,
    title: "Save up to 90% on costs",
    description:
      "Get a full engineering team for a fraction of the cost of hiring in-house, with no overhead or recruiting.",
  },
  {
    icon: PhoneCall,
    title: "AI Voice Agent",
    description:
      "Human-like voice agents that answer calls, qualify leads, and book appointments around the clock.",
  },
  {
    icon: Workflow,
    title: "Business Ops Automation",
    description:
      "Automate repetitive workflows across sales, operations, and finance so your team can focus on growth.",
  },
  {
    icon: Headphones,
    title: "AI Customer Support & Lead Handling",
    description:
      "Instant, on-brand responses across chat and email that capture and nurture every lead.",
  },
  {
    icon: Bot,
    title: "Hyper-Automation Mastery",
    description:
      "Connect your tools into intelligent, end-to-end pipelines powered by the latest AI models.",
  },
  {
    icon: Layers,
    title: "Full-Stack Transformation",
    description:
      "From websites to custom web apps, we modernize your stack with scalable, maintainable code.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Investment Check",
    description:
      "Validate your idea, market, and architecture before you spend — de-risk every decision.",
  },
];

export function Services() {
  return (
    <section id="services" className="container-px py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Badge
          variant="secondary"
          className="mb-4 rounded-full border border-primary/20 bg-primary/10 text-primary"
        >
          Services
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to build and scale
        </h2>
        <p className="mt-4 text-muted-foreground">
          One team, one plan, and the full range of engineering and AI services
          your business needs.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <service.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
