"use client";

import type { ElementType, ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SplitTextRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  animateOnLoad?: boolean;
}

export function SplitTextReveal({
  as: Component = "span",
  children,
  className = "",
  id,
  delay = 0.4,
  animateOnLoad = true
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !ref.current || !animateOnLoad) return;

      const split = new SplitText(ref.current, { type: "words", wordsClass: "split-word" });
      gsap.set(split.words, { autoAlpha: 0, yPercent: 110 });
      gsap.to(split.words, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 1.2,
        delay,
        ease: "power4.out",
        stagger: 0.04
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduceMotion, delay, animateOnLoad] }
  );

  return (
    <Component ref={ref} className={className} id={id}>
      {children}
    </Component>
  );
}
