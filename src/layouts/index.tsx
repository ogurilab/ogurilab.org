import React from "react";
import { Footer } from "@/layouts/footer";
import { Header } from "@/layouts/header";
import { Providers } from "@/layouts/themes";

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Providers>
      <div className="flex min-h-dvh w-full flex-col">
        <div className="relative mx-auto size-full max-w-7xl  flex-1 gap-x-8 px-4 py-10 sm:px-6 lg:px-8">
          <Header />
          <main className="mt-10 flex-1">{children}</main>
        </div>
        <Footer />
      </div>
    </Providers>
  );
}
