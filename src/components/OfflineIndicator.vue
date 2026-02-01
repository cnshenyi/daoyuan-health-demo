<template>
  <transition name="fade">
    <div v-if="!isOnline" class="offline-banner">
      <el-icon><WarningFilled /></el-icon>
      <span>您当前处于离线状态，部分功能可能无法使用</span>
    </div>
  </transition>

  <transition name="fade">
    <div v-if="showUpdatePrompt" class="update-prompt">
      <div class="update-content">
        <el-icon :size="20"><RefreshRight /></el-icon>
        <span>发现新版本</span>
      </div>
      <el-button size="small" type="primary" @click="updateApp">更新</el-button>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { WarningFilled, RefreshRight } from '@element-plus/icons-vue'

const isOnline = ref(navigator.onLine)
const showUpdatePrompt = ref(false)
let registration: ServiceWorkerRegistration | null = null

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

const updateApp = () => {
  if (registration && registration.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  // Check for service worker updates
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      registration = reg

      // Check for updates every 60 seconds
      setInterval(() => {
        reg.update()
      }, 60000)

      // Listen for updates
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdatePrompt.value = true
            }
          })
        }
      })
    })

    // Listen for controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<style scoped>
.offline-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #f56c6c;
  color: #fff;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  z-index: 3000;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.update-prompt {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 2000;
}

.update-content {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1890ff;
  font-size: 14px;
  font-weight: 500;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .offline-banner {
    padding: 10px 16px;
    font-size: 13px;
  }

  .update-prompt {
    top: 10px;
    right: 10px;
    left: 10px;
    padding: 12px;
  }

  .update-content {
    font-size: 13px;
  }
}
</style>
