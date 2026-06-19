import type { Metadata } from "next";
import { Manrope, DM_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { SmoothScroll } from "@/components/site/smooth-scroll";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eastern Fullfilment — Order Fulfillment & 3PL for Growing Brands",
  description:
    "Faster shipping, accurate inventory, and per-order pricing that scales with you. Pick & pack, storage, returns, and multi-warehouse distribution with no long-term contract.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          // Apply the saved (or system) theme before paint to avoid a flash of the wrong theme.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
