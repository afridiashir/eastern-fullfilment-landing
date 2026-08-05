"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import {
  MIN_QUERY_LENGTH,
  groupResults,
  type SearchResult,
} from "@/lib/search";
import type { SearchResponse } from "@/app/api/search/route";

const DEBOUNCE_MS = 200;

interface SiteSearchProps {
  open: boolean;
  onClose: () => void;
}

export function SiteSearch({ open, onClose }: SiteSearchProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  /** Query the current `results` belong to, so we never show stale hits. */
  const [settledQuery, setSettledQuery] = useState("");
  // `search` is reported once per settled query, not per keystroke.
  const reportedRef = useRef("");

  const trimmed = query.trim();
  const tooShort = trimmed.length < MIN_QUERY_LENGTH;
  const sections = groupResults(results);

  /* Fetch, debounced, with in-flight requests cancelled on every new keystroke. */
  useEffect(() => {
    if (!open) return;

    if (tooShort) {
      setResults([]);
      setSettledQuery("");
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Search failed: ${res.status}`);
        const data: SearchResponse = await res.json();

        setResults(data.results);
        setSettledQuery(trimmed);
        setActiveIndex(-1);
        setLoading(false);

        if (reportedRef.current !== trimmed) {
          reportedRef.current = trimmed;
          trackEvent("search", {
            search_term: trimmed,
            results_count: data.results.length,
          });
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setResults([]);
        setSettledQuery(trimmed);
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [trimmed, tooShort, open]);

  /* Focus on open, reset on close. */
  useEffect(() => {
    if (open) {
      // The panel animates in; focus once it's actually on screen.
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
    setQuery("");
    setResults([]);
    setSettledQuery("");
    setActiveIndex(-1);
    reportedRef.current = "";
  }, [open]);

  /* Escape closes from anywhere, including the overlay. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  /* Keep the highlighted option in view when arrowing through a long list. */
  useEffect(() => {
    if (activeIndex < 0) return;
    document
      .getElementById(`search-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const goToResult = useCallback(
    (result: SearchResult, position: number) => {
      trackEvent("search_result_click", {
        search_term: trimmed,
        link_url: result.href,
        result_group: result.group,
        result_position: position + 1,
      });
      onClose();
      router.push(result.href);
    },
    [trimmed, onClose, router],
  );

  const showAll = useCallback(() => {
    if (tooShort) return;
    trackEvent("search_view_all", { search_term: trimmed });
    onClose();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }, [tooShort, trimmed, onClose, router]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (results.length === 0 ? -1 : (i + 1) % results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        results.length === 0 ? -1 : (i <= 0 ? results.length : i) - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const active = results[activeIndex];
      if (active) goToResult(active, activeIndex);
      else showAll();
    }
  }

  // Flat position of each result, so arrow keys and the grouped markup agree.
  let flatIndex = -1;

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-x-0 top-0 z-[70]",
        open ? "visible" : "pointer-events-none invisible delay-500",
      )}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Bar */}
      <div
        className={cn(
          "relative bg-background shadow-lg transition-transform duration-500 ease-out",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="container-lg m-auto px-4 py-5 sm:px-8 lg:px-12 lg:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded={sections.length > 0}
              aria-controls="search-results"
              aria-autocomplete="list"
              aria-activedescendant={
                activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
              }
              aria-label="Search the site"
              placeholder="Search products, industries, docs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-lg"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Results */}
          {!tooShort && (
            <div
              id="search-results"
              role="listbox"
              aria-label="Search results"
              className="mt-4 max-h-[60vh] overflow-y-auto border-t border-border pt-4"
            >
              {loading && results.length === 0 && (
                <p className="px-1 py-6 text-sm text-muted-foreground">
                  Searching…
                </p>
              )}

              {!loading && results.length === 0 && settledQuery === trimmed && (
                <div className="px-1 py-6">
                  <p className="text-sm font-medium">
                    No results for &ldquo;{trimmed}&rdquo;
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try a product name, an industry, or a topic like
                    &ldquo;returns&rdquo; — or{" "}
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="text-primary underline underline-offset-4"
                    >
                      ask our team
                    </Link>
                    .
                  </p>
                </div>
              )}

              {sections.map((section) => (
                <div key={section.group} className="mb-4 last:mb-0">
                  <h3 className="px-1 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {section.group}
                  </h3>
                  <ul>
                    {section.results.map((result) => {
                      flatIndex += 1;
                      const index = flatIndex;
                      const isActive = index === activeIndex;
                      return (
                        <li key={result.id}>
                          <Link
                            id={`search-option-${index}`}
                            role="option"
                            aria-selected={isActive}
                            href={result.href}
                            onClick={(e) => {
                              e.preventDefault();
                              goToResult(result, index);
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                            className={cn(
                              "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
                              isActive ? "bg-secondary" : "hover:bg-secondary/60",
                            )}
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground">
                                {result.title}
                              </p>
                              {result.description && (
                                <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                                  {result.description}
                                </p>
                              )}
                            </div>
                            <ArrowRight
                              className={cn(
                                "mt-0.5 h-4 w-4 shrink-0 transition-opacity",
                                isActive
                                  ? "text-primary opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}

              {results.length > 0 && (
                <button
                  type="button"
                  onClick={showAll}
                  className="mt-2 flex w-full cursor-pointer items-center justify-between gap-3 border-t border-border px-3 pt-4 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span>
                    See all results for &ldquo;{trimmed}&rdquo;
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <CornerDownLeft className="h-3.5 w-3.5" />
                    Enter
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
