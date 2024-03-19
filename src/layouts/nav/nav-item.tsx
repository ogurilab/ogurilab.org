"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

export function NavItem({ href, children }: NavItemProps) {
  const active = usePathname() === href;

  return (
    <li>
      <Link
        className={clsx(
          "relative block p-3 transition",
          active ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}
        href={href}
      >
        {children}
        {active && (
          <span className="absolute inset-x-1 -bottom-px h-0.5 bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0 dark:from-sky-400/0 dark:via-sky-400/40 dark:to-sky-400/0" />
        )}
      </Link>
    </li>
  );
}
