<template>
  <div class="page-container service-projects">
    <!-- 尊享会员卡 -->
    <div class="vip-card-section">
      <div class="vip-card">
        <div class="card-bg-pattern"></div>
        <div class="card-shine"></div>
        
        <div class="card-content">
          <div class="card-top">
            <div class="brand-area">
              <span class="brand-name">道远医疗</span>
              <span class="brand-sub">DAO YUAN MEDICAL</span>
            </div>
            <div class="membership-level">
              <span class="level-icon">♦</span>
              <span class="level-text">{{ healthStore.memberInfo.membershipType === 'premium' ? '至尊会员' : '尊享会员' }}</span>
            </div>
          </div>
          
          <div class="card-middle">
            <div class="member-name">{{ healthStore.memberInfo.name }}</div>
            <div class="member-id">NO. {{ getMemberNo() }}</div>
          </div>
          
          <div class="card-bottom">
            <div class="validity">
              <span class="validity-label">有效期至</span>
              <span class="validity-date">{{ getValidityDate() }}</span>
            </div>
            <button class="benefits-btn" @click="goToBenefits">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>全部权益</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-icon">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 至尊服务 Banner -->
    <div class="premium-banner" @click="goToPremiumService">
      <div class="banner-bg"></div>
      <div class="banner-overlay"></div>
      <div class="banner-content">
        <div class="banner-badge">
          <span class="badge-crown">👑</span>
          <span class="badge-label">至尊专享</span>
        </div>
        <div class="banner-title">国际高端康养干细胞至尊服务</div>
        <div class="banner-subtitle">澳大利亚10日顶级康养之旅 · svCell再生疗法</div>
        <div class="banner-cta">
          <span class="cta-text">了解详情</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="cta-arrow">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
      <div class="banner-price">
        <span class="price-value">¥500,000</span>
        <span class="price-unit">/次</span>
      </div>
    </div>

    <!-- 服务追踪列表 -->
    <div class="service-list">
      <div
        v-for="project in serviceStore.projects"
        :key="project.id"
        class="service-item"
      >
        <div class="item-main">
          <div class="service-icon" :class="getStatusClass(project.status)">
            <component :is="getServiceIcon(project.name)" />
          </div>
          <div class="service-info">
            <h3 class="service-name">{{ project.name }}</h3>
            <div class="service-meta">
              <span class="meta-frequency">{{ getFrequencyText(project) }}</span>
              <span class="meta-divider">·</span>
              <span class="meta-progress">{{ project.completed }}/{{ project.frequency || project.completed }}次</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :class="getStatusClass(project.status)"
                :style="{ width: getProgressPercentage(project) + '%' }"
              ></div>
            </div>
          </div>
          <div class="status-area">
            <span class="status-tag" :class="getStatusClass(project.status)">
              {{ getStatusText(project.status) }}
            </span>
          </div>
        </div>
        
        <div class="item-actions">
          <button class="action-btn detail-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
            详情
          </button>
          <button class="action-btn feedback-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            反馈
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useRouter } from 'vue-router'
import { useServiceStore } from '@/stores/service'
import { useHealthStore } from '@/stores/health'

const router = useRouter()
const serviceStore = useServiceStore()
const healthStore = useHealthStore()

const goToBenefits = () => {
  router.push('/membership-benefits')
}

const goToPremiumService = () => {
  router.push('/premium-service')
}

// 金色实心图标组件
const IconMedicalRecord = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z' })
])

const IconFolder = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z' })
])

const IconDoctor = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' })
])

const IconMonitor = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z' })
])

const IconStethoscope = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 8c-1.66 0-3 1.34-3 3 0 .79.31 1.5.81 2.03-.49 2.43-2.17 4.34-4.81 4.87V13c2.21 0 4-1.79 4-4V4h-2v5c0 1.1-.9 2-2 2s-2-.9-2-2V4H8v5c0 2.21 1.79 4 4 4v4.9c-2.64-.53-4.32-2.44-4.81-4.87.5-.53.81-1.24.81-2.03 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.31.84 2.41 2 2.83V15c0 3.52 2.94 6.5 6.5 6.5S17 18.52 17 15v-2.17c1.16-.42 2-1.52 2-2.83 0-1.66-1.34-3-3-3z' })
])

const IconHospital = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z' })
])

const IconChart = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' })
])

const IconPill = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M4.22 11.29l5.66-5.66c1.56-1.56 4.1-1.56 5.66 0l2.83 2.83c1.56 1.56 1.56 4.1 0 5.66l-5.66 5.66c-1.56 1.56-4.1 1.56-5.66 0l-2.83-2.83c-1.56-1.56-1.56-4.1 0-5.66zm1.41 4.24l2.83 2.83c.78.78 2.05.78 2.83 0l2.83-2.83-5.66-5.66-2.83 2.83c-.78.78-.78 2.05 0 2.83z' })
])

const IconAmbulance = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' })
])

