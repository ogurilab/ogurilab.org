import React from "react";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { Image } from "@/components/ui/image";
import { allNews } from "contentlayer/generated";

export default function Page() {
  const newsList = allNews.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div>
      <FadeInWithStagger
        className="grid grid-cols-2 gap-x-8 gap-y-20 lg:grid-cols-3"
        speed={0.05}
      >
        {newsList.map((news, i) => (
          <FadeIn>
            <article
              key={news.title}
              className="flex flex-col items-start justify-between"
            >
              <figure className="h-52 w-full overflow-hidden rounded-2xl border border-border">
                <a
                  className="group"
                  href={news.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={`${news.date}のニュース`}
                    className="size-full object-cover object-center transition-opacity group-hover:opacity-75"
                    height={200}
                    priority={i < 3}
                    src={`/news/${news.image}`}
                    width={300}
                  />
                  <span className="sr-only">{news.title}</span>
                </a>
              </figure>
              <div className="flex-1">
                <div className="mt-4 flex flex-col gap-1 gap-x-4 text-xs sm:flex-row sm:items-center">
                  <time className="text-muted-foreground" dateTime={news.date}>
                    {new Date(news.date).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="relative z-10 w-max rounded-full border border-border bg-secondary px-4 py-1 text-xs font-medium">
                    {news.category}
                  </span>
                </div>
                <div className="group relative">
                  <h2 className="mt-3 text-base font-semibold leading-7 tracking-tight">
                    <a
                      className="underline-offset-4 hover:underline"
                      href={news.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {news.title}
                    </a>
                  </h2>
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </FadeInWithStagger>
    </div>
  );
}
