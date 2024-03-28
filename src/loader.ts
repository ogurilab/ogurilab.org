type ImageProps = {
  src: string;
  width: number;
  quality: number;
};

const domain = "https://feature-proxy-assets.ogurilab-org.pages.dev";

export default function ImageLoader({ src, width, quality }: ImageProps) {
  return `${domain + src}?w=${width}&q=${quality}`;
}
