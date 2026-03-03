// 封装购物车模块
import { useUserStore } from './user'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => {
    // 判断用户是否登录，如果 userInfo 中有 token 就认为是登录状态
    return !!userStore.userInfo?.token
  })
  console.log(isLogin);

  // 定义购物车列表
  const cartList = ref([])

  // 获取最新购物车列表
  const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
  }

  // 添加商品到购物车
  const addCart = async (goods) => {
    if (isLogin.value) {
      // 已登录，调用接口添加到服务器购物车
      await insertCartAPI({ skuId: goods.skuId, count: goods.count })
      // 获取最新购物车列表
      await updateNewList()

    }else {
      // 没有登录，直接添加到购物车
      // 如果购物车中已经有该商品，则增加数量，否则添加新商品
      const isHaveGood = cartList.value.find(item => item.skuId === goods.skuId)
      if(isHaveGood) {
        isHaveGood.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }

  // 删除购物车操作
  const delCart = async (skuId) => {
    if (isLogin.value) {
      // 已登录，调用接口删除服务器购物车中的商品
      await delCartAPI([skuId])
      await updateNewList()
    }else {
      // 未登录，直接从本地购物车中删除商品
      const index = cartList.value.findIndex(item => item.skuId === skuId)
      if (index > -1) cartList.value.splice(index, 1)
    }
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }


  // 单选功能
  const singleCheck = (selected, skuId) => {
    // 更新购物车中对应商品的 selected 状态
    const item = cartList.value.find(item => item.skuId === skuId)
    if(item) {
      item.selected = selected
    }
  }

  // 全选功能
  const allCheck = (selected) => {
    cartList.value.forEach(item => item.selected = selected)
  }



  // 计算属性
  // 购物车总数量
  const totalCount = computed(() => {
    return cartList.value.reduce((total, item) => total + item.count, 0)
  })
  // 购物车总价
  const totalPrice = computed(() => {
    return cartList.value.reduce((total, item) => total + item.count * item.price, 0)
  })
  // 是否全选
  const isAll = computed(() => {
    return cartList.value.every(item => item.selected)
  })
  // 已选择数量
  const selectedCount = computed(() => {
    return cartList.value.reduce((total, item) => total + (item.selected ? item.count : 0), 0)
  })
  // 已选择总价
  const selectedPrice = computed(() => {
    return cartList.value.reduce((total, item) => total + (item.selected ? item.count * item.price : 0), 0)
  })


  return {
    cartList,
    addCart,
    delCart,
    updateNewList,
    singleCheck,
    totalCount,
    totalPrice,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    clearCart
  }
},{
  persist: true
})
