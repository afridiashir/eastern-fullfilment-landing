import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/site/blog-index";
import { client } from "@/sanity/client";
import {
  BLOG_CATEGORIES_QUERY,
  BLOG_CATEGORY_QUERY,
  POSTS_QUERY,
} from "@/sanity/queries";
import { pageMetadata } from "@/lib/site";
import type { BlogCategory, PostListItem } from "@/sanity/types";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const categories = await client.fetch<BlogCategory[]>(BLOG_CATEGORIES_QUERY);
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await client.fetch<BlogCategory | null>(BLOG_CATEGORY_QUERY, { slug });
  if (!category) return {};

  return pageMetadata({
    title: `${category.title} — Blog`,
    description:
      category.description ||
      `Posts filed under ${category.title} on the Eastern Fullfilment blog.`,
    path: `/resources/blog/category/${category.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const category = await client.fetch<BlogCategory | null>(BLOG_CATEGORY_QUERY, { slug });
  if (!category) notFound();

  const posts = await client.fetch<PostListItem[]>(POSTS_QUERY);

  return (
    <BlogIndex
      posts={posts}
      eyebrow="Blog Category"
      title={category.title}
      description={
        category.description || `Posts filed under ${category.title}.`
      }
      initialCategorySlug={category.slug}
    />
  );
}
