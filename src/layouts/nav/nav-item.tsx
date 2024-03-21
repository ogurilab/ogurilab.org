"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FadeIn } from "@/components/fade-in";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
  activeLine?: boolean;
  className?: string;
};

export function NavItem({
  href,
  children,
  activeLine = true,
  className,
}: NavItemProps) {
  const active = usePathname() === href;

  return (
    <FadeIn className={className}>
      <Link
        className={clsx(
          "relative block p-3 transition",
          active ? "text-primary" : "text-muted-foreground hover:text-primary"
        )}
        href={href}
      >
        {children}
        {active && activeLine && (
          <span className="absolute inset-x-1 -bottom-px h-1 bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0 dark:from-sky-400/0 dark:via-sky-400/40 dark:to-sky-400/0" />
        )}
      </Link>
    </FadeIn>
  );
}
