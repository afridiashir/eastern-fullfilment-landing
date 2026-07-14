import Link from "next/link";
import { Newspaper } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { ResourceHero } from "@/components/site/resource-hero";
import { BlogList } from "@/components/site/blog-list";
import type { PostListItem } from "@/sanity/types";

export function BlogIndex({
  posts,
  eyebrow = "Eastern Fullfilment Blogs",
  title = "Reading gives you superpowers",
  description = "Let's stay in touch with the ShipHero Blog.",
  initialCategorySlug,
}: {
  posts: PostListItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
  initialCategorySlug?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ResourceHero
          eyebrow={eyebrow}
          icon={Newspaper}
          title={title}
          description={description}
        />
        <section className="container-px py-20 lg:py-28">
          {initialCategorySlug ? (
            <div className="mx-auto mb-6 max-w-6xl">
              <Link
                href="/resources/blog"
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                ← All posts
              </Link>
            </div>
          ) : null}
          <BlogList posts={posts} initialCategorySlug={initialCategorySlug} />
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
