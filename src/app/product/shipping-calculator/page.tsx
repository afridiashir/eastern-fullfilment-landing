import type { Metadata } from "next";
import { ShippingCalculatorPage } from "@/components/site/shipping-calculator-page";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Shipping Calculator",
  description:
    "Estimate US shipping costs from our IAD fulfillment center. Enter a destination ZIP and package weight to compare overnight, expedited, standard, and ground rates side by side.",
  path: "/product/shipping-calculator",
  keywords: [
    "shipping calculator",
    "shipping cost estimator",
    "shipping rates",
    "USPS zone calculator",
    "ground shipping rates",
    "overnight shipping cost",
    "3PL shipping rates",
    "parcel rate calculator",
  ],
});

export default function Page() {
  return <ShippingCalculatorPage />;
}
