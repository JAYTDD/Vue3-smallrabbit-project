// 引入全局样式
import "@/styles/common.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { lazyPlugin } from "./directives"; // 引入懒加载插件
// 引入全局组件插件
import { componentsPlugin } from "@/components";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(lazyPlugin); // 使用懒加载插件
app.use(componentsPlugin); // 使用全局组件插件
app.mount("#app");
