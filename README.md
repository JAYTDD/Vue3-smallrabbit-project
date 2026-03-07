# Vue3 Small Rabbit Project

基于 `Vue 3 + Vite + Pinia + Vue Router + Element Plus` 的电商前端实战项目（小兔鲜）。

项目覆盖了电商核心链路：`登录 -> 商品浏览 -> 购物车 -> 结算下单 -> 支付 -> 会员订单`，并包含分类、商品详情、猜你喜欢、图片懒加载、购物车合并等典型业务场景。

## 1. 项目特性

- 前端技术栈现代化：`Vue 3 Composition API`、`Vite`、`Pinia`。
- 路由结构清晰：一级布局 + 二级业务页 + 会员中心三级路由。
- 购物车支持游客态与登录态：
  - 游客态本地维护购物车
  - 登录态走服务端购物车，并在登录后自动合并
- 统一请求封装：
  - `axios` 二次封装
  - 自动注入 `token`
  - 统一错误提示
  - `401` 自动清理登录态并跳转登录页
- 组件与样式工程化：
  - Element Plus 自动导入
  - 全局组件插件注册
  - 全局指令（图片懒加载）
  - SCSS 变量与主题样式统一注入

## 2. 技术栈

### 核心依赖

- `vue` `^3.5.28`
- `vue-router` `^5.0.2`
- `pinia` `^3.0.4`
- `pinia-plugin-persistedstate` `^4.7.1`
- `axios` `^1.13.5`
- `element-plus` `^2.13.2`
- `@vueuse/core` `^14.2.1`
- `dayjs` `^1.11.19`

### 工程化依赖

- `vite` `^7.3.1`
- `@vitejs/plugin-vue`
- `vite-plugin-vue-devtools`
- `unplugin-auto-import`
- `unplugin-vue-components`
- `sass`
- `eslint` + `oxlint`

### 运行环境

- Node.js：`^20.19.0 || >=22.12.0`

## 3. 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

默认启动后访问：`http://127.0.0.1:5173`（或终端输出地址）。

### 生产构建

```bash
npm run build
```

### 本地预览构建产物

```bash
npm run preview
```

### 代码检查与自动修复

```bash
npm run lint
```

该命令会串行执行：

- `npm run lint:oxlint`
- `npm run lint:eslint`

## 4. 目录结构

```text
src/
  apis/                # 接口模块（按业务拆分）
  assets/              # 静态资源（图片、基础样式）
  components/          # 全局可复用组件（ImageView、XtxSku）
  composables/         # 组合式函数（如倒计时）
  directives/          # 全局指令（图片懒加载）
  router/              # 路由配置
  stores/              # Pinia 状态管理
  styles/              # 全局 SCSS、变量、Element 覆盖样式
  utils/               # 通用工具（http 请求封装）
  views/               # 页面级组件
    Layout/            # 网站框架（导航、页头、页脚、吸顶）
    Home/              # 首页
    Category/          # 一级分类
    SubCategory/       # 二级分类
    Detail/            # 商品详情
    CartList/          # 购物车列表
    Checkout/          # 结算页
    Pay/               # 支付页 + 支付回调页
    Login/             # 登录页
    Member/            # 会员中心 + 订单管理
```

## 5. 路由说明

路由文件：`src/router/index.js`

### 一级路由

- `/`：主布局页 `Layout`
- `/login`：登录页

### 主布局子路由

- ``（空路径）=> 首页 `Home`
- `/category/:id` => 一级分类
- `/category/sub/:id` => 二级分类
- `/detail/:id` => 商品详情
- `/cartlist` => 购物车
- `/checkout` => 结算
- `/pay` => 支付
- `/paycallback` => 支付回调
- `/member` => 会员中心

### 会员中心三级路由

- `/member` => 个人中心 `UserInfo`
- `/member/order` => 我的订单 `UserOrder`

## 6. 业务功能说明

### 6.1 用户与登录

- 登录接口：`POST /login`
- 登录成功后：
  - 将用户信息写入 `userStore`
  - 合并游客购物车到服务端
  - 拉取最新服务端购物车
- 通过 `pinia-plugin-persistedstate` 持久化用户信息

相关文件：

- `src/stores/user.js`
- `src/apis/user.js`

### 6.2 购物车

- 游客态：本地 `cartList` 增删改查
- 登录态：调用服务端购物车接口
  - 添加：`POST /member/cart`
  - 查询：`GET /member/cart`
  - 删除：`DELETE /member/cart`
  - 合并：`POST /member/cart/merge`
- 提供常用计算属性：
  - 总数量、总价
  - 已选数量、已选总价
  - 是否全选

相关文件：

- `src/stores/cartStore.js`
- `src/apis/cart.js`
- `src/views/CartList/index.vue`

### 6.3 结算与下单

- 获取预订单信息：`GET /member/order/pre`
- 支持切换收货地址
- 创建订单：`POST /member/order`
- 下单成功后跳转支付页并刷新购物车

相关文件：

- `src/apis/checkout.js`
- `src/views/Checkout/index.vue`

### 6.4 支付流程

- 获取订单信息：`GET /member/order/:id`
- 支付页展示倒计时、应付金额、支付方式
- 支付回调页根据 `payResult` 展示成功/失败状态

相关文件：

- `src/apis/pay.js`
- `src/views/Pay/index.vue`
- `src/views/Pay/PayBack.vue`
- `src/composables/useCountDown.js`

### 6.5 会员中心与订单

- 会员主页展示个人信息与猜你喜欢
- 订单页支持按状态筛选与分页
- 订单状态映射（待付款、待发货、待收货等）

相关文件：

- `src/views/Member/index.vue`
- `src/views/Member/components/UserInfo.vue`
- `src/views/Member/components/UserOrder.vue`
- `src/apis/order.js`

## 7. 接口与请求约定

请求封装文件：`src/utils/http.js`

- `baseURL`：`http://pcapi-xiaotuxian-front-devtest.itheima.net`
- 请求拦截器：自动携带 `Authorization: Bearer <token>`
- 响应拦截器：
  - 统一 `ElMessage` 错误提示
  - 遇到 `401`：清空用户信息并重定向到 `/login`

## 8. 全局能力

### 全局组件

- `ImageView`
- `XtxSku`

注册文件：`src/components/index.js`

### 全局指令

- `v-img-lazy`：基于 `@vueuse/core` 的 `useIntersectionObserver` 实现图片懒加载

注册文件：`src/directives/index.js`

### 样式与主题

- 在 `vite.config.js` 中为所有 SCSS 自动注入：
  - `@/styles/element/index.scss`
  - `@/styles/var.scss`

## 9. 可继续优化点

- 登录页字段 `accout` 命名可统一为 `account`，减少歧义。
- 倒计时组合函数可补充 `onUnmounted` 显式导入和定时器空值保护。
- 部分页面可补充异常态（接口失败、空地址、支付失败后的引导跳转）。
- 可增加单元测试/集成测试，提升回归稳定性。

## 10. 参考命令

```bash
# 启动开发环境
npm run dev

# 打包
npm run build

# 预览打包产物
npm run preview

# 代码规范检查并自动修复
npm run lint
```

## 11. 许可证

当前仓库未显式声明 LICENSE 文件，如需开源发布，建议补充许可证说明。
