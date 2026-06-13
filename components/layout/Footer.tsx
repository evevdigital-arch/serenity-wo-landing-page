import { Container } from "@/components/layout/Container";

interface FooterProps {
  year?: number;
}

export function Footer({ year = 2026 }: FooterProps) {
  return (
    <footer className="bg-[#2C1810] pt-20 pb-8 text-white" aria-labelledby="footer-heading">
      <Container className="grid gap-10 pb-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <h2 id="footer-heading" className="font-playfair text-h2 font-semibold text-white">
            Serenity Wedding Organizer
          </h2>
          <p className="mt-5 max-w-[54ch] text-body text-white/70">
            Jasa perencana dan pelaksana pernikahan yang fleksibel, responsif, dan bergaransi untuk DIY & Jawa Tengah.
          </p>
        </div>
        <div>
          <h3 className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-gold">NAP</h3>
          {/* NOTE: Alamat lengkap kantor Jogja tidak tersedia di PRD/Design Guideline; hanya lokasi dan area layanan yang tersedia dari dokumen yang ditampilkan. */}
          <address className="mt-5 not-italic text-body text-white/70">
            Yogyakarta, DIY<br />
            Area layanan: DIY & Jawa Tengah<br />
            Jam operasional: 09:00–18:00
          </address>
        </div>
        <div>
          <h3 className="font-dm text-label font-semibold uppercase tracking-[0.08em] text-wo-gold">Kanal</h3>
          {/* NOTE: URL Instagram dan Pinterest belum tersedia di PRD/Design Guideline; tidak dibuat tautan agar tidak menebak data bisnis. */}
          <ul className="mt-5 space-y-3 text-body text-white/70">
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Google Business Profile</li>
          </ul>
        </div>
      </Container>
      <Container className="grid gap-5 border-t border-white/10 pt-8 text-small text-white/60 md:grid-cols-[1fr_auto]">
        <p>© {year} Serenity Wedding Organizer. Copyright.</p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Serenity%20Wedding%20Organizer%20Yogyakarta"
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex items-center text-white/70"
        >
          Buka peta Serenity WO Yogyakarta
        </a>
      </Container>
    </footer>
  );
}
