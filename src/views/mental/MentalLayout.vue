<template>
  <RoleLayout
    role-label="心理与教育"
    theme-color="linear-gradient(135deg, #8E44AD 0%, #A569BD 100%)"
    :nav-items="navItems"
  />
</template>

<script setup lang="ts">
import RoleLayout from '@/components/RoleLayout.vue'

const navItems = [
  { path: '/mental', label: '首页', icon: '🏠' },
  { path: '/mental/assessments', label: '评估', icon: '📝' },
  { path: '/mental/plans', label: '计划', icon: '🧠' },
  { path: '/mental/messages', label: '消息', icon: '💬' }
]
</script>
