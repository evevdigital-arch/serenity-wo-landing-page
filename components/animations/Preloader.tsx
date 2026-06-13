"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!containerRef.current || !textRef.current) return;

      if (reduceMotion) {
        gsap.set(containerRef.current, { display: "none" });
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { display: "none" });
        }
      });

      // Simple text fade up
      tl.from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      })
        // Hold for a moment
        .to(textRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power4.in",
          delay: 0.3
        })
        // Slide up the entire container like a curtain
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut"
        }, "-=0.4");
    },
    { scope: containerRef, dependencies: [reduceMotion] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#1A1A1A]"
      aria-hidden="true"
    >
      <h1
        ref={textRef}
        className="font-playfair text-display font-semibold uppercase tracking-[0.2em] text-wo-gold opacity-100 will-animate-transform"
      >
        Serenity
      </h1>
    </div>
  );
}
