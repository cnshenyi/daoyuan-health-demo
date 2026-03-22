<template>
  <RoleLayout
    role-label="医生"
    theme-color="linear-gradient(135deg, #1E3A5F 0%, #2a5a8f 100%)"
    :nav-items="navItems"
  />
</template>

<script setup lang="ts">
import RoleLayout from '@/components/RoleLayout.vue'

const navItems = [
  { path: '/doctor', label: '首页', icon: '🏠' },
  { path: '/doctor/patients', label: '患者', icon: '🩺' },
  { path: '/doctor/records', label: '病历', icon: '📋' },
  { path: '/doctor/messages', label: '消息', icon: '💬' }
]
</script>
