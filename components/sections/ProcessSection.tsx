"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { PinScroll, type PinScrollStep } from "@/components/animations/PinScroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProcessSectionProps {}

const processSteps: PinScrollStep[] = [
  { number: "01", title: "Konsultasi WA", description: "Mulai dari konsultasi WhatsApp untuk membaca kebutuhan, tanggal, dan venue." },
  { number: "02", title: "Pemilihan Konsep", description: "Pemilihan konsep yang fleksibel antara tradisi keluarga dan referensi modern." },
  { number: "03", title: "Persiapan Detail", description: "Persiapan detail bersama tim dedicated yang responsif." },
  { number: "04", title: "Eksekusi Sempurna Hari H", description: "Eksekusi Hari H dengan garansi tim backup siaga 24 jam." }
];

export function ProcessSection(_props: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-process-shell]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true }
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section ref={sectionRef} className="bg-wo-bg py-20 lg:py-40" aria-labelledby="process-heading">
      <Container>
        <div data-process-shell>
          <PinScroll
            headingId="process-heading"
            eyebrow="Process / How It Works"
            title="4 Langkah Sederhana menuju Hari Bahagia bebas stres."
            steps={processSteps}
          />
        </div>
      </Container>
    </section>
  );
}
