"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (eventType: string, eventName: string, params?: Record<string, unknown>) => void;
  }
}

interface WAButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  variant?: "elegant" | "outline" | "light";
  eventName?: string;
  fullWidth?: boolean;
}

const variantClassName: Record<NonNullable<WAButtonProps["variant"]>, string> = {
  elegant: "bg-[#1A1A1A] text-white shadow-soft",
  outline: "border border-wo-border bg-white/70 text-wo-text backdrop-blur-xl",
  light: "bg-white text-wo-text shadow-soft"
};

export function WAButton({
  href,
  children,
  variant = "elegant",
  eventName,
  fullWidth = false,
  className = "",
  onClick,
  ...props
}: WAButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        if (eventName) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: eventName });
          window.fbq?.("track", "Lead", { source: eventName });
        }
        onClick?.(event);
      }}
      className={`tap-target mobile-active-feedback desktop-hover-lift inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 font-dm text-[0.82rem] font-semibold uppercase tracking-[0.08em] transition-transform duration-300 ease-out focus-visible:outline-wo-gold ${variantClassName[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-[#25D366]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" focusable="false">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.74.46 3.45 1.32 4.95L2.05 22l5.28-1.38a9.9 9.9 0 0 0 4.71 1.2h.01c5.46 0 9.9-4.44 9.9-9.9a9.82 9.82 0 0 0-2.9-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.55 3.7-8.24 8.25-8.24a8.18 8.18 0 0 1 5.83 2.42 8.18 8.18 0 0 1 2.41 5.84c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08s.89 2.41 1.02 2.58c.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
        </svg>
      </span>
      <span>{children}</span>
    </a>
  );
}
