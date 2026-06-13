"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";
import { MagneticButton } from "@/components/interactions/MagneticButton";
import { GlowEffect } from "@/components/ui/GlowEffect";
import { WAButton } from "@/components/ui/WAButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FinalCTASectionProps {
  waLink: string;
}

export function FinalCTASection({ waLink }: FinalCTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-final-reveal]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true }
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#1A1A1A] py-24 text-white lg:py-40" aria-labelledby="final-cta-heading">
      <GlowEffect color="#C9A96E" opacity={0.1} />
      <Container size="narrow" className="relative z-10 text-center">
        <FadeUp>
          <p data-final-reveal className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-gold">Final CTA</p>
          <SplitTextReveal
            as="h2"
            id="final-cta-heading"
            className="mt-5 font-playfair text-h2 font-semibold text-white text-balance"
          >
            Jangan pertaruhkan momen sekali seumur hidup.
          </SplitTextReveal>
          <p data-final-reveal className="mx-auto mt-6 max-w-[58ch] text-body-lg text-white/70">
            Slot terbatas karena Serenity WO menerapkan sistem Dedicated Team dan tidak menerima overbooking di tanggal yang sama.
          </p>
          <div data-final-reveal className="mt-9 flex justify-center">
            <MagneticButton strength={0.3}>
              <WAButton href={waLink} eventName="wa_click_final" className="animate-pulse-soft px-8 py-4">
                Klaim Promo Early Bird Sekarang
              </WAButton>
            </MagneticButton>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
