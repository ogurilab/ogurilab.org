import React from "react";
import { FadeInWithStagger } from "@/components/fade-in";
import { FacebookIcon } from "@/icons/facebook-icon";
import { GithubIcon } from "@/icons/github-icon";
import { ScrapboxIcon } from "@/icons/scrapbox-icon";
import { XIcon } from "@/icons/x-icon";
import { navigation } from "@/layouts/nav";
import { NavItem } from "@/layouts/nav/nav-item";

const social = [
  {
    name: "GitHub",
    href: "https://github.com/ogurilab",
    icon: GithubIcon,
  },
  {
    name: "ScrapBox",
    href: "https://scrapbox.io/ogurilab",
    icon: ScrapboxIcon,
  },
  {
    name: "X",
    href: "https://twitter.com/shinyaoguri",
    icon: XIcon,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/shinya.ogu",
    icon: FacebookIcon,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <nav aria-label="Footer">
          <FadeInWithStagger className="-mb-6  columns-2 items-center justify-between md:flex md:justify-center">
            {navigation.map((item) => (
              <NavItem
                key={item.label}
                activeLine={false}
                className="text-sm"
                href={item.href}
              >
                {item.ja}
              </NavItem>
            ))}
          </FadeInWithStagger>
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
          &copy; 2024 Digital Culture Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
