import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, ChevronRight, MessageCircle } from 'lucide-react';

export function SplitMapImmersive() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    route: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Simulate submission
    alert('Talebiniz alınmıştır. En kısa sürede size dönüş yapacağız.');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-sans">
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -24;
          }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
      `}</style>

      {/* Left Panel */}
      <div className="w-full lg:w-[40%] bg-[#0f1923] text-white lg:sticky lg:top-0 lg:h-screen flex flex-col p-10 overflow-hidden relative">
        {/* Abstract subtle background element */}
        <div className="absolute top-[-10%] left-[-20%] w-[150%] h-[150%] opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        {/* Wordmark */}
        <div className="text-2xl font-bold tracking-tight z-10">
          Chapter<span className="text-[#E85D26]">LOG</span>
        </div>

        {/* SVG Route Visualization */}
        <div className="flex-1 flex flex-col items-center justify-center my-12 z-10">
          <div className="relative w-full max-w-[280px]">
            <svg viewBox="0 0 100 240" className="w-full h-[240px] overflow-visible">
              {/* Dashed line connecting pins */}
              <path 
                d="M 50 30 C 70 90, 30 150, 50 210" 
                fill="transparent" 
                stroke="#E85D26" 
                strokeWidth="2.5" 
                strokeDasharray="8 4" 
                className="animate-dash opacity-70"
              />
              
              {/* Top Pin (Türkiye / Kayseri) */}
              <circle cx="50" cy="30" r="5" fill="#E85D26" />
              <circle cx="50" cy="30" r="10" fill="#E85D26" className="opacity-20 animate-pulse" />
              <text x="70" y="25" fill="white" fontSize="14" fontWeight="bold">Türkiye 🇹🇷</text>
              <text x="70" y="42" fill="#9ca3af" fontSize="11">Kayseri</text>

              {/* Waypoints */}
              <circle cx="57" cy="85" r="3" fill="#64748b" />
              <text x="68" y="88" fill="#64748b" fontSize="9">Sarp Sınır Kapısı</text>

              <circle cx="43" cy="155" r="3" fill="#64748b" />
              <text x="10" y="158" fill="#64748b" fontSize="9" textAnchor="end">Gürbulak</text>

              {/* Bottom Pin (Rusya / Moskova) */}
              <circle cx="50" cy="210" r="5" fill="#E85D26" />
              <circle cx="50" cy="210" r="10" fill="#E85D26" className="opacity-20 animate-pulse" />
              <text x="70" y="205" fill="white" fontSize="14" fontWeight="bold">Rusya 🇷🇺</text>
              <text x="70" y="222" fill="#9ca3af" fontSize="11">Moskova</text>
            </svg>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-12 z-10">
          <div>
            <div className="text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Yıl Deneyim</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">2.5K+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Sevkiyat</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-1">300+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Güzergah</div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-4 text-sm text-gray-300 z-10 mt-auto">
          <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E85D26]/20 transition-colors">
              <Phone className="w-4 h-4 text-[#E85D26]" />
            </div>
            +90 533 380 30 56
          </div>
          <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E85D26]/20 transition-colors">
              <Mail className="w-4 h-4 text-[#E85D26]" />
            </div>
            info@chapterlog.com
          </div>
          <div className="flex items-center gap-3 group cursor-pointer hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#E85D26]/20 transition-colors">
              <Clock className="w-4 h-4 text-[#E85D26]" />
            </div>
            Pzt–Cuma: 09:00–18:00
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 bg-white lg:overflow-y-auto flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-[440px]">
          <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Teklif Alın
          </h1>
          <p className="text-gray-500 mb-10 text-lg">
            Yükünüzün detaylarını paylaşın — 24 saat içinde yanıt veririz.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Ad Soyad / Firma
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                E-posta
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26] outline-none transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1.5">
                Hizmet Türü
              </label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26] outline-none transition-all appearance-none"
                required
              >
                <option value="" disabled>Seçiniz</option>
                <option value="Karayolu Taşımacılığı">Karayolu Taşımacılığı</option>
                <option value="Denizyolu Taşımacılığı">Denizyolu Taşımacılığı</option>
                <option value="Havayolu Taşımacılığı">Havayolu Taşımacılığı</option>
                <option value="Demiryolu Taşımacılığı">Demiryolu Taşımacılığı</option>
                <option value="Parsiyel Taşımacılık">Parsiyel Taşımacılık</option>
                <option value="Gümrükleme Hizmetleri">Gümrükleme Hizmetleri</option>
              </select>
            </div>

            <div>
              <label htmlFor="route" className="block text-sm font-medium text-gray-700 mb-1.5">
                Güzergah
              </label>
              <input
                type="text"
                id="route"
                name="route"
                placeholder="Örn: Kayseri → Moskova"
                value={formData.route}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26] outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                Mesaj
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26] outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-4 bg-[#E85D26] hover:bg-[#d4521f] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm shadow-[#E85D26]/20"
            >
              <span>Teklif Talep Et</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center justify-center">
            <div className="w-12 h-[1px] bg-gray-200 mb-6"></div>
            <a 
              href="https://wa.me/905333803056" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Veya WhatsApp ile yazın: +90 533 380 30 56
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
