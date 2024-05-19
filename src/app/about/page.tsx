import React from "react";
import { OurMembers } from "@/app/about/_components/members";
import { OurMission } from "@/app/about/_components/mission";
import { OurNews } from "@/app/about/_components/news";
import { OurSkills } from "@/app/about/_components/skills";
import { OurVision } from "@/app/about/_components/vision";
import { Background } from "@/components/background";
import { FadeIn } from "@/components/fade-in";

export default async function Page() {
  return (
    <div>
      <div className="space-y-32">
        <FadeIn>
          <OurMission />
        </FadeIn>
        <FadeIn>
          <OurVision />
        </FadeIn>
      </div>

      <div className="relative mt-32 space-y-32">
        <FadeIn>
          <OurSkills />
        </FadeIn>
        <Background />
        <FadeIn>
          <OurMembers />
        </FadeIn>

        <FadeIn>
          <OurNews />
        </FadeIn>
      </div>
    </div>
  );
}
