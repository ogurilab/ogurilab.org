import { Metadata } from "next";
import React from "react";
import { basicMetadata } from "@/meta";

export const metadata: Metadata = {
  ...basicMetadata,
  title: "About",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
