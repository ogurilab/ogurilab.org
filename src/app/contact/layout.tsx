import { ChevronDown } from "lucide-react";
import React from "react";
import { MDXDescription, MDXHeader, MDXTitle } from "@/components/mdx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MDXHeader>
        <MDXTitle>Contact and Access</MDXTitle>
        <MDXDescription>
          本ページでは、小栗研究室への連絡先について紹介しています。
          <br />
          Accessについては、
          <a className="underline" href="#access">
            こちら
            <ChevronDown className="mx-1 inline-block size-4" />
          </a>
          をご覧ください。
        </MDXDescription>
      </MDXHeader>
      <div className="leading-7">{children}</div>
    </div>
  );
}
