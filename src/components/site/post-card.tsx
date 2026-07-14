import Image from "next/image";
import Link from "next/link";
import { hasImageAsset, urlFor } from "@/sanity/image";
import type { PostListItem } from "@/sanity/types";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PostCard({ post }: { post: PostListItem }) {
  const href = `/resources/blog/${post.slug}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-sm">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute inset-0 z-10"
      />
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {hasImageAsset(post.mainImage) ? (
          <Image
            src={urlFor(post.mainImage).width(640).height(400).fit("crop").url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-3 py-6">
        <span className="text-sm text-muted-foreground">
          {formatDate(post.publishedAt)}
        </span>
        <h2 className="font-semibold leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h2>
        {post.excerpt ? (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <Link
            href={href}
            className="relative z-20 text-base text-primary hover:underline"
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
