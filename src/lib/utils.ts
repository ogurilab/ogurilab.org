import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000);

  return date;
}

export const getGyazoImage = (src: string | null, size = 300) => {
  if (!src) return "/fallback.webp";

  if (src.includes("/raw")) {
    return `${src.replace("/raw", "")}/max_size/${size}`;
  }

  const ext = src.split(".").pop();

  if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "svg") {
    return src;
  }

  return "/fallback.webp";
};
