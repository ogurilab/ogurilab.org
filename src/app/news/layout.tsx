import { Metadata } from "next";
import React from "react";
import { MDXDescription, MDXHeader, MDXTitle } from "@/components/mdx";

import { basicMetadata } from "@/meta";

export const metadata: Metadata = {
  ...basicMetadata,
  title: "News",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MDXHeader>
        <MDXTitle>News</MDXTitle>
        <MDXDescription>
          本ページでは、小栗研究室で行われた活動やイベントについて紹介しています。
          タイトルあるいはサムネイルをクリックすると、各々の外部サイトに遷移します。
        </MDXDescription>
      </MDXHeader>
      <div className="leading-7">{children}</div>
    </div>
  );
}
