<template>
  <RoleLayout
    role-label="心理与教育"
    theme-color="linear-gradient(135deg, #8E44AD 0%, #A569BD 100%)"
    :nav-items="navItems"
  />
</template>

<script setup lang="ts">
import { h } from 'vue'
import RoleLayout from '@/components/RoleLayout.vue'

const IconHome = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
])
const IconAssess = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z' })
])
const IconPlan = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z' })
])
const IconMessage = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z' })
])

const navItems = [
  { path: '/mental', label: '首页', icon: IconHome },
  { path: '/mental/assessments', label: '评估', icon: IconAssess },
  { path: '/mental/plans', label: '计划', icon: IconPlan },
  { path: '/mental/messages', label: '消息', icon: IconMessage }
]
</script>
