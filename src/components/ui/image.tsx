import NextImage from "next/image";
import React from "react";

type ImageProps = React.ComponentProps<typeof NextImage>;

export function Image(props: ImageProps) {
  return <NextImage {...props} />;
}
