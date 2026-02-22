import http from "@/utils/http";

// 获取首页轮播图数据
export function getBannerAPI() {
  return http({
    url: '/home/banner'
  });
}

// 获取首页新鲜好物数据
export function getNewAPI() {
    return http({
        url: '/home/new'
  });
}

// 获取首页人气推荐数据
export function getHotAPI() {
    return http({
        url: '/home/hot'
  });
}