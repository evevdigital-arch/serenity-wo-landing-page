interface MeshGradientProps {
  className?: string;
}

export function MeshGradient({ className = "" }: MeshGradientProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-wo-blush opacity-70 blur-[120px]" />
      <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-wo-gold opacity-20 blur-[140px]" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wo-primary opacity-10 blur-[160px]" />
    </div>
  );
}
