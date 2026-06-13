"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

export function FadeUp({ children, className = "", delay = 0, y = 32, once = true }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 86%",
          once
        }
      });
    },
    { scope: ref, dependencies: [reduceMotion, delay, y, once] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
