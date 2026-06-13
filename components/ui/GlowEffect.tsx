interface GlowEffectProps {
  color?: string;
  size?: string;
  position?: string;
  opacity?: number;
  blur?: string;
  className?: string;
}

export function GlowEffect({
  color = "#C9A96E",
  size = "w-[400px] h-[400px]",
  position = "top-[-100px] right-[-100px]",
  opacity = 0.06,
  blur = "160px",
  className = ""
}: GlowEffectProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${size} ${position} ${className}`}
      style={{
        opacity,
        background: color,
        filter: `blur(${blur})`
      }}
    />
  );
}
