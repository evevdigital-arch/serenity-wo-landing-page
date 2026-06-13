"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TestimonialSectionProps {}



const reviewImages = [
  { src: "/images/testimonials/google-review-01.webp", alt: "Screenshot ulasan Google Maps bintang 5 untuk Serenity WO dengan rating 4.9" },
  { src: "/images/testimonials/google-review-02.webp", alt: "Screenshot ulasan Google Maps klien Serenity Wedding Organizer Yogyakarta" },
  { src: "/images/testimonials/google-review-03.webp", alt: "Screenshot review Google Serenity WO dari pasangan yang merasa aman dan bebas stres" }
];

export function TestimonialSection(_props: TestimonialSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-testimonial-heading]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true }
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );



  return (
    <section ref={sectionRef} className="bg-[#FDFCFB] py-20 lg:py-32" aria-labelledby="testimonial-heading">
      <Container>
        <div data-testimonial-heading className="mx-auto max-w-[760px] text-center">
          <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">Testimonials & Proof</p>
          <h2 id="testimonial-heading" className="mt-5 font-playfair text-h2 font-semibold text-wo-text text-balance">
            Pengalaman klien yang merasa aman, dibantu, dan bebas stres.
          </h2>
          <p className="mx-auto mt-6 max-w-[65ch] text-body-lg text-wo-text-soft">
            Bukti kepuasan klien yang nyata, didukung dengan tangkapan layar ulasan Google Maps asli dengan rating tinggi.
          </p>
        </div>
        <StaggerGrid itemSelector=".testimonial-item" className="mx-auto mt-12 max-w-[1000px]">
          <div className="testimonial-item min-w-0 rounded-[40px] border border-wo-border bg-white p-5 shadow-soft md:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">Google Reviews</p>
                <h3 className="mt-3 font-playfair text-h2 font-semibold text-wo-text">4.9/5</h3>
              </div>
              <p className="text-center text-small text-wo-text-muted sm:text-right">210 ulasan<br className="hidden sm:block" /> bintang tinggi</p>
            </div>
            <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
              {reviewImages.map((review) => (
                <Image
                  key={review.src}
                  src={review.src}
                  alt={review.alt}
                  width={600}
                  height={300}
                  loading="lazy"
                  className="h-[210px] w-[360px] shrink-0 snap-center rounded-[24px] border border-wo-border object-cover"
                />
              ))}
            </div>
          </div>
        </StaggerGrid>
      </Container>
    </section>
  );
}
