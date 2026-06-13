"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";
import { MagneticButton } from "@/components/interactions/MagneticButton";
import { WAButton } from "@/components/ui/WAButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PricingSectionProps {
  waLink: string;
}

const packages = [
  {
    title: "Partial WO",
    price: "Rp 5 Jt",
    description: "Investasi berharga untuk koordinasi pernikahan yang sudah memiliki sebagian vendor.",
    featured: false
  },
  {
    title: "Full WO",
    price: "Rp 15 Jt",
    description: "Perencanaan dan pelaksanaan menyeluruh dari konsep hingga eksekusi Hari H.",
    featured: true
  },
  {
    title: "Dekorasi",
    price: "Rp 8 Jt",
    description: "Dekorasi fleksibel untuk tema Jawa Modern, Garden Party, Intimate Wedding, dan Rustic.",
    featured: false
  }
];

export function PricingSection({ waLink }: PricingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (!reduceMotion) {
        gsap.from("[data-pricing-heading]", {
          autoAlpha: 0,
          y: 36,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true }
        });
      }

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: "scroll_75" });
        }
      });

      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section id="pricing" ref={sectionRef} className="bg-[#FDFCFB] py-20 lg:py-32" aria-labelledby="pricing-heading">
      <Container>
        <div data-pricing-heading className="max-w-[760px]">
          <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">Transparent Pricing & Packages</p>
          <SplitTextReveal
            as="h2"
            id="pricing-heading"
            className="mt-5 font-playfair text-h2 font-semibold text-wo-text text-balance"
          >
            Harga transparan, kualitas premium.
          </SplitTextReveal>
          <p className="mt-6 max-w-[65ch] text-body-lg text-wo-text-soft">
            Prospek dapat mengetahui rentang harga sejak awal agar konsultasi WhatsApp lebih jelas dan sesuai budget.
          </p>
        </div>
        <StaggerGrid itemSelector=".pricing-card" className="mt-12 grid gap-5 lg:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.title}
              className="pricing-card flex flex-col items-center text-center rounded-[36px] border bg-white p-7 md:p-8 border-wo-gold shadow-gold"
            >
              <h3 className="font-playfair text-[clamp(2rem,3vw,2.5rem)] font-normal text-wo-text leading-tight">{item.title}</h3>
              <p className="mt-4 font-playfair text-[clamp(2.5rem,4vw,3.5rem)] italic leading-none tracking-[-0.02em] text-wo-gold">
                {item.price}
              </p>
              <p className="mt-6 text-body text-wo-text-soft leading-relaxed">{item.description}</p>
            </article>
          ))}
        </StaggerGrid>
        <div className="mt-10 flex justify-start">
          <MagneticButton strength={0.2}>
            <WAButton href={waLink} eventName="wa_click_pricing" className="px-7 py-4">
              Tanya Detail Paket via WA
            </WAButton>
          </MagneticButton>
        </div>
      </Container>
    </section>
  );
}
