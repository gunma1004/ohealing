import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import { titlePool100, descPool100, getSeoHash } from "@/lib/seoPool";
import { getShopById, getShopsByCity } from "@/lib/shopData";

interface PageProps {
  params: Promise<{
    city: string;
    id: string;
  }>;
}

const SITE_URL = "https://ohealing.netlify.app";

// 시/도 슬러그 한글 매핑 (서울, 경기, 인천, 대전, 청주)
const cityDisplayNameMap: Record<string, string> = {
  seoul: "서울",
  incheon: "인천",
  gyeonggi: "경기",
  daejeon: "대전",
  cheongju: "청주",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, id } = resolvedParams;
  const lowerCity = city.toLowerCase();

  const cityName = cityDisplayNameMap[lowerCity] || regionData[lowerCity]?.name || "전국";
  // 대전/청주는 S슬림홈케어 단독 매핑, 수도권은 1~5번 매핑
  const shop = getShopById(lowerCity, id);

  // 100종 풀 고유 해시 계산 (시/도 + 샵ID 조합)
  const hash = getSeoHash(`${lowerCity}-${id}-city-shop-seo`);
  const titleModifier = titlePool100[hash % 100];
  const descModifier = descPool100[(hash * 17) % 100];

  // 1. 요청하신 타이틀 규칙 적용
  const formattedTitle = `${cityName} 출장 | ${shop.name} - ${cityName} 마사지 ${titleModifier} - 오힐링`;

  // 2. 디스크립션: [시/도명] 출장마사지 키워드 필수 배치 + 100종 풀
  const formattedDesc = `${cityName} 출장마사지 및 ${shop.name} 코스 요금 안내. ${descModifier}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: formattedTitle,
    },
    description: formattedDesc,
    alternates: {
      canonical: `${SITE_URL}/${lowerCity}/shop/${id}`,
    },
    keywords: [
      `${cityName} 출장`,
      `${cityName} 마사지`,
      `${cityName} 출장마사지`,
      shop.name,
      `${cityName} 스웨디시`,
      `${cityName} 아로마마사지`,
      "오힐링",
      "O-HEALING"
    ],
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url: `${SITE_URL}/${lowerCity}/shop/${id}`,
      locale: "ko_KR",
      type: "website",
      images: [{ url: shop.image, width: 800, height: 600, alt: `${cityName} 마사지 - ${shop.name}` }],
    },
  };
}

export default async function CityShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, id } = resolvedParams;
  const lowerCity = city.toLowerCase();

  const cityName = cityDisplayNameMap[lowerCity] || regionData[lowerCity]?.name || "전국";
  const shop = getShopById(lowerCity, id);
  const allShopsList = getShopsByCity(lowerCity);
  const isSingleShopCity = lowerCity === "daejeon" || lowerCity === "cheongju";

  const displayShopTitle = `${cityName} 전지역 추천 테라피 - ${shop.name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": displayShopTitle,
    "description": shop.desc,
    "telephone": shop.phone,
    "url": `${SITE_URL}/${lowerCity}/shop/${shop.id}`,
    "image": `${SITE_URL}${shop.image}`,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": cityName,
      "addressCountry": "KR"
    },
    "priceRange": "$$"
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-sky-600 tracking-tight">
            오힐링 <span className="text-xs text-slate-400 font-normal">O-Healing</span>
          </Link>
          <Link 
            href={`/${lowerCity}`} 
            className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all"
          >
            &larr; {cityName} 전체 목록
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 상단 현재 선택된 샵 정보 카드 */}
        <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img src={shop.image} alt={displayShopTitle} className="w-full h-full object-cover filter brightness-[0.85]" />
            <span className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
              ✨ {shop.badge}
            </span>
          </div>
          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10 bg-white rounded-t-3xl border-t border-slate-100">
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-lg border border-sky-100">
              📍 {cityName} 전지역 제휴 파트너
            </span>
            <h1 className="text-xl md:text-3xl font-black text-slate-900 leading-tight">
              {displayShopTitle}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {shop.desc}
            </p>
          </div>
        </section>

        {/* 수도권일 경우에만 5개 샵 리스트 노출 (대전/청주는 단독 업체이므로 자동 숨김) */}
        {!isSingleShopCity && allShopsList.length > 1 && (
          <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <div className="text-center">
              <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PARTNER SHOPS IN {cityName}</span>
              <h3 className="text-base md:text-xl font-black text-slate-900 mt-1">
                ✨ {cityName} 추천 제휴 샵 (총 {allShopsList.length}곳)
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {allShopsList.map((s) => (
                <div 
                  key={s.id} 
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                    s.id === shop.id 
                      ? "bg-sky-50/60 border-sky-400 shadow-xs" 
                      : "bg-slate-50 border-slate-200 hover:border-sky-300"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img src={s.image} alt={s.name} className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 truncate">{s.name}</span>
                        {s.id === shop.id && <span className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded-full">선택됨</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/${lowerCity}/shop/${s.id}`}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        s.id === shop.id
                          ? "bg-sky-600 text-white shadow-xs"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-sky-600 hover:text-white"
                      }`}
                    >
                      {s.id === shop.id ? "안내 보기" : "샵 선택"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 코스 및 요금 안내 */}
        <section className="bg-white border border-slate-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="text-center">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-lg md:text-2xl font-black text-slate-900 mt-1">💎 {shop.name} 코스 구성 및 요금</h2>
          </div>
          <div className="space-y-6">
            {shop.courses.map((courseGroup, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-base">{courseGroup.category}</h3>
                  {courseGroup.badge && (
                    <span className="text-[10px] bg-sky-100 text-sky-700 font-bold px-2.5 py-0.5 rounded-full">
                      {courseGroup.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">{courseGroup.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {courseGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3.5 bg-white rounded-xl border border-slate-200 flex justify-between items-center shadow-2xs">
                      <span className="text-xs font-bold text-slate-700">⏱️ {item.time}</span>
                      <span className="text-sm font-black text-sky-600">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 고정 예약 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 p-3 md:p-4 shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a href={`tel:${shop.phone}`} className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-sm transition-all active:scale-98">
            📞 전화예약 ({shop.phone})
          </a>
          <a href={`sms:${shop.phone}`} className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-3.5 rounded-2xl text-xs md:text-sm transition-all active:scale-98">
            💬 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}