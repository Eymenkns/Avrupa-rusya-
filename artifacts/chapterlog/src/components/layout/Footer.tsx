import { Link } from "wouter";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/8 relative overflow-hidden">
      {/* Accent top line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Decorative glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent rounded-full blur-[180px] opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-14 pb-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <span className="text-2xl font-display font-extrabold text-white tracking-tight">
                Chapter<span className="text-accent">LOG</span>
              </span>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-5 font-serif">
              Kayseri merkezli, Türkiye–Rusya hattının güvenilir lojistik köprüsü.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5 font-sans">Hızlı Erişim</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Ana Sayfa", to: "/" },
                { label: "Hizmetlerimiz", to: "/services" },
                { label: "Hakkımızda", to: "/about" },
                { label: "Blog", to: "/blog" },
                { label: "İletişim", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="text-white/40 hover:text-accent transition-colors flex items-center gap-2 text-sm font-sans group">
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-6 mb-3 font-sans">Popüler Rehberler</h4>
            <ul className="space-y-2">
              {[
                { label: "Rusya'ya Para Transferi", to: "/blog/turkiyeden-rusyaya-para-transferi" },
                { label: "Rusya Parsiyel Nakliye", to: "/blog/rusya-parsiyel-nakliye-325-usd" },
                { label: "Rusya E-Ticaret Rehberi", to: "/blog/rusya-e-ticaret-wildberries-ozon-ihracat" },
              ].map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="text-white/30 hover:text-accent transition-colors flex items-center gap-2 text-xs font-sans group">
                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5 font-sans">Hizmetlerimiz</h4>
            <ul className="space-y-2.5">
              {[
                "FTL Tam Dorse Nakliye",
                "Parsiyel Nakliye (LTL)",
                "Para Transferi",
                "Gümrük Danışmanlığı",
                "Konteyner Taşımacılığı",
                "İthalat / İhracat",
              ].map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-white/40 hover:text-accent transition-colors flex items-center gap-2 text-sm font-sans group cursor-pointer">
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" /> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5 font-sans">İletişim</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-accent shrink-0 mt-0.5" size={15} />
                <span className="text-white/35 text-sm leading-relaxed font-serif">
                  Melikgazi / Kayseri, Türkiye
                </span>
              </li>
              <li>
                <a href="tel:+905333803056" className="flex items-center gap-3 group">
                  <Phone className="text-accent shrink-0 group-hover:scale-110 transition-transform" size={15} />
                  <span className="text-white/35 text-sm font-sans group-hover:text-white/60 transition-colors">+90 533 380 30 56</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@chapterlog.com.tr" className="flex items-center gap-3 group">
                  <Mail className="text-accent shrink-0 group-hover:scale-110 transition-transform" size={15} />
                  <span className="text-white/35 text-sm font-sans group-hover:text-white/60 transition-colors">info@chapterlog.com.tr</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/905333803056"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#25D366]/30 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/10 transition-colors font-sans"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp ile Yazın
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs font-sans">
            © 2026 ChapterLOG LLC · Tüm hakları saklıdır · Kayseri, Türkiye
          </p>
          <div className="flex gap-5 text-xs text-white/20 font-sans">
            <a href="#" className="hover:text-white/45 transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white/45 transition-colors">Gizlilik Politikası</a>
            <span>MASAK Uyumlu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
