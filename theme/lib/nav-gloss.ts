// A small second-language gloss for nav labels (shared by the header nav and
// the home hero's section wheel). Nav labels come from Cosense (.site `nav:`).
// English labels get a short Japanese gloss ("About" → 研究室について);
// Japanese labels get mono English. Unknown English labels get no gloss;
// unknown Japanese ones fall back to their ASCII URL slug.

const JA_FOR: Record<string, string> = {
  home: "ホーム",
  about: "研究室について",
  research: "研究",
  news: "ニュース",
  members: "メンバー",
  member: "メンバー",
  publications: "業績",
  gallery: "ギャラリー",
  access: "アクセス",
  contact: "お問い合わせ",
};
const EN_FOR: Record<string, string> = {
  ホーム: "Home",
  研究室について: "About",
  ニュース: "News",
  お知らせ: "News",
  メンバー: "Members",
  研究: "Research",
  研究内容: "Research",
  業績: "Publications",
  研究業績: "Publications",
  ギャラリー: "Gallery",
  アクセス: "Access",
  お問い合わせ: "Contact",
};

export interface Gloss {
  text: string;
  lang: "ja" | "en";
}

export function navGloss(label: string, href: string, base = "/"): Gloss | undefined {
  const l = label.trim();
  if (/^[\x20-\x7e]+$/.test(l)) {
    const ja = JA_FOR[l.toLowerCase()];
    return ja ? { text: ja, lang: "ja" } : undefined;
  }
  const known = EN_FOR[l];
  if (known) return { text: known, lang: "en" };
  if (href === "/" || href === base) return { text: "Home", lang: "en" };
  const slug = decodeURIComponent(href.replace(/\/+$/, "").split("/").pop() ?? "");
  if (!/^[A-Za-z][A-Za-z0-9 _-]*$/.test(slug)) return undefined;
  return { text: slug.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), lang: "en" };
}
