<template>
  <GlobalLoading />
  <router-view />
  <PwaInstallPrompt />
  <OfflineIndicator />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import GlobalLoading from '@/components/GlobalLoading.vue'
import PwaInstallPrompt from '@/components/PwaInstallPrompt.vue'
import OfflineIndicator from '@/components/OfflineIndicator.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.checkAuth()
})
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
