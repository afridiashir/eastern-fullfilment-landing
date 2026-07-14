import type { LucideIcon } from "lucide-react";

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
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/80 to-blue-100/40 border-b">
      <div className="pointer-events-none absolute inset-0 hero-grid" />
      <div className="container-px relative flex flex-col items-center justify-center py-24 text-center lg:py-32 lg:pt-56">
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
