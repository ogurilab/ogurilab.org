import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Container } from "@/components/container";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { Image } from "@/components/ui/image";
import { getMembersJSON } from "@/docs/members";

export async function OurMembers() {
  const { teacher, b4 } = await getMembersJSON();

  const team = [...teacher, ...b4];

  return (
    <Container>
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="mt-6 scroll-m-20 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Our Members
        </h2>
      </div>
      <FadeInWithStagger>
        <ul className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
          {team.map((person) => (
            <li key={person.name}>
              <FadeIn>
                <Image
                  alt={person.name}
                  className="mx-auto size-24 rounded-full"
                  height={96}
                  src={`/members/${person.image}`}
                  width={96}
                />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-primary">
                  <a
                    className="underline-offset-4 hover:underline"
                    href={person.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {person.name}
                  </a>
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {person.info}
                </p>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInWithStagger>
      <p className="mt-4 text-center">
        <Link
          className="flex items-center justify-center text-primary underline-offset-4 hover:underline"
          href="/members"
        >
          メンバーをもっと見る
          <ChevronRight className="ml-1 inline-block size-4" />
        </Link>
      </p>
    </Container>
  );
}
