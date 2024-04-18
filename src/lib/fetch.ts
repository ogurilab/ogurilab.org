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
};

type Res = {
  relatedPages: {
    links1hop: Pages[];
  };
};

const sortCreatedAt = (a: Pages, b: Pages) => b.created - a.created;

export const fetchNews = async () => {
  const res = await fetch("https://scrapbox.io/api/pages/dclab/news", {
    cache: "force-cache",
  });
  const data = (await res.json()) as Res;

  return data.relatedPages.links1hop.sort(sortCreatedAt);
};
