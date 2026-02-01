<template>
  <div class="page-container team-collaboration">
    <div class="page-header">
      <h1 class="page-title">健康管理团队</h1>
      <p class="page-description">您的专属医疗服务团队</p>
    </div>

    <!-- 团队成员列表 -->
    <div class="team-list">
      <div
        v-for="member in teamStore.members"
        :key="member.id"
        class="team-card"
      >
        <!-- 卡片头部 -->
        <div class="card-header">
          <div class="member-avatar-wrapper">
            <el-avatar :size="60" :src="member.avatar">
              {{ member.name.charAt(0) }}
            </el-avatar>
            <div class="online-indicator"></div>
          </div>
          <div class="member-basic">
            <h3 class="member-name">{{ member.name }}</h3>
            <div class="member-title">
              <span class="role-tag">{{ member.roleName }}</span>
            </div>
            <p class="member-specialty">{{ member.specialty }}</p>
          </div>
        </div>

        <!-- 服务统计 -->
        <div class="service-stats">
          <div class="stat-item">
            <div class="stat-value">{{ member.consultationsPerYear }}</div>
            <div class="stat-label">年度服务次数</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">{{ member.completedConsultations }}</div>
            <div class="stat-label">已完成咨询</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-value">{{ member.consultationsPerYear - member.completedConsultations }}</div>
            <div class="stat-label">剩余次数</div>
          </div>
        </div>

        <!-- 下次预约 -->
        <div v-if="member.nextAppointment" class="next-appointment">
          <div class="appointment-icon">
            <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="appointment-info">
            <span class="appointment-label">下次预约</span>
            <span class="appointment-date">{{ formatDate(member.nextAppointment) }}</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="card-actions">
          <button class="action-btn consult-btn">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
            </svg>
            在线咨询
          </button>
          <button class="action-btn book-btn">
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            预约服务
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from '@/stores/team'

const teamStore = useTeamStore()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekday = weekdays[date.getDay()]
  return `${month}月${day}日 ${weekday}`
}
</script>

<style scoped>
.team-collaboration {
  padding-bottom: var(--spacing-xl);
}

/* 团队成员列表 */
.team-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.team-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.team-card:hover {
  box-shadow: var(--shadow-md);
}

/* 卡片头部 */
.card-header {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.member-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.member-avatar-wrapper :deep(.el-avatar) {
  border: 3px solid #C9A962;
  box-shadow: 0 4px 12px rgba(201, 169, 98, 0.3);
}

.online-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 14px;
  height: 14px;
  background: #2E8B57;
  border: 2px solid white;
  border-radius: 50%;
}

.member-basic {
  flex: 1;
  min-width: 0;
}

.member-name {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-display);
}

.member-title {
  margin-bottom: var(--spacing-xs);
}

.role-tag {
  display: inline-block;
  padding: 2px 8px;
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: var(--radius-sm);
}

.member-specialty {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin: 0;
}

/* 服务统计 */
.service-stats {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-md);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
}

.stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #1E3A5F;
  font-family: var(--font-display);
  line-height: 1.2;
}

.stat-label {
  font-size: 10px;
  color: var(--color-text-tertiary);
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: rgba(30, 58, 95, 0.1);
}

/* 下次预约 */
.next-appointment {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: linear-gradient(135deg, rgba(46, 139, 87, 0.1) 0%, rgba(46, 139, 87, 0.05) 100%);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
  border-left: 3px solid #2E8B57;
}

.appointment-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: var(--radius-sm);
  color: #2E8B57;
}

.appointment-info {
  display: flex;
  flex-direction: column;
}

.appointment-label {
  font-size: 10px;
  color: var(--color-text-tertiary);
}

.appointment-date {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: #2E8B57;
}

/* 操作按钮 */
.card-actions {
  display: flex;
  gap: var(--spacing-sm);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.consult-btn {
  background: linear-gradient(135deg, #2E8B57 0%, #3FA76F 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(46, 139, 87, 0.3);
}

.consult-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(46, 139, 87, 0.4);
}

.book-btn {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  border: 1px solid rgba(30, 58, 95, 0.1);
}

.book-btn:hover {
  background: rgba(201, 169, 98, 0.1);
  color: #C9A962;
  border-color: rgba(201, 169, 98, 0.3);
}

/* 移动端响应式 */
@media (max-width: 480px) {
  .team-card {
    padding: var(--spacing-sm);
  }

  .member-avatar-wrapper :deep(.el-avatar) {
    width: 50px !important;
    height: 50px !important;
  }

  .member-name {
    font-size: var(--font-size-md);
  }

  .stat-value {
    font-size: var(--font-size-lg);
  }

  .action-btn {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-xs);
  }
}
</style>
