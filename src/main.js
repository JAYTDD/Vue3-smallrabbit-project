// 引入全局样式
import "@/styles/common.scss";
import { useIntersectionObserver } from "@vueuse/core";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 定义全局指令
app.directive("img-lazy", {
  mounted(el, binding) {
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = binding.value; // 将指令的值设置为图片的src
        stop(); // 图片加载后停止监听，优化性能
      }
    });
  },
});

app.mount("#app");
