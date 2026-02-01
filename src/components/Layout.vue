<template>
  <el-container class="layout-container">
    <!-- Desktop Sidebar -->
    <el-aside width="250px" class="sidebar desktop-only">
      <div class="logo">
        <h2>道远医疗</h2>
        <p>国际健康跟踪管理系统</p>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        router
      >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/health-records">
          <el-icon><Document /></el-icon>
          <span>健康档案</span>
        </el-menu-item>
        <el-menu-item index="/glucose-monitoring">
          <el-icon><TrendCharts /></el-icon>
          <span>血糖监测</span>
        </el-menu-item>
        <el-menu-item index="/progress-notes">
          <el-icon><Notebook /></el-icon>
          <span>病程记录</span>
        </el-menu-item>
        <el-menu-item index="/team-collaboration">
          <el-icon><User /></el-icon>
          <span>团队协作</span>
        </el-menu-item>
        <el-menu-item index="/service-projects">
          <el-icon><List /></el-icon>
          <span>服务项目</span>
        </el-menu-item>
        <el-menu-item index="/messages">
          <el-icon><ChatDotRound /></el-icon>
          <span>消息中心</span>
          <span v-if="messageStore.unreadCount > 0" class="menu-badge">{{ messageStore.unreadCount }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- iOS Status Bar Spacer (只在 iOS PWA standalone 模式显示) -->
      <div v-if="isIOSPWA" class="ios-status-bar-spacer"></div>
      <!-- Header -->
      <el-header class="header">
        <!-- Mobile: 返回按钮（子页面）或 Logo（首页） -->
        <div class="mobile-header-left mobile-only">
          <button v-if="isSubPage" class="back-btn" @click="router.back()">
            <svg viewBox="0 0 24 24" fill="none" class="back-icon">
              <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <img v-else src="/images/logo-white.png" alt="道远医疗" class="header-logo-img" />
        </div>

        <el-breadcrumb separator="/" class="desktop-only">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="currentRouteName !== 'Dashboard'">
            {{ currentRouteName }}
          </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- Mobile Title (hide on Dashboard) -->
        <div class="mobile-title mobile-only" v-if="route.name !== 'Dashboard'">
          <h3>{{ currentRouteName }}</h3>
        </div>

        <div class="header-right">
          <el-dropdown popper-class="user-dropdown-popper" :teleported="false">
            <div class="user-info">
              <el-avatar :src="userStore.user?.avatar" />
              <span class="username desktop-only">{{ userStore.user?.name }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goToProfile">
                  <el-icon><User /></el-icon>
                  个人信息
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

      <!-- Mobile Bottom Navigation -->
      <div class="bottom-nav mobile-only">
        <div
          v-for="item in navItems"
          :key="item.path"
          :class="['nav-item', { active: activeMenu === item.path }]"
          @click="navigateTo(item.path)"
        >
          <div class="nav-icon-wrapper">
            <el-icon :size="24">
              <component :is="item.icon" />
            </el-icon>
            <span v-if="item.path === '/messages' && messageStore.unreadCount > 0" class="nav-badge">
              {{ messageStore.unreadCount > 99 ? '99+' : messageStore.unreadCount }}
            </span>
          </div>
          <span class="nav-label">{{ item.label }}</span>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import { ElMessage } from 'element-plus'
import {
  HomeFilled,
  Document,
  TrendCharts,
  Notebook,
  User,
  List,
  ChatDotRound
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const messageStore = useMessageStore()

const activeMenu = computed(() => route.path)

// 检测是否是子页面（非底部导航的主页面）
// 底部导航只有：首页、血糖、团队、服务、消息
const mainPages = ['/', '/glucose-monitoring', '/team-collaboration', '/service-projects', '/messages']
const isSubPage = computed(() => !mainPages.includes(route.path))

// 检测是否是 iOS PWA standalone 模式
const isIOSPWA = computed(() => {
  if (typeof window === 'undefined') return false
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isStandalone = (window.navigator as any).standalone === true || 
                       window.matchMedia('(display-mode: standalone)').matches
  return isIOS && isStandalone
})

const routeNameMap: Record<string, string> = {
  'Dashboard': '首页',
  'HealthRecords': '健康档案',
  'GlucoseMonitoring': '血糖监测',
  'ProgressNotes': '病程记录',
  'TeamCollaboration': '团队协作',
  'ServiceProjects': '服务项目',
  'MembershipBenefits': '会员权益',
  'Messages': '消息中心',
  'PremiumService': '至尊服务',
  'Profile': '个人信息'
}

const currentRouteName = computed(() => {
  const name = route.name as string
  return routeNameMap[name] || name
})

const navItems = [
  { path: '/', label: '首页', icon: HomeFilled },
  { path: '/glucose-monitoring', label: '血糖', icon: TrendCharts },
  { path: '/team-collaboration', label: '团队', icon: User },
  { path: '/service-projects', label: '服务', icon: List },
  { path: '/messages', label: '消息', icon: ChatDotRound }
]

const navigateTo = (path: string) => {
  router.push(path)
}

const goToProfile = () => {
  router.push('/profile')
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
  background-color: var(--color-bg-primary);
}

/* ========================================
   桌面端侧边栏
   ======================================== */
.sidebar {
  background: linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: var(--color-text-light);
  overflow-y: auto;
  box-shadow: var(--shadow-md);
}

.logo {
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.logo h2 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-light);
  font-weight: 700;
  letter-spacing: 2px;
}

.logo p {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.sidebar-menu {
  border-right: none;
  background-color: transparent;
  padding: var(--spacing-md) 0;
}

.sidebar-menu :deep(.el-menu-item) {
  color: rgba(255, 255, 255, 0.8);
  margin: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all 0.3s ease;
}

.sidebar-menu :deep(.el-menu-item:hover) {
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-text-light);
  transform: translateX(4px);
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%);
  color: var(--color-text-light);
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
}

.sidebar-menu :deep(.el-menu-item .el-icon) {
  font-size: var(--font-size-lg);
  margin-right: var(--spacing-sm);
}

/* ========================================
   iOS 状态栏占位
   ======================================== */
.ios-status-bar-spacer {
  display: block;
  height: env(safe-area-inset-top, 44px);
  min-height: 44px;
  background: #1E3A5F;
}

/* ========================================
   顶部 Header
   ======================================== */
.header {
  background: #1E3A5F;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-xl);
  box-shadow: 0 4px 16px rgba(30, 58, 95, 0.2);
}

.mobile-header-left {
  display: none;
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.back-btn:active {
  transform: scale(0.95);
}

.back-icon {
  width: 20px;
  height: 20px;
  color: white;
}

.header-logo-img {
  height: 32px;
  width: auto;
  filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2));
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  outline: none;
  background: transparent !important;
  border: none;
}

