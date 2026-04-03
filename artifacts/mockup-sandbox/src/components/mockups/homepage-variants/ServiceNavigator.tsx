import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  CircleDollarSign,
  FileText,
  ChevronRight,
  Globe,
  Ship,
  ShoppingCart,
  Briefcase,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  ArrowRightLeft
} from 'lucide-react';

const mainServices = [
  {
    id: 'ftl',
    title: 'FTL Tam Dorse Nakliye',
    subtitle: 'm³ bazlı fiyat · 7-14 gün',
    icon: Truck,
    description: 'Türkiye ve Rusya arasında komple tır (FTL) taşımacılığı. Yüksek hacimli gönderileriniz için kapıdan kapıya, güvenli ve hızlı teslimat garantisi.',
    specs: [
      { label: 'Süre', value: '7-14 Gün' },
      { label: 'Fiyatlandırma', value: 'Hacim (m³) Bazlı' },
      { label: 'Sigorta', value: 'Tam Kapsamlı CMR' }
    ]
  },
  {
    id: 'ltl',
    title: 'Parsiyel Yük (LTL)',
    subtitle: '325 USD/m³\'den · CMR Sigortalı',
    icon: Package,
    description: 'Küçük ve orta ölçekli gönderileriniz için ekonomik parsiyel taşımacılık. Düzenli çıkışlarla Rusya\'nın tüm bölgelerine teslimat.',
    specs: [
      { label: 'Süre', value: '10-16 Gün' },
      { label: 'Fiyat', value: '325 USD/m³\'den başlar' },
      { label: 'Min. Yük', value: '1 Palet' }
    ]
  },
  {
    id: 'transfer',
    title: 'Para Transferi',
    subtitle: '%3.5 komisyon · En geç 5 iş günü',
    icon: CircleDollarSign,
    description: 'Rusya ile ticarette güvenli finansal çözüm. Ambargo ve yaptırımlara takılmadan, yasal altyapı ile hızlı para transferi.',
    specs: [
      { label: 'Süre', value: '3-5 İş Günü' },
      { label: 'Komisyon', value: '%3.5 Sabit' },
      { label: 'Para Birimi', value: 'RUB, USD, EUR, TRY' }
    ]
  },
  {
    id: 'customs',
    title: 'Gümrük Danışmanlığı',
    subtitle: 'EAC/GOST-R · Sıfır gecikme',
    icon: FileText,
    description: 'Karmaşık Rusya gümrük mevzuatında uzman rehberlik. Sertifikasyon, beyanname ve sınır geçiş işlemlerinde uçtan uca yönetim.',
    specs: [
      { label: 'Sertifikasyon', value: 'EAC, GOST-R, TR CU' },
      { label: 'Kapsam', value: 'İthalat & İhracat' },
      { label: 'Hız', value: 'Öncelikli İşlem' }
    ]
  }
];

const secondaryServices = [
  { title: 'Transit Ticaret', icon: ArrowRightLeft, price: 'Özel Fiyatlandırma' },
  { title: 'FCL Konteyner', icon: Ship, price: 'Rotaya Göre Değişir' },
  { title: 'İhracat Satın Alım', icon: ShoppingCart, price: 'Proje Bazlı' },
  { title: 'AB İthalat', icon: Globe, price: 'Tüm Avrupa' },
  { title: 'Dış Ticaret Danışmanlığı', icon: Briefcase, price: 'Aylık Anlaşma' }
];

const routes = [
  { label: 'TR → RU', active: true },
  { label: 'RU → TR', active: false },
  { label: 'EU → TR', active: false },
  { label: 'Transit', active: false }
];

