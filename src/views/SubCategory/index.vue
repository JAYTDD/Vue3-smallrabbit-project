<script setup>
import { onMounted, ref } from 'vue'
import { getCategoryFilterAPI } from '@/apis/category';
import { getSubCategoryAPI } from '@/apis/category';
import { useRoute } from 'vue-router';
import GoodsItem from '@/views/Home/components/GoodsItem.vue';

// 获取面包屑导航数据
const categoryData = ref({})
const route = useRoute()
const getCategoryFilter = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}
onMounted(() => { getCategoryFilter() })

// 获取商品列表数据
const goodsList = ref([])

// 请求参数
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})

const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value = res.result.items

}
onMounted(() => { getGoodsList() })

// tab切换回调
const tabChange = () => {
  console.log('tabChange', reqData.value.sortField);
  // 切换tab时，重置页码为1，并重新获取商品列表数据
  reqData.value.page = 1
  // 重新获取商品列表数据
  getGoodsList()
}

// 加载更多
const disabled = ref(false) // 是否禁用无限滚动
const load = async() => {
  console.log('load');
  // 加载更多时，页码加1，并获取下一页的商品列表数据
  reqData.value.page += 1
  const res = await getSubCategoryAPI(reqData.value)
  // 将新获取的商品列表数据追加到现有的商品列表中
  goodsList.value = [...goodsList.value, ...res.result.items]
  // 如果没有更多数据了，可以取消无限滚动的监听
  if(res.result.items.length === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}</el-breadcrumb-item>
         <el-breadcrumb-item :to="{ path: `/category/sub/${categoryData.id}` }">{{categoryData.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container" >

      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll = "load" :infinite-scroll-disabled="disabled" >
         <!-- 商品列表-->
        <GoodsItem :goods="goodsList" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
