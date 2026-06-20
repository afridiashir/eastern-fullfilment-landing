import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Generated brand mark — also referenced by the web manifest and JSON-LD logo.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3b5bdb",
          color: "#ffffff",
          fontSize: 320,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 96,
        }}
      >
        E
      </div>
    ),
    { ...size },
  );
}
