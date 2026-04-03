import React, { useEffect, useState } from "react";
import { ArrowRight, MapPin, Truck, ShieldCheck, Package, Ship, BarChart3, Globe2, Phone, Mail } from "lucide-react";

export default function CorridorMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#fb5b2d] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#fb5b2d] flex items-center justify-center font-bold text-white">
            C
          </div>
          <span className="font-bold text-xl tracking-tight">ChapterLOG</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#services" className="hover:text-white transition-colors">Hizmetler</a>
          <a href="#corridors" className="hover:text-white transition-colors">Hatlar</a>
          <a href="#about" className="hover:text-white transition-colors">Hakkımızda</a>
        </div>
        <button className="bg-[#fb5b2d] hover:bg-[#fb5b2d]/90 text-white px-5 py-2.5 rounded-sm font-medium text-sm transition-all shadow-[0_0_15px_rgba(251,91,45,0.3)]">
          Teklif Al
        </button>
      </nav>

      {/* HERO: The Route Visualization */}
      <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-center overflow-hidden pt-20">
        {/* Background elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#fb5b2d] rounded-full blur-[150px] opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900 rounded-full blur-[150px] opacity-20"></div>
        </div>

        {/* Optional map background */}
        <div 
          className="absolute inset-0 z-0 opacity-10 bg-[url('/__mockup/images/hero-bg.png')] bg-cover bg-center bg-no-repeat grayscale mix-blend-screen"
        ></div>

        <div className="container mx-auto px-6 z-10 relative flex flex-col items-center">
          <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              Avrupa'dan Rusya'ya. <br />
              <span className="italic font-serif font-light text-white/90">Her Adımda.</span>
            </h1>
            <p className="text-xl text-white/50 font-light max-w-xl mx-auto">
              Sınırları aşan kusursuz lojistik deneyimi. Avrupa'dan Türkiye üzerinden Moskova'ya güvenli transit.
            </p>
          </div>

          {/* The Route Interface */}
          <div className="w-full max-w-6xl mx-auto relative my-16">
            
            {/* The Main Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
              {/* Animated progress line */}
              <div 
                className="absolute top-0 bottom-0 left-0 bg-[#fb5b2d] w-full"
                style={{
                  boxShadow: "0 0 15px #fb5b2d",
                  transformOrigin: "left",
                  animation: mounted ? "scaleRight 3s ease-out forwards" : "none",
                  transform: "scaleX(0)"
                }}
              ></div>
            </div>

            {/* Nodes Container */}
            <div className="relative flex justify-between items-center w-full">
              
              {/* Anchor: Europe */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="mb-4 text-xs font-mono text-[#fb5b2d] opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10">51.50° N, 10.00° E</div>
                <div className="w-12 h-12 rounded-full bg-[#1a1919] border-2 border-[#fb5b2d] flex items-center justify-center shadow-[0_0_20px_rgba(251,91,45,0.4)] relative">
                  <div className="w-4 h-4 rounded-full bg-[#fb5b2d] animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full border border-[#fb5b2d] animate-ping opacity-20"></div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold">AVRUPA 🇪🇺</h3>
                  <p className="text-sm text-white/40 font-mono mt-1">BAŞLANGIÇ</p>
                </div>
              </div>

              {/* Service Stop 1 */}
              <div className="relative z-10 flex flex-col items-center group translate-y-8">
                <div className="w-6 h-6 rounded-full bg-[#0d0d0d] border-2 border-white/30 flex items-center justify-center transition-colors group-hover:border-[#fb5b2d] shadow-[0_0_0_rgba(251,91,45,0)] group-hover:shadow-[0_0_15px_rgba(251,91,45,0.4)]">
                  <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-[#fb5b2d] transition-colors"></div>
                </div>
                <div className="mt-4 text-center absolute top-full w-32 -ml-16 left-1/2">
                  <Package className="w-5 h-5 mx-auto mb-2 text-white/40 group-hover:text-[#fb5b2d] transition-colors" />
                  <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">Yükleme</h4>
                  <p className="text-xs text-white/40">Depolama & Tasnif</p>
                </div>
              </div>

              {/* Service Stop 2 */}
              <div className="relative z-10 flex flex-col items-center group -translate-y-8">
                <div className="mb-4 text-center absolute bottom-full w-32 -ml-16 left-1/2">
                  <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-white/40 group-hover:text-[#fb5b2d] transition-colors" />
                  <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">Gümrük</h4>
                  <p className="text-xs text-white/40">Evrak & İzinler</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#0d0d0d] border-2 border-white/30 flex items-center justify-center transition-colors group-hover:border-[#fb5b2d] shadow-[0_0_0_rgba(251,91,45,0)] group-hover:shadow-[0_0_15px_rgba(251,91,45,0.4)]">
                  <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-[#fb5b2d] transition-colors"></div>
                </div>
              </div>

              {/* Service Stop 3 */}
              <div className="relative z-10 flex flex-col items-center group translate-y-8">
                <div className="w-6 h-6 rounded-full bg-[#0d0d0d] border-2 border-white/30 flex items-center justify-center transition-colors group-hover:border-[#fb5b2d] shadow-[0_0_0_rgba(251,91,45,0)] group-hover:shadow-[0_0_15px_rgba(251,91,45,0.4)]">
                  <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-[#fb5b2d] transition-colors"></div>
                </div>
                <div className="mt-4 text-center absolute top-full w-32 -ml-16 left-1/2">
                  <Truck className="w-5 h-5 mx-auto mb-2 text-white/40 group-hover:text-[#fb5b2d] transition-colors" />
                  <h4 className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">Transit</h4>
                  <p className="text-xs text-white/40">Türkiye Geçişi</p>
                </div>
              </div>

              {/* Anchor: Russia */}
              <div className="relative z-10 flex flex-col items-center group">
                <div className="mb-4 text-xs font-mono text-[#fb5b2d] opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10">55.75° N, 37.61° E</div>
                <div className="w-12 h-12 rounded-full bg-[#1a1919] border-2 border-white/20 flex items-center justify-center group-hover:border-[#fb5b2d] transition-colors group-hover:shadow-[0_0_20px_rgba(251,91,45,0.4)]">
                  <div className="w-4 h-4 rounded-full bg-white/20 group-hover:bg-[#fb5b2d] transition-colors"></div>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-2xl font-bold">MOSKOVA 🇷🇺</h3>
                  <p className="text-sm text-white/40 font-mono mt-1">DESTINATION</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-32">
            <button className="group relative px-8 py-4 bg-[#1a1919] hover:bg-[#222] border border-white/10 rounded-full overflow-hidden transition-all">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fb5b2d]/0 via-[#fb5b2d]/10 to-[#fb5b2d]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative flex items-center gap-3 font-medium">
                Yolculuğu Başlat <ArrowRight className="w-4 h-4 text-[#fb5b2d] group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* CSS for animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scaleRight {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
        `}} />
      </section>

      {/* STATS ROW */}
      <section className="border-y border-white/[0.05] bg-[#0a0a0a]">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/[0.05]">
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-[#fb5b2d] mb-2">15+</div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Yıllık Tecrübe</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-white mb-2">2.500+</div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Başarılı Sevkiyat</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-white mb-2">300+</div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Aktif Müşteri</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-white mb-2">%98.4</div>
              <div className="text-sm text-white/50 uppercase tracking-wider">Zamanında Teslimat</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:flex justify-between items-end border-b border-white/10 pb-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Uçtan Uca Çözümler</h2>
              <p className="text-white/50 max-w-xl text-lg">
                Yalnızca taşıma değil, tüm lojistik sürecinizi yönetiyoruz.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Parsiyel Taşımacılık", icon: "🚛", desc: "Küçük hacimli yükleriniz için ekonomik ve düzenli haftalık çıkışlar.", price: "$120/m³'ten başlayan" },
              { title: "Komple Taşımacılık", icon: "🚚", desc: "Büyük hacimli yükleriniz için size özel tahsis edilmiş araçlar.", price: "Özel Fiyatlandırma" },
              { title: "Gümrükleme", icon: "📑", desc: "Hem Türkiye hem Rusya'da sorunsuz, hızlı gümrük işlemleri.", price: "Sabit Ücret" },
              { title: "Depolama", icon: "🏭", desc: "Kayseri ve Moskova'da güvenli, modern depolama çözümleri.", price: "Günlük Hesaplama" }
            ].map((service, i) => (
              <div key={i} className="bg-[#1a1919] border border-white/[0.07] p-8 rounded-2xl hover:bg-[#222] transition-colors group">
                <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110 origin-left duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/40 mb-8 min-h-[60px] leading-relaxed">
                  {service.desc}
                </p>
                <div className="pt-6 border-t border-white/[0.05] flex justify-between items-center">
                  <span className="text-xs font-mono text-[#fb5b2d]">{service.price}</span>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORRIDORS */}
      <section id="corridors" className="py-32 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">Ana Hatlarımız</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* EU -> TR -> RU Card (PRIMARY) */}
            <div className="relative overflow-hidden rounded-3xl bg-[#1a1919] border border-[#fb5b2d]/30 group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fb5b2d]/10 to-transparent opacity-100 pointer-events-none"></div>
              <div className="p-12 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">🇪🇺</span>
                  <div className="h-[2px] w-10 bg-white/20"></div>
                  <span className="text-3xl">🇹🇷</span>
                  <div className="h-[2px] w-10 bg-white/20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a1919] rounded-full border border-[#fb5b2d]/50 flex items-center justify-center">
                      <ArrowRight className="w-2 h-2 text-[#fb5b2d]" />
                    </div>
                  </div>
                  <span className="text-3xl">🇷🇺</span>
                  <span className="ml-2 text-xs font-bold text-[#fb5b2d] border border-[#fb5b2d]/40 px-2 py-0.5">ANA HAT</span>
                </div>

                <h3 className="text-3xl font-bold mb-4">Avrupa → Türkiye → Rusya</h3>
                <p className="text-white/50 mb-8 max-w-sm">
                  Avrupa'dan gelen yükler Türkiye üzerinden transit geçişle Rusya'nın her noktasına ulaştırılır. TIR karnesi, UBAK izinleri ve tam gümrük desteğiyle.
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Transit Süresi</span>
                    <span className="font-mono">14-21 Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Gümrük Tipi</span>
                    <span className="font-mono">TIR / T1 Transit</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Sigorta</span>
                    <span className="font-mono text-[#fb5b2d]">500.000 € CMR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* TR -> RU Card (SECONDARY) */}
            <div className="relative overflow-hidden rounded-3xl bg-[#1a1919] border border-white/[0.07] group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fb5b2d]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-12 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-3xl">🇹🇷</span>
                  <div className="h-[2px] w-16 bg-white/20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#1a1919] rounded-full border border-white/20 flex items-center justify-center">
                      <ArrowRight className="w-2 h-2 text-[#fb5b2d]" />
                    </div>
                  </div>
                  <span className="text-3xl">🇷🇺</span>
                </div>

                <h3 className="text-3xl font-bold mb-4">Türkiye → Rusya</h3>
                <p className="text-white/50 mb-8 max-w-sm">
                  Türkiye'den doğrudan Rusya'ya FTL veya parsiyel yük. Kayseri'den Moskova'ya haftalık düzenli seferler.
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Transit Süresi</span>
                    <span className="font-mono">7-14 Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-white/60">Çıkış Sıklığı</span>
                    <span className="font-mono">Haftada 3 Gün</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#fb5b2d] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Yükünüz İçin Teklif Alın</h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
            Rotanızı, yükünüzü ve tarihleri belirtin. 24 saat içinde size en uygun lojistik çözümünü sunalım.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#fb5b2d] hover:bg-[#fb5b2d]/90 text-white px-8 py-4 rounded-sm font-bold text-lg transition-all shadow-[0_0_20px_rgba(251,91,45,0.4)]">
              Online Teklif Al
            </button>
            <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-sm font-bold text-lg transition-all">
              Bizi Arayın
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050505] pt-20 pb-10 border-t border-white/[0.05]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-[#fb5b2d] flex items-center justify-center font-bold text-white">
                  C
                </div>
                <span className="font-bold text-2xl tracking-tight">ChapterLOG</span>
              </div>
              <p className="text-white/40 max-w-sm mb-8">
                Türkiye ile Rusya arasında güvenilir, hızlı ve şeffaf lojistik köprüsü.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer">In</div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer">Fb</div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors cursor-pointer">Ig</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">İletişim</h4>
              <ul className="space-y-4 text-white/50">
                <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                  <MapPin className="w-5 h-5 shrink-0" />
                  <span>OSB Mah. 14. Cad. No: 15<br/>Melikgazi, Kayseri / Türkiye</span>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>+90 850 123 45 67</span>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>info@chapterlog.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Hızlı Bağlantılar</h4>
              <ul className="space-y-3 text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hizmetlerimiz</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Güzergahlar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog & Haberler</a></li>
                <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
            <p>© 2026 ChapterLOG Lojistik A.Ş. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
