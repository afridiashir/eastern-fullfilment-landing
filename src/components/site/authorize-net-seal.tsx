import { siteConfig } from "@/lib/site";
import { gaAttrs } from "@/lib/analytics";

const VERIFY_URL = "https://verify.authorize.net/anetseal/";
const SEAL_IMAGE = `${VERIFY_URL}images/secure90x72.gif`;

/**
 * Authorize.Net merchant trust seal.
 *
 * The official snippet is a `seal.js` include that builds its markup with
 * `document.write`. That only works while the document is still parsing — in an
 * App Router app the script would run after hydration and blank the page — so
 * the markup it emits is rendered directly instead. The result is byte-for-byte
 * what `seal.js` produces: an anchor to the verification URL carrying the
 * merchant id (`pid`) and site origin (`rurl`), wrapping the 90x72 seal image.
 *
 * The one deliberate difference: the seal opens in a new tab rather than the
 * fixed 600x430 popup the script forces via an inline `onClick`.
 */
export function AuthorizeNetSeal({ className }: { className?: string }) {
  const verificationUrl = `${VERIFY_URL}?pid=${encodeURI(
    siteConfig.authorizeNetSealId,
  )}&rurl=${encodeURI(siteConfig.url)}`;

  return (
    <div className={className}>
      <a
        href={verificationUrl}
        target="_blank"
        rel="noopener noreferrer"
        {...gaAttrs("select_content", {
          content_type: "trust_seal",
          item_id: "authorize_net",
          nav_location: "footer",
        })}
        className="inline-block"
      >
        {/* Must be served from Authorize.Net's domain to verify — not optimized. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SEAL_IMAGE}
          width={90}
          height={72}
          alt="Authorize.Net Merchant - Click to Verify"
        />
      </a>
    </div>
  );
}
