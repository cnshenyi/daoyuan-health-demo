<template>
  <div class="page-container health-records">
    <div class="page-header">
      <h1 class="page-title">健康档案</h1>
      <p class="page-description">完整的医疗历史记录和检查结果</p>
    </div>

    <!-- 标签页导航 -->
    <div class="tabs-wrapper">
      <div class="tab-buttons">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="['tab-button', { active: activeTab === tab.value }]"
          @click="activeTab = tab.value"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- 病史信息 -->
    <div v-show="activeTab === 'history'" class="tab-content">
      <!-- 基本信息 -->
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">基本信息</h3>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">职业</div>
            <div class="info-value">{{ healthStore.medicalHistory.occupation }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">婚姻状况</div>
            <div class="info-value">{{ healthStore.medicalHistory.maritalStatus }}</div>
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

const healthStore = useHealthStore()
const activeTab = ref('history')

const tabs = [
  { label: '病史信息', value: 'history', icon: '📋' },
  { label: '体检报告', value: 'checkups', icon: '🏥' },
  { label: '检验结果', value: 'tests', icon: '🔬' }
]

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

/* 标签页导航 */
.tabs-wrapper {
  margin-bottom: var(--spacing-xl);
}

.tab-buttons {
  display: flex;
  gap: var(--spacing-sm);
  background: var(--color-bg-secondary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow-x: auto;
}

.tab-button {
  flex: 1;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: var(--font-body);
}

.tab-button:hover {
  background: var(--color-bg-tertiary);
}

.tab-button.active {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
  box-shadow: var(--shadow-md);
}

.tab-icon {
  font-size: var(--font-size-2xl);
}

.tab-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.tab-button.active .tab-label {
  color: var(--color-text-light);
}

/* 标签页内容 */
.tab-content {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.info-item {
  padding: var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.info-item:hover {
  background: var(--color-bg-cream);
  transform: translateY(-2px);
}

.info-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.info-value {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

/* 徽章计数 */
.badge-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 var(--spacing-xs);
  background: var(--color-primary);
  color: var(--color-text-light);
  font-size: var(--font-size-xs);
  font-weight: 600;
  border-radius: 12px;
}

.badge-count.warning {
  background: var(--color-warning);
}

.badge-count.danger {
  background: var(--color-danger);
}

/* 标签容器 */
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.tag-info {
  background: rgba(144, 147, 153, 0.1);
  color: #909399;
  border: 1px solid rgba(144, 147, 153, 0.2);
}

.tag-warning {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
  border: 1px solid rgba(230, 162, 60, 0.2);
}

.tag-danger {
  background: rgba(245, 108, 108, 0.1);
  color: var(--color-danger);
  border: 1px solid rgba(245, 108, 108, 0.2);
}

/* 生活习惯网格 */
.lifestyle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.lifestyle-text {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: 1.6;
  padding: var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

/* 时间线列表 */
.timeline-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.timeline-item:hover {
  background: var(--color-bg-cream);
  transform: translateX(4px);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  margin-top: 4px;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* 体检报告 */
.checkup-card {
  margin-bottom: var(--spacing-lg);
}

.checkup-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
}

.status-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.status-badge.normal {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.status-badge.attention {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
}

.status-badge.abnormal {
  background: rgba(245, 108, 108, 0.1);
  color: var(--color-danger);
}

.checkup-summary {
  padding: var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
}

.checkup-summary p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.checkup-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.checkup-item {
  padding: var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.checkup-item:hover {
  background: var(--color-bg-cream);
  transform: translateY(-2px);
}

.item-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.item-value {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.value-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  font-family: var(--font-display);
}

.value-text.normal {
  color: var(--color-success);
}

.value-text.high,
.value-text.attention {
  color: var(--color-warning);
}

.value-text.low,
.value-text.abnormal {
  color: var(--color-danger);
}

.value-unit {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.item-range {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* 检验结果 */
.test-card {
  margin-bottom: var(--spacing-lg);
}

.test-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--spacing-xs);
}

.test-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.test-result-item {
  padding: var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.test-result-item:hover {
  background: var(--color-bg-cream);
  transform: translateX(4px);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.result-name {
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--color-text-primary);
}

.result-status {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.result-status.normal {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.result-status.high {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
}

.result-status.low {
  background: rgba(245, 108, 108, 0.1);
  color: var(--color-danger);
}

.result-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-value {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.result-range {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .tab-buttons {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab-button {
    min-width: 100px;
  }

  .info-grid,
  .lifestyle-grid,
  .checkup-items {
    grid-template-columns: 1fr;
  }

  .result-details {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}
</style>
