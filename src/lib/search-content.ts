/**
 * Server-side search: static pages + Sanity content, merged and ranked.
 *
 * Server only — it pulls in the Sanity client. Client components should call
 * `/api/search` instead and import types from `@/lib/search`.
 */

import { client } from "@/sanity/client";
import { SEARCH_QUERY } from "@/sanity/queries";
import {
  MIN_QUERY_LENGTH,
  parseTerms,
  rankResults,
  scoreMatch,
  searchStaticPages,
  type SearchGroup,
  type SearchResult,
} from "@/lib/search";

/** Cap per content type before ranking. */
const PER_TYPE_LIMIT = 12;

type SearchDoc = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  summary?: string;
  client?: string;
};

type SearchQueryResult = {
  posts: SearchDoc[];
  caseStudies: SearchDoc[];
  docArticles: SearchDoc[];
  helpArticles: SearchDoc[];
};

/**
 * Turn a user query into a GROQ `match` pattern: each word becomes a prefix
 * wildcard so "ship cal" finds "Shipping Calculator". Terms come from
 * `parseTerms`, which has already stripped everything but letters and digits,
 * so no `match` metacharacters can survive into the pattern.
 */
const toMatchPattern = (terms: string[]) =>
  terms.map((term) => `${term}*`).join(" ");

/** Search the CMS. Returns [] rather than throwing if Sanity is unreachable. */
async function searchSanity(terms: string[]): Promise<SearchResult[]> {
  let data: SearchQueryResult;
  try {
    data = await client.fetch<SearchQueryResult>(SEARCH_QUERY, {
      term: toMatchPattern(terms),
      limit: PER_TYPE_LIMIT,
    });
  } catch (error) {
    // Search degrading to static pages beats an error state in the UI.
    console.error("Sanity search failed:", error);
    return [];
  }

  const collect = (
    docs: SearchDoc[] | null | undefined,
    group: SearchGroup,
    path: string,
  ): SearchResult[] =>
    (docs ?? []).flatMap((doc) => {
      const description = doc.excerpt ?? doc.summary;
      const body = [description, doc.client].filter(Boolean).join(" ");
      // The GROQ `match` already found these, but re-scoring locally puts CMS
      // hits and static pages on one scale.
      const score = scoreMatch(doc.title, body, terms) || 1;
      return [
        {
          id: doc._id,
          title: doc.title,
          description,
          href: `${path}/${doc.slug}`,
          group,
          score,
        },
      ];
    });

  return [
    ...collect(data?.posts, "Blog", "/resources/blog"),
    ...collect(data?.caseStudies, "Case Studies", "/resources/case-studies"),
    ...collect(data?.docArticles, "Documentation", "/resources/docs"),
    ...collect(data?.helpArticles, "Help Center", "/resources/help"),
  ];
}

/**
 * Run a full site search. Short queries return nothing rather than matching
 * half the site.
 */
export async function searchContent(
  query: string,
  limit?: number,
): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (trimmed.length < MIN_QUERY_LENGTH) return [];

  const terms = parseTerms(trimmed);
  if (terms.length === 0) return [];

  const [staticResults, sanityResults] = await Promise.all([
    Promise.resolve(searchStaticPages(terms)),
    searchSanity(terms),
  ]);

  return rankResults([...staticResults, ...sanityResults], limit);
}
