import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { OurNews } from "@/app/about/_components/news";
import { OurSkills } from "@/app/about/_components/skills";
import { Container } from "@/components/container";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { buttonVariants } from "@/components/ui/button";
import { Image } from "@/components/ui/image";

export default function Home() {
  return (
    <div>
      <div className="space-y-32">
        <div className="overflow-hidden">
          <div className="lg:flex ">
            <FadeInWithStagger className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
              <FadeIn className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                <h2 className="relative gap-4 text-2xl font-bold tracking-tight sm:text-4xl">
                  <span>
                    Digital Culture Laboratory Aichi Institute of Technology
                  </span>
                </h2>
                <p className="mt-6 text-base leading-8 text-muted-foreground">
                  愛知工業大学情報科学部
                  デジタルカルチャー研究室（小栗真弥研究室）のWebページです。2022年4月にスタートした新しい研究室です。伝統文化や文化財を活用するためのデジタルコンテンツ開発や、地域課題解決のためのデータの利活用、分析などキーワードにして研究開発を行っています。
                </p>
                <p className="mt-6 flex flex-col text-base leading-7 text-muted-foreground">
                  <span>
                    Digital Culture
                    Lab.は情報メディア技術を使って、「文化を大切にする社会の実現」に貢献します．
                  </span>
                  <Link
                    className={clsx(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "mx-auto mt-4 text-primary"
                    )}
                    href="/about"
                  >
                    研究室について詳しくみる
                    <ChevronRight className=" size-6" />
                  </Link>
                </p>
              </FadeIn>
              <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
                <FadeIn className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                  <Image
                    alt="古都の風景"
                    className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                    height={842}
                    src="/missions/koto.webp"
                    width={1152}
                  />
                </FadeIn>
                <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                  <FadeIn className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                    <Image
                      alt="東京ゲームショウ"
                      className="aspect-[4/3] w-96 max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      height={842}
                      src="/tokyo.webp"
                      width={1152}
                    />
                  </FadeIn>
                  <FadeIn className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                    <Image
                      alt="獅子奮迅"
                      className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                      height={842}
                      src="/shishi.webp"
                      width={1152}
                    />
                  </FadeIn>
                  <FadeIn className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                    <Image
                      alt="漢字アクアリウム"
                      className="aspect-[4/3] w-96 max-w-none rounded-2xl bg-gray-50 object-cover"
                      height={842}
                      src="/aqua.webp"
                      width={1152}
                    />
                  </FadeIn>
                </div>
              </div>
            </FadeInWithStagger>
          </div>
        </div>
        <FadeIn>
          <OurNews />
        </FadeIn>

        <FadeIn>
          <Container>
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Laboratory
            </h2>
            <p className="mt-2 text-base leading-8 text-muted-foreground">
              私達の研究・制作・学術活動の成果。私達について知ってください。
            </p>
            <div className="mt-6 space-y-16">
              <div className="flex flex-col items-center justify-center gap-y-4 space-x-4 sm:flex-row">
                <p>
                  <Link
                    className={clsx(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "mx-auto text-primary"
                    )}
                    href="/publications"
                  >
                    私達の学術活動の成果をみる
                    <ChevronRight className="ml-1 inline-block size-4" />
                  </Link>
                </p>
                <p>
                  <Link
                    className={clsx(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "mx-auto text-primary"
                    )}
                    href="/research"
                  >
                    私達の研究室の研究・制作をみる
                    <ChevronRight className="ml-1 inline-block size-4" />
                  </Link>
                </p>
              </div>
              <p className="flex flex-col text-muted-foreground">
                <span>
                  Digital Culture
                  Laboratoryに興味を持った方、共同研究や取材・出展の依頼、研究室見学や相談事などございましたら気軽にご連絡ください。
                </span>
                <Link
                  className={clsx(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "mx-auto mt-6 text-primary"
                  )}
                  href="/contact"
                >
                  Contactへ
                  <ChevronRight className="ml-1  inline-block size-4" />
                </Link>
              </p>
              <OurSkills />
              <p className="flex flex-col text-muted-foreground">
                <span>
                  研究室に興味のある学生さん、配属を希望される学生さんへ。
                  14号館7階709号室で研究室の活動を行っています。興味のある方は、気軽に遊びに来てください。
                </span>
                <Link
                  className={clsx(
                    buttonVariants({
                      variant: "outline",
                    }),
                    "mx-auto mt-6 text-primary"
                  )}
                  href="/join"
                >
                  学生の方へ
                  <ChevronRight className="ml-1 inline-block size-4" />
                </Link>
              </p>
            </div>
          </Container>
        </FadeIn>
      </div>
    </div>
  );
}
