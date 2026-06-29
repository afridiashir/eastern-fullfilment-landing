import type { Metadata } from "next";
import { ProductRichPage } from "@/components/site/product-rich-page";
import { getProduct } from "@/lib/products";

const product = getProduct("fullfilment-automation")!;

export const metadata: Metadata = {
  title: product.name,
  description: product.metaDescription,
  alternates: { canonical: `/product/${product.slug}` },
  openGraph: {
    title: `${product.name} — Eastern Fullfilment`,
    description: product.metaDescription,
    url: `/product/${product.slug}`,
  },
};

export default function Page() {
  return <ProductRichPage product={product} />;
}
