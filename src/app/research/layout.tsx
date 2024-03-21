import React from "react";
import { FadeInWithStagger } from "@/components/fade-in";
import { MDXDescription, MDXHeader, MDXTitle } from "@/components/mdx";
import { Pattern } from "@/components/patterns";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Pattern />
      <MDXHeader>
        <MDXTitle>Research</MDXTitle>
        <MDXDescription>
          本ページでは、小栗研究室で行われた卒業研究・卒業制作の成果物を紹介しています。
          <br />
          これらの成果物以外にも、小栗研究室ではWebアプリ開発、Line
          Bot開発、Unityゲーム開発、文化財に関する研究など、様々な研究が行われています。
          <br />
          また、東京ゲームショウなどのイベントにも積極的に参加しています。
        </MDXDescription>
      </MDXHeader>
      <FadeInWithStagger className="leading-7">{children}</FadeInWithStagger>
    </div>
  );
}
