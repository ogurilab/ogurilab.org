import React from "react";
import { OurMembers } from "@/app/about/_components/members";
import { OurMission } from "@/app/about/_components/mission";
import { OurNews } from "@/app/about/_components/news";
import { OurSkills } from "@/app/about/_components/skills";
import { OurVision } from "@/app/about/_components/vision";
import { FadeIn } from "@/components/fade-in";

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
