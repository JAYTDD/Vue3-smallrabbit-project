//管理用户数据相关
import { loginAPI } from "@/apis/user";
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore('user', () => {
  // 定义管理用户数据的状态
  const userInfo = ref(null)

  // 定义获取接口数据的方法
  const getUserInfo = async (account, password) => {
    const res = await loginAPI({ account, password})
    userInfo.value = res.result
    // 登录成功后，合并购物车
    const cartStore = useCartStore()
    await mergeCartAPI(cartStore.cartList.map(item => ({
      skuId: item.skuId,
      selected: item.selected,
      count: item.count
    })))
    // 获取最新购物车列表
    await cartStore.updateNewList()
  }

  // 定义清除用户信息的方法
  const clearUserInfo = () => {
    userInfo.value = null
    // 同时清除购物车数据
    const cartStore = useCartStore()
    cartStore.clearCart()
  }


  // 返回状态和方法，以供组件使用
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
},{
  persist: true // 开启持久化
})
