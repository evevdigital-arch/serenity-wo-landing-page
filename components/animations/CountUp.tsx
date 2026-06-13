"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CountUpProps {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({ to, suffix = "", prefix = "", decimals = 0, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduceMotion) {
        ref.current.textContent = `${prefix}${to.toFixed(decimals)}${suffix}`;
        return;
      }

      const counter = { value: 0 };
      gsap.to(counter, {
        value: to,
        duration: 1.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          once: true
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${counter.value.toFixed(decimals)}${suffix}`;
          }
        }
      });
    },
    { scope: ref, dependencies: [reduceMotion, to, suffix, prefix, decimals] }
  );

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}
