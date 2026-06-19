import { BadgeCheck, Globe, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const highlights = [
  { icon: BadgeCheck, label: "Certified specialists" },
  { icon: Globe, label: "Global, always-on coverage" },
  { icon: Code2, label: "Full-stack & AI expertise" },
];

export function Team() {
  return (
    <section className="container-px py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/15 to-purple-400/15 blur-2xl" />
          <div className="relative grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl border border-border bg-gradient-to-br from-secondary to-accent"
              >
                <div className="flex h-full items-center justify-center text-2xl font-bold text-primary/40">
                  {String.fromCharCode(65 + i)}
                </div>
              </div>
            ))}
          </div>
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-lg">
            <div className="text-2xl font-bold text-primary">230+</div>
            <div className="text-xs text-muted-foreground">Expert engineers</div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Badge
            variant="secondary"
            className="mb-4 rounded-full border border-primary/20 bg-primary/10 text-primary"
          >
            Our team
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Intelligent Solutions from Certified Global Engineers
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Behind every plan is a team of 230+ vetted engineers spanning
            frontend, backend, DevOps, and AI. They work as an extension of your
            business — accountable, responsive, and fast.
          </p>
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="font-medium">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
