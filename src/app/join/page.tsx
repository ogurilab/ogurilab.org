import Link from "next/link";
import React from "react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { SkillMarquee } from "@/components/marquees/skill";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Image } from "@/components/ui/image";

const faq = [
  {
    id: "where",
    question: "研究室はどこにありますか？",
    answer: "14号館7階709号室です",
  },
  {
    id: "when",
    question: "研究室は週に何回集まりますか？",
    answer: "基本的には週1回に全員で集まります。",
  },
  {
    id: "programming",
    question: "プログラミングができないと入れませんか？",
    answer: "できなくても大丈夫です！",
  },
  {
    id: "research",
    question: "どのような研究をしますか？",
    answer:
      "やりたいことが決まっている人は好きなことを研究にできます。やりたいことが決まっていない人は小栗先生が提案してくれたり、先輩の研究を引き継ぐこともできます。",
  },
  {
    id: "event",
    question: "新規歓迎会やその他のイベントはありますか？",
    answer:
      "新規歓迎会やタコパ、BBQなどのイベントがあります！強制参加ではないです！",
  },
];

export default function Page() {
  return (
    <Container>
      <div className="space-y-16">
        <FadeIn>
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Digital Culture Lab の紹介
          </h2>
          <p className="leading-7 text-muted-foreground">
            <span className="font-semibold text-primary">
              デジタルカルチャー研究室（小栗研究室）
            </span>
            は2022年4月に新しくできた研究室です。研究室としての大きな理念や目標については
            <Link
              className="text-primary underline underline-offset-4"
              href="/about"
            >
              About ページ
            </Link>
            に書いたのでぜひ読んでみてください。
            <br />
            研究も制作もプライベートもメリハリをつけて健康的な研究室生活を行なっていくのを基本方針としています．研究室としての活動などは
            <Link
              className="text-primary underline underline-offset-4"
              href="/news"
            >
              News ページ
            </Link>
            を見ると雰囲気がわかるかもしれません．
          </p>
          <div>
            <SkillMarquee />
          </div>
        </FadeIn>
        <FadeIn>
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl">
            こんな人が来たら幸せになれるはず
          </h2>
          <div className="leading-7 text-muted-foreground">
            <ol className="list-inside list-decimal">
              <li>
                与えられたテーマではなく新しいテーマを一緒に考えて挑戦したい人
              </li>
              <li>伝統文化や歴史的建物，観光分野でのICT応用に興味がある人</li>
              <li>学会発表やコンテスト，イベントへの出展に興味ある人</li>
              <li>プログラミングやデザインが好きな人</li>
            </ol>
          </div>
        </FadeIn>

        <FadeIn className="flex flex-col justify-between gap-6 lg:flex-row">
          <div className="flex-1">
            <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl">
              期待する態度
            </h2>
            <div className="leading-7 text-muted-foreground">
              <ol className="list-inside list-decimal">
                <li>誠実な行動</li>
                <li>なぜやるのかを考え抜く</li>
                <li>素早く失敗して学ぶ</li>
                <li>アウトプットしながら泥縄式に学ぶ</li>
                <li>作業と学びの記録を残す</li>
              </ol>
            </div>
          </div>
          <div className="h-56 overflow-hidden rounded-xl md:min-w-96 ">
            <Image
              alt="新歓"
              className="size-full rounded-xl object-cover"
              height={384}
              quality={90}
              src="/sinkan.jpg"
              width={512}
            />
          </div>
        </FadeIn>
        <FadeIn>
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl">
            よくある質問
          </h2>
          <Accordion className="mt-4" type="multiple">
            {faq.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger
                  className="font-semibold text-primary"
                  value={item.id}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="leading-7 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </Container>
  );
}
