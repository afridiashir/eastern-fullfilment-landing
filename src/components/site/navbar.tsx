"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Sparkles, ChevronRight, ChevronDown, LayoutGrid, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeadOfficeDrawer } from "./head-office-drawer";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

type NavChild = { label: string; href: string };
type NavLink = { label: string; href?: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Product",
    children: [
      { label: "Fullfilment Automation", href: "/product/fullfilment-automation" },
      { label: "Dispatch Planning", href: "/product/dispatch-planning" },
      { label: "Track & Trace", href: "/product/track-trace" },
      { label: "Analytics and Insight", href: "/product/analytics-insight" },
      { label: "3PL Client Portal", href: "/product/3pl-client-portal" },
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
  const [overReel, setOverReel] = useState(false);
  const pathname = usePathname();
  // Homepage opens over the full-screen intro reel: the navbar is transparent
  // (white) while it sits over that dark video, then turns to glass past it.
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Transparent as long as the intro-reel video is still behind the navbar.
      const reel = isHome ? document.getElementById("intro-reel") : null;
      setOverReel(!!reel && reel.getBoundingClientRect().bottom > 88);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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

  const bar = (sticky: boolean) => {
    // Transparent while over the intro-reel video (static bar, or sticky bar
    // still above the reel). Over dark video → white text/icons.
    const transparent = isHome && (!sticky || overReel);
    const fg = transparent ? "text-white" : "text-foreground";
    return (
    <>
      <nav
        className={cn(
          "container-lg m-auto flex h-14 items-center justify-between px-3 h-18 sm:px-4 lg:h-22 transition-colors duration-300",
          // Keep the same layout/width as the glass sticky bar so there's no
          // width jump when it swaps from transparent to glass.
          sticky
            ? "rounded-t-none rounded-b-lg md:px-4 md:mx-8"
            : "rounded-lg",
          transparent
            ? "bg-transparent"
            : sticky
              ? "border-b border-white/20 dark:border-white/10 bg-gray-100/60 dark:bg-card/50 backdrop-blur-xl backdrop-saturate-150"
              : "border border-white/20 dark:border-white/10 bg-gray-100/60 dark:bg-card/50 backdrop-blur-xl backdrop-saturate-150"
        )}
      >
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setSideOpen(true)}
            className={cn(
              "group hidden lg:inline-flex items-center justify-center cursor-pointer",
              fg
            )}
          >
            <LayoutGrid
              className={cn(
                "h-6 w-6 transition-colors duration-300",
                transparent
                  ? "fill-current"
                  : "fill-transparent group-hover:fill-current"
              )}
            />
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
                      "group flex items-center gap-1.5 rounded-full uppercase px-4 py-3 text-sm font-medium transition-colors xl:px-6",
                      isActive
                        ? "bg-white text-black"
                        : cn("bg-transparent hover:bg-primary hover:text-white", fg)
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
                className={cn(
                  "group rounded-full uppercase px-5 py-3 text-sm font-medium transition-colors xl:px-8",
                  isActive
                    ? "bg-white text-black"
                    : cn("bg-transparent hover:bg-primary hover:text-white", fg)
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
          <ThemeToggle className={cn("h-11 w-11", fg)} />
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className={cn(
              "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors hover:text-muted-foreground",
              fg
            )}
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href="#contact"
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
          <ThemeToggle className={fg} />
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:text-muted-foreground",
              fg
            )}
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={cn(
              "group inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md",
              fg
            )}
            onClick={() => setOpen((v) => !v)}
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
  };

  return (
    <>
      {/* Static navbar — transparent over the hero/intro reel */}
      <header
        className={cn(
          "absolute left-0 top-0 z-40 w-full bg-transparent p-3 sm:p-4 lg:px-12",
          staticHidden && "invisible opacity-0"
        )}
      >
        {bar(false)}
      </header>

      {/* Sticky navbar (glass, slides down on scroll) */}
      <header
        className={cn(
          "fixed left-0 top-0 z-50 w-full transition-transform duration-500 ease-out",
          scrolled ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {bar(true)}
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
                      onClick={() =>
                        setMobileSection(isOpen ? null : link.label)
                      }
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
            href="#contact"
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

      {/* Search bar */}
      <div
        aria-hidden={!searchOpen}
        className={cn(
          "fixed inset-x-0 top-0 z-[70]",
          searchOpen ? "visible" : "pointer-events-none invisible delay-500"
        )}
      >
        {/* Overlay */}
        <div
          onClick={() => setSearchOpen(false)}
          className={cn(
            "fixed inset-0 bg-black/50 transition-opacity duration-500",
            searchOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Bar */}
        <div
          className={cn(
            "relative bg-background shadow-lg transition-transform duration-500 ease-out",
            searchOpen ? "translate-y-0" : "-translate-y-full"
          )}
        >
          <div className="container-lg m-auto flex items-center gap-3 px-4 py-5 sm:gap-4 sm:px-8 lg:px-12 lg:py-6">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              autoFocus={searchOpen}
              placeholder="Search..."
              className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-lg"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
