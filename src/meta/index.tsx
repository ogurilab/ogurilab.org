import { Metadata } from "next";

export const basicMetadata: Metadata = {
  metadataBase: new URL("https://www.ogurilab.org/"),
  generator: "Digital Culture Lab.",
  applicationName: "Digital Culture Lab.",
  referrer: "no-referrer",
  authors: [
    {
      name: "小栗 真弥",
      url: "https://shinyaoguri.com/",
    },
    {
      name: "倉橋 渉太",
      url: "https://www.kurahashi.me/",
    },
  ],
  creator: "倉橋 渉太",
  publisher: "小栗 真弥",
  keywords: [
    "Digital Culture Lab.",
    "研究室",
    "愛知工業大学",
    "愛知工業大学 情報科学部",
    "小栗真弥",
    "研究室紹介",
    "研究室活動",
    "研究室メンバー",
    "研究室研究 ",
  ],
  title: {
    default: "Digital Culture Lab.",
    template: "Digital Culture Lab. - %s",
  },

  description: "愛知工業大学 情報科学部 小栗研究室の公式ウェブサイトです。",
  openGraph: {
    title: "Digital Culture Lab.",
    description: "愛知工業大学 情報科学部 小栗研究室の公式ウェブサイトです。",
    siteName: "Digital Culture Lab.",
    url: "https://www.ogurilab.org/",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Digital Culture Lab.",
    site: "@ogurilab",
    description: "愛知工業大学 情報科学部 小栗研究室の公式ウェブサイトです。",
    creator: "@shoutapu0715",
  },
};
