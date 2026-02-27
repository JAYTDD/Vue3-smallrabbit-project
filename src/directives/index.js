// 定义懒加载插件
import { useIntersectionObserver } from "@vueuse/core";

export const lazyPlugin = {
    install(app) {
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
    }
}