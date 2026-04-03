import { useState } from "react";
import { Shield, CheckCircle2, ArrowRight, Phone, Mail, MapPin, Star, Clock, Package, Truck, Scale } from "lucide-react";

const PROOF = [
  { icon: <Clock className="w-5 h-5" />, claim: "15+ Yıllık Operasyon Tecrübesi", detail: "Bedir Uluslararası Nakliyat bünyesinde başladı" },
  { icon: <CheckCircle2 className="w-5 h-5" />, claim: "2.500+ Başarılı Sevkiyat", detail: "%98.4 başarı oranı, belgeli" },
  { icon: <Shield className="w-5 h-5" />, claim: "500.000 € CMR Sigortası", detail: "Araç başına tam güvence" },
  { icon: <Scale className="w-5 h-5" />, claim: "%3.5 Sabit Komisyon", detail: "Para transferinde şeffaf fiyat" },
];

const STEPS = [
  { num: "01", label: "Teklif Al", desc: "Yükünüzü tanımlayın — 4 saat içinde yanıt" },
  { num: "02", label: "Yükleme", desc: "Kayseri OSB'den alım veya kendi deponuzdan" },
  { num: "03", label: "Transit", desc: "CMR sigortalı araçla Rusya'ya güvenli transit" },
  { num: "04", label: "Teslimat", desc: "Moskova veya belirlenen adrese teslimat" },
];

const BADGES = [
  "5411 Bankacılık Kanunu",
  "6493 Ödeme Hizmetleri",
  "MASAK Uyumu",
  "CMR Sigorta",
];

const SERVICES = [
  { icon: <Truck className="w-4 h-4" />, name: "FTL Tam Dorse Nakliye", price: "m³ bazlı" },
  { icon: <Package className="w-4 h-4" />, name: "Parsiyel Yük (LTL)", price: "325 USD/m³'den" },
  { icon: <Scale className="w-4 h-4" />, name: "Para Transferi", price: "%3.5 komisyon" },
  { icon: <Shield className="w-4 h-4" />, name: "Gümrük Danışmanlığı", price: "Bilgi isteyiniz" },
];

