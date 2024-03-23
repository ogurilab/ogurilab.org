import React from "react";
import { Navigation } from "@/layouts/nav";
import { NavDrawer } from "@/layouts/nav/nav-drawer";
import { ThemeToggleButton } from "@/layouts/themes/toggle-button";

export function Header() {
  return (
    <header className="sticky top-8 z-[45] flex w-full items-center justify-between ">
      <Navigation className="z-50 mx-auto hidden w-max md:block" />
      <ThemeToggleButton className="h-11 w-max bg-background/90" />
      <NavDrawer className="z-50 h-11 bg-background md:hidden" />
    </header>
  );
}
