"use client";

import { useEffect, useState } from "react";

export function ClientTextMixerInline({ locationText }: { locationText: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // '출장'과 '마사지' 키워드를 안전하게 분산 배치
  const headline = `${locationText} 출장 전문 맞춤 케어 & 힐링 마사지 테라피`;
  const subText = "엄선된 전문 테라피스트 안내 · 100% 안심 정찰제 및 투명한 예약 시스템";

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-sky-500/10 border border-sky-500/30 p-4 md:p-5 rounded-2xl text-center shadow-sm">
      {/* 상단 실시간 안내 뱃지 */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sky-200 text-[11px] font-bold text-sky-700 mb-2 shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        실시간 {locationText} 오힐링 제휴 파트너 안내
      </div>

      {/* 핵심 키워드 헤드라인 */}
      <h2 className="text-sm md:text-base font-extrabold text-sky-900 tracking-tight">
        ✨ {isMounted ? headline : `${locationText} 맞춤형 힐링 마사지 테라피`}
      </h2>

      {/* 신뢰도 제공 서브 카피 */}
      <p className="text-[11px] md:text-xs text-slate-500 mt-1 font-medium">
        {isMounted ? subText : "철저한 위생 관리와 정찰제 기반의 안심 제휴 네트워크"}
      </p>
    </div>
  );
}