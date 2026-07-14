import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "./env";
import type { SanityImageRef } from "./types";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Studio content can have an image field with `alt` filled in but no asset
 * ever uploaded — `urlFor` throws on those, so check this before rendering.
 */
export function hasImageAsset(
  source: SanityImageRef | null | undefined,
): source is SanityImageRef & { asset: NonNullable<SanityImageRef["asset"]> } {
  return Boolean(source?.asset);
}
