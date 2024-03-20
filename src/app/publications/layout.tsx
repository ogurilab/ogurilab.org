import React from "react";
import { MDXDescription, MDXHeader, MDXTitle } from "@/components/mdx";
import { Pattern } from "@/components/patterns";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Pattern />
      <MDXHeader>
        <MDXTitle>Publications</MDXTitle>
        <MDXDescription>
          本ページでは、小栗研究室の学術活動の成果をご紹介しています。小栗先生をはじめとする研究室メンバーによる最新の研究論文、技術記事、国際会議での発表、受賞歴など、私たちの研究の進展と貢献を広く共有する場としています。
        </MDXDescription>
      </MDXHeader>
      <div className="leading-7">{children}</div>
    </div>
  );
}
