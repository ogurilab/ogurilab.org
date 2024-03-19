import { ImageProps } from "next/image";

const baseUrl = process.env.BASE_URL ?? process.env.NEXT_PUBLIC_BASE_URL;

const resizeEndpoint = process.env.ENDPOINT ?? process.env.NEXT_PUBLIC_ENDPOINT;

export default function imageLoader({ src, width, quality }: ImageProps) {
  const isRelative = src.toString().startsWith("/");

  const query = new URLSearchParams();

  if (width) query.set("width", width.toString());

  query.set("quality", (quality || 70).toString());

  const url = isRelative ? `${baseUrl}${src.toString()}` : src.toString();

  return `${resizeEndpoint}?url=${url}&${query.toString()}`;
}
