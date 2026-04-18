"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  variant?: "default" | "ghost";
}

export default function ThemeToggle({ className, variant = "default" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => setTheme(isDark ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Activer le thème clair" : "Activer le thème sombre"}
      aria-pressed={isDark}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        variant === "default" &&
          "border border-border bg-surface-elevated hover:bg-surface-muted hover:border-primary-300 dark:hover:border-primary-600",
        variant === "ghost" && "hover:bg-white/10 text-white",
        className,
      )}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all duration-500",
          isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-500",
          isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0",
        )}
      />
    </button>
  );
}
