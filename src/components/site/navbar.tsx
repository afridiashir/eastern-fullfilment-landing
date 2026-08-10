"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Sparkles, ChevronRight, ChevronDown, LayoutGrid, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gaAttrs, trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { HeadOfficeDrawer } from "./head-office-drawer";
import { SiteSearch } from "./site-search";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

type NavChild = { label: string; href: string };
type NavLink = { label: string; href?: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Features",
    children: [
      { label: "Fullfilment Automation", href: "/product/fullfilment-automation" },
      { label: "Dispatch Planning", href: "/product/dispatch-planning" },
      { label: "Track & Trace", href: "/product/track-trace" },
      { label: "Analytics and Insight", href: "/product/analytics-insight" },
      { label: "3PL Client Portal", href: "/product/3pl-client-portal" },
      { label: "Shipping Calculator", href: "/product/shipping-calculator" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    label: "Industries",
    children: [
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "FMCG/CPG", href: "/industries/fmcg-cpg" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "3PL & CEP", href: "/industries/3pl" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Documentation", href: "/resources/docs" },
      { label: "Help Center", href: "/resources/help" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [staticHidden, setStaticHidden] = useState(false);
  const [overIntro, setOverIntro] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The navbar sits on top of the full-bleed intro reel, so it goes transparent
  // (and switches to the dark palette) for as long as the reel is on screen.
  // The reel is pinned, so its bottom edge only clears the viewport top once
  // the whole scrub has played out.
  useEffect(() => {
    const intro = document.getElementById("intro-reel");
    const onScroll = () => {
      // Tablet/mobile render the reel inside a `lg:hidden` wrapper, and a
      // display:none element reports an all-zero rect — so this resolves to
      // false there without needing its own breakpoint check.
      setOverIntro(!!intro && intro.getBoundingClientRect().bottom > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Keep the static navbar hidden while the sticky one is on screen, and only
  // reveal it again after the sticky bar has finished sliding back up.
  useEffect(() => {
    if (scrolled) {
      setStaticHidden(true);
      return;
    }
    const t = setTimeout(() => setStaticHidden(false), 500);
    return () => clearTimeout(t);
  }, [scrolled]);

  // Sticky and static bars are the same markup, so the event carries which one
  // was actually on screen when it was clicked.
  const navLocation = (sticky: boolean) => (sticky ? "navbar_sticky" : "navbar");

  const openSearch = (location: string, device: "desktop" | "mobile") => {
    trackEvent("search_open", { nav_location: location, device });
    setSearchOpen(true);
  };

  const toggleMobileMenu = () => {
    trackEvent(open ? "menu_close" : "menu_open", { menu_name: "mobile_nav" });
    setOpen((v) => !v);
  };

  // `transparent` drops the bar's own surface so the intro reel shows through.
  // The `dark` class rescopes the theme variables for everything inside, which
  // flips `text-foreground` to white and swaps the Logo to its on-dark variant.
  const bar = (sticky: boolean, transparent = false) => (
    <>
      <nav
        className={cn(
          "container-lg m-auto flex h-14 items-center justify-between px-3 h-18 sm:px-4 lg:h-22",
          transparent
            ? "dark rounded-lg border border-transparent bg-transparent text-foreground"
            : sticky
            ? "rounded-t-none rounded-b-lg md:px-4 md:mx-8 border-b border-white/20 dark:border-white/10 bg-gray-100/60 dark:bg-card/50 backdrop-blur-xl backdrop-saturate-150"
            : "rounded-lg border bg-gray-100 dark:bg-card"
        )}
      >
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => {
              trackEvent("menu_open", {
                menu_name: "head_office",
                nav_location: navLocation(sticky),
              });
              setSideOpen(true);
            }}
            className="group hidden lg:inline-flex items-center justify-center text-foreground cursor-pointer"
          >
            <LayoutGrid className="h-6 w-6 fill-transparent transition-colors duration-300 group-hover:fill-foreground" />
          </button>
          <Logo onDark={transparent} />
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            if (link.children) {
              const isActive = link.children.some((c) =>
                pathname.startsWith(c.href)
              );
              return (
                <div key={link.label} className="group/dd relative">
                  <button
                    type="button"
                    className={cn(
                      "group flex items-center gap-1.5 rounded-full uppercase px-4 py-3 text-sm font-medium text-foreground transition-colors xl:px-6",
                      isActive
                        ? "bg-white text-black"
                        : "bg-transparent hover:bg-primary hover:text-white"
                    )}
                  >
                    <span className="relative block h-5 overflow-hidden leading-5">
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                        {link.label}
                      </span>
                    </span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover/dd:rotate-180" />
                  </button>

                  {/* Dropdown panel */}
                  <div className="invisible absolute left-0 top-full z-50 translate-y-1 pt-3 opacity-0 transition-all duration-300 group-hover/dd:visible group-hover/dd:translate-y-0 group-hover/dd:opacity-100">
                    <div className="flex min-w-64 flex-col gap-1 rounded-lg border bg-gray-100 p-2 shadow-xl dark:bg-card">
                      {link.children.map((child) => {
                        const isChildActive = pathname.startsWith(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            {...gaAttrs("nav_click", {
                              nav_location: navLocation(sticky),
                              nav_group: link.label,
                              nav_item: child.label,
                              link_url: child.href,
                            })}
                            className={cn(
                              "rounded-full uppercase px-5 py-3 text-sm font-medium leading-5 transition-colors",
                              isChildActive
                                ? "bg-white text-black"
                                : "bg-transparent text-foreground hover:bg-primary hover:text-white"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href ?? "#"}
                {...gaAttrs("nav_click", {
                  nav_location: navLocation(sticky),
                  nav_item: link.label,
                  link_url: link.href,
                })}
                className={cn(
                  "group rounded-full uppercase px-5 py-3 text-sm font-medium text-foreground transition-colors xl:px-8",
                  isActive
                    ? "bg-white text-black"
                    : "bg-transparent hover:bg-primary hover:text-white"
                )}
              >
                <span className="relative block h-5 overflow-hidden leading-5">
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                    {link.label}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle className="h-11 w-11" />
          <button
            type="button"
            aria-label="Search"
            onClick={() => openSearch(navLocation(sticky), "desktop")}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:text-muted-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href={siteConfig.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            {...gaAttrs("cta_click", {
              cta_location: navLocation(sticky),
              cta_text: "Get Started",
              cta_destination: siteConfig.appUrl,
              cta_type: "primary",
            })}
            className="group inline-flex items-center rounded-full uppercase px-5 py-3 text-sm font-medium text-black transition-colors border-primary border bg-primary text-white xl:px-8"
          >
            <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
            </span>
            Get Started
            <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
              <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </span>
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Search"
            onClick={() => openSearch(navLocation(sticky), "mobile")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:text-muted-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <span className="flex h-5 w-5 flex-col items-end justify-center gap-1">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-2/3 rounded-full bg-current transition-all duration-300 group-hover:w-full" />
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Static navbar (over hero) */}
      <header
        className={cn(
          "absolute left-0 top-0 z-40 w-full bg-transparent p-3 sm:p-4 lg:px-12",
          staticHidden && "invisible opacity-0"
        )}
      >
        {bar(false, overIntro)}
      </header>

      {/* Sticky navbar (slides down on scroll) */}
      <header
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-transform duration-500 ease-out",
          scrolled ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {bar(true, overIntro)}
      </header>

      <HeadOfficeDrawer open={sideOpen} onClose={() => setSideOpen(false)} />

      {/* Mobile menu (slides in from the right) */}
      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[65] lg:hidden",
          open ? "visible" : "pointer-events-none invisible delay-500"
        )}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-500",
            open ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Panel */}
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-72 max-w-[80vw] flex-col bg-background shadow-2xl transition-transform duration-500 ease-out",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Logo imgClassName="h-8 w-auto" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
            {navLinks.map((link) => {
              if (link.children) {
                const isOpen = mobileSection === link.label;
                return (
                  <div key={link.label}>
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent(
                          isOpen ? "nav_group_close" : "nav_group_open",
                          { nav_location: "mobile_nav", nav_group: link.label },
                        );
                        setMobileSection(isOpen ? null : link.label);
                      }}
                      className="flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-medium uppercase text-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            {...gaAttrs("nav_click", {
                              nav_location: "mobile_nav",
                              nav_group: link.label,
                              nav_item: child.label,
                              link_url: child.href,
                            })}
                            className={cn(
                              "block rounded-md px-6 py-2.5 text-sm font-medium uppercase transition-colors",
                              pathname.startsWith(child.href)
                                ? "text-primary"
                                : "text-foreground hover:text-primary"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href ?? "#"}
                  onClick={() => setOpen(false)}
                  {...gaAttrs("nav_click", {
                    nav_location: "mobile_nav",
                    nav_item: link.label,
                    link_url: link.href,
                  })}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm font-medium uppercase transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              {...gaAttrs("cta_click", {
                cta_location: "mobile_nav",
                cta_text: "Get Started",
                cta_destination: siteConfig.appUrl,
                cta_type: "primary",
              })}
              className="mt-10 group inline-flex items-center justify-center rounded-full uppercase px-5 py-3 text-sm font-medium text-black transition-colors border-primary border bg-primary text-white xl:px-8"
            >
              <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
              </span>
              Get Started
              <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </span>
            </a>
          </div>
        </aside>
      </div>

      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}