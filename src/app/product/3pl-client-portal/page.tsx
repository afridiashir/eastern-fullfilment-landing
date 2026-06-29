import type { Metadata } from "next";
import { ProductPage } from "@/components/site/product-page";
import { getProduct } from "@/lib/products";

const product = getProduct("3pl-client-portal")!;

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
  return <ProductPage product={product} />;
}
