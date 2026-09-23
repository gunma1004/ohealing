// lib/shopData.ts

export interface CourseItem {
  time: string;
  price: string;
  recommend?: boolean;
}

export interface CourseGroup {
  category: string;
  badge?: string;
  desc: string;
  items: CourseItem[];
}

export interface ShopInfo {
  id: string;
  name: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: CourseGroup[];
  features: string[];
}

// 🌟 대전 / 청주 전용 단독 업체: S슬림홈케어
export const daejeonCheongjuShop: ShopInfo = {
  id: "1",
  name: "S슬림홈케어",
  phone: "0507-1280-3358",
  badge: "대전·청주 공식 제휴",
  image: "/shop1.jpg",
  desc: "전문 테라피스트의 정성 어린 1:1 맞춤 홈케어! 개운한 건식부터 감성 스웨디시까지 최고의 힐링을 선사합니다.",
  courses: [
    {
      category: "🔮 개운한 꾹꾹 건식",
      badge: "기본 힐링",
      desc: "뭉치고 굳은 전신 근육을 시원하고 개운하게 풀어주는 정통 건식 수기 테라피",
      items: [
        { time: "60분", price: "50,000원" },
        { time: "90분", price: "70,000원", recommend: true },
        { time: "120분", price: "80,000원" },
      ],
    },
    {
      category: "🔮 촉촉한 아로마",
      badge: "릴렉스 추천",
      desc: "고급 천연 오일로 피부를 부드럽게 감싸고 긴장된 전신을 이완시키는 아로마 코스",
      items: [
        { time: "60분", price: "60,000원" },
        { time: "90분", price: "80,000원", recommend: true },
        { time: "120분", price: "90,000원" },
      ],
    },
    {
      category: "🔮 스페셜 코스",
      badge: "★BEST 인기",
      desc: "아로마와 타이 스트레칭, 그리고 발관리까지 체계적으로 묶은 집중 프로그램",
      items: [
        { time: "120분 (아로마 60분 + 타이 60분)", price: "90,000원" },
        { time: "150분 (아로마 60분 + 타이 60분 + 발관리 30분)", price: "120,000원", recommend: true },
        { time: "180분 (아로마 60분 + 타이 60분 + 발관리 60분)", price: "150,000원" },
      ],
    },
    {
      category: "🔮 힐링 코스",
      desc: "심신의 안정과 깊은 휴식을 유도하는 섬세한 테라피스트의 감성 힐링 프로그램",
      items: [
        { time: "60분", price: "90,000원" },
        { time: "90분", price: "100,000원", recommend: true },
        { time: "120분", price: "120,000원" },
        { time: "150분", price: "150,000원" },
      ],
    },
    {
      category: "🔮 VIP 스웨디시",
      badge: "👑 VIP 시그니처",
      desc: "부드럽고 감각적인 터치로 림프 순환을 돕고 피로를 말끔히 비워내는 프리미엄 코스",
      items: [
        { time: "60분", price: "100,000원" },
        { time: "90분", price: "120,000원", recommend: true },
        { time: "120분", price: "150,000원" },
      ],
    },
  ],
  features: ["100% 안심 후불제", "신속 방문 안내", "전문 힐러 1:1 맞춤 배정", "철저한 프라이빗 케어"],
};

