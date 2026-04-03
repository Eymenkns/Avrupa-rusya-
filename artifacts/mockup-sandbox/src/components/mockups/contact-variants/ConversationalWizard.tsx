import React, { useState } from 'react';
import { Truck, Package, Box, FileText, Banknote, HelpCircle, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';

type ServiceType = 'FTL' | 'LTL' | 'FCL' | 'Customs' | 'Money' | 'Other';

interface FormData {
  service: ServiceType | null;
  origin: string;
  destination: string;
  weight: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const services = [
  { id: 'FTL' as ServiceType, label: 'Tam Kamyon (FTL)', icon: Truck },
  { id: 'LTL' as ServiceType, label: 'Parsiyel Yük (LTL)', icon: Package },
  { id: 'FCL' as ServiceType, label: 'Konteyner (FCL)', icon: Box },
  { id: 'Customs' as ServiceType, label: 'Gümrük & Danışmanlık', icon: FileText },
  { id: 'Money' as ServiceType, label: 'Para Transferi', icon: Banknote },
  { id: 'Other' as ServiceType, label: 'Diğer', icon: HelpCircle },
];

export function ConversationalWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    service: null,
    origin: '',
    destination: '',
    weight: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceSelect = (id: ServiceType) => {
    setFormData((prev) => ({ ...prev, service: id }));
    setTimeout(() => setStep(2), 300);
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! (Mockup)');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="text-xl tracking-tight font-bold">
          Chapter<span className="text-orange-500">LOG</span>
        </div>
        <div className="text-sm font-medium text-muted-foreground tracking-widest">
          0{step} / 04
        </div>
      </header>

      {/* Progress Dots */}
      <div className="flex justify-center gap-3 pt-4 pb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === step
                ? 'bg-orange-500 scale-125'
                : i < step
                ? 'bg-orange-500/50'
                : 'bg-zinc-200 border border-zinc-300'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-6 w-full">
        <div className="max-w-2xl w-full mx-auto pb-16">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Service */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    What do you need?
                  </h1>
                  <p className="text-lg text-muted-foreground">Select a service to get started.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleServiceSelect(s.id)}
                      className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all duration-200 ${
                        formData.service === s.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm scale-[1.02]'
                          : 'border-zinc-200 bg-white hover:border-orange-300 hover:bg-orange-50/50 text-zinc-700'
                      }`}
                    >
                      <s.icon className={`w-8 h-8 mb-4 ${formData.service === s.id ? 'text-orange-500' : 'text-zinc-500'}`} />
                      <span className="font-semibold text-center">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Route & Cargo */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Güzergah ve yük detayları
                  </h1>
                  <p className="text-lg text-muted-foreground">Where is your cargo going?</p>
                </div>

                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2 text-zinc-700">
                        <MapPin className="w-4 h-4 text-orange-500" /> Nereden
                      </label>
                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) => updateForm('origin', e.target.value)}
                        placeholder="Örn: İstanbul, TR"
                        className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2 text-zinc-700">
                        <MapPin className="w-4 h-4 text-orange-500" /> Nereye
                      </label>
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) => updateForm('destination', e.target.value)}
                        placeholder="Örn: Berlin, DE"
                        className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-lg"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Yaklaşık ağırlık veya hacim (ton / m³)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => updateForm('weight', e.target.value)}
                      placeholder="Örn: 15"
                      className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-lg"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-muted-foreground hover:text-zinc-900 underline underline-offset-4 flex items-center gap-1 px-4 py-2 font-medium transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Geri
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.origin || !formData.destination}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-8 py-3.5 font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Devam <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Identity */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Sizi tanıyalım
                  </h1>
                  <p className="text-lg text-muted-foreground">How can we contact you with the quote?</p>
                </div>

                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Ad Soyad veya Firma</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Ad Soyad veya Firma"
                      className="w-full p-5 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-xl placeholder:text-zinc-400"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">E-posta</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        placeholder="ornek@firma.com"
                        className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-lg"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-700">Telefon</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        placeholder="+90 555 000 0000"
                        className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-muted-foreground hover:text-zinc-900 underline underline-offset-4 flex items-center gap-1 px-4 py-2 font-medium transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Geri
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl px-8 py-3.5 font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Devam <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Son bir not */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Son bir not
                  </h1>
                  <p className="text-lg text-muted-foreground">Almost done. Any special requirements?</p>
                </div>

                <div className="space-y-8 max-w-xl mx-auto">
                  
                  {/* Summary Card */}
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-orange-500" />
                      Özet
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between border-b border-zinc-200 pb-2">
                        <span className="text-zinc-500">Hizmet</span>
                        <span className="font-medium text-zinc-900">{services.find(s => s.id === formData.service)?.label}</span>
                      </div>
                      <div className="flex justify-between border-b border-zinc-200 pb-2">
                        <span className="text-zinc-500">Güzergah</span>
                        <span className="font-medium text-zinc-900">{formData.origin} &rarr; {formData.destination}</span>
                      </div>
                      {formData.weight && (
                        <div className="flex justify-between border-b border-zinc-200 pb-2">
                          <span className="text-zinc-500">Ağırlık/Hacim</span>
                          <span className="font-medium text-zinc-900">{formData.weight}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-zinc-500">İletişim</span>
                        <span className="font-medium text-zinc-900 text-right">{formData.name}<br/><span className="text-xs text-zinc-500">{formData.email}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Ek Notlar (İsteğe bağlı)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => updateForm('notes', e.target.value)}
                      placeholder="Yükün cinsi, taşıma koşulları veya diğer özel isteklerinizi belirtebilirsiniz..."
                      rows={4}
                      className="w-full p-4 rounded-xl border border-zinc-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-lg resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row-reverse items-center justify-between gap-4 pt-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-10 py-4 font-semibold text-lg transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                    >
                      Teklif Talep Et
                    </button>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-muted-foreground hover:text-zinc-900 underline underline-offset-4 flex items-center gap-1 px-4 py-2 font-medium transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Geri
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
