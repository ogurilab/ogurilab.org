type ImageProps = {
  src: string;
  width: number;
  quality: number;
};

const domain = "https://feature-proxy-assets.ogurilab-org.pages.dev";

export default function ImageLoader({ src }: ImageProps) {
  return domain + src;
}
