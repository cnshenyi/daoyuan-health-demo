<template>
  <div class="page-nav-bar">
    <button class="back-btn" @click="router.back()">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
    </button>
    <h2 class="page-nav-title">{{ title }}</h2>
    <div class="page-nav-right">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
defineProps<{ title: string }>()
</script>

<style scoped>
.page-nav-bar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 10;
}
.back-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  flex-shrink: 0;
}
.back-btn svg { width: 20px; height: 20px; color: #333; }
.page-nav-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: #1E3A5F;
  margin: 0;
  text-align: center;
}
.page-nav-right {
  width: 36px;
  display: flex;
  justify-content: flex-end;
}
</style>
