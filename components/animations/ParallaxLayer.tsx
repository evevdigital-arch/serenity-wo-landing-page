"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 16, className = "" }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isMobile || reduceMotion || !ref.current) return;
      gsap.to(ref.current, {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: ref, dependencies: [isMobile, reduceMotion, speed] }
  );

  return <div ref={ref} className={className}>{children}</div>;
}
