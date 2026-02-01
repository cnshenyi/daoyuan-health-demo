<template>
  <div class="page-container health-records">
    <!-- 顶部返回栏 -->
    <div class="page-nav-bar">
      <button class="back-button" @click="$router.back()">
        <svg viewBox="0 0 24 24" fill="none" class="back-icon">
          <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>返回</span>
      </button>
      <h1 class="page-nav-title">健康档案</h1>
      <div class="nav-placeholder"></div>
    </div>

    <!-- 标签页导航 - 深蓝底金色图标 -->
    <div class="tabs-wrapper">
      <div class="tab-buttons">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="['tab-button', { active: activeTab === tab.value }]"
          @click="activeTab = tab.value"
        >
          <div class="tab-icon-wrapper">
            <svg v-if="tab.value === 'history'" viewBox="0 0 24 24" fill="none" class="tab-svg">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" stroke-width="2"/>
              <path d="M9 12h6M9 16h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else-if="tab.value === 'checkups'" viewBox="0 0 24 24" fill="none" class="tab-svg">
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" class="tab-svg">
              <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- 病史信息 -->
    <div v-show="activeTab === 'history'" class="tab-content">
      <!-- 基本信息 - 紧凑版带隐私保护 -->
      <div class="medical-card basic-info-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">基本信息</h3>
          <button class="privacy-toggle" @click="showPrivateInfo = !showPrivateInfo">
            <svg v-if="showPrivateInfo" viewBox="0 0 24 24" fill="none" class="eye-icon">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" class="eye-icon">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <div class="basic-info-grid">
          <div class="basic-info-item">
            <span class="basic-info-label">姓名</span>
            <span class="basic-info-value">{{ showPrivateInfo ? userStore.user?.name : maskText(userStore.user?.name || '') }}</span>
          </div>
          <div class="basic-info-item">
            <span class="basic-info-label">年龄</span>
            <span class="basic-info-value">{{ showPrivateInfo ? '45岁' : '**岁' }}</span>
          </div>
          <div class="basic-info-item">
            <span class="basic-info-label">性别</span>
            <span class="basic-info-value">{{ showPrivateInfo ? '男' : '*' }}</span>
          </div>
          <div class="basic-info-item">
            <span class="basic-info-label">血型</span>
            <span class="basic-info-value">{{ showPrivateInfo ? 'A型' : '**' }}</span>
          </div>
          <div class="basic-info-item">
            <span class="basic-info-label">职业</span>
            <span class="basic-info-value">{{ showPrivateInfo ? healthStore.medicalHistory.occupation : maskText(healthStore.medicalHistory.occupation) }}</span>
          </div>
          <div class="basic-info-item">
            <span class="basic-info-label">婚姻</span>
            <span class="basic-info-value">{{ showPrivateInfo ? healthStore.medicalHistory.maritalStatus : '**' }}</span>
          </div>
        </div>
      </div>

      <!-- 家族史 -->
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">家族史</h3>
          <span class="badge-count">{{ healthStore.medicalHistory.familyHistory.length }}</span>
        </div>
        <div class="tags-container">
          <span
            v-for="(item, index) in healthStore.medicalHistory.familyHistory"
            :key="index"
            class="tag tag-info"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <!-- 过敏史 -->
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">过敏史</h3>
          <span class="badge-count danger">{{ healthStore.medicalHistory.allergies.length }}</span>
        </div>
        <div class="tags-container">
          <span
            v-for="(item, index) in healthStore.medicalHistory.allergies"
            :key="index"
            class="tag tag-danger"
          >
            ⚠️ {{ item }}
          </span>
        </div>
      </div>

      <!-- 生活习惯 -->
      <div class="lifestyle-grid">
        <div class="medical-card">
          <div class="medical-card-header">
            <h3 class="medical-card-title">吸烟史</h3>
          </div>
          <p class="lifestyle-text">{{ healthStore.medicalHistory.smokingHistory }}</p>
        </div>

        <div class="medical-card">
          <div class="medical-card-header">
            <h3 class="medical-card-title">饮酒史</h3>
          </div>
          <p class="lifestyle-text">{{ healthStore.medicalHistory.drinkingHistory }}</p>
        </div>
      </div>

      <!-- 用药史 -->
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">用药史</h3>
          <span class="badge-count warning">{{ healthStore.medicalHistory.medicationHistory.length }}</span>
        </div>
        <div class="tags-container">
          <span
            v-for="(item, index) in healthStore.medicalHistory.medicationHistory"
            :key="index"
            class="tag tag-warning"
          >
            💊 {{ item }}
          </span>
        </div>
      </div>

      <!-- 手术史 -->
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">手术史</h3>
        </div>
        <div class="timeline-list">
          <div
            v-for="(item, index) in healthStore.medicalHistory.surgeryHistory"
            :key="index"
            class="timeline-item"
          >
            <div class="timeline-dot"></div>
            <div class="timeline-content">{{ item }}</div>
          </div>
        </div>
      </div>

      <!-- 既往病史 -->
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">既往病史</h3>
          <span class="badge-count danger">{{ healthStore.medicalHistory.pastIllnesses.length }}</span>
        </div>
        <div class="tags-container">
          <span
            v-for="(item, index) in healthStore.medicalHistory.pastIllnesses"
            :key="index"
            class="tag tag-danger"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>

    <!-- 体检报告 -->
    <div v-show="activeTab === 'checkups'" class="tab-content">
      <div
        v-for="report in healthStore.checkupReports"
        :key="report.id"
        class="medical-card checkup-card"
      >
        <div class="medical-card-header">
          <div>
            <h3 class="medical-card-title">{{ report.title }}</h3>
            <p class="checkup-date">{{ report.date }}</p>
          </div>
          <span :class="['status-badge', report.status]">
            {{ getStatusText(report.status) }}
          </span>
        </div>
        <div class="checkup-summary">
          <p>{{ report.summary }}</p>
        </div>
        <div class="checkup-items">
          <div
            v-for="item in report.items"
            :key="item.name"
            class="checkup-item"
          >
            <div class="item-name">{{ item.name }}</div>
            <div class="item-value">
              <span :class="['value-text', item.status]">{{ item.value }}</span>
              <span class="value-unit">{{ item.unit }}</span>
            </div>
            <div class="item-range">参考: {{ item.normalRange }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 检验结果 -->
    <div v-show="activeTab === 'tests'" class="tab-content">
      <div
        v-for="test in healthStore.labTests"
        :key="test.id"
        class="medical-card test-card"
      >
        <div class="medical-card-header">
          <div>
            <h3 class="medical-card-title">{{ test.name }}</h3>
            <p class="test-date">{{ test.date }} · {{ test.category }}</p>
          </div>
        </div>
        <div class="test-results">
          <div
            v-for="item in test.items"
            :key="item.name"
            class="test-result-item"
          >
            <div class="result-header">
              <span class="result-name">{{ item.name }}</span>
              <span :class="['result-status', item.status]">
                {{ item.status === 'normal' ? '正常' : item.status === 'high' ? '偏高' : '偏低' }}
              </span>
            </div>
            <div class="result-details">
              <span class="result-value">{{ item.value }} {{ item.unit }}</span>
              <span class="result-range">参考范围: {{ item.normalRange }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHealthStore } from '@/stores/health'
import { useUserStore } from '@/stores/user'

const healthStore = useHealthStore()
const userStore = useUserStore()
const activeTab = ref('history')
const showPrivateInfo = ref(false)

const tabs = [
  { label: '病史信息', value: 'history' },
  { label: '体检报告', value: 'checkups' },
  { label: '检验结果', value: 'tests' }
]

// 文字脱敏
const maskText = (text: string) => {
  if (!text) return '***'
  if (text.length <= 2) return '*'.repeat(text.length)
  return text[0] + '*'.repeat(text.length - 1)
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    normal: '正常',
    attention: '需注意',
    abnormal: '异常'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
.health-records {
  padding-bottom: var(--spacing-2xl);
}

/* 顶部返回栏 */
.page-nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  padding: var(--spacing-xs) 0;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: rgba(30, 58, 95, 0.1);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
  color: #1E3A5F;
  font-size: 14px;
  font-weight: 500;
}

.back-button:hover {
  background: rgba(30, 58, 95, 0.15);
}

.back-button:active {
  transform: scale(0.95);
}

.back-icon {
  width: 18px;
  height: 18px;
}

.page-nav-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.nav-placeholder {
  width: 70px; /* 和返回按钮宽度相近，保持标题居中 */
}

/* 标签页导航 - 深蓝底金色图标 */
.tabs-wrapper {
  margin-bottom: var(--spacing-md);
}

.tab-buttons {
  display: flex;
  gap: var(--spacing-xs);
  background: var(--color-bg-secondary);
  padding: var(--spacing-xs);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.tab-button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-sm);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-button:hover {
  background: var(--color-bg-tertiary);
}

.tab-button.active {
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  box-shadow: var(--shadow-md);
}

.tab-icon-wrapper {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.tab-button.active .tab-icon-wrapper {
  background: rgba(255, 255, 255, 0.15);
}

.tab-svg {
  width: 20px;
  height: 20px;
  color: #C9A962;
}

.tab-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-text-secondary);
}

