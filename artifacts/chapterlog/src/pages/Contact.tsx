import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Ad Soyad en az 2 karakter olmalıdır." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
  phone: z.string().min(10, { message: "Geçerli bir telefon numarası giriniz." }),
  serviceType: z.string().optional(),
  cargoDetails: z.string().optional(),
  route: z.string().optional(),
  message: z.string().min(10, { message: "Mesajınız en az 10 karakter olmalıdır." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const SERVICE_OPTIONS: Record<"tr" | "en" | "ru" | "de", string[]> = {
  tr: [
    "Lojistik Operasyon Yönetimi",
    "Türkiye–Rusya Para Transferi",
    "Parsiyel Nakliye (LTL)",
    "Transit Taşımacılık",
    "Konteyner Taşımacılığı (FCL)",
    "FTL Tam Dorse Nakliye",
    "Gümrük Danışmanlığı",
    "İthalat ve İhracat Danışmanlığı",
    "İhracat İçin Doğrudan Satın Alım",
    "Avrupa'dan Türkiye'ye İthalat",
  ],
  en: [
    "Logistics Operations Management",
    "Turkey–Russia Money Transfer",
    "Partial Cargo (LTL)",
    "Transit Freight",
    "Container Shipping (FCL)",
    "Full Truckload (FTL)",
    "Customs Consultancy",
    "Import & Export Consultancy",
    "Direct Purchasing for Export",
    "Europe-to-Turkey Import",
  ],
  ru: [
    "Управление логистическими операциями",
    "Денежный перевод Турция–Россия",
    "Сборный груз (LTL)",
    "Транзитные перевозки",
    "Контейнерная перевозка (FCL)",
    "Полная загрузка (FTL)",
    "Таможенный консалтинг",
    "Консалтинг по импорту и экспорту",
    "Прямые закупки для экспорта",
    "Импорт из Европы в Турцию",
  ],
  de: [
    "Logistik-Betriebsmanagement",
    "Geldtransfer Türkei–Russland",
    "Teilladung (LTL)",
    "Transitfracht",
    "Containerversand (FCL)",
    "Komplettladung (FTL)",
    "Zollberatung",
    "Import- & Exportberatung",
    "Direkteinkauf für den Export",
    "Import EU–Türkei",
  ],
};

const L = {
  tr: {
    breadcrumb: "İletişim", heroTitle: "Hemen Teklif Alın",
    heroSub: "Yükünüzün detaylarını paylaşın, en geç 24 saat içinde size dönelim.",
    office: "Genel Merkez", address: "Adres", phone: "Telefon", email: "E-posta",
    hours: "Çalışma Saatleri", hoursVal: "Pazartesi–Cuma: 09:00–18:00",
    whatsapp: "WhatsApp ile Yazın",
    formTitle: "Teklif Formu",
    formSub: "Mesajınızı bırakın, ekibimiz en kısa sürede dönsün.",
    nameLabel: "Ad Soyad / Firma", namePh: "Ahmet Yılmaz",
    emailLabel: "E-posta", emailPh: "ahmet@firma.com",
    phoneLabel: "Telefon",
    serviceLabel: "Hizmet Türü", servicePh: "Seçiniz…",
    volumeLabel: "Kargo Hacmi veya Ağırlığı (m³ / kg)", volumePh: "Örn: 5",
    routeLabel: "Güzergah (Nereden → Nereye)", routePh: "Örn: Kayseri → Moskova",
    msgLabel: "Mesaj / Yük Detayları",
    msgPh: "Ürün cinsi, paket adedi, özel talepler…",
    sending: "Gönderiliyor...", sendBtn: "Formu Gönder",
    privacy: "Bilgileriniz yalnızca teklif hazırlama amacıyla kullanılır.",
    toastOk: "Mesajınız Alındı!", toastOkDesc: "En geç 24 iş saati içinde size dönüş yapacağız.",
    toastFail: "Gönderim Başarısız", toastFailDesc: "Lütfen WhatsApp veya telefon ile bize ulaşın.",
  },
  en: {
    breadcrumb: "Contact", heroTitle: "Get in Touch",
    heroSub: "Share your cargo details and we'll get back to you within 24 hours.",
    office: "Our Office", address: "Address", phone: "Phone", email: "Email",
    hours: "Working Hours", hoursVal: "Mon–Fri: 09:00–18:00",
    whatsapp: "Message on WhatsApp",
    formTitle: "Request a Quote",
    formSub: "Drop us a message — our team will reply as soon as possible.",
    nameLabel: "Name / Company", namePh: "John Smith",
    emailLabel: "Email", emailPh: "john@company.com",
    phoneLabel: "Phone",
    serviceLabel: "Service Type", servicePh: "Select a service",
    volumeLabel: "Volume / Weight (m³ or kg)", volumePh: "e.g. 5",
    routeLabel: "Route (from → to)", routePh: "e.g. Istanbul → Moscow",
    msgLabel: "Details / Question",
    msgPh: "Product type, package count, special requests…",
    sending: "Sending...", sendBtn: "Send Message",
    privacy: "Your information is only used for preparing a quote.",
    toastOk: "Message received!", toastOkDesc: "We'll get back to you within 24 business hours.",
    toastFail: "Submission failed", toastFailDesc: "Please contact us via WhatsApp or phone.",
  },
  ru: {
    breadcrumb: "Контакты", heroTitle: "Свяжитесь с нами",
    heroSub: "Расскажите о вашем грузе — мы ответим в течение 24 часов.",
    office: "Наш офис", address: "Адрес", phone: "Телефон", email: "Эл. почта",
    hours: "Часы работы", hoursVal: "Пн–Пт: 09:00–18:00",
    whatsapp: "Написать в WhatsApp",
    formTitle: "Запросить предложение",
    formSub: "Оставьте сообщение — наша команда ответит как можно скорее.",
    nameLabel: "Имя / Компания", namePh: "Иванов Иван",
    emailLabel: "Эл. почта", emailPh: "ivan@firma.ru",
    phoneLabel: "Телефон",
    serviceLabel: "Тип услуги", servicePh: "Выберите услугу",
    volumeLabel: "Объём / Вес (м³ или кг)", volumePh: "Например: 5",
    routeLabel: "Маршрут (откуда → куда)", routePh: "Напр: Стамбул → Москва",
    msgLabel: "Детали / Вопрос",
    msgPh: "Тип продукта, количество упаковок, специальные требования…",
    sending: "Отправка...", sendBtn: "Отправить",
    privacy: "Ваши данные используются только для подготовки предложения.",
    toastOk: "Сообщение получено!", toastOkDesc: "Мы ответим в течение 24 рабочих часов.",
    toastFail: "Ошибка отправки", toastFailDesc: "Пожалуйста, свяжитесь с нами по WhatsApp или телефону.",
  },
  de: {
    breadcrumb: "Kontakt", heroTitle: "Kontakt aufnehmen",
    heroSub: "Teilen Sie uns Ihre Frachtdetails mit und wir melden uns innerhalb von 24 Stunden.",
    office: "Unser Büro", address: "Adresse", phone: "Telefon", email: "E-Mail",
    hours: "Öffnungszeiten", hoursVal: "Mo–Fr: 09:00–18:00",
    whatsapp: "Nachricht via WhatsApp",
    formTitle: "Angebot anfordern",
    formSub: "Senden Sie uns eine Nachricht — unser Team antwortet schnellstmöglich.",
    nameLabel: "Name / Unternehmen", namePh: "Max Mustermann",
    emailLabel: "E-Mail", emailPh: "max@firma.de",
    phoneLabel: "Telefon",
    serviceLabel: "Leistungsart", servicePh: "Leistung auswählen",
    volumeLabel: "Volumen / Gewicht (m³ oder kg)", volumePh: "z.B. 5",
    routeLabel: "Route (von → nach)", routePh: "z.B. Istanbul → Moskau",
    msgLabel: "Details / Frage",
    msgPh: "Produktart, Paketanzahl, Sonderwünsche…",
    sending: "Wird gesendet...", sendBtn: "Nachricht senden",
    privacy: "Ihre Daten werden ausschließlich zur Angebotserstellung verwendet.",
    toastOk: "Nachricht erhalten!", toastOkDesc: "Wir melden uns innerhalb von 24 Geschäftsstunden.",
    toastFail: "Senden fehlgeschlagen", toastFailDesc: "Bitte kontaktieren Sie uns per WhatsApp oder Telefon.",
  },
};

export default function Contact() {
  const { toast } = useToast();
  const { lang } = useLang();
  const l = L[lang] ?? L.tr;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      cargoDetails: "",
      route: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let json: { ok: boolean; error?: string } = { ok: false };
      try { json = await res.json(); } catch {}

      if (res.ok && json.ok) {
        toast({
          title: l.toastOk,
          description: l.toastOkDesc,
        });
        form.reset();
      } else {
        throw new Error(json.error || "Sunucu hatası");
      }
    } catch {
      toast({
        title: l.toastFail,
        description: l.toastFailDesc,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (f: keyof ContactFormValues) =>
    form.formState.errors[f]?.message;

  return (
    <main className="flex-1 w-full bg-background pt-24 pb-20">
      <SEO
        path="/contact"
        titleTr="İletişim — ChapterLOG | Rusya Lojistik Teklif Formu"
        titleEn="Contact — ChapterLOG | Russia Logistics Quote Form"
        titleRu="Контакты — ChapterLOG | Запрос на перевозку Турция–Россия"
        descTr="Türkiye-Rusya veya Avrupa-Rusya nakliyesi, ticari para transferi ya da gümrük danışmanlığı için hızlı teklif alın. +90 533 380 30 56 | info@chapterlog.com.tr"
        descEn="Get a fast quote for Turkey-Russia or Europe-Russia freight, commercial money transfers or customs consultancy. +90 533 380 30 56 | info@chapterlog.com.tr"
        descRu="Запрос на перевозку Турция–Россия или Европа–Россия, денежные переводы или таможенный консалтинг. +90 533 380 30 56 | info@chapterlog.com.tr"
        keywordsTr="ChapterLOG iletişim, nakliye teklif al, Rusya nakliye fiyat teklifi, lojistik teklif formu, Kayseri nakliye iletişim, para transferi teklif"
        keywordsEn="ChapterLOG contact, get freight quote, Russia shipping quote, logistics quote form, money transfer quote Turkey Russia"
        keywordsRu="контакты ChapterLOG, запрос на перевозку, стоимость доставки Россия, форма запроса логистики, запрос на денежный перевод"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://chapterlog.com.tr/" },
            { "@type": "ListItem", "position": 2, "name": "İletişim", "item": "https://chapterlog.com.tr/contact" },
          ],
        })}</script>
      </Helmet>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="bg-[#111010] relative overflow-hidden border-b-2 border-accent">
        <div className="absolute inset-0">
          <img src="/images/logistics-inspection.png" alt="ChapterLOG lojistik depo gümrük denetimi" className="w-full h-full object-cover opacity-10 grayscale" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60" />
        </div>
        <div className="container mx-auto px-4 md:px-6 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-accent" />
              <span className="text-accent text-sm font-semibold tracking-widest uppercase">
                {l.breadcrumb}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-5 leading-tight">
              {l.heroTitle}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
              {l.heroSub}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left — contact info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-4 space-y-6"
            >
              <div className="bg-[#1a1919] border border-white/8 p-7">
                <h3 className="font-bold text-foreground text-base mb-6 font-display uppercase tracking-widest text-xs">
                  {l.office}
                </h3>
                <ul className="space-y-5">
                  {[
                    {
                      icon: <MapPin size={18} />,
                      label: l.address,
                      value: "Melikgazi / Kayseri, Türkiye",
                    },
                    {
                      icon: <Phone size={18} />,
                      label: l.phone,
                      value: "+90 533 380 30 56",
                    },
                    {
                      icon: <Mail size={18} />,
                      label: l.email,
                      value: "info@chapterlog.com.tr",
                    },
                    {
                      icon: <Clock size={18} />,
                      label: l.hours,
                      value: l.hoursVal,
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 shrink-0 bg-white/5 border border-white/8 flex items-center justify-center text-accent mt-0.5">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">{item.label}</div>
                        <div className="text-sm text-foreground leading-relaxed">{item.value}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp quick-action */}
              <a
                href="https://wa.me/905333803056"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-5 hover:bg-[#25D366]/15 transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground group-hover:text-[#128C7E] transition-colors">
                    {l.whatsapp}
                  </div>
                  <div className="text-xs text-muted-foreground">+90 533 380 30 56</div>
                </div>
                <MessageSquare size={16} className="ml-auto text-[#25D366] opacity-60" />
              </a>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="lg:col-span-8"
            >
              <div className="bg-[#1a1919] border border-white/8 p-8 md:p-10">
                <h3 className="text-2xl font-bold text-foreground mb-1 font-display">
                  {l.formTitle}
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  {l.formSub}
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">
                        {l.nameLabel}
                      </Label>
                      <Input
                        id="name"
                        placeholder={l.namePh}
                        {...form.register("name")}
                        className={fieldError("name") ? "border-destructive" : ""}
                      />
                      {fieldError("name") && <p className="text-xs text-destructive">{fieldError("name")}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        {l.emailLabel}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={l.emailPh}
                        {...form.register("email")}
                        className={fieldError("email") ? "border-destructive" : ""}
                      />
                      {fieldError("email") && <p className="text-xs text-destructive">{fieldError("email")}</p>}
                    </div>
                  </div>

                  {/* Phone + Service type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">
                        {l.phoneLabel}
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+90 555 000 00 00"
                        {...form.register("phone")}
                        className={fieldError("phone") ? "border-destructive" : ""}
                      />
                      {fieldError("phone") && <p className="text-xs text-destructive">{fieldError("phone")}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="serviceType">
                        {l.serviceLabel}
                      </Label>
                      <select
                        id="serviceType"
                        {...form.register("serviceType")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">
                          {l.servicePh}
                        </option>
                        {(SERVICE_OPTIONS[lang] ?? SERVICE_OPTIONS.en).map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Cargo details + Route */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="cargoDetails">
                        {l.volumeLabel}
                      </Label>
                      <Input
                        id="cargoDetails"
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder={l.volumePh}
                        {...form.register("cargoDetails")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="route">
                        {l.routeLabel}
                      </Label>
                      <Input
                        id="route"
                        placeholder={l.routePh}
                        {...form.register("route")}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="message">
                      {l.msgLabel}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={l.msgPh}
                      className={`min-h-[120px] ${fieldError("message") ? "border-destructive" : ""}`}
                      {...form.register("message")}
                    />
                    {fieldError("message") && <p className="text-xs text-destructive">{fieldError("message")}</p>}
                  </div>

                  <div className="pt-1">
                    <Button type="submit" variant="accent" disabled={isSubmitting} className="w-full h-12 text-base font-bold font-display">
                      {isSubmitting
                        ? l.sending
                        : (
                          <>
                            {l.sendBtn}
                            <Send className="ml-2 w-4 h-4" />
                          </>
                        )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      {l.privacy}
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
