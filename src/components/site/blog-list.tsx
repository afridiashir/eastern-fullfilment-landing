"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { EmptyState } from "@/components/site/resource-hero";
import { PostCard } from "@/components/site/post-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AuthorRef, PostListItem } from "@/sanity/types";

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Map<string, T>();
  for (const item of items) {
    if (!seen.has(item.slug)) seen.set(item.slug, item);
  }
  return Array.from(seen.values());
}

function toggle(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function BlogList({
  posts,
  initialCategorySlug,
}: {
  posts: PostListItem[];
  initialCategorySlug?: string;
}) {
  const categories = useMemo(
    () =>
      uniqueBySlug(posts.flatMap((post) => post.categories ?? [])).sort(
        (a, b) => a.title.localeCompare(b.title),
      ),
    [posts],
  );
  const authors = useMemo(
    () =>
      uniqueBySlug(
        posts.map((post) => post.author).filter((author): author is AuthorRef => Boolean(author)),
      ).sort((a, b) => a.name.localeCompare(b.name)),
    [posts],
  );

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    () => new Set(initialCategorySlug ? [initialCategorySlug] : []),
  );
  const [selectedAuthors, setSelectedAuthors] = useState<Set<string>>(new Set());

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        (post.excerpt?.toLowerCase().includes(query) ?? false);
      const matchesCategory =
        selectedCategories.size === 0 ||
        (post.categories?.some((category) => selectedCategories.has(category.slug)) ?? false);
      const matchesAuthor =
        selectedAuthors.size === 0 ||
        (post.author ? selectedAuthors.has(post.author.slug) : false);
      return matchesSearch && matchesCategory && matchesAuthor;
    });
  }, [posts, search, selectedCategories, selectedAuthors]);

  const hasActiveFilters =
    search !== "" || selectedCategories.size > 0 || selectedAuthors.size > 0;

  function clearFilters() {
    setSearch("");
    setSelectedCategories(new Set());
    setSelectedAuthors(new Set());
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search posts…"
            className="h-10 pl-9"
          />
        </div>

        {categories.length > 0 ? (
          <FilterGroup
            title="Category"
            items={categories.map((category) => ({
              value: category.slug,
              label: category.title,
            }))}
            selected={selectedCategories}
            onToggle={(value) => setSelectedCategories((prev) => toggle(prev, value))}
          />
        ) : null}

        {authors.length > 0 ? (
          <FilterGroup
            title="Author"
            items={authors.map((author) => ({
              value: author.slug,
              label: author.name,
            }))}
            selected={selectedAuthors}
            onToggle={(value) => setSelectedAuthors((prev) => toggle(prev, value))}
          />
        ) : null}

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </button>
        ) : null}
      </aside>

      <div>
        {posts.length > 0 ? (
          <p className="mb-6 text-sm text-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
          </p>
        ) : null}

        {filteredPosts.length === 0 ? (
          <EmptyState
            message={
              posts.length === 0
                ? "Nothing published yet — check back soon."
                : "No posts match your filters."
            }
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: { value: string; label: string }[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <div className="mt-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.value}>
            <label
              className={cn(
                "flex cursor-pointer items-center gap-2.5 text-sm text-foreground",
                selected.has(item.value) && "font-medium text-primary",
              )}
            >
              <input
                type="checkbox"
                checked={selected.has(item.value)}
                onChange={() => onToggle(item.value)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
