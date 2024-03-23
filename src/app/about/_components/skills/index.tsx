import React from "react";
import { SkillMarquee } from "@/components/marquees/skill";

export function OurSkills() {
  return (
    <div className="mx-auto">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="mt-6 scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Our Skills
        </h2>
        <p className="mt-6 leading-7 text-muted-foreground">
          Web開発・ゲーム開発・Line
          Bot・VRなど，様々な技術を用いて文化を大切にする社会を実現します
        </p>
        <div className="w-full">
          <SkillMarquee className="pt-16" showDescription={false} />
        </div>
      </div>
    </div>
  );
}
