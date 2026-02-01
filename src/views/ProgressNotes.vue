<template>
  <div class="page-container progress-notes">
    <div class="page-header">
      <h1 class="page-title">病程记录</h1>
      <p class="page-description">完整的医疗咨询和治疗记录</p>
    </div>

    <!-- 时间线视图 -->
    <div class="timeline-container">
      <div
        v-for="(note, index) in progressStore.notes"
        :key="note.id"
        class="timeline-item"
      >
        <div class="timeline-marker">
          <div class="marker-dot"></div>
          <div v-if="index < progressStore.notes.length - 1" class="marker-line"></div>
        </div>
        <div class="timeline-card">
          <div class="card-header">
            <div class="header-left">
              <h3 class="note-title">{{ note.title }}</h3>
              <div class="note-meta">
                <span class="note-date">{{ note.date }}</span>
                <span class="meta-divider">·</span>
                <span class="note-doctor">{{ note.doctor }}</span>
                <span class="meta-divider">·</span>
                <span class="note-role">{{ note.doctorRole }}</span>
              </div>
            </div>
            <div class="header-right">
              <span :class="['note-type', note.type]">
                {{ getTypeText(note.type) }}
              </span>
            </div>
          </div>
          <div class="card-body">
            <p class="note-content">{{ note.content }}</p>
          </div>
          <div v-if="note.attachments && note.attachments.length > 0" class="card-footer">
            <div class="attachments">
              <div class="attachments-label">附件：</div>
              <div class="attachments-list">
                <span
                  v-for="(attachment, idx) in note.attachments"
                  :key="idx"
                  class="attachment-item"
                >
                  📎 {{ attachment }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="progressStore.notes.length === 0" class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" width="64" height="64">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <p>暂无病程记录</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProgressStore } from '@/stores/progress'

const progressStore = useProgressStore()

const getTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    consultation: '咨询',
    checkup: '检查',
    treatment: '治疗',
    followup: '复诊',
    'medication-change': '用药调整',
    daily: '每日记录',
    'treatment-plan': '治疗方案'
  }
  return typeMap[type] || type
}
</script>

<style scoped>
.progress-notes {
  padding-bottom: var(--spacing-2xl);
}

.timeline-container {
  position: relative;
  padding: var(--spacing-lg) 0;
}

.timeline-item {
  display: flex;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  animation: slideInLeft 0.5s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-marker {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-accent);
  border: 4px solid var(--color-bg-primary);
  box-shadow: 0 0 0 2px var(--color-accent);
  z-index: 1;
}

.marker-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(180deg, var(--color-accent) 0%, var(--color-border) 100%);
  margin-top: var(--spacing-xs);
}

.timeline-card {
  flex: 1;
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.timeline-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border-light);
  background: linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-tertiary) 100%);
}

.header-left {
  flex: 1;
  min-width: 0;
}

.note-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-display);
  letter-spacing: -0.3px;
}

.note-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.note-date, .note-doctor, .note-role {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.note-doctor {
  font-weight: 600;
  color: var(--color-text-secondary);
}

.meta-divider {
  color: var(--color-text-tertiary);
}

.header-right {
  flex-shrink: 0;
  margin-left: var(--spacing-md);
}

.note-type {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.note-type.consultation {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.note-type.checkup {
  background: rgba(30, 58, 95, 0.1);
  color: var(--color-primary);
}

.note-type.treatment {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
}

.note-type.followup {
  background: rgba(144, 147, 153, 0.1);
  color: #909399;
}

.note-type.medication-change {
  background: rgba(201, 169, 98, 0.1);
  color: #C9A962;
}

.note-type.daily {
  background: rgba(46, 139, 87, 0.1);
  color: #2E8B57;
}

.note-type.treatment-plan {
  background: rgba(30, 58, 95, 0.1);
  color: #1E3A5F;
}

.card-body {
  padding: var(--spacing-xl);
}

.note-content {
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  line-height: 1.8;
  white-space: pre-wrap;
}

.card-footer {
  padding: var(--spacing-lg) var(--spacing-xl);
  background: var(--color-bg-tertiary);
  border-top: 1px solid var(--color-border-light);
}

.attachments {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
}

.attachments-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  font-weight: 600;
  flex-shrink: 0;
}

.attachments-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.attachment-item {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
  cursor: pointer;
}

.attachment-item:hover {
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
  color: var(--color-text-tertiary);
}

.empty-state svg {
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-lg);
}

.empty-state p {
  font-size: var(--font-size-lg);
  font-weight: 500;
}

@media (max-width: 768px) {
  .timeline-item {
    gap: var(--spacing-md);
  }

  .card-header {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .header-right {
    margin-left: 0;
  }

  .note-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }

  .meta-divider {
    display: none;
  }

  .attachments {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .timeline-item {
    gap: var(--spacing-sm);
  }

  .marker-dot {
    width: 12px;
    height: 12px;
  }

  .card-header, .card-body, .card-footer {
    padding: var(--spacing-md);
  }

  .note-title {
    font-size: var(--font-size-lg);
  }
}
</style>
