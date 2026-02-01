<template>
  <div class="page-container messages-page">
    <!-- 消息筛选 -->
    <div class="filter-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.value"
        :class="['filter-tab', { active: activeTab === tab.value }]"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
        <span v-if="tab.value === 'all' && messageStore.unreadCount > 0" class="unread-badge">
          {{ messageStore.unreadCount }}
        </span>
      </button>
    </div>

    <!-- 消息列表 -->
    <div class="message-list">
      <div 
        v-for="message in filteredMessages" 
        :key="message.id"
        :class="['message-card', message.type, { unread: !message.read }]"
        @click="openMessage(message)"
      >
        <!-- 消息图标 -->
        <div class="message-icon" :class="message.type">
          <component :is="getMessageIcon(message.type)" />
        </div>

        <!-- 消息内容 -->
        <div class="message-content">
          <div class="message-header">
            <h3 class="message-title">{{ message.title }}</h3>
            <span v-if="message.important" class="important-tag">重要</span>
          </div>
          <p class="message-summary">{{ message.summary || message.content.slice(0, 50) + '...' }}</p>
          
          <!-- 标签 -->
          <div class="message-tags" v-if="message.data?.tags">
            <span 
              v-for="tag in message.data.tags.slice(0, 3)" 
              :key="tag" 
              class="tag"
              :class="message.type"
            >
              {{ tag }}
            </span>
          </div>
          
          <div class="message-footer">
            <span class="message-time">{{ formatTime(message.time) }}</span>
            <span v-if="!message.read" class="unread-dot"></span>
          </div>
        </div>

        <!-- 箭头 -->
        <div class="message-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredMessages.length === 0" class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/>
        </svg>
        <p>暂无{{ tabs.find(t => t.value === activeTab)?.label }}消息</p>
      </div>
    </div>

    <!-- 消息详情弹窗 -->
    <div v-if="selectedMessage" class="message-modal" @click.self="closeMessage">
      <div class="modal-content">
        <div class="modal-header" :class="selectedMessage.type">
          <div class="modal-icon">
            <component :is="getMessageIcon(selectedMessage.type)" />
          </div>
          <div class="modal-title-area">
            <span class="modal-type">{{ getTypeLabel(selectedMessage.type) }}</span>
            <h2 class="modal-title">{{ selectedMessage.title }}</h2>
          </div>
          <button class="close-btn" @click="closeMessage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <p class="modal-text">{{ selectedMessage.content }}</p>

          <!-- 详细信息卡片 -->
          <div v-if="selectedMessage.data" class="detail-card">
            <div v-if="selectedMessage.data.hospital" class="detail-item">
              <span class="detail-label">医院</span>
              <span class="detail-value">{{ selectedMessage.data.hospital }}</span>
            </div>
            <div v-if="selectedMessage.data.doctor" class="detail-item">
              <span class="detail-label">专家</span>
              <span class="detail-value">{{ selectedMessage.data.doctor }}</span>
            </div>
            <div v-if="selectedMessage.data.department" class="detail-item">
              <span class="detail-label">科室</span>
              <span class="detail-value">{{ selectedMessage.data.department }}</span>
            </div>
            <div v-if="selectedMessage.data.drugName" class="detail-item">
              <span class="detail-label">药物名称</span>
              <span class="detail-value">{{ selectedMessage.data.drugName }}</span>
            </div>
            <div v-if="selectedMessage.data.indication" class="detail-item">
              <span class="detail-label">适应症</span>
              <span class="detail-value">{{ selectedMessage.data.indication }}</span>
            </div>
            <div v-if="selectedMessage.data.phase" class="detail-item">
              <span class="detail-label">研发阶段</span>
              <span class="detail-value">{{ selectedMessage.data.phase }}</span>
            </div>
            <div v-if="selectedMessage.data.source" class="detail-item">
              <span class="detail-label">信息来源</span>
              <span class="detail-value">{{ selectedMessage.data.source }}</span>
            </div>
          </div>

          <!-- 标签 -->
          <div v-if="selectedMessage.data?.tags" class="modal-tags">
            <span 
              v-for="tag in selectedMessage.data.tags" 
              :key="tag" 
              class="modal-tag"
              :class="selectedMessage.type"
            >
              {{ tag }}
            </span>
          </div>

          <div class="modal-time">{{ selectedMessage.time }}</div>
        </div>

        <div class="modal-footer">
          <button class="action-btn secondary" @click="closeMessage">关闭</button>
          <button class="action-btn primary" :class="selectedMessage.type">
            {{ getActionText(selectedMessage.type) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useMessageStore, type Message } from '@/stores/message'

const messageStore = useMessageStore()

const activeTab = ref('all')
const selectedMessage = ref<Message | null>(null)

const tabs = [
  { label: '全部', value: 'all' },
  { label: '转诊', value: 'emergency' },
  { label: '新药', value: 'drug' },
  { label: '通知', value: 'system' }
]

const filteredMessages = computed(() => {
  if (activeTab.value === 'all') {
    return messageStore.messages
  }
  if (activeTab.value === 'system') {
    return messageStore.messages.filter(m => 
      ['system', 'appointment', 'report', 'health'].includes(m.type)
    )
  }
  return messageStore.messages.filter(m => m.type === activeTab.value)
})

// 图标组件
const IconEmergency = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' })
])

