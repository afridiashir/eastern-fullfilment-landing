import type { Metadata } from "next";
import { BlogIndex } from "@/components/site/blog-index";
import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";
import { pageMetadata } from "@/lib/site";
import type { PostListItem } from "@/sanity/types";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Insights on fulfillment, logistics, and all-mile delivery from the Eastern Fullfilment team.",
  path: "/resources/blog",
});

export default async function Page() {
  const posts = await client.fetch<PostListItem[]>(POSTS_QUERY);
  return <BlogIndex posts={posts} />;
}