.user-info:focus,
.user-info:focus-visible,
.user-info:active {
  outline: none;
  box-shadow: none;
  background: transparent !important;
}

.user-info :deep(.el-avatar) {
  border: none;
  box-shadow: none;
}

.user-info:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* 头像按钮容器 - 去掉白色背景 */
.header-right :deep(.el-dropdown) {
  background: transparent;
}

.header-right :deep(.el-dropdown .el-tooltip__trigger) {
  background: transparent;
  border: none;
  padding: 0;
}

/* 下拉菜单样式 - 在组件内覆盖 */
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
  margin: 2px 0 !important;
}

.header-right :deep(.el-dropdown-menu__item:hover) {
  background: rgba(201, 169, 98, 0.15) !important;
  color: #C9A962 !important;
}

.header-right :deep(.el-dropdown-menu__item .el-icon) {
  color: #C9A962 !important;
  margin-right: 8px !important;
}

.header-right :deep(.el-dropdown-menu__item--divided) {
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  margin-top: 8px !important;
}

.header-right :deep(.el-popper) {
  background: transparent !important;
  border: none !important;
}

.header-right :deep(.el-popper__arrow) {
  display: none !important;
}

/* 非 teleported 模式下的下拉菜单 */
.header-right .el-dropdown__popper {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.header-right .el-dropdown__popper .el-dropdown-menu {
  background: linear-gradient(135deg, #1a2a4a 0%, #243656 100%) !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 8px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4) !important;
}

.header-right .el-dropdown__popper .el-dropdown-menu__item {
  color: rgba(255, 255, 255, 0.9) !important;
  border-radius: 8px !important;
  padding: 12px 16px !important;
  margin: 2px 0 !important;
}

.header-right .el-dropdown__popper .el-dropdown-menu__item:hover {
  background: rgba(201, 169, 98, 0.15) !important;
  color: #C9A962 !important;
}

.header-right .el-dropdown__popper .el-dropdown-menu__item .el-icon {
  color: #C9A962 !important;
}

.header-right .el-dropdown__popper .el-dropdown-menu__item--divided {
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  margin-top: 8px !important;
}

.username {
  margin-left: var(--spacing-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-primary);
}

/* ========================================
   主内容区域
   ======================================== */
.main-content {
  background-color: var(--color-bg-primary);
  overflow-y: auto;
  padding: var(--spacing-md);
}

/* ========================================
   移动端底部导航栏 - 高端医疗风格
   ======================================== */
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border-light);
  box-shadow: 0 -4px 16px rgba(30, 58, 95, 0.08);
  z-index: 1000;
  padding: var(--spacing-sm) 0;
  backdrop-filter: blur(10px);
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-text-tertiary);
  position: relative;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
  transition: width 0.3s ease;
}

.nav-item.active {
  color: var(--color-primary);
}

.nav-item.active::before {
  width: 40px;
}

.nav-item :deep(.el-icon) {
  font-size: 24px;
  margin-bottom: var(--spacing-xs);
  transition: all 0.3s ease;
}

.nav-item.active :deep(.el-icon) {
  color: var(--color-accent);
  transform: scale(1.1);
}

.nav-label {
  font-size: var(--font-size-xs);
  margin-top: var(--spacing-xs);
  font-weight: 500;
}

.nav-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-badge {
  position: absolute;
  top: -6px;
  right: -10px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  background: #E53935;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-badge {
  margin-left: auto;
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  background: #E53935;
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-title {
  display: none;
}

.mobile-title h3 {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: #FFFFFF;
}

/* ========================================
   响应式设计 - 移动优先
   ======================================== */
@media (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .mobile-header-left {
    display: flex !important;
  }

  .bottom-nav {
    display: flex;
  }

  .layout-container {
    height: 100vh;
  }

  .header {
    padding: 0 var(--spacing-md);
    height: 56px !important;
  }

  .main-content {
    padding: var(--spacing-sm);
    padding-bottom: 80px;
  }

  .user-info {
    padding: var(--spacing-xs);
  }

  /* Element Plus 组件移动端适配 */
  :deep(.el-card) {
    margin-bottom: var(--spacing-md);
    border-radius: var(--radius-lg);
  }

  :deep(.el-table) {
    font-size: var(--font-size-sm);
  }

  :deep(.el-button) {
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
  }
}

/* ========================================
   桌面端
   ======================================== */
@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }

  .desktop-only {
    display: flex !important;
  }
}
</style>
