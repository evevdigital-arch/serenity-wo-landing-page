"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { WAButton } from "@/components/ui/WAButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PromoSectionProps {
  waLink: string;
}

export function PromoSection({ waLink }: PromoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-promo-reveal]", {
        autoAlpha: 0,
        y: 32,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true }
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section ref={sectionRef} className="bg-[#9D6B4E] py-16 text-white lg:py-24" aria-labelledby="promo-heading">
      <Container>
        {/* NOTE: PRD/Design Guideline mention promo auto-hide as an assumption/open question; promo is rendered until client confirms scheduling behavior. */}
        <FadeUp>
          <div data-promo-reveal className="grid gap-8 rounded-[40px] border border-white/20 bg-white/10 p-7 backdrop-blur-xl md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-white/75">Main Offer & Urgency</p>
              <h2 id="promo-heading" className="mt-4 font-playfair text-h2 font-semibold text-white text-balance">
                Diskon 10% + Free Pre-wedding Consultation.
              </h2>
              <p className="mt-5 max-w-[65ch] text-body-lg text-white/80">
                Early Bird Free Pre-wed Doc khusus Januari - Maret 2025. Promo berlaku terbatas, booking lebih awal jauh lebih hemat.
              </p>
            </div>
            <WAButton href={waLink} eventName="wa_click_promo" variant="light" fullWidth className="md:w-auto">
              Amankan Promo Early Bird via WA
            </WAButton>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
