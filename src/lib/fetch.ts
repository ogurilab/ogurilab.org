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

const regex = /\d{4}-\d{2}-\d{2}/;

export const getDateString = (title: string) => {
  const match = title.match(regex);

  return match ? match[0] : null;
};

const sortCreatedAt = (a: Pages, b: Pages) => {
  const dateA = getDateString(a.title);
  const dateB = getDateString(b.title);

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

export const fetchNews = async (): Promise<(Pages & { date: Date })[]> => {
  const res = await fetch("https://scrapbox.io/api/pages/dclab/news", {
    cache: "force-cache",
  });
  const data = (await res.json()) as Res;

  const sorted = data.relatedPages.links1hop.sort(sortCreatedAt);

  const news = sorted.map((page) => {
    const date = getDateString(page.title);

    return {
      ...page,
      date: date ? new Date(date) : new Date(page.created * 1000),
    };
  });

  return news;
};
