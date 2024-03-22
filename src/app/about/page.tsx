import React from "react";
import { OurMembers } from "@/app/about/_components/members";
import { OurMission } from "@/app/about/_components/mission";
import { OurNews } from "@/app/about/_components/news";
import { OurSkills } from "@/app/about/_components/skills";
import { OurVision } from "@/app/about/_components/vision";
import { FadeIn } from "@/components/fade-in";
import { Image } from "@/components/ui/image";

export default async function Page() {
  return (
    <div className="space-y-32">
      <FadeIn>
        <OurMission />
      </FadeIn>

      <FadeIn>
        <OurVision />
      </FadeIn>

      <FadeIn>
        <div className=" xl:mx-auto xl:max-w-7xl xl:px-8">
          <Image
            alt="新規歓迎会"
            className="aspect-[5/2] w-full rounded-3xl object-cover"
            height={960}
            src="/sinkan.jpg"
            width={1920}
          />
        </div>
      </FadeIn>

      <FadeIn>
        <OurSkills />
      </FadeIn>

      <FadeIn>
        <OurMembers />
      </FadeIn>

      <FadeIn>
        <OurNews />
      </FadeIn>
    </div>
  );
}
