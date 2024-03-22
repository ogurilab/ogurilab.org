import React from "react";
import { Image } from "@/components/ui/image";

type LineIconProps = Omit<
  React.ComponentPropsWithoutRef<typeof Image>,
  "src" | "alt"
>;

export function LineIcon(props: LineIconProps) {
  return <Image {...props} alt="LINE" src="/line.png" />;
}
