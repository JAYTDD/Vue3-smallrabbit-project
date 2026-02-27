//封装分类数据业务代码
import { getCategoryDetailAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// 获取路由参数

export function useCategory() {
  const route = useRoute();
  const categoryDetail = ref({});
  const getCategory = async () => {
    const res = await getCategoryDetailAPI(route.params.id);
    categoryDetail.value = res.result;
  };

  onMounted(() => {
    getCategory();
  });

  return {
    categoryDetail
  }
}
