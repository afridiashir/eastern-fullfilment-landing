import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Blog",
    description:
      "The Eastern Fullfilment blog is coming soon — insights on fulfillment, logistics, and all-mile delivery.",
    path: "/resources/blog",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <ComingSoon
      title="Our blog"
      description="We're putting together insights on fulfillment, logistics, and all-mile delivery. Check back soon."
    />
  );
}
