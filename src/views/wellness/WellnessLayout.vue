<template>
  <RoleLayout
    role-label="营养与康复"
    theme-color="linear-gradient(135deg, #E67E22 0%, #F39C12 100%)"
    :nav-items="navItems"
  />
</template>

<script setup lang="ts">
import RoleLayout from '@/components/RoleLayout.vue'

const navItems = [
  { path: '/wellness', label: '首页', icon: '🏠' },
  { path: '/wellness/plans', label: '方案', icon: '🥗' },
  { path: '/wellness/tracking', label: '跟踪', icon: '📊' },
  { path: '/wellness/messages', label: '消息', icon: '💬' }
]
</script>
