import type { Metadata } from "next";
import Link from "next/link";
import { regionData } from "@/lib/regions";
import { titlePool100, descPool100, getSeoHash } from "@/lib/seoPool";
import RandomDistrictShopList from "@/components/RandomDistrictShopList";

interface PageProps {
  params: Promise<{
    city: string;
    district: string;
  }>;
}

const SITE_URL = "https://ohealing.netlify.app";

// 시/도 슬러그 한글 매핑 (대전, 청주 포함)
const cityDisplayNameMap: Record<string, string> = {
  seoul: "서울",
  incheon: "인천",
  gyeonggi: "경기",
  daejeon: "대전",
  cheongju: "청주",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;
  const lowerCity = city.toLowerCase();
  const lowerDistrict = district.toLowerCase();

  const region = regionData[lowerCity];
  const districtInfo = region?.districts[lowerDistrict];

  const cityName = cityDisplayNameMap[lowerCity] || region?.name || "전국";
  const districtName = districtInfo ? districtInfo.name : district;
  const locationKeyword = `${cityName} ${districtName}`;

  // 고유 해시 생성 (구별로 겹치지 않는 인덱스 배정)
  const hash = getSeoHash(`${lowerCity}-${lowerDistrict}-ohealing-district-seo`);

  const titleModifier = titlePool100[hash % 100];
  const descModifier = descPool100[(hash * 13) % 100];

  // 1. 타이틀: [구이름] 마사지 키워드 필수 배치
  const finalTitle = `${districtName} 마사지 | ${locationKeyword} ${titleModifier} - 오힐링`;

  // 2. 디스크립션: [구이름] 출장마사지 키워드 필수 배치
  const finalDescription = `${districtName} 마사지 및 프리미엄 홈케어 테라피 제휴 안내. ${descModifier}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    alternates: {
      canonical: `${SITE_URL}/${lowerCity}/${lowerDistrict}`,
    },
    keywords: [
      `${districtName} 마사지`,
      `${districtName} 출장마사지`,
      `${locationKeyword} 마사지`,
      `${locationKeyword} 출장마사지`,
      `${districtName} 스웨디시`,
      `${districtName} 아로마마사지`,
      "오힐링",
      "O-HEALING"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `${SITE_URL}/${lowerCity}/${lowerDistrict}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { city, district } = resolvedParams;
  const lowerCity = city.toLowerCase();
  const lowerDistrict = district.toLowerCase();

  const region = regionData[lowerCity];
  const districtInfo = region?.districts[lowerDistrict];

  const cityName = cityDisplayNameMap[lowerCity] || region?.name || "전국";
  const districtName = districtInfo ? districtInfo.name : district;
  const fullTitle = `${cityName} ${districtName}`;

  const shops = [
    { 
      id: 1, 
      name: `✨ ${fullTitle} 프리미엄 웰니스 1호점`, 
      desc: "편안한 릴렉싱과 맞춤형 전신 바디케어! 전문 테라피스트의 품격 있는 1:1 케어", 
      phone: "0507-0000-0001", 
      price: "건식 60,000원~", 
      image: "/shop1.jpg" 
    },
    { 
      id: 2, 
      name: `🌸 ${fullTitle} 아로마 릴렉스 2호점`, 
      desc: "최고급 천연 아로마 오일을 활용한 부드럽고 섬세한 전신 바디케어 프로그램", 
      phone: "0507-0000-0002", 
      price: "아로마 70,000원~", 
      image: "/shop2.jpg" 
    },
    { 
      id: 3, 
      name: `💎 ${fullTitle} 스웨디시 라운지 3호점`, 
      desc: "철저한 위생 관리와 쾌적한 쉼터! 만족도 높은 림프 순환 집중 힐링 케어", 
      phone: "0507-0000-0003", 
      price: "스웨디시 80,000원~", 
      image: "/shop3.jpg" 
    },
    { 
      id: 4, 
      name: `👑 ${fullTitle} 밸런스 바디케어 4호점`, 
      desc: "도심 속 프라이빗 휴식 공간! 숙련된 힐러들의 체형 맞춤형 피로 회복 솔루션", 
      phone: "0507-0000-0004", 
      price: "스페셜 90,000원~", 
      image: "/shop4.jpg" 
    },
    { 
      id: 5, 
      name: `🌙 ${fullTitle} 안심 홈케어 5호점`, 
      desc: "엄선된 우수 제휴점! 투명한 정찰제와 쾌적한 웰니스 시스템을 약속합니다.", 
      phone: "0507-0000-0005", 
      price: "전신케어 70,000원~", 
      image: "/shop5.jpg" 
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-black text-sky-600 tracking-tight">
            오힐링 <span className="text-xs text-slate-400 font-normal">O-Healing</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${lowerCity}`}
              className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all"
            >
              &larr; {cityName} 전체
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

      {/* 본문 */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        {/* 브레드크럼 */}
        <nav className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-sky-600">홈</Link>
          <span>&gt;</span>
          <Link href={`/${lowerCity}`} className="hover:text-sky-600">{cityName}</Link>
          <span>&gt;</span>
          <span className="text-slate-700 font-bold">{districtName}</span>
        </nav>

        {/* 안내 섹션 */}
        <section className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 p-8 text-white space-y-3">
          <div className="inline-block bg-sky-600/30 border border-sky-400/30 text-sky-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {cityName} · {districtName}
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            {fullTitle} 마사지 & 바디케어 제휴 안내
          </h1>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
            {fullTitle} 일대의 검증된 프리미엄 테라피 및 에스테틱 바디케어 정보입니다. 세부 행정동을 선택해 주변 매장을 찾아보세요.
          </p>
        </section>

        {/* 하위 동(읍/면) 선택 칩 리스트 */}
        {districtInfo && districtInfo.dongs && districtInfo.dongs.length > 0 && (
          <section className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>📍</span> {districtName} 세부 지역(동·읍·면) 선택
              </h2>
              <span className="text-xs text-slate-400">
                총 {districtInfo.dongs.length}개 동 등록
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {districtInfo.dongs.map((dongName, idx) => (
                <Link
                  key={idx}
                  href={`/${lowerCity}/${lowerDistrict}/${encodeURIComponent(dongName)}`}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition shadow-2xs"
                >
                  {dongName} &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 추천 제휴 매장 리스트 컴포넌트 */}
        <RandomDistrictShopList 
          shops={shops} 
          fullTitle={fullTitle} 
          city={lowerCity} 
          district={lowerDistrict} 
        />
      </main>
    </div>
  );
}