"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticButton({ children, strength = 0.3, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={enabled ? { x, y } : undefined}
      onMouseMove={(event) => {
        if (!enabled || !ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        const relX = event.clientX - bounds.left - bounds.width / 2;
        const relY = event.clientY - bounds.top - bounds.height / 2;
        x.set(relX * strength);
        y.set(relY * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
