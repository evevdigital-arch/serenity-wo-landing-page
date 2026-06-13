interface NoiseOverlayProps {
  opacity?: number;
  blendMode?: "overlay" | "soft-light" | "multiply";
}

export function NoiseOverlay({ opacity = 0.03, blendMode = "overlay" }: NoiseOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{
        opacity,
        mixBlendMode: blendMode,
        backgroundImage:
          "radial-gradient(circle at 25% 20%, rgba(44,24,16,0.18) 0 1px, transparent 1px), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.18) 0 1px, transparent 1px)",
        backgroundSize: "3px 3px, 5px 5px"
      }}
    />
  );
}
