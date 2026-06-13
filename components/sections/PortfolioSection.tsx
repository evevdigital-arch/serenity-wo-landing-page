"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { HorizontalScroll } from "@/components/animations/HorizontalScroll";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";
import { CursorImageReveal } from "@/components/interactions/CursorImageReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PortfolioSectionProps {}

const portfolioThemes = [
  {
    title: "Jawa Modern",
    image: "/images/portfolio/jawa-modern-01.webp",
    video: "/videos/portfolio/jawa-modern-01.mp4",
    alt: "Dekorasi pernikahan Jawa Modern di Yogyakarta oleh Serenity WO"
  },
  {
    title: "Garden Party",
    image: "/images/portfolio/garden-party-01.webp",
    video: "/videos/portfolio/garden-party-01.mp4",
    alt: "Garden party wedding di Jogja dan Jawa Tengah bersama Serenity Wedding Organizer"
  },
  {
    title: "Intimate Wedding",
    image: "/images/portfolio/intimate-wedding-01.webp",
    video: "/videos/portfolio/intimate-wedding-01.mp4",
    alt: "Intimate wedding hangat dan bebas stres oleh Serenity WO Yogyakarta"
  },
  {
    title: "Rustic",
    image: "/images/portfolio/rustic-01.webp",
    video: "/videos/portfolio/rustic-01.mp4",
    alt: "Tema rustic pernikahan premium oleh Serenity Wedding Organizer Yogyakarta"
  }
];

export function PortfolioSection(_props: PortfolioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-portfolio-heading]", {
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
    <section id="portfolio" ref={sectionRef} className="bg-wo-bg py-20 lg:py-40" aria-labelledby="portfolio-heading">
      <Container size="wide">
        <div data-portfolio-heading className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
          <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">Service & Portfolio Showcase</p>
          <SplitTextReveal
            as="h2"
            id="portfolio-heading"
            className="mt-5 max-w-[920px] font-playfair text-h2 font-semibold text-wo-text text-balance"
          >
            Tema spesialisasi untuk pernikahan di Jogja/Jateng yang fleksibel dan terpercaya.
          </SplitTextReveal>
          <p className="mt-6 max-w-[65ch] text-body-lg text-wo-text-soft">
            Full WO, Partial WO, Dekorasi, Entertainment, & Dokumentasi ditampilkan melalui foto kualitas tinggi dan video pendek.
          </p>
        </div>
        <HorizontalScroll className="mt-12">
          {portfolioThemes.map((theme) => (
            <CursorImageReveal key={theme.title} src={theme.image} alt={theme.alt}>
              <article className="w-[82vw] shrink-0 snap-center overflow-hidden rounded-[40px] border border-wo-border bg-wo-surface shadow-soft md:w-[560px] lg:w-[680px]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={theme.image}
                    alt={theme.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="grid gap-5 p-6 md:grid-cols-[1fr_180px] md:p-8">
                  <div>
                    <h3 className="font-dm text-h3 font-semibold text-wo-text">{theme.title}</h3>
                    <p className="mt-3 text-body text-wo-text-soft">Foto dokumentasi klien Serenity WO, fokus pada wajah bahagia dan detail dekorasi.</p>
                  </div>
                  <video
                    controls
                    preload="none"
                    playsInline
                    className="aspect-video w-full rounded-[20px] bg-[#1A1A1A]"
                    aria-label={`Video pendek portofolio ${theme.title} Serenity WO`}
                  >
                    <source src={theme.video} type="video/mp4" />
                  </video>
                </div>
              </article>
            </CursorImageReveal>
          ))}
        </HorizontalScroll>
      </Container>
    </section>
  );
}
