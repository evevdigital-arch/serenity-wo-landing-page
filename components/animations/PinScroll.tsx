"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface PinScrollStep {
  number: string;
  title: string;
  description: string;
}

interface PinScrollProps {
  eyebrow: string;
  title: string;
  steps: PinScrollStep[];
  headingId?: string;
}

export function PinScroll({ eyebrow, title, steps, headingId }: PinScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (isMobile || reduceMotion || !sectionRef.current || !panelRef.current) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-pin-step]", sectionRef.current);
      gsap.from(items, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true
        }
      });

      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: panelRef.current,
        pinSpacing: false
      });

      return () => pinTrigger.kill();
    },
    { scope: sectionRef, dependencies: [isMobile, reduceMotion] }
  );

  return (
    <div ref={sectionRef} className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <div ref={panelRef} className="self-start lg:min-h-[60svh] lg:pt-8">
        <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">{eyebrow}</p>
        <h2 id={headingId} className="mt-5 font-playfair text-h2 font-semibold text-wo-text text-balance">{title}</h2>
      </div>
      <div className="relative space-y-5 before:absolute before:left-6 before:top-0 before:h-full before:w-px before:bg-wo-border lg:space-y-8">
        {steps.map((step) => (
          <article key={step.number} data-pin-step className="relative pl-16">
            <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border border-wo-border bg-wo-bg font-dm text-sm font-semibold text-wo-primary">
              {step.number}
            </span>
            <h3 className="font-dm text-h3 font-semibold text-wo-text">{step.title}</h3>
            <p className="mt-3 max-w-[52ch] text-body text-wo-text-soft">{step.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
