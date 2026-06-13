"use client";

import type { ReactNode } from "react";
import Lenis from "lenis";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion) return undefined;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 2
        // smoothTouch is intentionally omitted so Lenis keeps the required default: false.
      });

      const updateScrollTrigger = () => ScrollTrigger.update();
      lenis.on("scroll", updateScrollTrigger);

      const ticker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.off("scroll", updateScrollTrigger);
        gsap.ticker.remove(ticker);
        lenis.destroy();
      };
    },
    { dependencies: [reduceMotion] }
  );

  return <>{children}</>;
}
