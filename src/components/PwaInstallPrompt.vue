<template>
  <transition name="slide-up">
    <div v-if="showPrompt" class="pwa-install-prompt">
      <div class="prompt-content">
        <div class="prompt-icon">
          <el-icon :size="32"><Download /></el-icon>
        </div>
        <div class="prompt-text">
          <h4>安装应用</h4>
          <p>将道远医疗添加到主屏幕，获得更好的体验</p>
        </div>
        <div class="prompt-actions">
          <el-button size="small" @click="dismissPrompt">稍后</el-button>
          <el-button type="primary" size="small" @click="installApp">安装</el-button>
        </div>
      </div>
      <el-icon class="close-btn" @click="dismissPrompt"><Close /></el-icon>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Download, Close } from '@element-plus/icons-vue'

const showPrompt = ref(false)
let deferredPrompt: any = null

onMounted(() => {
  // Check if already dismissed
  const dismissed = localStorage.getItem('pwa-install-dismissed')
  if (dismissed) return

  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e

    // Show prompt after 3 seconds
    setTimeout(() => {
      showPrompt.value = true
    }, 3000)
  })

  // Check if already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    showPrompt.value = false
  }
})

const installApp = async () => {
  if (!deferredPrompt) return

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice

  if (outcome === 'accepted') {
    console.log('User accepted the install prompt')
  }

  deferredPrompt = null
  showPrompt.value = false
}

const dismissPrompt = () => {
  showPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', 'true')
}
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  z-index: 2000;
  max-width: 90%;
  width: 400px;
}

.prompt-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.prompt-icon {
  color: #1890ff;
  flex-shrink: 0;
}

.prompt-text {
  flex: 1;
}

.prompt-text h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.prompt-text p {
  margin: 0;
  font-size: 13px;
  color: #606266;
}

.prompt-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}

.close-btn:hover {
  color: #303133;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateX(-50%) translateY(100px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateX(-50%) translateY(100px);
  opacity: 0;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .pwa-install-prompt {
    bottom: 80px; /* Above bottom nav */
    width: calc(100% - 32px);
    max-width: none;
  }

  .prompt-content {
    flex-wrap: wrap;
  }

  .prompt-actions {
    width: 100%;
    margin-top: 8px;
  }

  .prompt-actions .el-button {
    flex: 1;
  }
}
</style>
