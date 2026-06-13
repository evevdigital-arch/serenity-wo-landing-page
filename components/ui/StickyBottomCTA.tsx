"use client";

import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { WAButton } from "@/components/ui/WAButton";

interface StickyBottomCTAProps {
  waLink: string;
  ctaText?: string;
  style?: "elegant";
}

export function StickyBottomCTA({
  waLink,
  ctaText = "Konsultasi Tanggal via WA"
}: StickyBottomCTAProps) {
  const [visible, setVisible] = useState(false);

  useGSAP(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[75] bg-wo-bg/88 px-5 pt-3 backdrop-blur-2xl transition-[opacity,transform] duration-300 ease-out md:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"}`}
      style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
      aria-hidden={!visible}
    >
      <WAButton href={waLink} eventName="wa_click_sticky" fullWidth>
        {ctaText}
      </WAButton>
    </div>
  );
}
