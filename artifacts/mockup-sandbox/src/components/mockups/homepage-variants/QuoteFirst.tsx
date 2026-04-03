import React, { useState } from 'react';
import { 
  ArrowRight, 
  Package, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  Truck,
  Building2,
  Banknotes,
  ShieldCheck,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail
} from 'lucide-react';

const QuoteFirst = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    route: '',
    weight: '1000',
    email: ''
  });

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Quote requested!');
  };

  return (
    <div className="min-h-screen bg-[#131313] text-white font-sans selection:bg-[#fb5b2d]/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#131313]/80 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#fb5b2d] flex items-center justify-center font-bold text-white tracking-tighter">
              C
            </div>
            <span className="font-bold text-xl tracking-tight">ChapterLOG</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#" className="hover:text-white transition-colors">Hizmetlerimiz</a>
            <a href="#" className="hover:text-white transition-colors">Kurumsal</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
          <button className="bg-[#fb5b2d] hover:bg-[#e04a1f] text-white px-6 py-2.5 text-sm font-semibold transition-colors">
            Get a Quote
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 min-h-[90vh] flex items-center justify-center">
        {/* Backgrounds */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img 
            src="/__mockup/images/tir-truck-transport.jpg" 
            alt="Truck" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-[#131313]/40" />
        </div>
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url(/__mockup/images/hero-bg.png)', backgroundSize: 'cover' }} />

        {/* Hero Content - The Form Card */}
        <div className="relative z-10 w-full max-w-xl mx-auto px-6">
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] p-8 shadow-2xl">
            <h1 className="text-3xl font-serif mb-8 text-center tracking-tight">Yükünüzü Rusya'ya Taşı</h1>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/[0.1] -z-10" />
              {[1, 2, 3, 4].map(num => (
                <div 
                  key={num} 
                  className={`w-8 h-8 rounded-none flex items-center justify-center text-sm font-bold transition-colors ${
                    step >= num ? 'bg-[#fb5b2d] text-white' : 'bg-[#222] text-white/40 border border-white/10'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 min-h-[220px]">
              {/* Step 1: Service */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="block text-sm font-medium text-white/60 mb-4">Hizmet Türü Seçin</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'ftl', label: 'Komple Taşımacılık (FTL)' },
                      { id: 'ltl', label: 'Parsiyel Taşımacılık (LTL)' },
                      { id: 'money', label: 'Para Transferi' },
                      { id: 'customs', label: 'Gümrükleme' }
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, service: s.id })}
                        className={`p-4 text-left border transition-all ${
                          formData.service === s.id 
                            ? 'border-[#fb5b2d] bg-[#fb5b2d]/10 text-white' 
                            : 'border-white/[0.1] hover:border-white/[0.3] text-white/70'
                        }`}
                      >
                        <span className="text-sm font-medium block">{s.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Route */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="block text-sm font-medium text-white/60 mb-4">Rota Seçin</label>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'tr-ru', label: '🇹🇷 Türkiye → 🇷🇺 Rusya' },
                      { id: 'eu-tr-ru', label: '🇪🇺 Avrupa → 🇹🇷 Türkiye → 🇷🇺 Rusya' }
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, route: r.id })}
                        className={`p-5 flex items-center justify-between border transition-all ${
                          formData.route === r.id 
                            ? 'border-[#fb5b2d] bg-[#fb5b2d]/10 text-white' 
                            : 'border-white/[0.1] hover:border-white/[0.3] text-white/70'
                        }`}
                      >
                        <span className="font-medium text-lg">{r.label}</span>
                        {formData.route === r.id && <CheckCircle2 className="w-5 h-5 text-[#fb5b2d]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Weight */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="block text-sm font-medium text-white/60 mb-4">Yaklaşık Yük Ağırlığı (kg)</label>
                  <div className="bg-black/30 p-6 border border-white/[0.05]">
                    <div className="text-3xl font-serif text-center mb-6">{formData.weight} kg</div>
                    <input 
                      type="range" 
                      min="100" 
                      max="24000" 
                      step="100"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full h-1 bg-white/20 rounded-none appearance-none cursor-pointer accent-[#fb5b2d]"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-3 font-medium">
                      <span>100 kg</span>
                      <span>24.000 kg (Full)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact */}
              {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="block text-sm font-medium text-white/60 mb-4">İletişim Bilgileri</label>
                  <div className="space-y-4">
                    <div>
                      <input 
                        type="email" 
                        placeholder="E-posta Adresiniz" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-white/[0.1] px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#fb5b2d] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        placeholder="Telefon Numaranız" 
                        className="w-full bg-black/40 border border-white/[0.1] px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#fb5b2d] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center gap-3 pt-4 mt-6 border-t border-white/[0.08]">
                {step > 1 && (
                  <button 
                    type="button" 
                    onClick={handlePrev}
                    className="px-6 py-4 bg-transparent border border-white/[0.2] hover:bg-white/5 text-sm font-bold transition-colors"
                  >
                    Geri
                  </button>
                )}
                {step < 4 ? (
                  <button 
                    type="button" 
                    onClick={handleNext}
                    className="flex-1 px-6 py-4 bg-[#fb5b2d] hover:bg-[#e04a1f] text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Devam Et <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="flex-1 px-6 py-4 bg-[#fb5b2d] hover:bg-[#e04a1f] text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Teklif Al <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
            
            <div className="mt-6 text-center text-xs text-white/35 flex items-center justify-center gap-2">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ortalama 4 saat içinde yanıt</span>
              <span>·</span>
              <span>15 yıllık tecrübe</span>
              <span>·</span>
              <span>CMR Sigortalı</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-white/[0.08] bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            <div className="p-4">
              <div className="text-4xl font-serif text-[#fb5b2d] mb-2">15+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest font-semibold">Yıllık Tecrübe</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-serif text-[#fb5b2d] mb-2">2.500+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest font-semibold">Başarılı Sevkiyat</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-serif text-[#fb5b2d] mb-2">300+</div>
              <div className="text-sm text-white/60 uppercase tracking-widest font-semibold">Aktif Müşteri</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-serif mb-4">Lojistik Çözümlerimiz</h2>
          <p className="text-white/60 text-lg max-w-2xl">Türkiye ve Rusya hattında, ticaretinizi kesintisiz sürdürmeniz için uçtan uca hizmet sunuyoruz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FTL */}
          <div className="bg-white/[0.04] border border-white/[0.08] p-8 hover:bg-white/[0.06] transition-colors group">
            <Truck className="w-12 h-12 text-[#fb5b2d] mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-serif mb-3">Komple Taşımacılık (FTL)</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Tenteli, frigo ve mega araçlarımızla Türkiye'den Rusya'ya direkt ve aktarmalı komple tır taşımacılığı. GPS ile anlık takip.
            </p>
            <a href="#" className="inline-flex items-center text-sm font-bold text-white group-hover:text-[#fb5b2d] transition-colors">
              Detaylı Bilgi <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* LTL */}
          <div className="bg-white/[0.04] border border-white/[0.08] p-8 hover:bg-white/[0.06] transition-colors group">
            <Package className="w-12 h-12 text-[#fb5b2d] mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-serif mb-3">Parsiyel Taşımacılık (LTL)</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Haftalık düzenli çıkışlarla, küçük hacimli yükleriniz için ekonomik çözümler. Güvenli depolama ve dağıtım ağı.
            </p>
            <div className="inline-flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 mb-6 text-sm">
              <span className="text-white/60">Başlayan fiyatlar:</span>
              <span className="font-bold text-[#fb5b2d]">325 USD / m³</span>
            </div>
            <br/>
            <a href="#" className="inline-flex items-center text-sm font-bold text-white group-hover:text-[#fb5b2d] transition-colors">
              Teklif İste <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Money Transfer */}
          <div className="bg-white/[0.04] border border-white/[0.08] p-8 hover:bg-white/[0.06] transition-colors group">
            <Banknotes className="w-12 h-12 text-[#fb5b2d] mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-serif mb-3">Para Transferi</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Rusya ile ticari işlemlerinizde güvenli, hızlı ve yasal para transferi altyapısı. Kurumsal firmalara özel çözümler.
            </p>
            <div className="inline-flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 mb-6 text-sm">
              <span className="text-white/60">Komisyon:</span>
              <span className="font-bold text-[#fb5b2d]">%3.5'ten başlayan</span>
            </div>
            <br/>
            <a href="#" className="inline-flex items-center text-sm font-bold text-white group-hover:text-[#fb5b2d] transition-colors">
              Sistemi İncele <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* Customs */}
          <div className="bg-white/[0.04] border border-white/[0.08] p-8 hover:bg-white/[0.06] transition-colors group">
            <ShieldCheck className="w-12 h-12 text-[#fb5b2d] mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-serif mb-3">Gümrükleme Hizmetleri</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Türkiye çıkış ve Rusya varış gümrüklerinde profesyonel danışmanlık. Belge kontrolü, vergi hesaplama ve süreç yönetimi.
            </p>
            <a href="#" className="inline-flex items-center text-sm font-bold text-white group-hover:text-[#fb5b2d] transition-colors">
              Mevzuat Bilgisi <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#fb5b2d] flex items-center justify-center font-bold text-white tracking-tighter">
                  C
                </div>
                <span className="font-bold text-xl tracking-tight text-white">ChapterLOG</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Türkiye - Rusya hattında güvenilir, hızlı ve şeffaf lojistik partneriniz.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Hizmetler</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-[#fb5b2d] transition-colors">FTL Taşımacılık</a></li>
                <li><a href="#" className="hover:text-[#fb5b2d] transition-colors">LTL Parsiyel</a></li>
                <li><a href="#" className="hover:text-[#fb5b2d] transition-colors">Para Transferi</a></li>
                <li><a href="#" className="hover:text-[#fb5b2d] transition-colors">Gümrükleme</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Kurumsal</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sertifikalar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kariyer</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">İletişim</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#fb5b2d] shrink-0" />
                  <span>Merkez Mah. Lojistik Cad. No:12<br/>Şişli, İstanbul</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#fb5b2d] shrink-0" />
                  <a href="mailto:info@chapterlog.com" className="hover:text-white transition-colors">info@chapterlog.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} ChapterLOG Lojistik A.Ş. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a>
              <a href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QuoteFirst;