const IconSyringe = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M11 5.5H8v2h3v-2zm0 4H8v2h3v-2zm0 4H8v2h3v-2zm6-10h-4v2h4v-2zm0 4h-4v2h4v-2zm0 4h-4v2h4v-2zm2-10h-2v14h2V3.5zm-12 0H5v14h2V3.5zm14 16H3v2h18v-2z' })
])

const getServiceIcon = (name: string) => {
  const iconMap: Record<string, any> = {
    '病史系统全面回顾': IconMedicalRecord,
    '国际健康病历建档': IconFolder,
    '专属健康管家陪诊': IconDoctor,
    '健康生活动态监测': IconMonitor,
    '全科专家精准诊疗': IconStethoscope,
    '精准健康体检评估': IconHospital,
    '体检报告精细解读': IconChart,
    '慢性疾病管理建议': IconPill,
    '重症急症转诊建议': IconAmbulance,
    '国际前沿新药推荐': IconSyringe
  }
  return iconMap[name] || IconMedicalRecord
}

const getMemberNo = () => {
  return 'DY' + String(healthStore.memberInfo.age * 1000 + 2025).padStart(8, '0')
}

const getValidityDate = () => {
  // 会员卡生效日期 2025-06-01，有效期一年，到期日 2026-06-01
  return '2026.06.01'
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'completed': '已完成',
    'on-track': '进行中',
    'pending': '待开始',
    'delayed': '延期'
  }
  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    'completed': 'completed',
    'on-track': 'inProgress',
    'pending': 'pending',
    'delayed': 'onHold'
  }
  return classMap[status] || 'pending'
}

const getFrequencyText = (project: any) => {
  if (project.frequency === 0) {
    return '实时服务'
  }
  const unitMap: Record<string, string> = {
    'year': '年',
    'month': '月',
    'week': '周'
  }
  return `${project.frequency}次/${unitMap[project.frequencyUnit] || '年'}`
}

const getProgressPercentage = (project: any) => {
  if (project.frequency === 0) {
    return 100
  }
  return Math.round((project.completed / project.frequency) * 100)
}
</script>

<style scoped>
.service-projects {
  padding-bottom: var(--spacing-xl);
}

/* 尊享会员卡 */
.vip-card-section {
  margin-bottom: var(--spacing-lg);
  padding: 0 var(--spacing-xs);
}

.vip-card {
  position: relative;
  aspect-ratio: 1.6 / 1;
  max-width: 380px;
  margin: 0 auto;
  border-radius: 16px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(201, 169, 98, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.card-bg-pattern {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(201, 169, 98, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(201, 169, 98, 0.08) 0%, transparent 40%);
  pointer-events: none;
}

.card-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 40%,
    rgba(255, 255, 255, 0.03) 45%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.03) 55%,
    transparent 60%
  );
  pointer-events: none;
  animation: shine 8s ease-in-out infinite;
}

@keyframes shine {
  0%, 100% { transform: translateX(-30%) translateY(-30%) rotate(0deg); }
  50% { transform: translateX(30%) translateY(30%) rotate(0deg); }
}

.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.brand-area {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-size: 18px;
  font-weight: 700;
  color: #C9A962;
  letter-spacing: 2px;
  font-family: var(--font-display);
}

.brand-sub {
  font-size: 8px;
  color: rgba(201, 169, 98, 0.6);
  letter-spacing: 1px;
  font-weight: 500;
}

.membership-level {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.1) 100%);
  border: 1px solid rgba(201, 169, 98, 0.3);
  border-radius: 20px;
}

.level-icon {
  color: #C9A962;
  font-size: 10px;
}

.level-text {
  font-size: 11px;
  font-weight: 600;
  color: #C9A962;
  letter-spacing: 1px;
}

.card-middle {
  text-align: center;
  padding: 10px 0;
}

.member-name {
  font-size: 28px;
  font-weight: 300;
  color: #fff;
  letter-spacing: 8px;
  margin-bottom: 8px;
  font-family: var(--font-display);
}

.member-id {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 3px;
  font-weight: 500;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.validity {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.validity-label {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.validity-date {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
  font-family: var(--font-display);
}

.benefits-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.25) 0%, rgba(201, 169, 98, 0.15) 100%);
  border: 1px solid rgba(201, 169, 98, 0.4);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.benefits-btn:hover {
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.35) 0%, rgba(201, 169, 98, 0.25) 100%);
  border-color: rgba(201, 169, 98, 0.6);
  transform: translateY(-1px);
}

.benefits-btn svg {
  width: 14px;
  height: 14px;
  color: #C9A962;
}

.benefits-btn .arrow-icon {
  width: 12px;
  height: 12px;
}

.benefits-btn span {
  font-size: 11px;
  font-weight: 600;
  color: #C9A962;
  letter-spacing: 0.5px;
}

