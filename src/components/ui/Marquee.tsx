"use client";

import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 40,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn("marquee-mask group relative flex overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      {[0, 1].map((key) => (
        <div
          key={key}
          aria-hidden={key === 1}
          className={cn(
            "flex shrink-0 items-center gap-12 pr-12",
            direction === "left" ? "animate-marquee-x" : "animate-marquee-x-reverse",
            pauseOnHover && "group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
          )}
        >
          {items.map((child, i) => (
            <div key={i} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
