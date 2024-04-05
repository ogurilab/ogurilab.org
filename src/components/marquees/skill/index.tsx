import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Marquee } from "@/components/ui/marquee";
import BlenderIcon from "@/icons/blender-icon";

import { CSSIcon } from "@/icons/css-icon";
import { GithubIcon } from "@/icons/github-icon";
import { GoLangIcon } from "@/icons/go-lang-icon";
import HTMLIcon from "@/icons/html-icon";
import { JSIcon } from "@/icons/js-icon";
import { LineIcon } from "@/icons/line-icon";
import { NextjsIcon } from "@/icons/nextjs-icon";
import { PythonIcon } from "@/icons/python-icon";
import { ReactIcon } from "@/icons/react-icon";
import { TypescriptIcon } from "@/icons/typescript-icon";
import { UnityIcon } from "@/icons/unity-icon";
import { VRIcon } from "@/icons/vr-icon";
import { cn } from "@/lib/utils";

type SkillMarqueeProps = {
  className?: string;
  showDescription?: boolean;
};

const skills = [
  {
    id: "line-bot",
    name: "Line Botの開発",
    icon: (
      <LineIcon className="size-[60px] object-cover" height={60} width={60} />
    ),
  },
  {
    id: "unity-game",
    name: "Unity ゲーム開発",
    icon: <UnityIcon className="text-primary" height={60} width={60} />,
  },
  {
    id: "github",
    name: "GitHub",
    icon: <GithubIcon height={60} width={60} />,
  },
  {
    id: "Web  next",
    name: "Web 開発 Next.js",
    icon: <NextjsIcon height={60} width={60} />,
  },
  {
    id: "Web  react ",
    name: "Web 開発 React",
    icon: <ReactIcon height={60} width={60} />,
  },
  {
    id: "VR ",
    name: "VR 開発",
    icon: <VRIcon height={60} width={60} />,
  },
  {
    id: "Web html",
    name: "Web 開発 HTML",
    icon: <HTMLIcon height={60} width={60} />,
  },
  {
    id: "Blender",
    name: "3D モデリング Blender",
    icon: <BlenderIcon height={60} width={60} />,
  },
  {
    id: "Web js",
    name: "Web 開発 JavaScript",
    icon: <JSIcon height={60} width={60} />,
  },
  {
    id: "web css",
    name: "Web 開発 CSS",
    icon: <CSSIcon height={60} width={60} />,
  },
  {
    id: "web ts",
    name: "Web 開発 TypeScript",
    icon: <TypescriptIcon height={60} width={60} />,
  },
  {
    id: "web go",
    name: "Web Go 言語 ",
    icon: <GoLangIcon height={60} width={60} />,
  },
  {
    id: "Python",
    name: "Python",
    icon: <PythonIcon height={60} width={60} />,
  },
];

export function SkillMarquee({
  className,
  showDescription = true,
}: SkillMarqueeProps) {
  const firstRow = skills.slice(0, skills.length / 2);
  const secondRow = skills.slice(skills.length / 2);

  return (
    <div className={cn("overflow-x-hidden pt-8", className)}>
      {showDescription && (
        <p className="mb-2 text-sm font-semibold text-primary">
          開発に使っている技術やツール
        </p>
      )}
      <Marquee
        className="[--gap:2rem]"
        id="skill-marquee"
        pauseOnHover
        repeat={3}
      >
        {firstRow.map((skill) => (
          <AnimatedTooltip key={skill.id} name={skill.name}>
            <div className="flex items-center">
              {skill.icon}
              <span className="sr-only">{skill.name}</span>
            </div>
          </AnimatedTooltip>
        ))}
      </Marquee>
      <Marquee
        className="mt-10 [--gap:2rem]"
        id="skill-marquee-second"
        pauseOnHover
        repeat={3}
        reverse
      >
        {secondRow.map((skill) => (
          <AnimatedTooltip key={skill.id} name={skill.name}>
            <div className="flex items-center">
              {skill.icon}
              <span className="sr-only">{skill.name}</span>
            </div>
          </AnimatedTooltip>
        ))}
      </Marquee>
    </div>
  );
}
