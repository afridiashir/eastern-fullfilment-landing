import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Case Studies",
    description:
      "Eastern Fullfilment case studies are coming soon — real results from brands scaling their fulfillment.",
    path: "/resources/case-studies",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <ComingSoon
      title="Case studies"
      description="We're gathering stories of brands that scaled their fulfillment with Eastern. Real numbers, coming soon."
    />
  );
}
