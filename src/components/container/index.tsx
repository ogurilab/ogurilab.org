import React from "react";
import { cn } from "@/lib/utils";

export const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={cn("mx-auto max-w-2xl lg:mx-0 lg:max-w-none", className)}
    />
  );
});
