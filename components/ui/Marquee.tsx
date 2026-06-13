import type { CSSProperties } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  label?: string;
}

export function Marquee({ items, speed = 40, direction = "left", label }: MarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div aria-label={label} className="relative w-full overflow-hidden py-4">
      <div
        className={`flex w-max items-center gap-10 ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"}`}
        style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
      >
        {repeated.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="font-dm text-sm font-semibold uppercase tracking-[0.18em] text-wo-text-muted/70 grayscale"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
