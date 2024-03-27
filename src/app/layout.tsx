import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Layout } from "@/layouts";
import { cn } from "@/lib/utils";
import { basicMetadata } from "@/meta";

export const dynamic = "error";
export const runtime = "edge";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata = basicMetadata;

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
