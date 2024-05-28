"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { Image } from "@/components/ui/image";
import { fetchNews, tags } from "@/lib/fetch";
import { getGyazoImage, timestampToDate } from "@/lib/utils";

type NewsProps = {
  data: Awaited<ReturnType<typeof fetchNews>>;
};

const splitData = (pages: NewsProps["data"], page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const currentPages = pages.slice(offset, offset + limit);

  const hasNext = pages.length > offset + limit;

  return { currentPages, hasNext };
};

export function News({ data }: NewsProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  const { currentPages, hasNext } = splitData(data, Number(page), 24);
  const hasPrev = Number(page) > 1;

  if (currentPages.length === 0) {
    return (
      <div className="text-center">
        <Link className="underline-offset-4 hover:underline" href="/news">
          News 一覧に戻る
        </Link>
        <p className="mt-8 text-lg leading-7 text-muted-foreground">
          このページにはまだニュースがありません。
        </p>
      </div>
    );
  }

  return (
    <>
      <FadeInWithStagger
        key={page}
        className="grid grid-cols-2 gap-x-8 gap-y-20 lg:grid-cols-3"
        speed={0.05}
      >
        {currentPages.map((news, i) => {
          const probableTag = tags.find((tag) => news.linksLc.includes(tag));

          const tag = probableTag ?? news.linksLc.at(-1) ?? "その他";

          return (
            <FadeIn key={news.title} className="overflow-hidden">
              <article className="flex flex-col items-start justify-between">
                <figure className="h-52 w-full overflow-hidden rounded-2xl border border-border">
                  <a
                    className="group"
                    href={`https://scrapbox.io/dclab/${news.title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Image
                      alt={`${news.title}`}
                      className="size-full object-cover object-center transition-opacity group-hover:opacity-75"
                      height={200}
                      priority={i < 3}
                      src={getGyazoImage(news.image)}
                      width={300}
                    />
                    <span className="sr-only">{news.title}</span>
                  </a>
                </figure>
                <div className="flex-1">
                  <div className="mt-4 flex gap-1 text-xs">
                    <time
                      dateTime={timestampToDate(news.created).toISOString()}
                    >
                      {timestampToDate(news.created).toLocaleDateString(
                        "ja-JP",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </time>
                    /
                    <a
                      className="underline-offset-4 hover:underline"
                      href={`https://scrapbox.io/dclab/${tag}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {tag}
                    </a>
                  </div>
                  <div className="group relative">
                    <h2 className="mt-3  text-base font-semibold leading-7 tracking-tight">
                      <a
                        className="line-clamp-3 underline-offset-4 hover:underline "
                        href={`https://scrapbox.io/dclab/${news.title}`}
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
          );
        })}
      </FadeInWithStagger>

      <div className="mt-8 flex justify-center space-x-8">
        {hasPrev && (
          <Link
            className="flex items-center justify-center text-primary underline-offset-4 hover:underline"
            href={`/news?page=${Number(page) - 1}`}
          >
            <ChevronLeft className="mr-1 inline-block size-4" />
            前のページを見る
          </Link>
        )}
        {hasNext && (
          <Link
            className="ml-1 flex items-center justify-center text-primary underline-offset-4 hover:underline"
            href={`/news?page=${Number(page) + 1}`}
          >
            次のページを見る
            <ChevronRight className="inline-block size-4" />
          </Link>
        )}
      </div>
    </>
  );
}
