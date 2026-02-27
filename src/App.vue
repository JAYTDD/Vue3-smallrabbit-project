<script setup></script>

<template>
  <router-view :key="$route.fullPath" />
</template>

<style scoped lang="scss">
.test {
  color: $priceColor;
}
</style>
