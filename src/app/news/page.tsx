import React, { Suspense } from "react";
import { News } from "@/app/news/_components";
import { Container } from "@/components/container";
import { fetchNews } from "@/lib/fetch";

export default async function Page() {
  const news = await fetchNews();

  return (
    <Container>
      <Suspense>
        <News data={news} />
      </Suspense>
    </Container>
  );
}
