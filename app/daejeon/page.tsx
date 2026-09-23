import Link from 'next/link';
import type { Metadata } from "next";
import { regionData } from '@/lib/regions';

const SITE_URL = "https://ohealing.netlify.app";
const SITE_NAME = "오힐링";

export const metadata: Metadata = {
  title: `대전 마사지 | 대전 5개 구 전체 지역별 제휴 힐링 테라피 안내 - ${SITE_NAME}`,
  description: "대전 출장마사지 및 프리미엄 홈케어 테라피 제휴 안내. 대전 전 지역(서구, 유성구, 중구, 동구, 대덕구) 세부 동별 검증된 바디케어 정보를 오힐링에서 편리하게 확인하세요.",
  alternates: {
    canonical: `${SITE_URL}/daejeon`,
  },
  keywords: [
    "대전 마사지",
    "대전 출장마사지",
    "대전광역시 마사지",
    "대전광역시 출장마사지",
    "대전 스웨디시",
    "대전 아로마마사지",
    "오힐링",
    "O-HEALING"
  ],
  openGraph: {
    title: `대전 마사지 | 대전 5개 구 전체 지역별 제휴 힐링 테라피 - ${SITE_NAME}`,
    description: "대전 출장마사지 및 프리미엄 바디케어 제휴 정보 안내. 대전 전 지역 세부 매장 정보를 한눈에 비교해 보세요.",
    url: `${SITE_URL}/daejeon`,
    siteName: `${SITE_NAME} (O-Healing)`,
    locale: "ko_KR",
    type: "website",
  },
};

export default function DaejeonRegionPage() {
  const daejeonDistricts = regionData.daejeon.districts;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-sky-600 tracking-tight">
            오힐링 <span className="text-xs text-slate-400 font-normal">O-Healing</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-800">
            &larr; 홈으로 돌아가기
          </Link>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 py-3 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <Link href="/" className="text-sky-600 font-semibold hover:underline">홈</Link>
          <span>&gt;</span>
          <span className="text-slate-700 font-bold">대전 지역 안내</span>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="mb-8">
          <span className="bg-sky-100 text-sky-700 text-xs font-semibold px-2.5 py-1 rounded-md mb-2 inline-block">
            대전광역시 제휴 샵 안내
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            대전 5개 구 전체 지역별 프리미엄 힐링 마사지 테라피
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            대전 전 지역(5개 구) 세부 동별 제휴 정보를 편리하게 확인하세요.
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(daejeonDistricts).map(([districtKey, districtVal]) => (
            <div key={districtKey} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  {districtVal.name}
                </h2>
                <span className="text-xs text-slate-400">{districtVal.dongs.length}개 동 등록</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {districtVal.dongs.map((dong, idx) => (
                  <Link
                    key={idx}
                    href={`/daejeon/${districtKey}/${encodeURIComponent(dong)}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition"
                  >
                    {dong} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-400 mt-20">
        <p>© 2026 오힐링 (O-Healing). All rights reserved.</p>
        <p className="mt-1">도메인: https://ohealing.netlify.app/daejeon</p>
      </footer>
    </main>
  );
}