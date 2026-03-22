<template>
  <RoleLayout
    role-label="医生"
    theme-color="linear-gradient(135deg, #1E3A5F 0%, #2a5a8f 100%)"
    :nav-items="navItems"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import RoleLayout from '@/components/RoleLayout.vue'

const IconHome = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
])
const IconPatients = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z' })
])
const IconRecords = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' })
])
const IconMessage = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' })
])

const navItems = [
  { path: '/doctor', label: '首页', icon: IconHome },
  { path: '/doctor/patients', label: '患者', icon: IconPatients },
  { path: '/doctor/records', label: '病历', icon: IconRecords },
  { path: '/doctor/messages', label: '消息', icon: IconMessage }
]
</script>
