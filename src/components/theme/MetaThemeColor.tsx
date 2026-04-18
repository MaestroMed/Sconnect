"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

/**
 * Keeps the <meta name="theme-color"> tag in sync with the active theme.
 * This controls the browser chrome color on mobile (iOS address bar, Android).
 */
export default function MetaThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const color = resolvedTheme === "dark" ? "#0f172a" : "#ffffff";
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = color;
  }, [resolvedTheme]);

  return null;
}
