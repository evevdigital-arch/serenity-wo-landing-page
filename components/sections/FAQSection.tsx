"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface FAQSectionProps {}

const faqs = [
  {
    question: "Apakah harganya masuk budget?",
    answer: "Harga transparan: Partial WO mulai Rp 5 juta, Full WO mulai Rp 15 juta, dan Dekorasi mulai Rp 8 juta. Serenity WO melayani calon klien budget menengah ke atas dengan rentang nikah Rp 50 juta - Rp 300 juta."
  },
  {
    question: "Bisa request tema modern/campuran tidak?",
    answer: "Bisa. Serenity WO fleksibel menangani konsep Jawa Modern, Garden Party, Intimate Wedding, dan Rustic, termasuk kebutuhan tradisi keluarga serta referensi modern dari Pinterest/IG."
  },
  {
    question: "Wilayah cover Serenity WO di mana saja?",
    answer: "Area layanan Serenity WO adalah DIY (Daerah Istimewa Yogyakarta) & Jawa Tengah."
  },
  {
    question: "Bagaimana teknis Garansi Backup 24 Jam?",
    answer: "Garansi penanganan krisis Hari H dilakukan dengan tim backup yang siaga 24 jam untuk menjaga kelancaran acara."
  },
  {
    question: "Apa arti sistem Tim Dedicated?",
    answer: "Tim Serenity WO tidak di-share dan tidak menerima overbooking di tanggal yang sama, sehingga fokus pada Hari Bahagia klien."
  }
];

export function FAQSection(_props: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-faq-heading]", {
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
    <section id="faq" ref={sectionRef} className="bg-wo-bg py-20 lg:py-32" aria-labelledby="faq-heading">
      <Container size="narrow">
        <FadeUp>
          <div data-faq-heading>
            <p className="text-center font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">FAQ</p>
            <h2 id="faq-heading" className="mt-5 text-center font-playfair text-h2 font-semibold text-wo-text text-balance">
              Jawaban untuk keraguan sebelum konsultasi.
            </h2>
          </div>
        </FadeUp>
        <div className="mt-10 divide-y divide-wo-border rounded-[32px] border border-wo-border bg-white shadow-soft">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="p-2">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="tap-target flex w-full items-center justify-between gap-5 rounded-[24px] px-5 py-4 text-left font-dm text-base font-semibold text-wo-text"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span>{faq.question}</span>
                    <span aria-hidden="true" className={`text-wo-primary transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>+</span>
                  </button>
                </h3>
                <div
                  id={`faq-answer-${index}`}
                  className={`${isOpen ? "block" : "hidden"}`}
                >
                  <p className={`px-5 pb-5 text-body text-wo-text-soft ${isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
