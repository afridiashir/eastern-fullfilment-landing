import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  /** Wrapping link target. */
  href?: string;
  /** Extra classes applied to the link wrapper. */
  className?: string;
  /** Show the wordmark next to the logo mark. */
  withWordmark?: boolean;
  /** Tailwind height utility for the logo mark (defaults to a navbar-friendly size). */
  imgClassName?: string;
  /** Force the light-on-dark variant (light logo + white wordmark) regardless of theme. */
  onDark?: boolean;
};

export function Logo({
  href = "#home",
  className,
  withWordmark = true,
  imgClassName = "h-9 w-auto",
  onDark = false,
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={siteConfig.name}
      className={cn("flex items-center gap-2", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo_light.png"
        alt={`${siteConfig.name} logo`}
        width={36}
        height={36}
        className={cn("object-contain", onDark ? "hidden" : "dark:hidden", imgClassName)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo_dark.png"
        alt={`${siteConfig.name} logo`}
        width={36}
        height={36}
        className={cn("object-contain", onDark ? "block" : "hidden dark:block", imgClassName)}
      />
      {withWordmark && (
        <span
          className={cn(
            "text-base font-semibold tracking-tight sm:text-lg",
            onDark && "text-white"
          )}
        >
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
