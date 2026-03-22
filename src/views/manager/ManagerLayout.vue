<template>
  <RoleLayout
    role-label="健康管家"
    theme-color="linear-gradient(135deg, #2E8B57 0%, #3DA06A 100%)"
    :nav-items="navItems"
  />
</template>

<script setup lang="ts">
import RoleLayout from '@/components/RoleLayout.vue'

const navItems = [
  { path: '/manager', label: '首页', icon: '🏠' },
  { path: '/manager/members', label: '会员', icon: '👥' },
  { path: '/manager/tasks', label: '待办', icon: '📋' },
  { path: '/manager/messages', label: '消息', icon: '💬' }
]
</script>
