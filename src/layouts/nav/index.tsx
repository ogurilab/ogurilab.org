import React from "react";
import { FadeInWithStagger } from "@/components/fade-in";
import { NavItem } from "@/layouts/nav/nav-item";

export const navigation = [
  {
    href: "/about",
    label: "About",
    ja: "dclabについて",
  },
  {
    href: "/join",
    label: "Join",
    ja: "学生の方へ",
  },
  {
    href: "/news",
    label: "News",
    ja: "ニュース",
  },
  {
    href: "/members",
    label: "Members",
    ja: "メンバー",
  },

  {
    href: "/research",
    label: "Research",
    ja: "研究・制作",
  },
  {
    href: "/publications",
    label: "Publications",
    ja: "活動実績",
  },

  {
    href: "/contact",
    label: "Contact",
    ja: "お問い合わせ",
  },
];

export function Navigation({
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <FadeInWithStagger className="flex overflow-hidden rounded-full bg-background/90 px-3 text-sm font-medium shadow-lg shadow-primary/5 ring-1 ring-border backdrop-blur">
        {navigation.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </FadeInWithStagger>
    </nav>
  );
}
