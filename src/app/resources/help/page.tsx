import type { Metadata } from "next";
import { ComingSoon } from "@/components/site/coming-soon";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Help Center",
    description:
      "The Eastern Fullfilment Help Center is coming soon — answers and support for your fulfillment operation.",
    path: "/resources/help",
  }),
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <ComingSoon
      title="Help Center"
      description="Answers, walkthroughs, and support for your fulfillment operation are coming soon. Need help now? Reach out and we'll jump in."
    />
  );
}
