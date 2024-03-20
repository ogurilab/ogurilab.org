/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import { cn } from "@/lib/utils";

export const MDXTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLProps<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      {...props}
      ref={ref}
      className={cn(
        "scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl",
        className
      )}
    />
  );
});

export const MDXDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLProps<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("leading-7 text-muted-foreground text-sm", className)}
    />
  );
});

export const MDXHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={cn("mb-10 space-y-2", className)} />
  );
});
