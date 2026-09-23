import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://ohealing.netlify.app";
const SITE_NAME = "오힐링";

export const metadata: Metadata = {
  // 스팸 키워드 배제 및 검색엔진(구글/네이버) 최적화 메타데이터
  title: `${SITE_NAME} | 서울·경기·인천·대전·청주 프리미엄 힐링 테라피`,
  description:
    "서울·경기·인천·대전·청주 전 지역 검증된 프리미엄 힐링 테라피 & 바디케어 정보 플랫폼! 내 주변 맞춤형 제휴 샵과 편안한 휴식 공간 정보를 지금 바로 확인하세요.",
  keywords: [
    "오힐링",
    "O-Healing",
    "힐링테라피플랫폼",
    "바디케어",
    "타이 마사지",
    "아로마 테라피",
    "스웨디시",
    "서울 마사지",
    "경기 힐링",
    "인천 에스테틱",
    "대전 마사지",
    "청주 테라피",
    "프리미엄 스파",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | 서울·경기·인천·대전·청주 힐링 테라피 제휴 샵`,
    description:
      "내 주변 검증된 힐링 테라피 샵 정보 총집합! 타이, 아로마, 에스테틱 맞춤 휴식 공간을 오힐링에서 편안하게 만나보세요.",
    url: SITE_URL,
    siteName: `${SITE_NAME} (O-Healing)`,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: "오힐링 - 프리미엄 힐링 & 바디케어 플랫폼",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 서울·경기·인천·대전·청주 프리미엄 테라피`,
    description: "서울·경기·인천·대전·청주 검증된 테라피 제휴 정보 및 프리미엄 힐링 가이드",
    images: ["/og-main.png"],
  },
};

export default function Page() {
  return <MainClientUI />;
}