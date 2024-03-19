"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggleButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const oppositionTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label={
        mounted ? `${oppositionTheme} mode に切り替える` : "読み込み中..."
      }
      className={cn(
        "relative z-10 rounded-full ring-1 ring-border p-2.5",
        className
      )}
      onClick={() => setTheme(oppositionTheme)}
      type="button"
    >
      <Sun className="size-6 dark:hidden" />
      <Moon className="hidden  size-6 dark:block" />
    </button>
  );
}
