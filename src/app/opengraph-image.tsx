import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
// Must match the real dimensions of the file below — these become the
// og:image:width / og:image:height tags.
export const size = { width: 1600, height: 864 };
export const contentType = "image/jpeg";

/**
 * Social share card. Serves the designed artwork in `public/` rather than
 * generating a card with `ImageResponse`, so the preview is exactly the image
 * the business supplied. `twitter-image.tsx` re-exports this module, so the
 * Twitter/X `summary_large_image` card uses the same file.
 */
export default async function OpenGraphImage() {
  const image = await readFile(join(process.cwd(), "public/open-graph.jpg"));

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
