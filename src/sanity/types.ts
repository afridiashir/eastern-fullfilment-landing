/**
 * Hand-written types for the fields actually selected in `queries.ts`. Mirrors
 * `studio-studio-eastern/schemaTypes` — kept manually since the schema lives
 * in a separate repo (no shared TypeGen pipeline).
 */

export interface SanityImageRef {
  asset?: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

export interface Seo {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: SanityImageRef;
  noIndex?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AuthorRef {
  name: string;
  slug: string;
  image?: SanityImageRef;
  role?: string;
  bio?: string;
}

export interface CategoryRef {
  _id: string;
  title: string;
  slug: string;
}

export interface BlogCategory extends CategoryRef {
  description?: string;
}

export interface PostListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImageRef;
  publishedAt: string;
  author?: AuthorRef;
  categories?: CategoryRef[];
}

export interface Post extends PostListItem {
  body: unknown;
  seo?: Seo;
}

export interface CaseStudyListItem {
  _id: string;
  title: string;
  slug: string;
  client: string;
  clientLogo?: SanityImageRef;
  industry?: string;
  summary?: string;
  mainImage?: SanityImageRef;
  publishedAt: string;
}

export interface CaseStudy extends CaseStudyListItem {
  results?: Stat[];
  body: unknown;
  seo?: Seo;
}

export interface DocArticleListItem {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
}

export interface DocSection {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  articles: DocArticleListItem[];
}

export interface DocArticle {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  body: unknown;
  seo?: Seo;
  category: { _id: string; title: string; slug: string };
}

export type HelpArticleListItem = DocArticleListItem;

export interface HelpTopic {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  articles: HelpArticleListItem[];
}

export interface HelpArticle {
  _id: string;
  title: string;
  summary?: string;
  slug: string;
  body: unknown;
  seo?: Seo;
  category: { _id: string; title: string; slug: string };
}

export interface SlugEntry {
  slug: string;
}