// 🌟 수도권 (서울, 경기, 인천) 5개 업체 데이터
export const metroShops: Record<string, ShopInfo> = {
  "1": {
    id: "1",
    name: "오힐링 골든테라피",
    phone: "0507-1280-3361",
    badge: "VIP 골든 힐링 케어",
    image: "/shop1.jpg",
    desc: "골든 품격의 감성 릴렉싱! 전문 관리사들의 정성스러운 맞춤 테라피로 일상의 피로를 완벽하게 해소해 드립니다.",
    courses: [
      {
        category: "스웨디시 코스",
        badge: "인기 추천",
        desc: "부드럽고 섬세한 터치로 전신의 피로를 깊이 있게 이완해 주는 프리미엄 스웨디시 케어.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "190,000원", recommend: true },
        ],
      },
      {
        category: "프리미엄 코스",
        badge: "시그니처",
        desc: "만족도 높은 힐링 테크닉으로 전신의 활력을 되찾아주는 맞춤형 바디케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" },
        ],
      },
    ],
    features: ["100% 안심 후불제", "신속한 방문 안내", "24시간 상시 운영", "전문 관리사 1:1 배정"],
  },
  "2": {
    id: "2",
    name: "오힐링 미인테라피",
    phone: "0507-1280-3303",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "최고급 천연 오일을 활용한 감성 아로마 전신 바디케어 프로그램 및 스웨디시 제휴 샵.",
    courses: [
      {
        category: "아로디시 코스",
        desc: "부드러운 아로마 감성과 힐링 케어를 동시에 즐길 수 있는 실속 프로그램.",
        items: [
          { time: "90분", price: "100,000원" },
          { time: "120분", price: "130,000원", recommend: true },
        ],
      },
      {
        category: "VIP 스웨디시 코스",
        badge: "인기 추천",
        desc: "고급 오일과 깊은 이완 테크닉으로 최고의 휴식을 선사하는 프리미엄 케어.",
        items: [
          { time: "60분", price: "110,000원" },
          { time: "90분", price: "130,000원", recommend: true },
          { time: "120분", price: "150,000원" },
        ],
      },
      {
        category: "한국인 스웨디시 코스",
        badge: "BEST",
        desc: "한국인 전문 관리사의 섬세하고 수준 높은 프리미엄 맞춤 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true },
        ],
      },
    ],
    features: ["선입금 ZERO 100% 후불제", "전문 힐러 상시 대기", "철저한 프라이빗 보장", "맞춤형 케어 안내"],
  },
  "3": {
    id: "3",
    name: "오힐링 주주테라피",
    phone: "0507-1280-3193",
    badge: "만족도 1위 추천",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 건식 릴렉스부터 올인원 VIP 코스까지 체계적인 프로그램.",
    courses: [
      {
        category: "건식 코스",
        desc: "뭉치고 굳은 전신 근육을 시원하게 풀어주는 정통 스트레칭 케어.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" },
        ],
      },
      {
        category: "전신아로마",
        desc: "고급 천연 오일로 피로와 긴장을 부드럽게 완화시켜주는 전신 릴렉스 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" },
        ],
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "감각적이고 섬세한 터치로 깊은 이완과 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" },
        ],
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "더욱 품격 있고 여유로운 휴식을 완성하는 프리미엄 스페셜 관리.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" },
        ],
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "종합 바디케어를 모두 즐길 수 있는 올인원 150분 힐링.",
        items: [
          { time: "150분", price: "160,000원", recommend: true },
        ],
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 세심한 터치로 완성되는 최고급 스웨디시.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true },
        ],
      },
    ],
    features: ["선입금 없는 100% 후불제", "신속한 방문 서비스", "24시간 상담 가능", "최고급 오일 사용"],
  },
  "4": {
    id: "4",
    name: "오힐링 퀸즈홈케어",
    phone: "0507-1280-3334",
    badge: "여왕처럼 누리는 VIP",
    image: "/shop4.jpg",
    desc: "여왕처럼 누리는 고품격 테라피! 전문 관리사들의 품격 있는 1:1 맞춤 방문 힐링 서비스.",
    courses: [
      {
        category: "건식 힐링 코스",
        desc: "오일 없이 건식 지압과 스트레칭으로 굳은 전신 근육을 시원하게 풀어주는 코스.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" },
        ],
      },
      {
        category: "아로마 힐링 코스",
        desc: "고급 아로마 오일을 사용하여 뭉친 피로를 부드럽게 이완시키는 방문 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" },
        ],
      },
      {
        category: "힐링스웨디시 코스",
        badge: "인기",
        desc: "부드럽고 감성적인 오일 테라피로 심신의 안정을 찾아주는 스웨디시.",
        items: [
          { time: "60분", price: "80,000원" },
          { time: "90분", price: "100,000원", recommend: true },
          { time: "120분", price: "120,000원" },
        ],
      },
      {
        category: "VIP스페셜코스",
        badge: "★추천",
        desc: "최고의 만족감을 선사하는 고품격 프리미엄 맞춤 스페셜 케어.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "150,000원" },
        ],
      },
      {
        category: "한국 관리사 코스",
        badge: "BEST",
        desc: "한국인 관리사의 전문적인 손길로 진행되는 맞춤형 프리미엄 코스.",
        items: [
          { time: "60분", price: "150,000원" },
          { time: "90분", price: "180,000원", recommend: true },
        ],
      },
    ],
    features: ["100% 후불 안심결제", "전문 관리사 상시 대기", "전지역 신속 방문", "24시간 예약 가능"],
  },
  "5": {
    id: "5",
    name: "오힐링 오늘밤스파",
    phone: "0507-1280-3223",
    badge: "야간 힐링 만족 1위",
    image: "/shop5.jpg",
    desc: "선입금 없는 100% 후불제! 깊은 밤 지친 하루의 피로를 아로마부터 스웨디시까지 완벽하게 풀어드립니다.",
    courses: [
      {
        category: "건식 코스",
        desc: "정통 건식 지압과 스트레칭으로 피로를 시원하게 해소.",
        items: [
          { time: "60분", price: "60,000원" },
          { time: "90분", price: "80,000원", recommend: true },
          { time: "120분", price: "100,000원" },
        ],
      },
      {
        category: "전신아로마",
        desc: "천연 오일의 부드러움으로 전신을 편안하게 이완시켜주는 아로마 케어.",
        items: [
          { time: "60분", price: "70,000원" },
          { time: "90분", price: "90,000원", recommend: true },
          { time: "120분", price: "110,000원" },
        ],
      },
      {
        category: "VIP 감성힐링코스",
        badge: "★추천",
        desc: "섬세하고 감각적인 터치로 깊은 힐링을 선사하는 인기 코스.",
        items: [
          { time: "60분", price: "90,000원" },
          { time: "90분", price: "110,000원", recommend: true },
          { time: "120분", price: "130,000원" },
        ],
      },
      {
        category: "VIP 스페셜코스",
        badge: "★추천",
        desc: "완벽한 휴식을 위한 고품격 프리미엄 스페셜 관리 프로그램.",
        items: [
          { time: "60분", price: "100,000원" },
          { time: "90분", price: "120,000원", recommend: true },
          { time: "120분", price: "140,000원" },
        ],
      },
      {
        category: "VIP 프리미엄 코스",
        desc: "건식 & 아로마 & 풋케어를 종합적으로 즐기는 150분 올인원 코스.",
        items: [
          { time: "150분", price: "160,000원", recommend: true },
        ],
      },
      {
        category: "한국인스웨디시",
        badge: "BEST",
        desc: "한국인 전문 관리사의 디테일하고 품격 있는 스웨디시 테라피.",
        items: [
          { time: "60분", price: "140,000원" },
          { time: "90분", price: "180,000원", recommend: true },
        ],
      },
    ],
    features: ["100% 안심 후불제", "전지역 신속 방문", "심야 24시 상시 운영", "개인 맞춤 압 조절"],
  },
};

// 지역별 샵 데이터 반환 헬퍼 함수
export function getShopsByCity(city: string): ShopInfo[] {
  const lower = city.toLowerCase();
  if (lower === "daejeon" || lower === "cheongju") {
    return [daejeonCheongjuShop];
  }
  return Object.values(metroShops);
}

export function getShopById(city: string, id: string): ShopInfo {
  const lower = city.toLowerCase();
  if (lower === "daejeon" || lower === "cheongju") {
    return daejeonCheongjuShop;
  }
  return metroShops[id] || metroShops["1"];
}