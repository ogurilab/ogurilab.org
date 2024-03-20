import React from "react";
import { MDXDescription, MDXHeader, MDXTitle } from "@/components/mdx";
import { Pattern } from "@/components/patterns";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Pattern />
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
