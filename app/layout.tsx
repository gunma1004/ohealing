import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

const SITE_URL = "https://ohealing.netlify.app";
const SITE_NAME = "오힐링";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // 검색 최적화(SEO) 규격 준수: 서울·경기·인천·대전·청주 통합 플랫폼
    default: `${SITE_NAME} | 서울·경기·인천·대전·청주 프리미엄 힐링 테라피 플랫폼`,
    template: `%s | ${SITE_NAME}`,
  },
  // 신뢰감을 주는 메인 디스크립션
  description:
    "서울, 경기, 인천부터 대전, 청주까지! 검증된 프리미엄 힐링 테라피 및 바디케어 정보를 한눈에. 내 주변 맞춤형 휴식 공간과 제휴 샵 정보를 빠르고 편리하게 확인하세요.",
  keywords: [
    "오힐링",
    "서울 마사지",
    "경기 테라피",
    "인천 에스테틱",
    "대전 마사지",
    "청주 테라피",
    "힐링 테라피 플랫폼",
    "바디케어 제휴샵",
    "내주변 힐링",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  // 🌟 네이버 웹마스터툴 소유권 확인 태그 (새 사이트 등록 시 발급받은 키로 교체 가능)
  other: {
    "naver-site-verification": "00e7695442b89d369943895964f00b130a83f820",
  },
  openGraph: {
    title: `${SITE_NAME} | 서울·경기·인천·대전·청주 힐링 테라피 플랫폼`,
    description:
      "서울, 경기, 인천, 대전, 청주 전 지역의 엄선된 프리미엄 힐링 테라피 및 바디케어 정보를 간편하게 찾아보세요.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-main.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} 프리미엄 힐링 플랫폼 안내`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}