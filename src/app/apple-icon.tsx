import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — no rounded corners (iOS applies its own mask).
export default async function AppleIcon() {
  // White logo mark, embedded so Satori can render it without a network fetch.
  const logo = await readFile(join(process.cwd(), "public/logo_dark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Eastern Fullfilment" width={112} height={112} />
      </div>
    ),
    { ...size },
  );
}
