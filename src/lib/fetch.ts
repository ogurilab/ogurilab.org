export type Pages = {
  id: string;
  title: string;

  image: string | null;
  description: string[];
  user: {
    id: string;
  };
  pin: number;
  views: number;
  created: number;
  linksLc: string[];
};

type Res = {
  relatedPages: {
    links1hop: Pages[];
  };
};

const regex = /^\d{4}-\d{2}-\d{2}$/;

export const getDateString = (linksLc: string[]) => {
  let date;

  for (const link of linksLc) {
    if (regex.test(link)) {
      date = link;
      break;
    }
  }

  return date;
};

const sortCreatedAt = (a: Pages, b: Pages) => {
  const dateA = getDateString(a.linksLc);
  const dateB = getDateString(b.linksLc);

  if (dateA && dateB) {
    return dateB.localeCompare(dateA);
  }

  return b.created - a.created;
};

export const tags = [
  "ニュース",
  "対外発表",
  "イベント",
  "出展",
  "メディア",
  "受賞",
  "対外発表・受賞",
];

export const fetchNews = async () => {
  const res = await fetch("https://scrapbox.io/api/pages/dclab/news", {
    cache: "force-cache",
  });
  const data = (await res.json()) as Res;

  return data.relatedPages.links1hop.sort(sortCreatedAt);
};
