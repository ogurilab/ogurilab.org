import React from "react";
import { Container } from "@/components/container";
import { FadeIn, FadeInWithStagger } from "@/components/fade-in";
import { Image } from "@/components/ui/image";
import { Member, getMembersJSON } from "@/docs/members";

function PeopleList({ people }: { people: Member[] }) {
  if (people.length === 0) {
    return (
      <div className="mt-6 py-8 text-center">
        <p className="text-muted-foreground">
          まだメンバーが登録されていません。
        </p>
      </div>
    );
  }

  return (
    <FadeInWithStagger>
      <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {people.map((person) => (
          <li key={person.name}>
            <FadeIn>
              <figure className="relative flex items-center justify-center">
                <a
                  className="group"
                  href={person.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    alt={person.name}
                    className="size-24 rounded-full object-cover transition-opacity group-hover:opacity-75"
                    height={96}
                    priority
                    src={`/members/${person.image}`}
                    width={96}
                  />
                </a>
              </figure>

              <figcaption className="mt-4">
                <h3 className="text-base font-semibold leading-7 tracking-tight ">
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
              </figcaption>
            </FadeIn>
          </li>
        ))}
      </ul>
    </FadeInWithStagger>
  );
}

export default async function Page() {
  const { teacher, b3, b4, graduate } = await getMembersJSON();

  return (
    <Container>
      <div className="space-y-16">
        <div>
          <h2 className="scroll-m-20 pb-2 text-center text-xl font-semibold tracking-tight sm:text-2xl">
            Teacher / 教員
          </h2>
          <PeopleList people={teacher} />
        </div>
        <div>
          <h2 className="scroll-m-20 pb-2 text-center text-xl font-semibold tracking-tight sm:text-2xl">
            B4 / 学部4年生
          </h2>
          <PeopleList people={b4} />
        </div>
        <div>
          <h2 className="scroll-m-20 pb-2 text-center text-xl font-semibold tracking-tight sm:text-2xl">
            B3 / 学部3年生
          </h2>
          <PeopleList people={b3} />
        </div>
        <div>
          <h2 className="scroll-m-20 pb-2 text-center text-xl font-semibold tracking-tight sm:text-2xl">
            Alumni / 卒業生
          </h2>
          <PeopleList people={graduate} />
        </div>
      </div>
    </Container>
  );
}
