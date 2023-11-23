
<template>
  <router-view v-slot="{ Component, route }" :key="router.fullPath">
        <component :is="Component" />
  </router-view>
</template>
<script setup>
  import { useRouter } from 'vue-router' ;
  const router = useRouter() ;
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
