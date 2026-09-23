"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ShopItem {
  id: number;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

interface RandomDistrictShopListProps {
  shops: ShopItem[];
  fullTitle: string;
  city: string;
  district: string;
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

export default function RandomDistrictShopList({
  shops,
  fullTitle,
  city,
  district,
}: RandomDistrictShopListProps) {
  const [randomShops, setRandomShops] = useState<ShopItem[]>(shops);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // 클라이언트 마운트 시점에만 셔플을 실행하여 SSR 하이드레이션 불일치 방지
    const shuffled = shuffleArray(shops);
    setRandomShops(shuffled);
    setIsMounted(true);
  }, [shops]);

  const displayShops = isMounted ? randomShops : shops;

  return (
    <section className="space-y-6">
      <div className="text-center">
        <p className="text-xs text-sky-600 font-bold tracking-widest uppercase">
          RECOMMENDED PARTNERS
        </p>
        <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
          {fullTitle} 추천 제휴 샵 (총 {shops.length}곳)
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayShops.map((lShop) => (
          <div
            key={lShop.id}
            className="bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-4 flex gap-4 items-center shadow-sm transition-all group relative"
          >
            {/* 카드 전체 클릭 링크 */}
            <Link
              href={`/${city}/${district}/shop/${lShop.id}`}
              className="absolute inset-0 z-10"
              aria-label={`${lShop.name} 상세페이지 보기`}
            />

            <img
              src={lShop.image}
              alt={lShop.name}
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-slate-100 group-hover:scale-105 transition-transform flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <h3 className="font-extrabold text-sm md:text-base text-slate-900 truncate group-hover:text-sky-600 transition-colors">
                {lShop.name}
              </h3>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {lShop.desc}
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="text-xs font-black text-sky-600">{lShop.price}</span>
                <span className="bg-sky-600 group-hover:bg-sky-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-sm transition-colors">
                  상세보기 &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}