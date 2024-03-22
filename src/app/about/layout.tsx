import React from "react";
import { Pattern } from "@/components/patterns";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Pattern />
      {children}
    </div>
  );
}
