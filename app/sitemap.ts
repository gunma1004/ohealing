import { MetadataRoute } from 'next';
import { regionData } from '@/lib/regions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ohealing.netlify.app';
  const lastModified = new Date();

  // 1. 메인 홈
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 상단 카테고리
  const categories = ['services', 'prices', 'travel', 'places', 'reviews'];
  for (const cat of categories) {
    routes.push({
      url: `${baseUrl}/${cat}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 3. 메인 기본 샵 상세 (1~5)
  const defaultShopIds = ['1', '2', '3', '4', '5'];
  for (const id of defaultShopIds) {
    routes.push({
      url: `${baseUrl}/shop/${id}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // 4. 시/도, 구, 동, 샵 전체 순회
  for (const [cityKey, regInfo] of Object.entries(regionData)) {
    const lowerCity = cityKey.toLowerCase();
    const isSingleShopCity = lowerCity === 'daejeon' || lowerCity === 'cheongju';
    const currentShopIds = isSingleShopCity ? ['1'] : defaultShopIds;

    // 시/도 페이지
    routes.push({
      url: `${baseUrl}/${lowerCity}`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    });

    // 시/도 샵 상세
    for (const sId of currentShopIds) {
      routes.push({
        url: `${baseUrl}/${lowerCity}/shop/${sId}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }

    if (!regInfo.districts) continue;

    for (const [districtKey, distInfo] of Object.entries(regInfo.districts)) {
      const lowerDistrict = districtKey.toLowerCase();

      // 구/군 페이지
      routes.push({
        url: `${baseUrl}/${lowerCity}/${lowerDistrict}`,
        lastModified,
        changeFrequency: 'daily',
        priority: 0.85,
      });

      // 구/군 샵 상세
      for (const sId of currentShopIds) {
        routes.push({
          url: `${baseUrl}/${lowerCity}/${lowerDistrict}/shop/${sId}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }

      // 동 페이지 및 동 샵 상세
      if (distInfo.dongs && Array.isArray(distInfo.dongs)) {
        for (const dong of distInfo.dongs) {
          const encodedDong = encodeURIComponent(dong);

          // 동 페이지 (예: /seoul/jongno/%EC%82%AC%EC%A7%81%EB%8F%99)
          routes.push({
            url: `${baseUrl}/${lowerCity}/${lowerDistrict}/${encodedDong}`,
            lastModified,
            changeFrequency: 'daily',
            priority: 0.8,
          });

          // 동 하위 샵 상세 (예: /seoul/jongno/%EC%82%AC%EC%A7%81%EB%8F%99/shop/1)
          for (const sId of currentShopIds) {
            routes.push({
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

  return routes;
}