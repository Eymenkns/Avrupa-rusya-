import React, { useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export function InlineMadLibs() {
  const [formData, setFormData] = useState({
    name: '',
    service: 'FTL Tam Dorse',
    route: '',
    cargo: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mesajınız başarıyla gönderildi!');
  };

  // Base input classes
  const inputClass = "inline-block border-0 border-b-2 border-orange-400 bg-transparent focus:outline-none focus:border-orange-600 text-orange-600 font-semibold placeholder:text-gray-400 px-1 mx-1 transition-colors";

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans text-slate-900 selection:bg-orange-200">
      {/* Navbar */}
      <nav className="p-6 md:px-12">
        <div className="font-bold text-xl tracking-tight">
          <span className="text-slate-900">Chapter</span>
          <span className="text-orange-500">LOG</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 py-20 md:py-28 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
          Bir mesaj bırakın
        </h1>
        <p className="text-muted-foreground text-lg mb-16 text-center">
          Formu doldurun ya da bize doğrudan yazın.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <div className="max-w-2xl mx-auto text-xl leading-[2.5] text-slate-700 text-left">
            Merhaba, benim adım{' '}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız"
              className={inputClass}
              style={{ width: '120px' }}
              required
            />
            {' '}şirketi adına sizinle iletişime geçiyorum.{' '}
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`${inputClass} appearance-none cursor-pointer pr-4`}
              style={{ 
                width: '180px',
                backgroundImage: 'linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)', 
                backgroundPosition: 'calc(100% - 6px) calc(1em + 2px), calc(100% - 1px) calc(1em + 2px)', 
                backgroundSize: '5px 5px, 5px 5px', 
                backgroundRepeat: 'no-repeat' 
              }}
            >
              <option value="FTL Tam Dorse">FTL Tam Dorse</option>
              <option value="Parsiyel (LTL)">Parsiyel (LTL)</option>
              <option value="Konteyner (FCL)">Konteyner (FCL)</option>
              <option value="Gümrük Danışmanlığı">Gümrük Danışmanlığı</option>
              <option value="Para Transferi">Para Transferi</option>
              <option value="Diğer">Diğer</option>
            </select>
            {' '}hizmeti almak istiyorum. Güzergahım{' '}
            <input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleChange}
              placeholder="Rota"
              className={inputClass}
              style={{ width: '160px' }}
              required
            />
            {' '}ve yük yaklaşık{' '}
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              placeholder="0"
              className={`text-center ${inputClass}`}
              style={{ width: '60px' }}
            />
            {' '}ton / m³.{' '}
            <br className="hidden md:block" />
            Bana{' '}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-posta adresiniz"
              className={inputClass}
              style={{ width: '200px' }}
              required
            />
            {' '}adresinden veya{' '}
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Telefon"
              className={inputClass}
              style={{ width: '140px' }}
            />
            {' '}numarasından ulaşabilirsiniz.{' '}
            <br className="hidden md:block" />
            Ek not:{' '}
            <input
              type="text"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Belirtmek istedikleriniz..."
              className={inputClass}
              style={{ width: '280px' }}
            />
          </div>

          <button
            type="submit"
            className="mt-16 bg-slate-900 hover:bg-slate-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
          >
            Gönder
          </button>
        </form>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>İstanbul, Türkiye</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+90 (555) 123 45 67</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>hello@chapterlog.com</span>
          </div>
        </div>
      </main>
    </div>
  );
}
