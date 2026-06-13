import type { CSSProperties } from "react";
import { Footer } from "@/components/layout/Footer";
import { StickyBottomCTA } from "@/components/ui/StickyBottomCTA";
import { AuthorityStrip } from "@/components/sections/AuthorityStrip";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PASSection } from "@/components/sections/PASSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { PromoSection } from "@/components/sections/PromoSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { USPSection } from "@/components/sections/USPSection";

const WA_NUMBER = "628123456789";
const WA_MESSAGE = encodeURIComponent(
  "Halo Tim Serenity WO, saya tertarik dengan layanan [Full WO / Partial WO / Dekorasi]. Saya ingin konsultasi ketersediaan tanggal dan promo bulan ini.\nNama:\nRencana Tanggal & Tahun:\nLokasi/Venue:"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const viewTransitionStyle = { viewTransitionName: "serenity-page" } as CSSProperties;

export default function Page() {
  return (
    <>
      <main style={viewTransitionStyle}>
        <HeroSection waLink={WA_LINK} />
        <AuthorityStrip />
        <PASSection />
        <USPSection />
        <PortfolioSection />
        <PricingSection waLink={WA_LINK} />
        <PromoSection waLink={WA_LINK} />
        <ProcessSection />
        <TestimonialSection />
        <FAQSection />
        <FinalCTASection waLink={WA_LINK} />
      </main>
      <Footer year={2026} />
      <StickyBottomCTA waLink={WA_LINK} ctaText="Konsultasi Tanggal via WA" style="elegant" />
    </>
  );
}