.tab-button.active .tab-label {
  color: var(--color-text-light);
}

/* 基本信息卡片 - 紧凑版 */
.basic-info-card {
  margin-bottom: var(--spacing-md);
}

.basic-info-card .medical-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.privacy-toggle {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(30, 58, 95, 0.1);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.privacy-toggle:hover {
  background: rgba(30, 58, 95, 0.2);
}

.privacy-toggle:active {
  transform: scale(0.95);
}

.eye-icon {
  width: 18px;
  height: 18px;
  color: #1E3A5F;
}

.basic-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-xs);
}

.basic-info-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--spacing-xs);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-sm);
}

.basic-info-label {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.basic-info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text-primary);
}

/* 标签页内容 */
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 医疗卡片 */
.medical-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-sm);
}

.medical-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.medical-card-title {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

/* 徽章 */
.badge-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--color-primary);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 10px;
}

.badge-count.danger {
  background: var(--color-danger);
}

.badge-count.warning {
  background: var(--color-warning);
}

/* 标签 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 500;
}

.tag-info {
  background: rgba(30, 58, 95, 0.1);
  color: var(--color-primary);
}

.tag-danger {
  background: rgba(220, 53, 69, 0.1);
  color: var(--color-danger);
}

.tag-warning {
  background: rgba(255, 193, 7, 0.15);
  color: #b38600;
}

/* 生活习惯网格 */
.lifestyle-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.lifestyle-grid .medical-card {
  margin-bottom: 0;
}

