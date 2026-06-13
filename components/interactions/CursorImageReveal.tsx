"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CursorImageRevealProps {
  children: ReactNode;
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function CursorImageReveal({
  children,
  src,
  alt,
  width = 320,
  height = 240
}: CursorImageRevealProps) {
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (event: PointerEvent) => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `translate3d(${event.clientX + 24}px, ${event.clientY - 80}px, 0)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled]);

  return (
    <div onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)}>
      {children}
      {enabled && active ? (
        <div
          ref={imageRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[90] overflow-hidden rounded-[28px] shadow-soft will-animate-transform"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            className="h-[240px] w-[320px] object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
