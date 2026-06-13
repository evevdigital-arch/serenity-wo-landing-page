"use client";

import { WAButton } from "@/components/ui/WAButton";

interface WAFloatingProps {
  waLink: string;
}

export function WAFloating({ waLink }: WAFloatingProps) {
  return (
    <div className="safe-bottom-24 fixed bottom-0 right-5 z-[80] hidden md:block">
      <WAButton
        href={waLink}
        eventName="wa_click_floating"
        aria-label="Konsultasi via WhatsApp Serenity WO"
        className="animate-pulse-soft px-5"
      >
        WA
      </WAButton>
    </div>
  );
}
