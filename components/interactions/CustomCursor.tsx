"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    document.documentElement.classList.add("cursor-desktop-enabled");

    const move = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      if (cursorRef.current.style.opacity !== "1") {
        cursorRef.current.style.opacity = "1";
      }
      cursorRef.current.style.transform = `translate3d(${event.clientX - 12}px, ${event.clientY - 12}px, 0)`;
    };

    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      document.documentElement.classList.remove("cursor-desktop-enabled");
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 text-[#FF0000] drop-shadow-lg transition-opacity duration-300"
      style={{ width: "24px", height: "24px", willChange: "transform, opacity" }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}
