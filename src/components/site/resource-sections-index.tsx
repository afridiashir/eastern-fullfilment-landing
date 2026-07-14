import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { ResourceHero, EmptyState } from "@/components/site/resource-hero";
import type { DocSection } from "@/sanity/types";

/** Shared listing layout for Documentation and Help Center — both group
 * articles under ordered sections/topics with the same visual structure. */
export function ResourceSectionsIndex({
  icon,
  eyebrow,
  title,
  description,
  basePath,
  sections,
  emptyMessage,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  basePath: string;
  sections: DocSection[];
  emptyMessage: string;
}) {
  const hasArticles = sections.some((section) => section.articles.length > 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ResourceHero
          eyebrow={eyebrow}
          icon={icon}
          title={title}
          description={description}
        />
        <section className="container-px py-20 lg:py-28">
          {!hasArticles ? (
            <EmptyState message={emptyMessage} />
          ) : (
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
              {sections
                .filter((section) => section.articles.length > 0)
                .map((section) => (
                  <div
                    key={section._id}
                    className="rounded-2xl border border-border bg-card p-6"
                  >
                    <h2 className="font-semibold">{section.title}</h2>
                    {section.description ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    ) : null}
                    <ul className="mt-4 space-y-1">
                      {section.articles.map((article) => (
                        <li key={article._id}>
                          <Link
                            href={`${basePath}/${article.slug}`}
                            className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-primary"
                          >
                            {article.title}
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          )}
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