export function TrustFirst() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#131313] font-sans text-white">
      {/* Legal compliance strip */}
      <div className="bg-emerald-950/50 border-b border-emerald-800/30 py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 justify-center">
          <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <p className="text-emerald-300 text-xs text-center">
            Türkiye, AB ve ABD yaptırım rejimlerine taraf değildir — Tüm operasyonlar Türk mevzuatı çerçevesinde tamamen yasal
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="border-b border-white/[0.07] bg-[#131313]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg tracking-tight">
              Chapter<span className="text-[#fb5b2d]">LOG</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Hizmetler</a>
            <a href="#" className="hover:text-white transition-colors">Hakkımızda</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
          <button className="bg-[#fb5b2d] text-white text-sm font-bold px-4 py-2 hover:bg-[#e04e24] transition-colors">
            Teklif Al
          </button>
        </div>
      </nav>

      {/* Hero — Proof Wall */}
      <section className="pt-16 pb-20 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Proof cards */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-6 h-px bg-emerald-500" />
              <span className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">Doğrulanmış Veriler</span>
            </div>
            <div className="space-y-3">
              {PROOF.map((p, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-white/[0.07] p-5 flex items-start gap-4 hover:border-emerald-800/40 transition-colors group">
                  <div className="text-emerald-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{p.claim}</div>
                    <div className="text-white/40 text-xs font-serif">{p.detail}</div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500/60 ml-auto shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Headline + CTA */}
          <div className="lg:pt-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] mb-6 text-white">
              Güvenle<br />
              <span className="text-[#fb5b2d]">Çalışıyoruz.</span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-4 font-serif">
              Kayseri merkezli ChapterLOG, Türkiye-Rusya hattında on yılı aşkın süredir faaliyet göstermektedir. Her operasyon belgelidir, her taahhüt tutulur.
            </p>
            <p className="text-white/35 text-sm leading-relaxed mb-10 font-serif">
              Rusya nakliyesi, para transferi ve gümrük danışmanlığı — tek sözleşmeyle. Sürpriz maliyet yok, gizli ücret yok.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <button className="bg-[#fb5b2d] text-white font-bold px-8 py-4 hover:bg-[#e04e24] transition-colors text-sm flex items-center gap-2 justify-center">
                Teklif Al <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border border-white/15 text-white/70 font-semibold px-8 py-4 hover:border-white/30 hover:text-white transition-colors text-sm">
                Hizmetlerimizi İncele
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-px bg-white/[0.06]">
              {[
                { num: "15+", label: "Yıllık Tecrübe" },
                { num: "2.500+", label: "Sevkiyat" },
                { num: "300+", label: "Müşteri" },
              ].map((s) => (
                <div key={s.label} className="bg-[#131313] py-5 text-center">
                  <div className="text-2xl font-bold text-[#fb5b2d] mb-1">{s.num}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-6 h-px bg-[#fb5b2d]" />
            <span className="text-[#fb5b2d] text-xs font-semibold tracking-[0.2em] uppercase">Hizmetler</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-white/[0.07] p-5 hover:border-white/20 transition-colors cursor-pointer group">
                <div className="text-white/40 mb-4 group-hover:text-[#fb5b2d] transition-colors">{s.icon}</div>
                <div className="text-white text-sm font-semibold mb-2 leading-snug">{s.name}</div>
                <div className="text-[#fb5b2d] text-xs font-mono">{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-[#0f0f0f] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-12">
            <span className="w-6 h-px bg-[#fb5b2d]" />
            <span className="text-[#fb5b2d] text-xs font-semibold tracking-[0.2em] uppercase">Nasıl Çalışır</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-white/[0.08] z-0" />
                )}
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-white/[0.06] font-mono mb-3">{step.num}</div>
                  <div className="text-white font-semibold text-sm mb-2">{step.label}</div>
                  <div className="text-white/35 text-xs font-serif leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal compliance section */}
      <section className="py-16 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-emerald-500" />
                <span className="text-emerald-400 text-xs font-semibold tracking-[0.2em] uppercase">Yasal Çerçeve</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Tamamen Yasal. Tamamen Şeffaf.</h2>
              <p className="text-white/45 text-sm font-serif leading-relaxed mb-6">
                <strong className="text-white/70">Türkiye, AB ve ABD yaptırım rejimlerine taraf değildir.</strong> Türkiye-Rusya ticareti Türk mevzuatı çerçevesinde tamamen yasaldır. ChapterLOG, tüm operasyonlarını 5411 sayılı Bankacılık Kanunu ve 6493 sayılı Ödeme Hizmetleri Kanunu'na uygun biçimde yürütmektedir.
              </p>
              <p className="text-white/35 text-xs font-serif leading-relaxed">
                Para transferi hizmetlerimiz yasal finans kanalları üzerinden gerçekleştirilmekte olup tüm işlemler resmî kayıt altında tutulmaktadır.
              </p>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-3">
                {BADGES.map((badge, i) => (
                  <div key={i} className="border border-emerald-800/40 bg-emerald-950/20 p-4 flex items-center gap-3">
                    <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-300 text-xs font-semibold">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Yükünüz için teklif alın</h2>
          <p className="text-white/40 text-sm font-serif mb-8 max-w-md mx-auto">En geç 24 iş saati içinde detaylı ve bağlayıcı teklif sunuyoruz.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 bg-white/[0.05] border border-white/15 px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#fb5b2d]/50"
            />
            <button className="bg-[#fb5b2d] text-white font-bold px-6 py-3 text-sm hover:bg-[#e04e24] transition-colors whitespace-nowrap">
              Teklif Al
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="font-bold text-base mb-1">Chapter<span className="text-[#fb5b2d]">LOG</span></div>
            <div className="text-white/25 text-xs font-serif">Türkiye'den Rusya'ya güvenle.</div>
          </div>
          <div className="flex flex-col gap-1.5 text-xs text-white/30">
            <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> +90 533 380 30 56</div>
            <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> info@chapterlog.com</div>
            <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Kayseri OSB, Türkiye</div>
          </div>
          <div className="text-xs text-white/20">© 2025 ChapterLOG LLC</div>
        </div>
      </footer>
    </div>
  );
}
