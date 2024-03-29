import React, { Suspense } from "react";
import { News } from "@/app/news/_components";
import { Container } from "@/components/container";
import { fetchNews } from "@/lib/fetch";

export default async function Page() {
  const news = await fetchNews(200, 0);

  return (
    <Container>
      <Suspense>
        <News data={news} />
      </Suspense>
    </Container>
  );
}
