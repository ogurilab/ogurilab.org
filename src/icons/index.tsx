import React from "react";
import { Image } from "@/components/ui/image";

type IconProps = Omit<React.ComponentProps<typeof Image>, "src" | "alt">;

export function Icon(props: IconProps) {
  return <Image priority {...props} alt="dlab" src="/icon.webp" />;
}
