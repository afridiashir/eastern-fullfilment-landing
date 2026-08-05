// GROQ queries for the Resources section (Blog, Case Studies, Documentation,
// Help Center) backed by the `studio-studio-eastern` schema.

export const POSTS_QUERY = /* groq */ `
*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->{name, "slug": slug.current, image},
  "categories": categories[]->{_id, title, "slug": slug.current}
}`;

export const POST_SLUGS_QUERY = /* groq */ `
*[_type == "post" && defined(slug.current)]{"slug": slug.current}`;

export const BLOG_CATEGORIES_QUERY = /* groq */ `
*[_type == "category" && defined(slug.current)] | order(title asc) {
  _id, title, "slug": slug.current, description
}`;

export const BLOG_CATEGORY_QUERY = /* groq */ `
*[_type == "category" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, description
}`;

export const POST_QUERY = /* groq */ `
*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  body,
  seo,
  "author": author->{name, "slug": slug.current, image, role, bio},
  "categories": categories[]->{_id, title, "slug": slug.current}
}`;

export const CASE_STUDIES_QUERY = /* groq */ `
*[_type == "caseStudy" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  client,
  clientLogo,
  industry,
  summary,
  mainImage,
  publishedAt
}`;

export const CASE_STUDY_SLUGS_QUERY = /* groq */ `
*[_type == "caseStudy" && defined(slug.current)]{"slug": slug.current}`;

export const CASE_STUDY_QUERY = /* groq */ `
*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  client,
  clientLogo,
  industry,
  summary,
  mainImage,
  publishedAt,
  results,
  body,
  seo
}`;

export const DOC_SECTIONS_QUERY = /* groq */ `
*[_type == "docCategory"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "articles": *[_type == "docArticle" && references(^._id) && defined(slug.current)] | order(order asc) {
    _id, title, "slug": slug.current, summary
  }
}`;

export const DOC_ARTICLE_SLUGS_QUERY = /* groq */ `
*[_type == "docArticle" && defined(slug.current)]{"slug": slug.current}`;

export const DOC_ARTICLE_QUERY = /* groq */ `
*[_type == "docArticle" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  body,
  seo,
  "category": category->{_id, title, "slug": slug.current}
}`;

export const DOC_ARTICLE_SIBLINGS_QUERY = /* groq */ `
*[_type == "docArticle" && category._ref == $categoryId && defined(slug.current)] | order(order asc) {
  _id, title, "slug": slug.current, summary
}`;

export const HELP_TOPICS_QUERY = /* groq */ `
*[_type == "helpCategory"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  description,
  "articles": *[_type == "helpArticle" && references(^._id) && defined(slug.current)] | order(order asc) {
    _id, title, "slug": slug.current, summary
  }
}`;

export const HELP_ARTICLE_SLUGS_QUERY = /* groq */ `
*[_type == "helpArticle" && defined(slug.current)]{"slug": slug.current}`;

export const HELP_ARTICLE_QUERY = /* groq */ `
*[_type == "helpArticle" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  summary,
  body,
  seo,
  "category": category->{_id, title, "slug": slug.current}
}`;

export const HELP_ARTICLE_SIBLINGS_QUERY = /* groq */ `
*[_type == "helpArticle" && category._ref == $categoryId && defined(slug.current)] | order(order asc) {
  _id, title, "slug": slug.current, summary
}`;

/**
 * Site search across every published content type.
 *
 * `$term` is a space-separated list of `word*` patterns built by the caller —
 * `match` requires every token to hit, so multi-word queries narrow rather than
 * widen. Body text is searched via `pt::text()` so an article still surfaces
 * when the query only appears in its content. Results are capped per type and
 * ranked in the app, alongside the static pages, by a single scoring function.
 */
export const SEARCH_QUERY = /* groq */ `
{
  "posts": *[_type == "post" && defined(slug.current) && (
    title match $term || excerpt match $term || pt::text(body) match $term
  )] | order(publishedAt desc) [0...$limit] {
    _id, title, "slug": slug.current, excerpt
  },
  "caseStudies": *[_type == "caseStudy" && defined(slug.current) && (
    title match $term || client match $term || summary match $term || pt::text(body) match $term
  )] | order(publishedAt desc) [0...$limit] {
    _id, title, "slug": slug.current, summary, client
  },
  "docArticles": *[_type == "docArticle" && defined(slug.current) && (
    title match $term || summary match $term || pt::text(body) match $term
  )] | order(order asc) [0...$limit] {
    _id, title, "slug": slug.current, summary
  },
  "helpArticles": *[_type == "helpArticle" && defined(slug.current) && (
    title match $term || summary match $term || pt::text(body) match $term
  )] | order(order asc) [0...$limit] {
    _id, title, "slug": slug.current, summary
  }
}`;
