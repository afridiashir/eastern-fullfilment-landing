"use client";

import { X, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { cn } from "@/lib/utils";
import { gaAttrs } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { Logo } from "./logo";

interface HeadOfficeDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Only the accounts that actually exist — see `siteConfig.socials`.
const socials: { label: string; href: string; icon: IconDefinition }[] = [
  { label: "Instagram", href: siteConfig.socials.instagram, icon: faInstagram },
  { label: "Facebook", href: siteConfig.socials.facebook, icon: faFacebookF },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: faLinkedinIn },
];

export function HeadOfficeDrawer({ open, onClose }: HeadOfficeDrawerProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[60]",
        open ? "visible" : "pointer-events-none invisible delay-500"
      )}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Panel */}
      <aside
        className={cn(
          "absolute left-0 top-0 flex h-full gap-4 p-4 transition-transform duration-500 ease-out",
          open ? "translate-x-0" : "-translate-x-[120%]"
        )}
      >
        {/* Content card */}
        <div className="flex w-[380px] max-w-[85vw] flex-col rounded-lg bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-8 pt-8">
            <div className="flex flex-col gap-2">
              <Logo withWordmark={false} imgClassName="h-12 w-auto" />
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Eastern Fullfilment
              </span>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground hover:text-background md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-8 py-8">
            <h2 className="text-xl font-bold tracking-tight">Contacts</h2>

            {/* Offices */}
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-foreground">
              Our Offices
            </h3>
            <ul className="mt-4 space-y-5">
              <li className="text-sm leading-relaxed">
                <p className="font-medium text-foreground">🇵🇰 Pakistan Office</p>
                <p className="text-muted-foreground">
                  Vogue Towers, MM Alam Road
                  <br />
                  Block C2, Gulberg III
                  <br />
                  Lahore, 54000, Pakistan
                </p>
              </li>
              <li className="text-sm leading-relaxed">
                <p className="font-medium text-foreground">
                  🇺🇸 United States Office
                </p>
                <p className="text-muted-foreground">
                  235 Mitchell St SW, Suite 235A
                  <br />
                  Atlanta, GA 30303
                  <br />
                  United States
                </p>
              </li>
            </ul>

            {/* Contact numbers */}
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-foreground">
              Contact Numbers
              <span className="ml-1 normal-case text-muted-foreground">
                (WhatsApp Enabled)
              </span>
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-3">
                <a
                  href="tel:+923280865227"
                  className="text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  🇵🇰 Pakistan: +92 310 1234 567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <a
                  href="tel:+14702327717"
                  className="text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  🇺🇸 United States: +1 (470) 123-45678
                </a>
              </li>
            </ul>

            {/* Email */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:hello@easternfullfilment.com"
                className="text-base underline text-muted-foreground transition-colors hover:text-foreground"
              >
                hello@easternfullfilment.com
              </a>
            </div>

            {/* CTA */}
            <a
              href={siteConfig.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              {...gaAttrs("cta_click", {
                cta_location: "head_office_drawer",
                cta_text: "Book Demo",
                cta_destination: siteConfig.demoUrl,
                cta_type: "primary",
              })}
              className="group mt-8 inline-flex w-full items-center justify-center rounded-full px-8 py-3 text-sm font-medium uppercase text-white transition-colors bg-primary"
            >
              <span className="inline-flex h-4 w-4 mr-2 items-center justify-start overflow-hidden transition-all duration-500 ease-out group-hover:w-0 group-hover:mr-0">
                <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-x-4" />
              </span>
              Book Demo
              <span className="inline-flex h-4 w-0 items-center justify-end overflow-hidden transition-all duration-500 ease-out group-hover:w-4 group-hover:ml-2">
                <ChevronRight className="h-4 w-4 shrink-0 translate-x-4 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </span>
            </a>
          </div>

          {/* Social icons */}
          <div className="border-t border-border/60 px-8 py-5">
            <div className="flex items-center justify-center gap-2">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  {...gaAttrs("social_click", {
                    social_network: label,
                    link_url: href,
                    nav_location: "head_office_drawer",
                  })}
                  className="inline-flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-primary"
                >
                  <FontAwesomeIcon icon={icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Image card with close button */}
        <div
          className="relative hidden w-24 overflow-hidden rounded-lg bg-cover bg-center shadow-2xl md:block"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute right-5 top-5 mt-6 inline-flex rotate-90 cursor-pointer items-center justify-center gap-1 text-white"
          >
            <X className="h-5 w-5" />
            Close
          </button>
        </div>
      </aside>
    </div>
  );
}
