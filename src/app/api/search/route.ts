import { NextResponse } from "next/server";
import { searchContent } from "@/lib/search-content";
import { MIN_QUERY_LENGTH, type SearchResult } from "@/lib/search";

/** Results returned to the search bar. The full /search page asks for more. */
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 50;

export type SearchResponse = {
  query: string;
  results: SearchResult[];
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") ?? "").trim();

  if (query.length < MIN_QUERY_LENGTH) {
    return NextResponse.json<SearchResponse>({ query, results: [] });
  }

  const requested = Number.parseInt(searchParams.get("limit") ?? "", 10);
  const limit = Number.isFinite(requested)
    ? Math.min(Math.max(requested, 1), MAX_LIMIT)
    : DEFAULT_LIMIT;

  const results = await searchContent(query, limit);

  return NextResponse.json<SearchResponse>(
    { query, results },
    {
      headers: {
        // Public content, and the same few queries repeat constantly.
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
