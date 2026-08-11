import type { Metadata } from "next";
import { Fragment } from "react";
import { ScrollText } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { pageMetadata } from "@/lib/site";
import {
  TERMS_LAST_UPDATED,
  termsSections,
  type TermsSection,
} from "@/lib/terms";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions",
  description:
    "The terms and conditions governing fulfillment, storage, shipping, payment, and termination for Eastern Fullfilment customers.",
  path: "/terms-and-conditions",
  keywords: ["terms and conditions", "terms of service", "agreement", "legal"],
});

/** "1. Term" — the closing section is unnumbered. */
const sectionLabel = (section: TermsSection) =>
  section.number ? `${section.number}. ${section.title}` : section.title;

/**
 * Legal copy carries bare email addresses. Rendering them as `mailto:` links
 * keeps the source text verbatim while staying clickable.
 */
const EMAIL_PATTERN = /([\w.+-]+@[\w-]+\.[\w.]+[\w])/g;

function Prose({ text }: { text: string }) {
  const parts = text.split(EMAIL_PATTERN);
  return (
    <>
      {parts.map((part, i) =>
        // Split with one capture group puts the matches at odd indices.
        i % 2 === 1 ? (
          <a
            key={i}
            href={`mailto:${part}`}
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/60 to-background">
          <div className="pointer-events-none absolute inset-0 hero-grid" />
          <div className="container-px relative pt-32 pb-16 text-center lg:pt-40 lg:pb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <ScrollText className="h-4 w-4" />
              Legal
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Terms and Conditions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              These terms govern the fulfillment, storage, and shipping services
              Eastern Fullfilment provides to you.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated {TERMS_LAST_UPDATED}
            </p>
          </div>
        </section>

        <div className="container-px py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            {/* Table of contents */}
            <nav
              aria-label="Table of contents"
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Contents
              </h2>
              <ul className="mt-4 space-y-2 border-l border-border">
                {termsSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {sectionLabel(section)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Agreement */}
            <article className="max-w-3xl">
              {termsSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  // Offset the anchor so the sticky navbar doesn't cover headings.
                  className="scroll-mt-28 border-b border-border pb-10 last:border-0 [&:not(:first-child)]:pt-10"
                >
                  <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {sectionLabel(section)}
                  </h2>

                  {section.clauses.map((clause, index) => (
                    <div key={clause.heading ?? index} className="mt-6">
                      {clause.heading && (
                        <h3 className="font-semibold">{clause.heading}</h3>
                      )}
                      {clause.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 60)}
                          className="mt-3 text-muted-foreground"
                        >
                          <Prose text={paragraph} />
                        </p>
                      ))}
                      {clause.list && (
                        <ul className="mt-4 space-y-2.5">
                          {clause.list.map((item) => (
                            <li
                              key={item.slice(0, 60)}
                              className="flex gap-3 text-muted-foreground"
                            >
                              <span
                                aria-hidden
                                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                              />
                              <span>
                                <Prose text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
