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
  skip: number;
  limit: number;
  count: number;
  pages: Pages[];
};

export const fetchNews = async (limit: number, offset = 3) => {
  const res = await fetch(
    `https://scrapbox.io/api/pages/dclab?limit=${limit}&skip=${offset}`,
    {
      cache: "force-cache",
    }
  );
  const data = (await res.json()) as Res;

  return data;
};
