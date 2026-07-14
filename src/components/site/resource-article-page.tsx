import Link from "next/link";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { PortableText } from "@/components/site/portable-text";
import type { DocArticle, DocArticleListItem } from "@/sanity/types";

/** Shared article layout for Documentation and Help Center — both are a
 * category-scoped article with an in-page nav of sibling articles. */
export function ResourceArticlePage({
  eyebrow,
  basePath,
  article,
  siblings,
}: {
  eyebrow: string;
  basePath: string;
  article: DocArticle;
  siblings: DocArticleListItem[];
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="container-px pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[240px_1fr]">
            <nav className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {article.category.title}
                </p>
                <ul className="mt-3 space-y-1">
                  {siblings.map((sibling) => (
                    <li key={sibling._id}>
                      <Link
                        href={`${basePath}/${sibling.slug}`}
                        className={cn(
                          "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                          sibling.slug === article.slug
                            ? "bg-accent font-medium text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {sibling.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <article className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {eyebrow}
              </span>
              <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {article.title}
              </h1>
              {article.summary ? (
                <p className="mt-4 text-lg text-muted-foreground">
                  {article.summary}
                </p>
              ) : null}
              <div className="mt-8">
                <PortableText value={article.body} />
              </div>
            </article>
          </div>
        </div>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
