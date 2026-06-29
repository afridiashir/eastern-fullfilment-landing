import type { Metadata } from "next";
import { ProductPage } from "@/components/site/product-page";
import { getProduct } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

const product = getProduct("3pl-client-portal")!;

export const metadata: Metadata = pageMetadata({
  title: product.name,
  description: product.metaDescription,
  path: `/product/${product.slug}`,
});

export default function Page() {
  return <ProductPage product={product} />;
}
