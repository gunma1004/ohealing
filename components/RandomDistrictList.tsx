"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DistrictItem {
  distKey: string;
  name: string;
  dongs: string[];
}

interface RandomDistrictListProps {
  districts: DistrictItem[];
  cityKey: string;
}

// 피셔-예이츠 셔플 유틸 함수
function shuffleArray<T>(array: T[]): T[] {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

export default function RandomDistrictList({ districts, cityKey }: RandomDistrictListProps) {
  const [shuffledDistricts, setShuffledDistricts] = useState<DistrictItem[]>(districts);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 클라이언트 마운트 시점에만 셔플을 실행하여 SSR 하이드레이션 불일치 방지
    const shuffled = shuffleArray(districts);
    setShuffledDistricts(shuffled);
    setIsMounted(true);
  }, [districts]);

  // 렌더링 대상 (마운트 전에는 원본 배열, 마운트 후에는 셔플된 배열 사용)
  const displayDistricts = isMounted ? shuffledDistricts : districts;

  return (
    <div className="space-y-6">
      {displayDistricts.map((distVal) => (
        <div 
          key={distVal.distKey} 
          className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-slate-300 transition-colors"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <Link 
              href={`/${cityKey}/${distVal.distKey}`} 
              className="text-lg font-bold text-slate-900 hover:text-sky-600 transition flex items-center gap-2 group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-600 group-hover:scale-125 transition-transform"></span>
              <span>{distVal.name} 전체보기</span>
              <span className="text-sky-600 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
            <span className="text-xs font-medium text-slate-400">
              {distVal.dongs.length}개 지역 등록
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {distVal.dongs.map((dong, idx) => (
              <Link
                key={idx}
                href={`/${cityKey}/${distVal.distKey}/${encodeURIComponent(dong)}`}
                className="inline-flex items-center px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-300 transition shadow-2xs"
              >
                {dong} &rarr;
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}