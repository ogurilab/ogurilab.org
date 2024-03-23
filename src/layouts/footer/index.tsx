import React from "react";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
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

const outreLinks = [
  {
    name: "愛知工業大学",
    href: "https://www.ait.ac.jp/",
  },
  {
    name: "愛知工業大学 情報科学部",
    href: "https://www.ait.ac.jp/faculty/info-science/index.html",
  },
  {
    name: " 小栗真弥 個人サイト",
    href: "https://shinyaoguri.com/",
  },
  {
    name: "雑居ゼミ",
    href: "https://zakkyo.com/",
  },
  {
    name: "全国登文会",
    href: "https://zen-toubunkai.com/",
  },
  {
    name: "愛知登文会",
    href: "http://www.aichi-tobunkai.org/index.html",
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <nav aria-label="Footer">
          <FadeInWithStagger className="grid grid-cols-2 grid-rows-4 items-center justify-between md:flex md:grid-cols-1 md:grid-rows-1 md:justify-center">
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
        <div className="mt-10">
          <p className="px-2 text-sm font-bold tracking-wider md:text-center lg:px-3">
            外部リンク
          </p>
          <FadeInWithStagger className="grid grid-cols-2 grid-rows-4 items-center justify-between md:flex md:grid-cols-1 md:grid-rows-1 md:justify-center">
            {outreLinks.map((item) => (
              <FadeIn
                key={item.name}
                className="relative block p-3 px-2 lg:px-3"
              >
                <a
                  className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  href={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.name}
                </a>
              </FadeIn>
            ))}
          </FadeInWithStagger>
        </div>
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
