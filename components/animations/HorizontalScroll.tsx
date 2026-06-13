"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const distance = trackRef.current!.scrollWidth - window.innerWidth + 80;
        if (distance <= 0) return;

        gsap.to(trackRef.current, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <div ref={sectionRef} className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:gap-8 md:px-10 lg:w-max lg:overflow-visible lg:px-20 lg:will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
