"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroExitProps {
  children: ReactNode;
  className?: string;
}

export function HeroExit({ children, className = "" }: HeroExitProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      // NOTE: Design guideline requested blur, but absolute animation rules allow only opacity and transform.
      gsap.to(ref.current, {
        scale: 0.94,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    },
    { scope: ref, dependencies: [reduceMotion] }
  );

  return <div ref={ref} className={className}>{children}</div>;
}
