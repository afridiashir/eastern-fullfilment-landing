import Image from "next/image";
import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";
import { PortableText as PortableTextRenderer } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-7 text-foreground">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-bold tracking-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 text-lg font-semibold tracking-tight">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary pl-5 text-lg italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-6 text-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-6 text-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-7">{children}</li>,
    number: ({ children }) => <li className="leading-7">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const isInternal = href.startsWith("/") || href.startsWith("#");
      const external = !isInternal && value?.openInNewTab;
      if (isInternal) {
        return (
          <Link href={href} className="text-primary underline underline-offset-4">
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-primary underline underline-offset-4"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src={urlFor(value).width(1600).height(900).fit("crop").url()}
              alt={value.alt ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {value.caption ? (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableText({
  value,
  className,
}: {
  value: unknown;
  className?: string;
}) {
  if (!value) return null;
  return (
    <div className={cn("space-y-5", className)}>
      <PortableTextRenderer
        value={value as Parameters<typeof PortableTextRenderer>[0]["value"]}
        components={components}
      />
    </div>
  );
}
