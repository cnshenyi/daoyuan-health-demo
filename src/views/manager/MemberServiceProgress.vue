<template>
  <div class="service-progress-page">
    <PageNavBar title="服务进度" />
    <div v-for="svc in services" :key="svc.id" class="service-card">
      <div class="svc-header">
        <div class="svc-icon" :style="{ background: svc.color + '18', color: svc.color }">
          <svg viewBox="0 0 24 24" fill="currentColor" v-html="svc.icon"></svg>
        </div>
        <div class="svc-info">
          <h4 class="svc-name">{{ svc.name }}</h4>
          <p class="svc-meta">{{ svc.used }}/{{ svc.total }} 次 · 负责：{{ svc.owner }}</p>
        </div>
        <span :class="['svc-status', svc.status]">{{ svcStatusText[svc.status] }}</span>
      </div>
      <div class="svc-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: (svc.used / svc.total * 100) + '%', background: svc.color }"></div>
        </div>
        <span class="progress-pct">{{ Math.round(svc.used / svc.total * 100) }}%</span>
      </div>
      <div class="svc-next" v-if="svc.nextDate">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
        下次：{{ svc.nextDate }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageNavBar from '@/components/PageNavBar.vue'
const svcStatusText: Record<string, string> = { active: '进行中', completed: '已完成', pending: '待开始' }

const services = [
  { id: 1, name: '全科医生咨询', used: 3, total: 12, owner: '李明华', color: '#1E3A5F', status: 'active', nextDate: '2026-03-28', icon: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>' },
  { id: 2, name: '营养专家指导', used: 2, total: 6, owner: '陈思琪', color: '#E67E22', status: 'active', nextDate: '2026-04-01', icon: '<path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>' },
  { id: 3, name: '心理健康评估', used: 1, total: 4, owner: '周建国', color: '#8E44AD', status: 'active', nextDate: '2026-04-10', icon: '<path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"/>' },
  { id: 4, name: '健康体检套餐', used: 1, total: 2, owner: '林雅婷', color: '#2E8B57', status: 'active', nextDate: '2026-06-01', icon: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L19 8l-9 9z"/>' },
  { id: 5, name: '专科会诊（内分泌）', used: 1, total: 3, owner: '王志强', color: '#C9A962', status: 'active', nextDate: '2026-04-15', icon: '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/>' },
]
</script>

<style scoped>
.service-progress-page { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.service-card { background: #fff; border-radius: 12px; padding: 14px; margin-bottom: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.svc-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.svc-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.svc-icon svg { width: 20px; height: 20px; }
.svc-info { flex: 1; }
.svc-name { font-size: 14px; font-weight: 600; color: #1E3A5F; margin: 0 0 2px; }
.svc-meta { font-size: 12px; color: #999; margin: 0; }
.svc-status { font-size: 11px; padding: 3px 8px; border-radius: 10px; white-space: nowrap; }
.svc-status.active { background: rgba(46,139,87,0.1); color: #2E8B57; }
.svc-status.completed { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.svc-status.pending { background: rgba(201,169,98,0.1); color: #C9A962; }
.svc-progress { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.progress-bar { flex: 1; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }
.progress-pct { font-size: 12px; color: #999; width: 32px; text-align: right; }
.svc-next { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #999; padding-top: 8px; border-top: 1px solid #f5f5f5; }
.svc-next svg { width: 14px; height: 14px; color: #C9A962; }
</style>
