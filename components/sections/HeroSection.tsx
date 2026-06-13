"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { HeroExit } from "@/components/animations/HeroExit";
import { SplitTextReveal } from "@/components/animations/SplitTextReveal";
import { MagneticButton } from "@/components/interactions/MagneticButton";
import { WAButton } from "@/components/ui/WAButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface HeroSectionProps {
  waLink: string;
}

const serviceTags = ["Full WO", "Partial WO", "Dekorasi", "Entertainment", "Dokumentasi"];

export function HeroSection({ waLink }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-hero-reveal]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.16,
        delay: 0.2
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen min-h-[100svh] overflow-hidden bg-[#1A1A1A] text-white"
      aria-labelledby="hero-title"
    >
      <HeroExit className="absolute inset-0 will-animate-transform">
        <Image
          src="/images/hero/serenity-wo-wedding.webp"
          alt="Momen emosional pernikahan bebas stres di Yogyakarta oleh Serenity Wedding Organizer"
          fill
          priority={true}
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80 will-animate-transform"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src="/videos/hero-highlight.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </HeroExit>

      <div className="relative z-10 flex min-h-screen min-h-[100svh] items-end px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-36 lg:px-20 lg:pb-[120px] lg:pt-[160px]">
        <div className="max-w-[1180px]">
          <div data-hero-reveal className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 font-dm text-label font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-xl">
            ⭐ 4.9/5 dari 210+ Pasangan
          </div>

          <SplitTextReveal
            as="h1"
            delay={0.4}
            className="mt-6 block max-w-[11ch] font-playfair text-display font-semibold leading-[0.95] tracking-[-0.04em] text-white text-balance"
          >
            <span id="hero-title">Stres Mengurus Pernikahan?</span>{" "}
            <em className="font-playfair italic text-wo-gold">Wujudkan Tanpa Beban</em>
            <span className="sr-only"> bersama Serenity Wedding Organizer Yogyakarta</span>
          </SplitTextReveal>

          <p data-hero-reveal className="mt-7 max-w-[46ch] text-body-lg text-white/80">
            Pernikahan impian bebas stres di Jogja/Jateng dengan Serenity WO.
          </p>

          <div data-hero-reveal className="mt-8 flex flex-wrap gap-2" aria-label="Layanan Serenity WO">
            {serviceTags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-small text-white/70 backdrop-blur-xl">
                {tag}
              </span>
            ))}
          </div>

          <div data-hero-reveal className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <MagneticButton strength={0.3}>
              <WAButton href={waLink} eventName="wa_click_hero" className="px-7 py-4">
                Amankan Tanggal Pernikahanmu
              </WAButton>
            </MagneticButton>
            <p className="max-w-[30ch] text-small text-white/60">
              Slot terbatas karena sistem Dedicated Team tidak menerima overbooking di tanggal yang sama.
            </p>
          </div>
        </div>
      </div>

      <div data-hero-reveal className="absolute bottom-6 right-5 z-10 hidden font-dm text-label font-semibold uppercase tracking-[0.16em] text-white/70 md:block">
        Scroll
      </div>
    </section>
  );
}