const IconDrug = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M4.22 11.29l5.66-5.66c1.56-1.56 4.1-1.56 5.66 0l2.83 2.83c1.56 1.56 1.56 4.1 0 5.66l-5.66 5.66c-1.56 1.56-4.1 1.56-5.66 0l-2.83-2.83c-1.56-1.56-1.56-4.1 0-5.66zm1.41 4.24l2.83 2.83c.78.78 2.05.78 2.83 0l2.83-2.83-5.66-5.66-2.83 2.83c-.78.78-.78 2.05 0 2.83z' })
])

const IconSystem = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' })
])

const IconAppointment = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z' })
])

const IconReport = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' })
])

const IconHealth = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' })
])

const getMessageIcon = (type: string) => {
  const iconMap: Record<string, any> = {
    emergency: IconEmergency,
    drug: IconDrug,
    system: IconSystem,
    appointment: IconAppointment,
    report: IconReport,
    health: IconHealth
  }
  return iconMap[type] || IconSystem
}

const getTypeLabel = (type: string) => {
  const labelMap: Record<string, string> = {
    emergency: '转诊服务',
    drug: '新药资讯',
    system: '系统通知',
    appointment: '预约提醒',
    report: '报告通知',
    health: '健康提醒'
  }
  return labelMap[type] || '消息'
}

const getActionText = (type: string) => {
  const actionMap: Record<string, string> = {
    emergency: '立即预约',
    drug: '了解详情',
    system: '查看详情',
    appointment: '查看预约',
    report: '查看报告',
    health: '查看建议'
  }
  return actionMap[type] || '查看详情'
}

const formatTime = (time: string) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  } else if (days === 1) {
    return '昨天'
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }
}

const openMessage = (message: Message) => {
  selectedMessage.value = message
  messageStore.markAsRead(message.id)
}

const closeMessage = () => {
  selectedMessage.value = null
}
</script>

<style scoped>
.messages-page {
  padding-bottom: var(--spacing-xl);
}

