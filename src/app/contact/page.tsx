import {
  Coffee,
  GraduationCap,
  Handshake,
  MailIcon,
  MapPin,
  School,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/container";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { PinContainer } from "@/components/ui/3d-pin";
import { buttonVariants } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { XIcon } from "@/icons/x-icon";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <Container>
      <FadeInWithStagger className="space-y-16">
        <FadeIn>
          <h2 className="scroll-m-20  pb-2 text-xl font-semibold tracking-tight sm:text-2xl ">
            共同研究・取材・出展依頼などのお問い合わせ
          </h2>
          <p className="max-w-4xl  leading-7 text-muted-foreground">
            小栗研究室では伝統文化における情報技術の応用や、地域課題解決のためのICT応用の研究をおこなっています．共同研究や取材・出展の依頼などのご要望がありましたら、気軽にご連絡ください。
          </p>
          <p className="mt-2 max-w-4xl  leading-7 text-muted-foreground">
            ご連絡は、以下の愛知工業大学のご案内、または、小栗のメールアドレス、X(Twitter)にてお願いいたします。
          </p>
          <div className="mt-6 space-y-4">
            <p className="flex text-sm leading-7">
              <GraduationCap className="mr-2 mt-0.5 size-6" />
              <a
                className="underline underline-offset-4"
                href="https://www.ait.ac.jp/cooperation/tie-ups/more-info/"
                rel="noreferrer"
                target="_blank"
              >
                愛知工業大学
                共同研究・受託研究・研究技術相談・学術コンサルティング等の案内
              </a>
            </p>
            <div className="flex space-x-4">
              <p className="flex items-center text-sm leading-7">
                <MailIcon className="mr-2 size-5" />
                <span className="">shinyaoguri[at]ogurilab.org</span>
              </p>
              <p className="flex items-center text-sm leading-7">
                <XIcon className="mr-2 size-5" />
                <a
                  className="underline underline-offset-4"
                  href="https://twitter.com/shinyaoguri"
                  rel="noreferrer"
                  target="_blank"
                >
                  @shinyaoguri
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
        <FadeIn>
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl ">
            学生の方へ
          </h2>
          <p className="max-w-4xl  leading-7 text-muted-foreground">
            研究室に興味のある学生さん、配属を希望される学生さんへ。
            <br />
            14号館7階709号室で研究室の活動を行っています。興味のある方は、気軽に遊びに来てください。
          </p>

          <Link
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "mx-auto mt-8 flex w-max items-center  justify-center rounded-full px-4 border border-border py-2"
            )}
            href="/join"
          >
            <Sparkles className="mr-2 size-5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">Join Us もっと知る</span>
          </Link>
        </FadeIn>
        <FadeIn>
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl ">
            寄付を検討中の方へ
          </h2>
          <p className="max-w-4xl  leading-7 text-muted-foreground">
            私たちの研究・制作活動にご理解いただき、ご支援いただける方を募集しております。
            <br />
            以下のリンクより詳細をご覧いただけます。
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-7">
            <a
              className="flex items-center underline underline-offset-4"
              href="https://www.ait.ac.jp/cooperation/tie-ups/project-menu/scholarships/"
              rel="noreferrer"
              target="_blank"
            >
              <Handshake className="mr-2 mt-0.5 size-6" />
              愛知工業大学 奨学寄付金の案内
            </a>
          </p>
        </FadeIn>
        <FadeIn>
          <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl ">
            学生に差し入れしてくれる方へ
          </h2>
          <p className="max-w-4xl leading-7 text-muted-foreground">
            dclabで研究・制作活動をしている学生にちょっとした差し入れをしてくださる方も募集しています．学生の励みになります．
            <br />
            以下のリンクより詳細をご覧いただけます。
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-7">
            <a
              className="flex items-center underline underline-offset-4"
              href="https://www.amazon.jp/hz/wishlist/ls/Y16VYRLJ2W91?ref_=wl_share"
              rel="noreferrer"
              target="_blank"
            >
              <Coffee className="mr-2 mt-0.5 size-6" />
              dclabの欲しいものリスト
            </a>
          </p>
        </FadeIn>
      </FadeInWithStagger>

      <FadeIn className="mt-16 border-t border-border py-8">
        <h2
          className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight sm:text-2xl"
          id="access"
        >
          アクセス
        </h2>
        <p className="max-w-4xl  leading-7 text-muted-foreground">
          <span className="block text-base font-semibold text-primary">
            所在地
          </span>
          〒470-0392
          <span className="ml-2">
            愛知県豊田市八草町八千草1247 愛知工業大学14号館7階709号室 小栗研究室
          </span>
        </p>
        <p className="mt-4 flex max-w-4xl space-x-8 text-sm leading-7 sm:text-base">
          <a
            className="flex items-center leading-7 underline underline-offset-4"
            href="https://maps.app.goo.gl/esM6H4GtPzCDUd3JA"
            rel="noreferrer"
            target="_blank"
          >
            <MapPin className="mr-2 size-5" />
            Google Mapはこちら
          </a>
          <a
            className="flex items-center leading-7 underline underline-offset-4"
            href="https://www.ait.ac.jp/guide/campus/yakusa/"
            rel="noreferrer"
            target="_blank"
          >
            <School className="mr-2 size-5" />
            学内地図はこちら
          </a>
        </p>
        <div className="mt-10 flex w-full items-center justify-center">
          <PinContainer title="14号館7階709号室 小栗研究室">
            <div className="flex h-96 w-80 basis-full flex-col p-4 tracking-tight  sm:basis-1/2">
              <h3 className="!m-0 max-w-xs !pb-2  text-base font-bold">
                愛知工業大学
              </h3>
              <div className="!m-0 !p-0 text-sm font-normal">
                <span className="text-muted-foreground ">
                  〒470-0392愛知県豊田市八草町八千草1247
                </span>
              </div>
              <div className="mt-4 flex w-full flex-1 overflow-hidden rounded-lg">
                <Image
                  alt="愛知工業大学14号館"
                  className="size-full rounded-lg object-cover"
                  height={300}
                  src="/dclab.webp"
                  width={400}
                />
              </div>
            </div>
          </PinContainer>
        </div>
      </FadeIn>
    </Container>
  );
}
