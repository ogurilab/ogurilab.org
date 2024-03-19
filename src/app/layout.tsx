import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Layout } from "@/layouts";
import { cn } from "@/lib/utils";

export const dynamic = "error";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: {
    default: "Digital Culture Lab.",
    template: "Digital Culture Lab. - %s",
  },

  // TODO: Add description and ...
  description: "Digital Culture Lab. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="ja" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
