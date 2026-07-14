import Image from "next/image";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CtaBanner } from "@/components/site/cta";
import { PortableText } from "@/components/site/portable-text";
import { Badge } from "@/components/ui/badge";
import { hasImageAsset, urlFor } from "@/sanity/image";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { Post } from "@/sanity/types";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPostPage({ post }: { post: Post }) {
  const authorImage = post.author?.image;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    image: hasImageAsset(post.mainImage)
      ? urlFor(post.mainImage).width(1600).url()
      : undefined,
    author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    mainEntityOfPage: absoluteUrl(`/resources/blog/${post.slug}`),
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="container-px pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="mx-auto max-w-3xl">
            {post.categories && post.categories.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {post.categories.map((category) => (
                  <Badge key={category._id} variant="secondary">
                    {category.title}
                  </Badge>
                ))}
              </div>
            ) : null}
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              {hasImageAsset(authorImage) ? (
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={urlFor(authorImage).width(72).height(72).fit("crop").url()}
                    alt={post.author?.name ?? ""}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              {post.author?.name ? <span>{post.author.name}</span> : null}
              {post.author?.name ? <span>·</span> : null}
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          </div>

          {hasImageAsset(post.mainImage) ? (
            <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={urlFor(post.mainImage).width(1600).height(900).fit("crop").url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="mx-auto mt-10 max-w-3xl">
            <PortableText value={post.body} />
          </div>
        </article>
        <CtaBanner />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        // Structured data is static, server-rendered JSON — safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
