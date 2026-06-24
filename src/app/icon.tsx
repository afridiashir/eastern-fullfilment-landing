import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Generated brand mark — also referenced by the web manifest and JSON-LD logo.
export default async function Icon() {
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
          borderRadius: 96,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Eastern Fullfilment" width={320} height={320} />
      </div>
    ),
    { ...size },
  );
}
