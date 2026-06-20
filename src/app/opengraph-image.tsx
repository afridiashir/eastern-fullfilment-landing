import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically generated social share card. Uses only flexbox + the default font
// so no external assets are required at build time.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #14213d 55%, #3b5bdb 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#3b5bdb",
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            E
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: -0.5,
            }}
          >
            <span>Eastern</span>
            <span style={{ color: "#9db4ff" }}>Fullfilment</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Order Fulfillment &amp; 3PL for Growing Brands
          </div>
          <div style={{ fontSize: 30, color: "#c7d2fe", maxWidth: 900 }}>
            Faster shipping, accurate inventory, and per-order pricing that
            scales with you.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
