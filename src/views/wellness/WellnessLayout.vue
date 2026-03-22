<template>
  <RoleLayout
    role-label="营养与康复"
    theme-color="linear-gradient(135deg, #E67E22 0%, #F39C12 100%)"
    :nav-items="navItems"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import RoleLayout from '@/components/RoleLayout.vue'

const IconHome = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
])
const IconPlan = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z' })
])
const IconTracking = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' })
])
const IconMessage = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' })
])

const navItems = [
  { path: '/wellness', label: '首页', icon: IconHome },
  { path: '/wellness/plans', label: '方案', icon: IconPlan },
  { path: '/wellness/tracking', label: '跟踪', icon: IconTracking },
  { path: '/wellness/messages', label: '消息', icon: IconMessage }
]
</script>
