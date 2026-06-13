"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { WAButton } from "@/components/ui/WAButton";

interface NavbarProps {
  waLink: string;
}

const navItems = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#pricing", label: "Harga" },
  { href: "#faq", label: "FAQ" }
];

export function Navbar({ waLink }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!navRef.current) return;
      const onScroll = () => {
        const active = window.scrollY > 80;
        gsap.to(navRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power2.out"
        });
        navRef.current?.classList.toggle("bg-wo-bg/80", active);
        navRef.current?.classList.toggle("backdrop-blur-2xl", active);
        navRef.current?.classList.toggle("border-wo-border", active);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-[70] h-[60px] border-b border-transparent md:h-[72px]"
      aria-label="Navigasi Serenity Wedding Organizer"
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-20">
        <a href="#hero" className="tap-target inline-flex items-center font-playfair text-xl font-semibold tracking-[-0.02em] text-white mix-blend-difference md:text-2xl">
          Serenity WO
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="tap-target inline-flex items-center font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-text">
              {item.label}
            </a>
          ))}
          <WAButton href={waLink} eventName="wa_click_nav" className="px-5 py-3">
            Konsultasi
          </WAButton>
        </div>
      </div>
    </nav>
  );
}
