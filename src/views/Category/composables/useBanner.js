// 封装banner轮播图相关业务代码
import { getBannerAPI } from "@/apis/home";
import { ref, onMounted } from "vue";
export function useBanner() {

  const bannerList = ref([]);
  const getBanner = async () => {
    const params = { distributionSite: 2 };
    const res = await getBannerAPI(params);
    bannerList.value = res.result;
  }

  onMounted(() => {
      getBanner();
  })

  return {
    bannerList
  }
}
