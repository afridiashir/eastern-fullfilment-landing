import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/site/blog-post-page";
import { client } from "@/sanity/client";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/queries";
import { pageMetadata, siteConfig } from "@/lib/site";
import type { Post, SlugEntry } from "@/sanity/types";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch<SlugEntry[]>(POST_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });
  if (!post) return {};

  return {
    ...pageMetadata({
      title: post.seo?.seoTitle || post.title,
      description: post.seo?.seoDescription || post.excerpt || siteConfig.description,
      path: `/resources/blog/${post.slug}`,
    }),
    ...(post.seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_QUERY, { slug });
  if (!post) notFound();
  return <BlogPostPage post={post} />;
}
