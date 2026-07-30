import Link from "next/link";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { gaAttrs } from "@/lib/analytics";

export function ComingSoon({
  eyebrow = "Resources",
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative flex min-h-[80vh] flex-col items-center justify-center py-32 text-center lg:py-40">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Clock className="h-4 w-4" />
              {eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="mx-auto mt-3 text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
              Coming soon
            </p>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#contact"
                {...gaAttrs("cta_click", {
                  cta_location: "coming_soon",
                  cta_text: "Get notified",
                  cta_destination: "/#contact",
                  cta_type: "primary",
                  page_section: title,
                })}
                className="group inline-flex items-center justify-center rounded-full border border-primary bg-primary px-6 py-3 text-sm font-medium text-white transition-colors xl:px-8"
              >
                <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
                </span>
                Get notified
                <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                  <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                </span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent xl:px-8"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
