import type { Metadata } from "next";
import { ProductRichPage } from "@/components/site/product-rich-page";
import { getProduct } from "@/lib/products";
import { pageMetadata } from "@/lib/site";

const product = getProduct("fullfilment-automation")!;

export const metadata: Metadata = pageMetadata({
  title: product.name,
  description: product.metaDescription,
  path: `/product/${product.slug}`,
});

export default function Page() {
  return <ProductRichPage product={product} />;
}
