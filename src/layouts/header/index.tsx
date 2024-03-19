import Link from "next/link";
import React from "react";
import { Icon } from "@/icons";
import { Navigation } from "@/layouts/nav";
import { NavDrawer } from "@/layouts/nav/nav-drawer";
import { ThemeToggleButton } from "@/layouts/themes/toggle-button";

export function Header() {
  return (
    <header>
      <Link className="-mt-2 flex items-center" href="/">
        <Icon className="rounded-md" height={44} width={44} />
        <span className="sr-only">Digital Culture Lab.</span>
      </Link>
      <Navigation className="fixed inset-x-0 top-8 mx-auto hidden w-max md:block" />
      <ThemeToggleButton className="fixed right-8 top-8 h-11 w-max bg-background/90" />

      <NavDrawer className="fixed right-24 top-8 h-11 bg-background md:hidden" />
    </header>
  );
}
