import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { dmSans, playfair } from "@/app/fonts";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/interactions/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { WAFloating } from "@/components/ui/WAFloating";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Preloader } from "@/components/animations/Preloader";

const WA_NUMBER = "628123456789";
const WA_MESSAGE = encodeURIComponent(
  "Halo Tim Serenity WO, saya tertarik dengan layanan [Full WO / Partial WO / Dekorasi]. Saya ingin konsultasi ketersediaan tanggal dan promo bulan ini.\nNama:\nRencana Tanggal & Tahun:\nLokasi/Venue:"
);
const WA_LINK = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${WA_MESSAGE}`;

export const metadata: Metadata = {
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Serenity WO Yogyakarta | Wedding Organizer Bergaransi",
  description:
    "Mewujudkan pernikahan impian di Jogja & Jateng tanpa stres. 150+ portofolio sukses, garansi hari H, & konsultasi unlimited. Hubungi kami sekarang!",
  openGraph: {
    title: "Serenity Wedding Organizer Yogyakarta",
    description: "Mewujudkan pernikahan impian di Jogja & Jateng tanpa stres.",
    images: [{ url: "/images/og-image.webp", width: 1200, height: 630 }]
  }
};

// NOTE: Domain resmi dan alamat jalan lengkap belum tersedia di PRD/Design Guideline; schema menggunakan data faktual yang tersedia agar tidak menebak.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Serenity Wedding Organizer",
  description: "Jasa perencana dan pelaksana pernikahan bergaransi di Yogyakarta.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Yogyakarta",
    addressLocality: "Yogyakarta",
    addressRegion: "DIY",
    addressCountry: "ID"
  },
  areaServed: ["DIY", "Jawa Tengah"],
  priceRange: "Rp 5.000.000 - Rp 300.000.000",
  openingHours: "Mo-Su 09:00-18:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "210"
  }
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable} theme-wo`}>
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-system text-body antialiased">
        <Preloader />
        <SmoothScrollProvider>
          <Navbar waLink={WA_LINK} />
          {children}
          <WAFloating waLink={WA_LINK} />
          <CustomCursor />
          <NoiseOverlay opacity={0.03} blendMode="overlay" />
        </SmoothScrollProvider>
        {/* ==================== WATERMARK ==================== */}
        <a href="https://github.com/evevdigital-arch" target="_blank" className="evev-watermark" aria-label="Designed by evevdigital">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          evevdigital
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("%c✨ Designed & Developed by evevdigital ✨", "color: #D4AF37; font-size: 16px; font-weight: bold; background: #0a0a0a; padding: 10px 20px; border-radius: 8px;");
              console.log("https://github.com/evevdigital-arch");
            `
          }}
        />
      </body>
    </html>
  );
}
