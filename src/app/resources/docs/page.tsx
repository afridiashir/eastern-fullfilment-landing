import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Documentation",
    description:
      "Eastern Fullfilment documentation is coming soon — guides and API references for our platform.",
    path: "/resources/docs",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <ComingSoon
      title="Documentation"
      description="Guides and API references for integrating with the Eastern platform are on the way."
    />
  );
}
