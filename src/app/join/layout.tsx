import Link from "next/link";
import React from "react";
import { MDXDescription, MDXHeader, MDXTitle } from "@/components/mdx";
import { XIcon } from "@/icons/x-icon";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MDXHeader>
        <MDXTitle>Join the Lab</MDXTitle>
        <MDXDescription>
          本ページでは、Digital Culture
          Lab.に配属を希望する学生のための情報を掲載しています。
          <br />
          <span className="mt-1 inline-block leading-7">
            メールやTeams,
            <XIcon className="inline-block size-4" />
            などで尋ねてください。
            <Link
              className="text-primary underline underline-offset-4"
              href="/contact"
            >
              詳しくはこちら
            </Link>
            <br />
            ゼミ室は14号館7階709号室です。気軽にいつでも遊びに来てください。
            匿名が良い人は
            <a
              className="text-primary underline underline-offset-4"
              href="https://marshmallow-qa.com/shinyaoguri?utm_medium=url_text&utm_source=promotion"
              rel="noopener noreferrer"
              target="_blank"
            >
              マシュマロ
            </a>
            を投げてくれてもOKです．
          </span>
        </MDXDescription>
      </MDXHeader>
      <div className="leading-7">{children}</div>
    </div>
  );
}
