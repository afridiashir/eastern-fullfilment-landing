/**
 * Wraps an inline `<script>` so React doesn't warn when it's re-encountered
 * during a client-side navigation (where it's inert and never re-executes).
 * `type` is the real script type on the server (so it runs during the initial
 * HTML parse) and an inert type on the client. See:
 * https://nextjs.org/docs/app/guides/preventing-flash-before-hydration
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
