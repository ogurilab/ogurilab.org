import { Metadata } from "next";
import React from "react";
import { basicMetadata } from "@/meta";

export const metadata: Metadata = {
  ...basicMetadata,
  title: "Not Found",
};

export default function NotFoundPage() {
  return (
    <div className="mt-32 text-center">
      <p className="text-base font-semibold text-destructive">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        お探しのページが見つかりませんでした。
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          className="rounded-md px-3.5 py-2.5 text-sm font-semibold  underline underline-offset-4"
          href="/"
        >
          ホームへ戻る
        </a>
      </div>
    </div>
  );
}
