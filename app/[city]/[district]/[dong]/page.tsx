import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import { titlePool100, descPool100, getSeoHash } from "@/lib/seoPool";
import { getShopsByCity } from "@/lib/shopData";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
    dong: string;
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

// 🌟 lib/seoPool.ts 100종 풀 연동 동적 SEO 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;
  const decodedDong = decodeURIComponent(dong);
  const lowerCity = city.toLowerCase();
  const lowerDistrict = district.toLowerCase();

  const cityName = cityDisplayNameMap[lowerCity] || regionData[lowerCity]?.name || "전국";
  const districtName = regionData[lowerCity]?.districts[lowerDistrict]?.name || district;

  // 지역 전체 고유 해시 계산 (동마다 100% 다른 인덱스 보장)
  const hash = getSeoHash(`${lowerCity}-${lowerDistrict}-${decodedDong}-ohealing-seo-v1`);

  // 100종 풀에서 인덱스 추출
  const titleModifier = titlePool100[hash % 100];
  const descModifier = descPool100[(hash * 7) % 100];

  // 1. 타이틀: [동 이름] 마사지 키워드 필수 배치
  const finalTitle = `${decodedDong} 마사지 | ${cityName} ${districtName} ${decodedDong} ${titleModifier} - 오힐링`;

  // 2. 디스크립션: [동 이름] 출장마사지 키워드 필수 배치 + 100종 풀
  const finalDescription = `${decodedDong} 출장마사지 및 프리미엄 홈케어 테라피 제휴 안내. ${descModifier}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${lowerCity}/${lowerDistrict}/${encodeURIComponent(decodedDong)}`,
    },
    keywords: [
      `${decodedDong} 마사지`,
      `${decodedDong} 출장마사지`,
      `${districtName} 마사지`,
      `${districtName} 출장마사지`,
      `${decodedDong} 스웨디시`,
      `${decodedDong} 아로마마사지`,
      "오힐링",
      "O-HEALING",
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${lowerCity}/${lowerDistrict}/${encodeURIComponent(decodedDong)}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district, dong } = resolvedParams;
  const decodedDong = decodeURIComponent(dong);
  const encodedDong = encodeURIComponent(decodedDong);
  const lowerCity = city.toLowerCase();
  const lowerDistrict = district.toLowerCase();

  const cityName = cityDisplayNameMap[lowerCity] || regionData[lowerCity]?.name || "전국";
  const districtName = regionData[lowerCity]?.districts[lowerDistrict]?.name || district;
  const fullLocation = `${cityName} ${districtName} ${decodedDong}`;

  // 🌟 실제 업체 데이터 연동: 대전/청주는 S슬림홈케어(0507-1280-3358) 1곳만, 수도권은 5곳 불러옴
  const rawShops = getShopsByCity(lowerCity);
  const isSingleShopCity = lowerCity === "daejeon" || lowerCity === "cheongju";

  const shops = rawShops.map((s) => ({
    id: s.id,
    name: isSingleShopCity ? s.name : `${decodedDong} ${s.name}`,
    badge: s.badge,
    desc: s.desc,
    phone: s.phone,
    price: s.courses[0]?.items[0]?.price ? `${s.courses[0].items[0].price}~` : "50,000원~",
    image: s.image,
  }));

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-sky-600 tracking-tight">
            오힐링 <span className="text-xs text-slate-400 font-normal">O-Healing</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${lowerCity}/${lowerDistrict}`}
              className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all"
            >
              &larr; {districtName} 전체
            </Link>
            <Link
              href="/"
              className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all"
            >
              홈으로
            </Link>
          </div>
        </div>
      </header>

      {/* 본문 콘텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 네비게이션 브레드크럼 */}
        <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-sky-600">홈</Link>
          <span>&gt;</span>
          <Link href={`/${lowerCity}`} className="hover:text-sky-600">{cityName}</Link>
          <span>&gt;</span>
          <Link href={`/${lowerCity}/${lowerDistrict}`} className="hover:text-sky-600">{districtName}</Link>
          <span>&gt;</span>
          <span className="text-slate-700 font-bold">{decodedDong}</span>
        </nav>

        {/* 상단 지역 헤더 안내 */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 p-8 text-white space-y-3">
          <div className="inline-block bg-sky-600/30 border border-sky-400/30 text-sky-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {cityName} · {districtName}
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            {decodedDong} 마사지 & 바디케어 제휴 파트너 안내
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullLocation} 일대의 검증된 프리미엄 테라피 파트너 정보입니다. 정찰제 기반의 투명한 코스와 편안한 힐링 프로그램을 확인해 보세요.
          </p>
        </section>

        {/* 제휴 샵 목록 섹션 (RandomShopList 대체 인라인 렌더링) */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <span>✨</span> {decodedDong} 추천 제휴 파트너 ({shops.length}곳)
            </h2>
            <span className="text-xs text-sky-600 font-bold bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              100% 안심 후불제
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className="bg-white border border-slate-200 hover:border-sky-300 rounded-3xl p-5 md:p-6 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 group"
              >
                <div className="flex items-start md:items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-black bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-100">
                        {shop.badge}
                      </span>
                      <span className="text-xs font-extrabold text-sky-600">
                        {shop.price}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-black text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                      {shop.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {shop.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 border-t border-slate-100 md:border-0 pt-3 md:pt-0">
                  <Link
                    href={`/${lowerCity}/${lowerDistrict}/${encodedDong}/shop/${shop.id}`}
                    className="flex-1 md:flex-none text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-3 rounded-xl transition-all"
                  >
                    코스·요금보기
                  </Link>
                  <a
                    href={`tel:${shop.phone}`}
                    className="flex-1 md:flex-none text-center bg-sky-600 hover:bg-sky-700 text-white text-xs font-black px-5 py-3 rounded-xl shadow-sm transition-all active:scale-95"
                  >
                    📞 예약상담
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}