const TrustStrip = () => (
  <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-6 bg-[#1a1919] border border-white/[0.08] rounded-lg text-sm text-neutral-400">
    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#fb5b2d]" /> <span>15+ Yıl Deneyim</span></div>
    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#fb5b2d]" /> <span>2.500+ Sevkiyat</span></div>
    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#fb5b2d]" /> <span>300+ Aktif Müşteri</span></div>
    <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#fb5b2d]" /> <span>%98.4 Başarı Oranı</span></div>
  </div>
);

export default function ServiceNavigator() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<string>('TR → RU');

  return (
    <div className="min-h-screen bg-[#131313] text-neutral-200 font-sans selection:bg-[#fb5b2d]/30 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-white/[0.08] bg-[#131313]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-bold tracking-tight text-white">ChapterLOG</span>
            <span className="text-sm text-neutral-500 hidden sm:inline-block">— Türkiye-Rusya Lojistik Çözümleri</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <button className="text-neutral-400 hover:text-white transition-colors">Giriş Yap</button>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-neutral-200 transition-colors">
              Hesap Oluştur
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Core Selector Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white tracking-tight">Ne gönderiyorsunuz?</h1>
            <p className="text-neutral-400 text-sm">İhtiyacınız olan hizmeti seçin ve güncel operasyon şartlarını görüntüleyin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mainServices.map((service) => {
              const isSelected = selectedService === service.id;
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(isSelected ? null : service.id)}
                  className={`text-left p-6 rounded-xl border transition-all duration-200 group ${
                    isSelected 
                      ? 'bg-[#fb5b2d]/[0.06] border-[#fb5b2d]' 
                      : 'bg-[#1a1919] border-white/[0.08] hover:border-neutral-600'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-4 ${isSelected ? 'text-[#fb5b2d]' : 'text-neutral-400 group-hover:text-white'} transition-colors`} />
                  <h3 className={`font-medium mb-1 ${isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs ${isSelected ? 'text-[#fb5b2d]/80' : 'text-neutral-500'}`}>
                    {service.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Expanded Detail Panel */}
          {selectedService && (
            <div className="bg-[#1a1919] border border-white/[0.08] rounded-xl p-8 animate-in fade-in slide-in-from-top-4 duration-300">
              {mainServices.filter(s => s.id === selectedService).map(service => (
                <div key={`detail-${service.id}`} className="grid md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-white mb-2">{service.title} Detayları</h2>
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      {service.specs.map((spec, i) => (
                        <div key={i} className="bg-[#131313] border border-white/[0.05] rounded p-3 min-w[120px]">
                          <div className="text-xs text-neutral-500 mb-1">{spec.label}</div>
                          <div className="text-sm font-medium text-neutral-200">{spec.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-[#131313] p-6 rounded-lg border border-white/[0.05] flex flex-col justify-center h-full space-y-4">
                    <div className="space-y-1">
                      <div className="text-xs text-neutral-500">Operasyon Durumu</div>
                      <div className="flex items-center gap-2 text-sm text-[#fb5b2d] font-medium">
                        <Activity className="w-4 h-4" />
                        <span>Aktif, rezervasyon alınabilir</span>
                      </div>
                    </div>
                    <button className="w-full bg-[#fb5b2d] hover:bg-[#fb5b2d]/90 text-white font-medium py-3 px-4 rounded transition-colors flex items-center justify-between group">
                      <span>Bu Hizmet İçin Teklif Al</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Route Selector */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">Güzergah Seçin</h2>
          <div className="flex flex-wrap gap-2">
            {routes.map((route) => (
              <button
                key={route.label}
                onClick={() => setActiveRoute(route.label)}
                className={`px-6 py-2 rounded border text-sm font-medium transition-colors ${
                  activeRoute === route.label
                    ? 'bg-neutral-800 border-neutral-600 text-white'
                    : 'bg-[#1a1919] border-white/[0.08] text-neutral-400 hover:border-neutral-600'
                }`}
              >
                {route.label}
              </button>
            ))}
          </div>
        </section>

        <TrustStrip />

        {/* Secondary Services */}
        <section className="space-y-6 pt-6">
          <h2 className="text-xl font-semibold text-white tracking-tight">Diğer Operasyonlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {secondaryServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="flex items-center justify-between p-4 bg-[#1a1919] border border-white/[0.08] rounded-lg hover:border-neutral-600 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#131313] rounded text-neutral-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-neutral-200 group-hover:text-white">{service.title}</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 bg-[#131313] px-2 py-1 rounded">
                    {service.price}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* About Micro-section */}
        <section className="pt-8 border-t border-white/[0.08]">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-lg font-semibold text-white">ChapterLOG Hakkında</h2>
            <div className="space-y-4 text-sm text-neutral-400 leading-relaxed">
              <p>
                ChapterLOG, Türkiye ve Rusya arasındaki karmaşık ticaret ağında şeffaf, ölçülebilir ve garantili lojistik altyapısı sunar. Operasyonlarımız, değişen gümrük regülasyonlarına ve uluslararası ticaret kurallarına tam uyumlu olarak yürütülmektedir.
              </p>
              <p>
                Geleneksel lojistik yaklaşımlarını terk ederek, müşterilerimize bir B2B platform mantığında hizmet veriyoruz. Amacımız sadece yük taşımak değil; uçtan uca ticaretin veri odaklı ve öngörülebilir şekilde yönetilmesini sağlamaktır.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#1a1919] mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} ChapterLOG Lojistik A.Ş. Tüm hakları saklıdır.
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-400">
            <a href="#" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
