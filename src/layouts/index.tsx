import Link from "next/link";
import React from "react";
import { Icon } from "@/icons";
import { Footer } from "@/layouts/footer";
import { Header } from "@/layouts/header";
import { Providers } from "@/layouts/themes";

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <div className="flex min-h-dvh w-full flex-col">
        <div className="relative mx-auto size-full max-w-7xl  flex-1 gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <Link
            className="absolute z-50 my-auto hidden w-max items-center md:block"
            href="/"
          >
            <Icon className="rounded-md" height={44} width={44} />
          </Link>
          <Header />
          <main className="mt-16 flex-1">{children}</main>
        </div>
        <Footer />
      </div>
    </Providers>
  );
}
