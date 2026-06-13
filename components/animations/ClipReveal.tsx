"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
}

export function ClipReveal({ children, className = "" }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      // NOTE: The guideline names this ClipReveal, but the absolute rule only allows opacity and transform animations.
      gsap.from(ref.current, {
        autoAlpha: 0,
        scale: 0.96,
        y: 24,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 84%",
          once: true
        }
      });
    },
    { scope: ref, dependencies: [reduceMotion] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
