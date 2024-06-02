import fs from "fs";
import path from "path";

export type Member = {
  name: string;
  info: string;
  href: string;
  image: string;
};

type GraduateMember = {
  [key: number]: Member[];
};

const memberKeys = ["teacher", "b4", "b3"] as const;

export type Members = {
  [key in (typeof memberKeys)[number]]: Member[];
} & { graduate: GraduateMember };

export const getMembersJSON = async () => {
  const filepath = path.join(
    process.cwd(),
    "src",
    "docs",
    "members",
    "members.json"
  );

  const file = await fs.promises.readFile(filepath, "utf-8");

  return JSON.parse(file) as Members;
};
