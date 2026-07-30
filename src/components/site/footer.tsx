import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { gaAttrs } from "@/lib/analytics";
import { Logo } from "./logo";

type FooterLink = { label: string; href: string };

const linkGroups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Fullfilment Automation", href: "/product/fullfilment-automation" },
      { label: "Dispatch Planning", href: "/product/dispatch-planning" },
      { label: "Track & Trace", href: "/product/track-trace" },
      { label: "Analytics and Insight", href: "/product/analytics-insight" },
      { label: "3PL Client Portal", href: "/product/3pl-client-portal" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "E-commerce", href: "/industries/ecommerce" },
      { label: "FMCG/CPG", href: "/industries/fmcg-cpg" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "3PL & CEP", href: "/industries/3pl" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Documentation", href: "/resources/docs" },
      { label: "Help Center", href: "/resources/help" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials: { icon: IconDefinition; href: string; label: string }[] = [
  { icon: faFacebookF, href: "#", label: "Facebook" },
  { icon: faXTwitter, href: "#", label: "Twitter" },
  { icon: faLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: faInstagram, href: "#", label: "Instagram" },
  { icon: faYoutube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-px py-16">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Logo imgClassName="h-9 w-auto" />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Order fulfillment for growing brands — faster shipping, accurate
              inventory, and per-order pricing that scales with you.
            </p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:hello@easternfullfilment.com"
                  className="transition-colors hover:text-primary"
                >
                  hello@easternfullfilment.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+14701234567"
                  className="transition-colors hover:text-primary"
                >
                  +1 (470) 123-45678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Atlanta, GA · Lahore, PK</span>
              </li>
            </ul>

            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  {...gaAttrs("social_click", {
                    social_network: social.label,
                    link_url: social.href,
                    nav_location: "footer",
                  })}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <FontAwesomeIcon icon={social.icon} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold">{group.title}</h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...gaAttrs("nav_click", {
                        nav_location: "footer",
                        nav_group: group.title,
                        nav_item: link.label,
                        link_url: link.href,
                      })}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} Eastern Fullfilment. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              {...gaAttrs("nav_click", {
                nav_location: "footer_legal",
                nav_item: "Privacy",
              })}
              className="transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="#"
              {...gaAttrs("nav_click", {
                nav_location: "footer_legal",
                nav_item: "Terms",
              })}
              className="transition-colors hover:text-primary"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