/* 至尊服务 Banner */
.premium-banner {
  position: relative;
  margin: var(--spacing-lg) 0;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.premium-banner:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.premium-banner:active {
  transform: translateY(-1px);
}

.banner-bg {
  position: absolute;
  inset: 0;
  background: 
    url('https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80') center/cover;
  filter: brightness(0.4);
}

.banner-overlay {
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(26, 42, 74, 0.7) 100%),
    radial-gradient(ellipse at 20% 50%, rgba(201, 169, 98, 0.2) 0%, transparent 60%);
}

.banner-content {
  position: relative;
  z-index: 1;
  padding: 24px 20px;
}

.banner-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.3) 0%, rgba(201, 169, 98, 0.15) 100%);
  border: 1px solid rgba(201, 169, 98, 0.5);
  border-radius: 20px;
  margin-bottom: 12px;
}

.badge-crown {
  font-size: 14px;
}

.badge-label {
  font-size: 11px;
  font-weight: 600;
  color: #C9A962;
  letter-spacing: 1px;
}

.banner-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.banner-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.banner-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #C9A962 0%, #D4B87A 100%);
  border-radius: 25px;
  box-shadow: 0 4px 16px rgba(201, 169, 98, 0.4);
  transition: all 0.3s ease;
}

.premium-banner:hover .banner-cta {
  box-shadow: 0 6px 20px rgba(201, 169, 98, 0.5);
}

.cta-text {
  font-size: 13px;
  font-weight: 700;
  color: #1a2a4a;
  letter-spacing: 0.5px;
}

.cta-arrow {
  width: 16px;
  height: 16px;
  color: #1a2a4a;
}

.banner-price {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(201, 169, 98, 0.3);
  border-radius: 8px;
}

.price-value {
  font-size: 18px;
  font-weight: 700;
  color: #C9A962;
  font-family: var(--font-display);
}

.price-unit {
  font-size: 12px;
  color: rgba(201, 169, 98, 0.7);
}

/* 服务追踪列表 */
.service-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.service-item {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.service-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.item-main {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.service-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
}

.service-icon :deep(svg) {
  width: 24px;
  height: 24px;
  color: #C9A962;
}

.service-icon.inProgress {
  background: linear-gradient(135deg, #2E8B57 0%, #3FA76F 100%);
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
}

.service-icon.inProgress :deep(svg) {
  color: #fff;
}

.service-icon.completed {
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.3);
}

.service-icon.completed :deep(svg) {
  color: #C9A962;
}

.service-info {
  flex: 1;
  min-width: 0;
}

.service-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  font-family: var(--font-display);
}

.service-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-sm);
}

.meta-divider {
  color: var(--color-border);
}

.progress-bar {
  height: 6px;
  background: var(--color-bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.6s ease;
  background: linear-gradient(90deg, #C9A962, #D4B87A);
}

.progress-fill.inProgress {
  background: linear-gradient(90deg, #2E8B57, #3FA76F);
}

.progress-fill.completed {
  background: linear-gradient(90deg, #1E3A5F, #2A4F7F);
}

.status-area {
  flex-shrink: 0;
}

.status-tag {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.status-tag.pending {
  background: rgba(201, 169, 98, 0.15);
  color: #C9A962;
}

.status-tag.inProgress {
  background: rgba(46, 139, 87, 0.15);
  color: #2E8B57;
}

.status-tag.completed {
  background: rgba(30, 58, 95, 0.15);
  color: #1E3A5F;
}

.status-tag.onHold {
  background: rgba(144, 147, 153, 0.15);
  color: #909399;
}

/* 操作按钮 */
.item-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-body);
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.detail-btn {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-light);
}

.detail-btn:hover {
  background: var(--color-bg-cream);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.feedback-btn {
  background: linear-gradient(135deg, #2E8B57 0%, #3FA76F 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
}

.feedback-btn:hover {
  box-shadow: 0 6px 16px rgba(46, 139, 87, 0.4);
  transform: translateY(-1px);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .vip-card {
    max-width: 100%;
    aspect-ratio: 1.7 / 1;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .brand-name {
    font-size: 16px;
  }
  
  .member-name {
    font-size: 24px;
    letter-spacing: 6px;
  }
  
  .service-item {
    padding: var(--spacing-md);
  }
  
  .service-icon {
    width: 44px;
    height: 44px;
  }
  
  .service-icon :deep(svg) {
    width: 22px;
    height: 22px;
  }
  
  .action-btn {
    padding: 10px 16px;
    font-size: var(--font-size-xs);
  }
  
  .action-btn svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 375px) {
  .vip-card {
    aspect-ratio: 1.8 / 1;
  }
  
  .card-content {
    padding: 12px;
  }
  
  .brand-name {
    font-size: 14px;
  }
  
  .member-name {
    font-size: 20px;
    letter-spacing: 4px;
  }
  
  .membership-level {
    padding: 4px 8px;
  }
  
  .level-text {
    font-size: 10px;
  }
  
  .benefits-btn {
    padding: 6px 10px;
  }
  
  .benefits-btn span {
    font-size: 10px;
  }
}
</style>
