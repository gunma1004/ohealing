import { MetadataRoute } from 'next';
import { regionData } from '@/lib/regions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ohealing.netlify.app';
  const lastModified = new Date();

  // 1. 메인 홈 페이지
  const mainRoute: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 상단 카테고리 메인 페이지
  const categories = ['services', 'prices', 'travel', 'places', 'reviews'];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. 메인 기본 제휴업체 상세 페이지 (/shop/1 ~ /shop/5)
  const defaultShopIds = ['1', '2', '3', '4', '5'];
  const shopRoutes: MetadataRoute.Sitemap = defaultShopIds.map((id) => ({
    url: `${baseUrl}/shop/${id}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const allRoutes: MetadataRoute.Sitemap = [...mainRoute, ...categoryRoutes, ...shopRoutes];

  // 4. 시/도, 구, 동, 샵 상세 구조 순회 매핑
  for (const [cityKey, regInfo] of Object.entries(regionData)) {
    const lowerCity = cityKey.toLowerCase();
    
    // 🌟 대전과 청주는 단독 1곳('1'), 수도권(서울/경기/인천)은 5곳('1'~'5')
    const isSingleShopCity = lowerCity === 'daejeon' || lowerCity === 'cheongju';
    const currentShopIds = isSingleShopCity ? ['1'] : defaultShopIds;

    // 시/도 단위 페이지 (/seoul, /daejeon, /cheongju 등)
    allRoutes.push({
      url: `${baseUrl}/${lowerCity}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // 시/도 단위 샵 상세 페이지 (/daejeon/shop/1, /seoul/shop/1~5 등)
    for (const sId of currentShopIds) {
      allRoutes.push({
        url: `${baseUrl}/${lowerCity}/shop/${sId}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    for (const [districtKey, distInfo] of Object.entries(regInfo.districts)) {
      const lowerDistrict = districtKey.toLowerCase();

      // 구/시/군 단위 페이지 (/daejeon/seo, /cheongju/heungdeok 등)
      allRoutes.push({
        url: `${baseUrl}/${lowerCity}/${lowerDistrict}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.9,
      });

      // 구 단위 샵 상세 페이지 (대전/청주는 shop/1만 생성)
      for (const sId of currentShopIds) {
        allRoutes.push({
          url: `${baseUrl}/${lowerCity}/${lowerDistrict}/shop/${sId}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }

      // 세부 동 단위 페이지 및 동 단위 샵 상세 페이지
      if (distInfo.dongs && Array.isArray(distInfo.dongs)) {
        for (const dong of distInfo.dongs) {
          const encodedDong = encodeURIComponent(dong);

          // 동 단위 페이지 (/daejeon/seo/둔산동 등)
          allRoutes.push({
            url: `${baseUrl}/${lowerCity}/${lowerDistrict}/${encodedDong}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.85,
          });

          // 동 단위 하위 샵 상세 페이지 (대전/청주는 shop/1만 등록)
          for (const sId of currentShopIds) {
            allRoutes.push({
              url: `${baseUrl}/${lowerCity}/${lowerDistrict}/${encodedDong}/shop/${sId}`,
              lastModified,
              changeFrequency: 'weekly',
              priority: 0.75,
            });
          }
        }
      }
    }
  }

  return allRoutes;
}