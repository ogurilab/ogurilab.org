import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { Image } from "@/components/ui/image";
import { fetchNews, tags } from "@/lib/fetch";
import { getGyazoImage } from "@/lib/utils";

export async function OurNews() {
  const pages = await fetchNews();

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="mt-6 scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl">
          News
        </h2>
        <p className="mt-2 text-base leading-8 text-muted-foreground">
          最新の活動や研究成果をお知らせします
        </p>
      </div>
      <FadeInWithStagger className="mx-auto mt-6 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {pages.slice(0, 3).map((news) => {
          const probableTag = tags.find((tag) => news.linksLc.includes(tag));

          const tag = probableTag ?? news.linksLc.at(-1) ?? "その他";

          return (
            <FadeIn key={news.id}>
              <article className="relative isolate flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-primary px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
                <Image
                  alt={news.title}
                  className="absolute inset-0 -z-10 size-full object-cover"
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  src={getGyazoImage(news.image)}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/20" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-muted dark:text-muted-foreground">
                  <div className="flex gap-1 text-xs">
                    <time dateTime={news.date.toISOString()}>
                      {news.date.toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    /<span>{tag}</span>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <a
                    className="line-clamp-1"
                    href={`https://scrapbox.io/dclab/${news.title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="absolute inset-0" />
                    <span className="sr-only">{news.title}</span>
                  </a>

                  {news.title}
                </h3>
              </article>
            </FadeIn>
          );
        })}
      </FadeInWithStagger>
      <p className="mt-8 text-center">
        <Link
          className="flex items-center justify-center text-primary underline-offset-4 hover:underline"
          href="/news"
        >
          ニュースをもっと見る
          <ChevronRight className="ml-1 inline-block size-4" />
        </Link>
      </p>
    </div>
  );
}
