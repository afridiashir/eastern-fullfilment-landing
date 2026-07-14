/**
 * Sanity connection config. Defaults match `studio-studio-eastern/sanity.config.ts`
 * so the site works against the live dataset with zero local env setup. The
 * dataset is publicly readable, so no API token is required for reads.
 */
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "yvjlgkpi";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const apiVersion = "2024-01-01";
