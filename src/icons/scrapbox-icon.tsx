import React from "react";
import { Image } from "@/components/ui/image";

export function ScrapboxIcon({ className }: { className?: string }) {
  return (
    <Image
      alt="Scrapbox"
      className={className}
      height={24}
      src="/scrapbox.png"
      width={24}
    />
  );
}
