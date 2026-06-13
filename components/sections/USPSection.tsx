"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { TiltCard } from "@/components/interactions/TiltCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface USPSectionProps {}

const uspItems = [
  { title: "Konsultasi Unlimited", text: "Komunikasi fleksibel agar keputusan penting tidak terasa sendirian." },
  { title: "Tim Dedicated", text: "Tim tidak di-share dan Serenity WO tidak menerima overbooking di tanggal yang sama." },
  { title: "Garansi Backup 24 Jam", text: "Tim backup siaga untuk penanganan krisis Hari H." },
  { title: "150+ Portofolio Sukses", text: "Portofolio sukses sejak 2019 dengan rating Google 4.9 dari 210 ulasan." }
];

export function USPSection(_props: USPSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reduceMotion || !sectionRef.current) return;
      gsap.from("[data-usp-reveal]", {
        autoAlpha: 0,
        y: 36,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
    },
    { scope: sectionRef, dependencies: [reduceMotion] }
  );

  return (
    <section ref={sectionRef} className="bg-wo-bg py-20 lg:py-40" aria-labelledby="usp-heading">
      <Container>
        <div data-usp-reveal className="max-w-[760px]">
          <p className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-primary">Why Choose Us</p>
          <h2 id="usp-heading" className="mt-5 font-playfair text-h2 font-semibold text-wo-text text-balance">
            Serenity memberikan kepastian, keamanan, dan fleksibilitas total.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <TiltCard className="order-first overflow-hidden rounded-[40px] border border-wo-border bg-wo-surface shadow-soft lg:row-span-2">
            <article data-usp-reveal>
              <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[560px]">
                <Image
                  src="/images/team/founder.webp"
                  alt="Tim dedicated Serenity WO standby berseragam untuk pernikahan di Yogyakarta"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  loading="lazy"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-dm text-h3 font-semibold text-white">Tim Dedicated & Backup 24 Jam</h3>
                  <p className="mt-3 text-body text-white/80">Visualisasi tim Serenity WO yang standby menggunakan seragam saat di lapangan.</p>
                </div>
              </div>
            </article>
          </TiltCard>
          <div className="grid gap-5 sm:grid-cols-2">
            {uspItems.map((item) => (
              <TiltCard key={item.title} className="desktop-hover-lift rounded-[32px] border border-wo-border bg-wo-surface p-6 shadow-soft md:p-8">
                <article data-usp-reveal>
                  <h3 className="font-dm text-h3 font-semibold text-wo-text">{item.title}</h3>
                  <p className="mt-4 text-body text-wo-text-soft">{item.text}</p>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