/* 筛选标签 */
.filter-tabs {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-md);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: 20px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-tab:hover {
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.filter-tab.active {
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  border-color: transparent;
  color: white;
}

.unread-badge {
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

/* 消息列表 */
.message-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.message-card {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.message-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.message-card.unread {
  background: linear-gradient(135deg, rgba(30, 58, 95, 0.05) 0%, rgba(30, 58, 95, 0.02) 100%);
}

.message-card.emergency {
  border-left-color: #E53935;
}

.message-card.drug {
  border-left-color: #7B1FA2;
}

.message-card.system,
.message-card.appointment,
.message-card.report,
.message-card.health {
  border-left-color: #1E3A5F;
}

/* 消息图标 */
.message-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message-icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.message-icon.emergency {
  background: linear-gradient(135deg, #E53935 0%, #C62828 100%);
  color: white;
}

.message-icon.drug {
  background: linear-gradient(135deg, #7B1FA2 0%, #6A1B9A 100%);
  color: white;
}

.message-icon.system,
.message-icon.appointment,
.message-icon.report,
.message-icon.health {
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  color: #C9A962;
}

/* 消息内容 */
.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: 6px;
}

.message-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  line-height: 1.4;
  font-family: var(--font-display);
}

.important-tag {
  padding: 2px 8px;
  background: linear-gradient(135deg, #E53935 0%, #C62828 100%);
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  flex-shrink: 0;
}

.message-summary {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--spacing-sm);
}

.message-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: var(--spacing-sm);
}

.tag {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 500;
}

.tag.emergency {
  background: rgba(229, 57, 53, 0.1);
  color: #E53935;
}

.tag.drug {
  background: rgba(123, 31, 162, 0.1);
  color: #7B1FA2;
}

.tag.system,
.tag.appointment,
.tag.report,
.tag.health {
  background: rgba(30, 58, 95, 0.1);
  color: #1E3A5F;
}

.message-footer {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.message-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.unread-dot {
  width: 8px;
  height: 8px;
  background: #E53935;
  border-radius: 50%;
}

.message-arrow {
  flex-shrink: 0;
  color: var(--color-text-tertiary);
}

.message-arrow svg {
  width: 20px;
  height: 20px;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: var(--spacing-xl) * 2;
  color: var(--color-text-tertiary);
}

.empty-state svg {
  width: 64px;
  height: 64px;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.empty-state p {
  font-size: var(--font-size-sm);
}

/* 消息详情弹窗 */
.message-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 2000;
  padding: var(--spacing-md);
}

.modal-content {
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  color: white;
}

.modal-header.emergency {
  background: linear-gradient(135deg, #E53935 0%, #C62828 100%);
}

.modal-header.drug {
  background: linear-gradient(135deg, #7B1FA2 0%, #6A1B9A 100%);
}

.modal-header.system,
.modal-header.appointment,
.modal-header.report,
.modal-header.health {
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
}

.modal-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.modal-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.modal-title-area {
  flex: 1;
  min-width: 0;
}

.modal-type {
  font-size: 11px;
  opacity: 0.8;
  margin-bottom: 4px;
  display: block;
}

.modal-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  line-height: 1.3;
  font-family: var(--font-display);
  color: white;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}

.close-btn svg {
  width: 20px;
  height: 20px;
  color: white;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-lg);
}

.modal-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
}

.detail-card {
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.detail-value {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  font-weight: 500;
}

.modal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: var(--spacing-md);
}

.modal-tag {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
}

.modal-tag.emergency {
  background: rgba(229, 57, 53, 0.1);
  color: #E53935;
}

.modal-tag.drug {
  background: rgba(123, 31, 162, 0.1);
  color: #7B1FA2;
}

.modal-tag.system,
.modal-tag.appointment,
.modal-tag.report,
.modal-tag.health {
  background: rgba(30, 58, 95, 0.1);
  color: #1E3A5F;
}

.modal-time {
  font-size: 11px;
  color: var(--color-text-tertiary);
  text-align: right;
}

.modal-footer {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border-top: 1px solid var(--color-border-light);
}

.action-btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.secondary {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

.action-btn.primary {
  color: white;
}

.action-btn.primary.emergency {
  background: linear-gradient(135deg, #E53935 0%, #C62828 100%);
}

.action-btn.primary.drug {
  background: linear-gradient(135deg, #7B1FA2 0%, #6A1B9A 100%);
}

.action-btn.primary.system,
.action-btn.primary.appointment,
.action-btn.primary.report,
.action-btn.primary.health {
  background: linear-gradient(135deg, #2E8B57 0%, #3FA76F 100%);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .message-card {
    padding: var(--spacing-sm);
  }
  
  .message-icon {
    width: 40px;
    height: 40px;
  }
  
  .message-icon :deep(svg) {
    width: 20px;
    height: 20px;
  }
  
  .modal-content {
    max-height: 90vh;
  }
}
</style>
