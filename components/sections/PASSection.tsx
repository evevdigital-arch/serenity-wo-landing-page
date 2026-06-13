"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PASSectionProps {}

const painPoints = [
  {
    title: "WO kaku",
    text: "Paket tidak bisa custom saat calon pengantin perlu mengakomodasi tradisi keluarga dan referensi modern."
  },
  {
    title: "Slow response",
    text: "Komunikasi yang lambat membuat persiapan Hari Bahagia terasa semakin berat."
  },
  {
    title: "Takut Hari H kacau",
    text: "Kekhawatiran terbesar adalah WO lepas tangan saat ada masalah teknis di Hari H."
  }
];

export function PASSection(_props: PASSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-pas-heading]", {
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
    <section ref={sectionRef} className="bg-[#F5E6E0] py-[60px] md:py-32" aria-labelledby="pas-heading">
      <Container className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-start lg:gap-20">
        <div data-pas-heading>
          <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">Problem / Pain Point</p>
          <h2 id="pas-heading" className="mt-5 font-playfair text-h2 font-semibold text-wo-text text-balance">
            Kami paham stresnya menyiapkan momen sekali seumur hidup.
          </h2>
          <p className="mt-6 max-w-[56ch] text-body-lg text-wo-text-soft">
            Jangan pertaruhkan momen sekali seumur hidup dengan WO abal-abal.
          </p>
        </div>
        <StaggerGrid itemSelector=".pain-point-item" stagger={0.08} className="space-y-4">
          {painPoints.map((point) => (
            <article key={point.title} className="pain-point-item rounded-[28px] border border-white/60 bg-white/50 p-6 shadow-soft backdrop-blur-xl">
              <h3 className="font-dm text-h3 font-semibold text-wo-text">{point.title}</h3>
              <p className="mt-3 text-body text-wo-text-soft">{point.text}</p>
            </article>
          ))}
        </StaggerGrid>
      </Container>
    </section>
  );
}