.lifestyle-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* 时间线 */
.timeline-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.timeline-dot {
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.timeline-content {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* 体检报告卡片 */
.checkup-card {
  border-left: 3px solid var(--color-primary);
}

.checkup-date {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

.status-badge {
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
}

.status-badge.normal {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.status-badge.attention {
  background: rgba(255, 193, 7, 0.15);
  color: #b38600;
}

.status-badge.abnormal {
  background: rgba(220, 53, 69, 0.1);
  color: var(--color-danger);
}

.checkup-summary {
  padding: var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-sm);
}

.checkup-summary p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin: 0;
}

.checkup-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.checkup-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) 0;
  border-bottom: 1px solid var(--color-border);
}

.checkup-item:last-child {
  border-bottom: none;
}

.item-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.item-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.value-text {
  font-size: var(--font-size-md);
  font-weight: 600;
}

.value-text.normal {
  color: var(--color-success);
}

.value-text.high,
.value-text.abnormal {
  color: var(--color-danger);
}

.value-text.low {
  color: var(--color-warning);
}

.value-unit {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.item-range {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

/* 检验结果卡片 */
.test-card {
  border-left: 3px solid var(--color-accent);
}

.test-date {
  font-size: 12px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

.test-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.test-result-item {
  padding: var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.result-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.result-status {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.result-status.normal {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.result-status.high {
  background: rgba(220, 53, 69, 0.1);
  color: var(--color-danger);
}

.result-status.low {
  background: rgba(255, 193, 7, 0.15);
  color: #b38600;
}

.result-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-value {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
}

.result-range {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .basic-info-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .lifestyle-grid {
    grid-template-columns: 1fr;
  }
  
  .checkup-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .item-range {
    align-self: flex-end;
  }
}
</style>
