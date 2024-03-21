"use client";

import clsx from "clsx";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Drawer } from "vaul";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { Icon } from "@/icons";
import { navigation } from "@/layouts/nav";

function NavItem({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const active = usePathname() === href;

  return (
    <li>
      <FadeIn>
        <Link
          className={clsx(
            "relative -m-2 block px-3 py-2 transition",
            active ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
          href={href}
          onClick={onClick}
        >
          {children}
        </Link>
      </FadeIn>
    </li>
  );
}

export function NavDrawer({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root direction="top" onOpenChange={setOpen} open={open}>
      <Drawer.Trigger asChild className={className}>
        <button
          className="flex items-center rounded-full bg-background px-6 text-sm font-medium text-muted-foreground shadow-lg shadow-primary/5 ring-1  ring-border backdrop-blur"
          type="button"
        >
          <span>Menu</span>
          <ChevronDown className="ml-1 size-4" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/50" />

        <Drawer.Content className="fixed inset-x-0 top-0 z-50 mb-24 flex h-auto flex-col rounded-b-xl border bg-background text-primary ring-0">
          <FadeInWithStagger
            animationViewport={{ once: true, margin: "0px 0px 0px" }}
            speed={0.05}
          >
            <FadeIn className="grid gap-1.5 p-4 sm:text-left">
              <Drawer.Title className="text-lg font-semibold leading-none tracking-tight">
                <Link
                  className="flex items-center space-x-2"
                  href="/"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="rounded-md" height={40} width={40} />
                  <span>Digital Culture Lab.</span>
                </Link>
                <Drawer.Close className="absolute right-4 top-7">
                  <X className="size-6" />
                </Drawer.Close>
              </Drawer.Title>
            </FadeIn>

            <nav>
              <ul className="mt-6 space-y-4 px-4 text-sm font-medium">
                {navigation.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </NavItem>
                ))}
              </ul>
            </nav>

            <div className="mx-auto mb-4 mt-6 h-2 w-[100px] rounded-full bg-muted" />
          </FadeInWithStagger>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
