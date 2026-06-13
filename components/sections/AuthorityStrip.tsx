"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { CountUp } from "@/components/animations/CountUp";
import { Marquee } from "@/components/ui/Marquee";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AuthorityStripProps {}

const logos = ["Bride Indonesia", "Weddingku", "@weddingyogya"];
const metrics = [
  { label: "Rating Google", value: 4.9, suffix: "/5", decimals: 1 },
  { label: "Ulasan", value: 210, suffix: "+", decimals: 0 },
  { label: "Portofolio sukses", value: 150, suffix: "+", decimals: 0 },
  { label: "Berdiri", value: 2019, suffix: "", decimals: 0 }
];

export function AuthorityStrip(_props: AuthorityStripProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-authority-item]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true }
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section ref={sectionRef} className="bg-wo-bg py-12 lg:py-16" aria-labelledby="authority-heading">
      <Container>
        <p id="authority-heading" data-authority-item className="text-center font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">
          Dipercaya dan diliput oleh
        </p>
        <Marquee items={logos} speed={40} direction="left" label="Bride Indonesia, Weddingku, dan @weddingyogya" />
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-wo-border bg-wo-border md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} data-authority-item className="bg-wo-bg p-5 text-center md:p-7">
              <div className="font-playfair text-h3 font-semibold text-wo-text">
                <CountUp to={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
              </div>
              <p className="mt-2 text-small text-wo-text-soft">{metric.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
