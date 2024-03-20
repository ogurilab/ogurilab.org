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
          本ページでは、小栗研究室に諸ずくするメンバーと卒業生をご紹介しています。
          名前をクリックすると、各メンバーの外部リンクに遷移します。
        </MDXDescription>
      </MDXHeader>
      <div className="leading-7">{children}</div>
    </div>
  );
}
