import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourceArticlePage } from "@/components/site/resource-article-page";
import { client } from "@/sanity/client";
import {
  DOC_ARTICLE_QUERY,
  DOC_ARTICLE_SIBLINGS_QUERY,
  DOC_ARTICLE_SLUGS_QUERY,
} from "@/sanity/queries";
import { pageMetadata, siteConfig } from "@/lib/site";
import type { DocArticle, DocArticleListItem, SlugEntry } from "@/sanity/types";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await client.fetch<SlugEntry[]>(DOC_ARTICLE_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await client.fetch<DocArticle | null>(DOC_ARTICLE_QUERY, { slug });
  if (!article) return {};

  return {
    ...pageMetadata({
      title: article.seo?.seoTitle || article.title,
      description:
        article.seo?.seoDescription || article.summary || siteConfig.description,
      path: `/resources/docs/${article.slug}`,
    }),
    ...(article.seo?.noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = await client.fetch<DocArticle | null>(DOC_ARTICLE_QUERY, { slug });
  if (!article) notFound();

  const siblings = await client.fetch<DocArticleListItem[]>(DOC_ARTICLE_SIBLINGS_QUERY, {
    categoryId: article.category._id,
  });

  return (
    <ResourceArticlePage
      eyebrow="Documentation"
      basePath="/resources/docs"
      article={article}
      siblings={siblings}
    />
  );
}
