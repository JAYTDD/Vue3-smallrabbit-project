// 把components 中的组件都进行全局化注册
// 通过插件的方式注册
import ImageView from "./ImageView/index.vue";
import XtxSku from "./XtxSku/index.vue";

export const componentsPlugin = {
    install(app) {
      // 格式 components (组件名，组件对象)
        app.component("ImageView", ImageView);
        app.component("XtxSku", XtxSku);
    }
}
