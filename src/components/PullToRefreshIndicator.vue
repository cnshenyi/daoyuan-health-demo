<template>
  <transition name="fade">
    <div
      v-if="pullDistance > 0"
      class="pull-to-refresh-indicator"
      :style="{ transform: `translateY(${pullDistance}px)` }"
    >
      <div class="indicator-content">
        <el-icon
          v-if="!isRefreshing"
          :class="['refresh-icon', { 'can-refresh': pullDistance >= threshold }]"
          :size="24"
        >
          <RefreshRight />
        </el-icon>
        <el-icon v-else class="refresh-icon spinning" :size="24">
          <Loading />
        </el-icon>
        <span class="refresh-text">
          {{ isRefreshing ? '刷新中...' : pullDistance >= threshold ? '释放刷新' : '下拉刷新' }}
        </span>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { RefreshRight, Loading } from '@element-plus/icons-vue'

defineProps<{
  pullDistance: number
  isRefreshing: boolean
  threshold: number
}>()
</script>

<style scoped>
.pull-to-refresh-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  z-index: 1500;
  pointer-events: none;
  transition: transform 0.2s ease-out;
}

.indicator-content {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.refresh-icon {
  color: #909399;
  transition: all 0.3s ease;
}

.refresh-icon.can-refresh {
  color: #1890ff;
  transform: rotate(180deg);
}

.refresh-icon.spinning {
  color: #1890ff;
  animation: spin 1s linear infinite;
}

.refresh-text {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile only */
@media (min-width: 769px) {
  .pull-to-refresh-indicator {
    display: none;
  }
}
</style>
