<template>
  <el-container class="layout-container">
    <!-- iOS Status Bar Spacer -->
    <div v-if="isIOSPWA" class="ios-status-bar-spacer"></div>
    <!-- Header -->
    <el-header class="header" :style="{ background: themeColor }">
      <div class="header-left">
        <img src="/images/logo-white.png" alt="道远医疗" class="header-logo-img" />
      </div>
      <div class="header-right">
        <span class="role-badge">{{ roleLabel }}</span>
        <el-dropdown :teleported="false">
          <div class="user-info">
            <el-avatar :src="userStore.user?.avatar" :size="32" />
            <span class="username">{{ userStore.user?.name }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleSwitchRole">
                <el-icon><Switch /></el-icon>
                切换身份
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <!-- Main Content -->
    <el-main class="main-content">
      <router-view />
    </el-main>

    <!-- Bottom Navigation -->
    <div class="bottom-nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        :class="['nav-item', { active: isActive(item.path) }]"
        @click="navigateTo(item.path)"
      >
        <div class="nav-icon">
          <component :is="item.icon" />
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { SwitchButton, Switch } from '@element-plus/icons-vue'

interface NavItem {
  path: string
  label: string
  icon: any
}

const props = defineProps<{
  roleLabel: string
  themeColor: string
  navItems: NavItem[]
}>()

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const isIOSPWA = computed(() => {
  if (typeof window === 'undefined') return false
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isStandalone = (window.navigator as any).standalone === true ||
                       window.matchMedia('(display-mode: standalone)').matches
  return isIOS && isStandalone
})

const isActive = (path: string) => route.path === path

const navigateTo = (path: string) => {
  router.push(path)
}

const handleSwitchRole = () => {
  userStore.logout()
  router.push('/login')
}

const handleLogout = () => {
  userStore.logout()
  ElMessage.success('退出登录成功')
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
  background-color: #f5f7fa;
  flex-direction: column;
}

.ios-status-bar-spacer {
  display: block;
  height: env(safe-area-inset-top, 44px);
  min-height: 44px;
  background: inherit;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px !important;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-logo-img {
  height: 28px;
  width: auto;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.9);
  font-weight: 500;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.user-info:hover {
  background: rgba(255,255,255,0.1);
}

.username {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  font-weight: 500;
}

.header-right :deep(.el-dropdown-menu) {
  background: linear-gradient(135deg, #1a2a4a 0%, #243656 100%) !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 8px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4) !important;
}

.header-right :deep(.el-dropdown-menu__item) {
  color: rgba(255, 255, 255, 0.9) !important;
  border-radius: 8px !important;
  padding: 12px 16px !important;
}

.header-right :deep(.el-dropdown-menu__item:hover) {
  background: rgba(201, 169, 98, 0.15) !important;
  color: #C9A962 !important;
}

.header-right :deep(.el-dropdown-menu__item .el-icon) {
  color: #C9A962 !important;
}

.header-right :deep(.el-dropdown-menu__item--divided) {
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.header-right :deep(.el-popper__arrow) {
  display: none !important;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  padding-bottom: 70px;
}

/* 底部导航 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  padding: 6px 0;
  padding-bottom: calc(6px + env(safe-area-inset-bottom, 0px));
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.05);
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
  cursor: pointer;
  color: #999;
  transition: color 0.2s;
}

.nav-item.active {
  color: #1E3A5F;
}

.nav-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon :deep(svg) {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
}
</style>
