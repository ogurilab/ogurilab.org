import React from "react";

type IconProps = Omit<React.ComponentProps<"img">, "src" | "alt">;

export function Icon(props: IconProps) {
  return <img {...props} alt="dlab" src="/icon.png" />;
}
