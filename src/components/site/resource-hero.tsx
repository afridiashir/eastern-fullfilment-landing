import type { LucideIcon } from "lucide-react";
import { featuredIntegrations, integrationCategories } from "@/lib/integrations";

/** Unique logos across featured + category integrations, in first-seen order. */
const strip = Array.from(
  new Map(
    [...featuredIntegrations, ...integrationCategories.flatMap((c) => c.items)]
      .filter((item) => item.logo)
      .map((item) => [item.name, item])
  ).values()
);

const fadeMaskStyle = {
  maskImage:
    "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
};

export function ResourceHero({
  eyebrow,
  icon: Icon,
  title,
  description,
}: {
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background border-b">
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="container-px relative flex flex-col items-center justify-center py-24 pb-4 text-center lg:pt-32 lg:pt-56">
        <span className="inline-flex items-center gap-2 rounded-sm border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Icon className="h-4 w-4" />
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          {description}
        </p>

        <div
          className="mt-4 w-full max-w-full overflow-hidden mt-20"
          style={fadeMaskStyle}
        >
          <div
            data-marquee-row="true"
            className="flex w-max items-center gap-10"
            style={{ animation: "marquee-left 64s linear infinite" }}
          >
            {[...strip, ...strip].map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                title={item.name}
                className="flex h-16 w-56 shrink-0 items-center justify-center opacity-60 grayscale transition"
              >
                <div
                  aria-hidden="true"
                  className="h-full w-full bg-contain bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.logo})` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
      {message}
    </div>
  );
}
