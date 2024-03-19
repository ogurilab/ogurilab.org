import React from "react";
import { NavItem } from "@/layouts/nav/nav-item";

export const navigation = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/news",
    label: "News",
  },
  {
    href: "/members",
    label: "Members",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/publications",
    label: "Publications",
  },

  {
    href: "/contact",
    label: "Contact",
  },
];

export function Navigation({
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <nav {...props}>
      <ul className="flex  rounded-full bg-background/90 px-3 text-sm font-medium  shadow-lg shadow-primary/5 ring-1 ring-border  backdrop-blur ">
        {navigation.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </ul>
    </nav>
  );
}
