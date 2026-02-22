<script setup>
import HomePanel from "./HomePanel.vue";
import { onMounted, ref } from "vue";
import { getHotAPI } from "@/apis/home";

const hotList = ref([]);
const getHot = async () => {
  const res = await getHotAPI();
  hotList.value = res.result;
};
onMounted(() => {
  getHot();
});
</script>

<template>
  <HomePanel title="人气推荐" subTitle="人气爆款 品质靠谱">
    <!-- 插槽主体内容 -->
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="alt">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in hotList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .alt {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
