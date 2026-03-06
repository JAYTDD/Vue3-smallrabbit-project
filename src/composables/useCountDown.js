// 封装倒计时逻辑函数
import { computed, ref } from "vue";
import dayjs from "dayjs";

export const useCountDown = () => {
  // 响应式数据
  const time = ref(0);
  // 格式化时间函数
  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));
  // 开启倒计时函数
  const start = (currentTime) => {
    time.value = currentTime;
    // 计算剩余时间
    timer = setInterval(() => {
      time.value--;
    },1000)
  }
   onUnmounted(() => clearInterval(timer)) // 组件卸载时清除定时器

  return {
    formatTime,
    start
  }
}
