import React from "react";
import { MDXDescription, MDXHeader, MDXTitle } from "@/components/mdx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MDXHeader>
        <MDXTitle>Members</MDXTitle>
        <MDXDescription>
          本ページでは、小栗研究室に所属するメンバーと卒業生を紹介しています。
          名前あるいはアバターをクリックすると、各メンバーの外部サイトに遷移します。
        </MDXDescription>
      </MDXHeader>
      <div className="leading-7">{children}</div>
    </div>
  );
}
