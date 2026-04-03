import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <main className="flex-1 w-full bg-background min-h-screen flex items-center justify-center">
      <Helmet>
        <title>404 — Sayfa Bulunamadı | ChapterLOG</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center px-6">
        <div className="text-8xl font-display font-extrabold text-accent mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-4 font-display">Sayfa Bulunamadı</h1>
        <p className="text-white/40 text-sm font-serif mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Ana sayfaya dönerek devam edebilirsiniz.
        </p>
        <Link href="/">
          <button className="inline-flex items-center gap-2 text-accent font-bold font-display hover:gap-3 transition-all">
            <ArrowLeft size={16} /> Ana Sayfaya Dön
          </button>
        </Link>
      </div>
    </main>
  );
}
