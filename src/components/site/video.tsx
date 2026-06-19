import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function VideoSection() {
  return (
    <section className="container-px py-20 lg:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <Badge
          variant="secondary"
          className="mb-4 rounded-full border border-primary/20 bg-primary/10 text-primary"
        >
          Watch the story
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Meet Dylan — Your Guide to 3,000+ Scalable Platforms
        </h2>
        <p className="mt-4 text-muted-foreground">
          See how our team turns ideas into production-ready products in days,
          not months.
        </p>
      </div>

      <div className="group relative mx-auto mt-12 aspect-video max-w-4xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-secondary to-purple-400/10 shadow-xl shadow-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            aria-label="Play video"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform group-hover:scale-110"
          >
            <Play className="h-7 w-7 translate-x-0.5 fill-current" />
          </button>
        </div>
        <div className="absolute bottom-5 left-6 rounded-full bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur">
          2:14 — Product walkthrough
        </div>
      </div>
    </section>
  );
}
