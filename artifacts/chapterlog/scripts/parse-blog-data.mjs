import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function unescapeStr(s) {
  return s.replace(/\\"/g, '"').replace(/\\n/g, "\n");
}

/** @param {string} combined */
export function parseBlogPosts(combined) {
  const blocks = combined.split(/\{\s*\n\s*id:\s*\d+/).slice(1);
  /** @type {Array<{ slug: string; isoDate: string; title: string; excerpt: string; tag: string; highlights: string[]; body: { subtitle: string; text: string }[] }>} */
  const posts = [];

  for (const block of blocks) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1];
    const isoDate = block.match(/isoDate:\s*"([^"]+)"/)?.[1];
    const title = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const excerpt = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/)?.[1];
    const tag = block.match(/tag:\s*"([^"]+)"/)?.[1];
    if (!slug || !isoDate || !title) continue;

    const highlights = [...block.matchAll(/highlights:\s*\[([\s\S]*?)\]/g)]
      .flatMap((m) => [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => unescapeStr(x[1])));

    const body = [];
    const bodyRe =
      /\{\s*subtitle:\s*"((?:[^"\\]|\\.)*)",\s*img:\s*[^,]+,\s*text:\s*"((?:[^"\\]|\\.)*)"\s*\}/g;
    let m;
    while ((m = bodyRe.exec(block)) !== null) {
      body.push({ subtitle: unescapeStr(m[1]), text: unescapeStr(m[2]) });
    }

    posts.push({
      slug,
      isoDate,
      title: unescapeStr(title),
      excerpt: excerpt ? unescapeStr(excerpt) : "",
      tag: tag ?? "",
      highlights,
      body,
    });
  }
  return posts;
}

export function loadBlogPosts() {
  const blogSource = readFileSync(join(ROOT, "src/data/blogPosts.ts"), "utf8");
  const extendedSource = readFileSync(join(ROOT, "src/data/blogPostsExtended.ts"), "utf8");
  return parseBlogPosts(blogSource + extendedSource);
}

export const BLOG_CATEGORIES_META = [
  { slug: "lojistik", tagTr: "Lojistik", titleTr: "Lojistik Rehberleri — Türkiye Rusya Operasyon", descTr: "Rusya lojistik operasyonu, depolama, paketleme ve tek çatı yönetim rehberleri." },
  { slug: "para-transferi", tagTr: "Para Transferi", titleTr: "Para Transferi Rehberleri — Türkiye Rusya Ticari Ödeme", descTr: "Türkiye-Rusya ve Rusya-Türkiye ticari para transferi, komisyon ve yasal çerçeve." },
  { slug: "nakliye", tagTr: "Nakliye", titleTr: "Nakliye Rehberleri — Parsiyel, FTL ve Koridor Fiyatları", descTr: "Rusya parsiyel nakliye, FTL, soğuk zincir ve şehir bazlı süre/maliyet rehberleri." },
  { slug: "tasimacilik", tagTr: "Taşımacılık", titleTr: "Taşımacılık — TIR, UBAK ve Transit Rehberleri", descTr: "TIR karnesi, UBAK izni, transit taşımacılık ve çoklu sınır geçişi." },
  { slug: "konteyner", tagTr: "Konteyner", titleTr: "Konteyner Taşımacılığı — FCL Rusya Seferleri", descTr: "Rusya FCL konteyner taşımacılığı, haftalık seferler ve gümrük süreçleri." },
  { slug: "ftl", tagTr: "FTL", titleTr: "FTL Tam Dorse — Komple Tır Nakliye Rehberleri", descTr: "FTL tam dorse nakliye, büyük hacimli yükler ve hızlı teslimat seçenekleri." },
  { slug: "gumruk", tagTr: "Gümrük", titleTr: "Gümrük Rehberleri — Rusya İhracat ve EAC", descTr: "Rusya gümrük işlemleri, EAC/GOST-R sertifikası ve beyanname rehberleri." },
  { slug: "dis-ticaret", tagTr: "Dış Ticaret", titleTr: "Dış Ticaret — Rusya Ödeme ve E-Ticaret Rehberleri", descTr: "Rusya'ya ihracat ödeme yöntemleri, Wildberries, Ozon ve ticaret danışmanlığı." },
  { slug: "ihracat", tagTr: "İhracat", titleTr: "İhracat Rehberleri — Tekstil, Gıda ve Sektörel Rusya", descTr: "Rusya'ya tekstil, gıda, otomotiv yedek parça ve doğrudan satın alım rehberleri." },
  { slug: "avrupa-rusya", tagTr: "Avrupa→Rusya", titleTr: "Avrupa'dan Rusya'ya Nakliye — Transit Koridor Rehberleri", descTr: "Almanya, İtalya, Hollanda, Fransa çıkışlı Rusya nakliye ve Türkiye transit." },
  { slug: "transit", tagTr: "Transit", titleTr: "Transit Lojistik — Güzergah ve Sınır Rehberleri", descTr: "Türkiye-Rusya güzergahları, Gürcistan, Hazar rotası ve mevsimsel planlama." },
  { slug: "sigorta", tagTr: "Sigorta", titleTr: "Nakliye Sigortası — CMR ve Yük Güvencesi", descTr: "CMR sigortası, 500.000 Euro güvence ve hasar tazminat süreçleri." },
  { slug: "e-ticaret", tagTr: "E-Ticaret", titleTr: "Rusya E-Ticaret — Wildberries ve Ozon Rehberleri", descTr: "Wildberries, Ozon'a Türkiye'den mal gönderimi ve marketplace lojistiği." },
];
