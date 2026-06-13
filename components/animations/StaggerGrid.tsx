"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  itemSelector?: string;
  stagger?: number;
  triggerStart?: string;
}

export function StaggerGrid({
  children,
  className = "",
  itemSelector = "[data-stagger-item]",
  stagger = 0.08,
  triggerStart = "top 80%"
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;
      const items = gsap.utils.toArray<HTMLElement>(itemSelector, ref.current);
      gsap.from(items, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: triggerStart,
          once: true
        }
      });
    },
    { scope: ref, dependencies: [reduceMotion, itemSelector, stagger, triggerStart] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
