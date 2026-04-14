import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLang, Language } from "@/contexts/LanguageContext";

const LANGS: { code: Language; label: string; flag: string }[] = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [langOpen]);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/services" },
    { name: t.nav.blog, path: "/blog" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.contact, path: "/contact" },
  ];

  const currentLang = LANGS.find((l) => l.code === lang)!;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#0d0d0d]/95 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/8 py-3"
          : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-none py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group shrink-0 flex items-center gap-2.5">
            <span className="text-2xl font-display font-extrabold text-white tracking-tight leading-none">
              Chapter<span className="text-accent">LOG</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
            <ul className="flex items-center gap-5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={cn(
                      "text-sm font-semibold transition-colors hover:text-accent relative py-2",
                      location === link.path ? "text-accent" : "text-white/90"
                    )}
                  >
                    {link.name}
                    {location === link.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: Lang switcher + CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                aria-expanded={langOpen}
                aria-haspopup="menu"
                aria-controls="desktop-lang-menu"
                aria-label={t.nav.languageMenu}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-colors text-sm font-semibold"
              >
                <Globe size={14} aria-hidden />
                <span aria-hidden>{currentLang.flag}</span>
              </button>

              {langOpen && (
                <div
                  id="desktop-lang-menu"
                  role="menu"
                  className="absolute right-0 top-full mt-2 bg-primary border border-white/15 rounded-xl shadow-2xl py-1.5 z-50 min-w-[140px]"
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.code}
                      type="button"
                      role="menuitem"
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2",
                        lang === l.code ? "text-accent" : "text-white/80"
                      )}
                    >
                      <span className="text-base" aria-hidden>{l.flag}</span> {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact">
              <Button variant="accent" size="sm" className="font-bold">
                {t.nav.cta}
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-nav"
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        id="mobile-primary-nav"
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-primary shadow-xl transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-screen border-b border-white/10" : "max-h-0"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={cn(
                "block text-lg font-semibold py-2 border-b border-white/10 relative",
                location === link.path ? "text-accent pl-3" : "text-white"
              )}
            >
              {location === link.path && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-accent rounded-full" />
              )}
              {link.name}
            </Link>
          ))}
          {/* Mobile language selector */}
          <div className="flex gap-2 pt-2">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-bold border transition-colors",
                  lang === l.code
                    ? "bg-accent text-primary border-accent"
                    : "border-white/20 text-white/70 hover:border-white/40"
                )}
              >
                {l.flag} {l.code.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/contact" className="mt-2">
            <Button variant="accent" className="w-full font-bold">
              {t.nav.cta}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
