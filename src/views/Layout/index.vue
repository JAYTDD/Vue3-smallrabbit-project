<script setup>
import LayoutFooter from "./components/LayoutFooter.vue";
import LayoutFixed from "./components/LayoutFixed.vue";
import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutNav from "./components/LayoutNav.vue";

// 触发获取导航列表的接口
import { useCategoryStore } from '@/stores/category'
import { onMounted } from "vue";
const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getCategory()
})

</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <router-view />
  <LayoutFooter />
</template>

<style scoped></style>
