import http from "@/utils/http";

// 获取首页轮播图数据
export function getBannerAPI(params = {}) {
  //默认为1 商品为2
  const { distributionSite = 1 } = params
  return http({
    url: '/home/banner',
    params: {
      distributionSite
    }
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

// 获取产品列表数据
export function getGoodsAPI() {
    return http({
        url: '/home/goods'
  });
}