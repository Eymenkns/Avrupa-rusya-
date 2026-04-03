import React, { useState } from 'react';
import { MapPin, Truck, Package, FileText, ArrowRight } from 'lucide-react';

export function RateEstimatorLed() {
  const [serviceType, setServiceType] = useState('FTL');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [volume, setVolume] = useState('');

  // Default display values when empty
  const displayOrigin = origin || 'Kayseri, TR';
  const displayDest = destination || 'Moskova, RU';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="absolute top-0 w-full z-10 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-1 text-2xl font-black tracking-tight">
          <span className="text-white">Chapter</span>
          <span className="text-orange-500">LOG</span>
        </div>
      </header>

      {/* Estimator Section (Dark) */}
      <section className="bg-slate-900 pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Yük Hesaplayıcı</h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Güzergah ve yük bilgilerinizi girin, taşıma profilinizi hemen görün.
            </p>
          </div>

          {/* Tool Panel */}
          <div className="bg-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/20 mb-8 border border-slate-700/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1: Taşıma Türü */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Taşıma Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  {['FTL', 'LTL', 'FCL', 'Gümrük'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setServiceType(type)}
                      className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                        serviceType === type 
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Column 2: Güzergah */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Güzergah</label>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Nereden (Örn: Kayseri)"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                    <input
                      type="text"
                      placeholder="Nereye (Örn: Moskova)"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Column 3: Yük */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">Yük (Opsiyonel)</label>
                <div className="space-y-3">
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      placeholder="Ağırlık (Ton)"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 flex items-center justify-center font-serif italic text-xs">m³</div>
                    <input
                      type="number"
                      placeholder="Hacim (m³)"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Profile Card */}
          <div className="bg-slate-700/50 backdrop-blur-xl border border-slate-600/50 rounded-2xl p-6 md:p-8 shadow-2xl shadow-orange-500/5 ring-1 ring-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Route Visualization */}
              <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-600/50 pb-8 md:pb-0 md:pr-8">
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-[20%] right-[20%] top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-500"></div>
                  
                  <div className="text-center z-10 bg-slate-800 px-3 py-2 rounded-xl border border-slate-600 shadow-lg min-w-[120px]">
                    <span className="block text-xs text-slate-400 mb-1 uppercase">Çıkış</span>
                    <span className="block font-medium text-white truncate max-w-[100px]">{displayOrigin}</span>
                  </div>

                  <div className="z-10 bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 ring-4 ring-slate-800">
                    {serviceType === 'FCL' ? <Package className="w-5 h-5 text-white" /> : <Truck className="w-5 h-5 text-white" />}
                  </div>

                  <div className="text-center z-10 bg-slate-800 px-3 py-2 rounded-xl border border-slate-600 shadow-lg min-w-[120px]">
                    <span className="block text-xs text-slate-400 mb-1 uppercase">Varış</span>
                    <span className="block font-medium text-white truncate max-w-[100px]">{displayDest}</span>
                  </div>
                </div>
              </div>

              {/* Summary Grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                <div>
                  <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Taşıma Türü</span>
                  <span className="block text-lg font-medium text-white">{serviceType} {serviceType === 'FCL' ? 'Denizyolu' : serviceType === 'Gümrük' ? 'Hizmeti' : 'Karayolu'}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Tahmini Süre</span>
                  <span className="block text-lg font-medium text-white">7–10 gün</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Mesafe</span>
                  <span className="block text-lg font-medium text-white">~2.800 km</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-400 uppercase tracking-wider mb-1">Sınır Kapısı</span>
                  <span className="block text-lg font-medium text-white">Sarp / Gürbulak</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Light) */}
      <section className="bg-white py-24 px-6 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-12 h-px bg-orange-500"></span>
              <span className="text-sm font-bold text-orange-500 tracking-widest uppercase">— HIZLI İLETİŞİM</span>
              <span className="w-12 h-px bg-orange-500"></span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4">Teklif Alın</h2>
            <p className="text-slate-600">
              Bilgilerinizi bırakın, hesaplanan profil ile birlikte size dönelim.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Ad Soyad</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="Ahmet Yılmaz"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-posta</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="ahmet@sirket.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Telefon</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="+90 (555) 000 00 00"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="block text-sm font-medium text-slate-700">Firma Adı (Opsiyonel)</label>
                <input 
                  type="text" 
                  id="company" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  placeholder="Şirket A.Ş."
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Ek Notlar</label>
              <textarea 
                id="notes" 
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                placeholder="Taşıma ile ilgili belirtmek istediğiniz diğer detaylar..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-6 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/25 group"
            >
              <span>Teklif Talep Et</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
