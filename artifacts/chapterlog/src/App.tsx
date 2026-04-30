import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { HelmetProvider, Helmet } from "react-helmet-async";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/FloatingContact";

// Pages
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const GLOBAL_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://chapterlog.com.tr/#website",
      "url": "https://chapterlog.com.tr",
      "name": "ChapterLOG",
      "description": "Türkiye-Rusya ve Avrupa-Rusya hattında nakliye, para transferi ve gümrük danışmanlığı",
      "publisher": { "@id": "https://chapterlog.com.tr/#organization" },
      "inLanguage": ["tr", "en", "ru"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://chapterlog.com.tr/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://chapterlog.com.tr/#organization",
      "name": "ChapterLOG LLC",
      "legalName": "ChapterLOG LLC",
      "url": "https://chapterlog.com.tr",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chapterlog.com.tr/favicon.png",
        "width": 512,
        "height": 512,
      },
      "image": "https://chapterlog.com.tr/opengraph.jpg",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+90-533-380-30-56",
          "contactType": "customer service",
          "email": "info@chapterlog.com.tr",
          "availableLanguage": ["Turkish", "Russian", "English"],
          "areaServed": ["TR", "RU", "DE", "PL", "FR", "NL", "BE", "IT", "AT", "CZ", "SK", "HU", "GE", "AZ"],
        },
      ],
      "foundingDate": "2015",
      "knowsAbout": [
        "International freight forwarding",
        "Turkey Russia logistics",
        "Europe Russia transit shipping",
        "Customs brokerage",
        "Commercial money transfers",
        "TIR carnet operations",
        "EAC certification",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://chapterlog.com.tr/#localbusiness",
      "name": "ChapterLOG LLC",
      "description": "Türkiye-Rusya ve Avrupa-Rusya hattında FTL nakliye, parsiyel yük, gümrük danışmanlığı ve ticari para transferi hizmetleri.",
      "url": "https://chapterlog.com.tr",
      "telephone": "+90-533-380-30-56",
      "email": "info@chapterlog.com.tr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Melikgazi",
        "addressLocality": "Melikgazi",
        "addressRegion": "Kayseri",
        "postalCode": "38070",
        "addressCountry": "TR",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 38.7312,
        "longitude": 35.4787,
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
      "priceRange": "$$",
      "currenciesAccepted": "TRY, USD, EUR, RUB",
      "paymentAccepted": "Bank Transfer, Wire Transfer",
      "areaServed": [
        { "@type": "Country", "name": "Turkey" },
        { "@type": "Country", "name": "Russia" },
        { "@type": "Country", "name": "Germany" },
        { "@type": "Country", "name": "Poland" },
        { "@type": "Country", "name": "France" },
        { "@type": "Country", "name": "Netherlands" },
        { "@type": "Country", "name": "Belgium" },
        { "@type": "Country", "name": "Italy" },
        { "@type": "Country", "name": "Austria" },
        { "@type": "Country", "name": "Czech Republic" },
        { "@type": "Country", "name": "Georgia" },
        { "@type": "Country", "name": "Azerbaijan" },
      ],
      "keywords": "Türkiye Rusya nakliye, Avrupa Rusya nakliye, Turkey Russia freight, Europe Russia freight, para transferi Rusya, money transfer Russia, gümrük danışmanlığı, customs consultancy, FTL nakliye, parsiyel yük, transit lojistik, TIR karneti, UBAK izni, Rusya gümrük, EAC sertifika, грузоперевозки Россия Турция, таможенное оформление",
      "serviceType": [
        "Turkey Russia Road Freight",
        "Europe Russia Transit Freight",
        "FTL Full Truckload Shipping",
        "LTL Partial Load Shipping",
        "Commercial Money Transfer Turkey Russia",
        "Customs Consultancy Russia",
        "Container Shipping FCL",
        "Import Export Consultancy",
        "EAC Certification Support",
        "TIR Carnet Operations",
        "UBAK Permit Management",
        "Warehouse Storage and Consolidation",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "ChapterLOG Lojistik Hizmetleri",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "FTL Komple Tır Nakliye — Türkiye-Rusya", "description": "Kayseri-Moskova hattında komple tır sevkiyatı. 5-8 iş günü teslimat, 500.000€ CMR sigorta." },
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "LTL Parsiyel Yük — Türkiye-Rusya", "description": "325 USD/m³'ten başlayan fiyatlarla parsiyel nakliye. Haftalık düzenli seferler." },
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Ticari Para Transferi — Türkiye-Rusya", "description": "%3,5 sabit komisyonla TRY, USD, EUR, RUB arası ticari para transferi. En geç 5 iş günü." },
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Gümrük Danışmanlığı — Rusya İhracat", "description": "GTİP tespiti, beyanname, CMR, TIR karnesi, UBAK izni, EAC sertifika desteği." },
          },
          {
            "@type": "Offer",
            "itemOffered": { "@type": "Service", "name": "Avrupa-Rusya Transit Nakliye", "description": "Avrupa'dan Türkiye üzerinden Rusya'ya transit karayolu taşımacılığı. TIR karnesi ile." },
          },
        ],
      },
    },
  ],
};

/** Matches index.html — repeated after hydration so stubborn browsers re-fetch tab icons. */
function FaviconLinks() {
  const origin =
    typeof window !== "undefined" && window.location.origin ? window.location.origin : "https://chapterlog.com.tr";
  const abs = (path: string) => `${origin}${path}`;
  return (
    <Helmet>
      <link rel="icon" href={abs("/favicon.ico")} sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href={abs("/favicon-32x32.png")} />
      <link rel="shortcut icon" href={abs("/favicon.ico")} />
      <link rel="icon" type="image/png" sizes="16x16" href={abs("/favicon-16x16.png")} />
      <link rel="icon" type="image/png" sizes="48x48" href={abs("/favicon-48x48.png")} />
      <link rel="icon" type="image/png" sizes="192x192" href={abs("/favicon-192x192.png")} />
      <link rel="icon" type="image/png" sizes="512x512" href={abs("/favicon.png")} />
      <link rel="icon" type="image/svg+xml" href={abs("/favicon.svg")} />
      <link rel="apple-touch-icon" sizes="180x180" href={abs("/apple-touch-icon.png")} />
    </Helmet>
  );
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      <FloatingContact />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <FaviconLinks />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(GLOBAL_STRUCTURED_DATA)}
        </script>
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
