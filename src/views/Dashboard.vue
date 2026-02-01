<template>
  <div class="page-container dashboard">
    <PullToRefreshIndicator
      :pull-distance="pullDistance"
      :is-refreshing="isRefreshing"
      :threshold="threshold"
    />

    <!-- 欢迎横幅 - 带健康名言 -->
    <div class="welcome-banner">
      <div class="welcome-content">
        <div class="welcome-greeting">
          <h1 class="welcome-title">您好，{{ userStore.user?.name }}</h1>
          <p class="welcome-quote">{{ currentQuote }}</p>
        </div>
      </div>
    </div>

    <!-- 健康数据快览 - 紧凑版 -->
    <div class="health-overview">
      <div class="stats-grid">
        <div class="stat-card stat-primary">
          <div class="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">{{ glucoseStore.latestReading?.value }}</div>
            <div class="stat-label">当前血糖</div>
          </div>
        </div>

        <div class="stat-card stat-success">
          <div class="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 3v18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M18 17l-5-5-4 4-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">{{ glucoseStore.averageGlucose }}</div>
            <div class="stat-label">平均血糖</div>
          </div>
        </div>

        <div class="stat-card stat-warning">
          <div class="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">{{ teamStore.members.length }}</div>
            <div class="stat-label">医疗团队</div>
          </div>
        </div>

        <div class="stat-card stat-info">
          <div class="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="stat-body">
            <div class="stat-value">{{ progressStore.notes.length }}</div>
            <div class="stat-label">病程记录</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 血糖统计 - 紧凑版 -->
    <div class="glucose-section">
      <div class="medical-card glucose-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">血糖统计（24小时）</h3>
          <button class="link-button" @click="$router.push('/glucose-monitoring')">
            详情 →
          </button>
        </div>
        <div class="glucose-grid">
          <div class="glucose-item">
            <div class="glucose-label">平均值</div>
            <div class="glucose-value">{{ glucoseStore.averageGlucose }}</div>
          </div>
          <div class="glucose-item">
            <div class="glucose-label">最新值</div>
            <div class="glucose-value" :class="getGlucoseStatusClass(glucoseStore.latestReading?.status)">
              {{ glucoseStore.latestReading?.value }}
            </div>
          </div>
          <div class="glucose-item">
            <div class="glucose-label">偏高次数</div>
            <div class="glucose-value warning">{{ glucoseStore.highReadingsCount }}</div>
          </div>
          <div class="glucose-item">
            <div class="glucose-label">偏低次数</div>
            <div class="glucose-value danger">{{ glucoseStore.lowReadingsCount }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 近期咨询 - 紧凑版 -->
    <div class="consultation-section">
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">近期咨询</h3>
          <button class="link-button" @click="$router.push('/progress-notes')">
            全部 →
          </button>
        </div>
        <div class="consultation-list">
          <div
            v-for="note in progressStore.notes.slice(0, 2)"
            :key="note.id"
            class="consultation-item"
          >
            <div class="consultation-header">
              <span class="consultation-date">{{ note.date }}</span>
              <span class="consultation-doctor">{{ note.doctor }}</span>
            </div>
            <h4 class="consultation-title">{{ note.title }}</h4>
            <p class="consultation-text">{{ note.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 即将到来的预约 - 紧凑版 -->
    <div class="appointment-section">
      <div class="medical-card">
        <div class="medical-card-header">
          <h3 class="medical-card-title">即将到来的预约</h3>
          <button class="link-button" @click="$router.push('/team-collaboration')">
            全部 →
          </button>
        </div>
        <div class="appointment-list">
          <div
            v-for="appointment in upcomingAppointments"
            :key="appointment.id"
            class="appointment-item"
          >
            <el-avatar :size="40" :src="appointment.avatar">
              {{ appointment.name.charAt(0) }}
            </el-avatar>
            <div class="appointment-info">
              <div class="appointment-name">{{ appointment.name }}</div>
              <div class="appointment-role">{{ appointment.roleName }}</div>
              <div class="appointment-time">{{ appointment.nextAppointment }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useGlucoseStore } from '@/stores/glucose'
import { useProgressStore } from '@/stores/progress'
import { useTeamStore } from '@/stores/team'
import { usePullToRefresh } from '@/composables/usePullToRefresh'
import PullToRefreshIndicator from '@/components/PullToRefreshIndicator.vue'

const userStore = useUserStore()
const glucoseStore = useGlucoseStore()
const progressStore = useProgressStore()
const teamStore = useTeamStore()

// 健康名言列表
const healthQuotes = [
  '健康是人生第一财富。—— 爱默生',
  '预防胜于治疗。',
  '身体是革命的本钱。',
  '健康的身体是灵魂的客厅。—— 培根',
  '运动是健康的源泉。',
  '早睡早起，精神百倍。',
  '饮食有节，起居有常。',
  '心宽体健，笑口常开。',
  '生命在于运动。—— 伏尔泰',
  '健康是智慧的条件。—— 爱默生'
]

const currentQuote = ref('')

onMounted(() => {
  // 随机选择一条名言
  const randomIndex = Math.floor(Math.random() * healthQuotes.length)
  currentQuote.value = healthQuotes[randomIndex]
})

// Pull to refresh
const { isRefreshing, pullDistance, threshold } = usePullToRefresh({
  onRefresh: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 刷新时更换名言
    const randomIndex = Math.floor(Math.random() * healthQuotes.length)
    currentQuote.value = healthQuotes[randomIndex]
    ElMessage.success('数据已刷新')
  }
})

const upcomingAppointments = computed(() => {
  return teamStore.members
    .filter(m => m.nextAppointment)
    .sort((a, b) => new Date(a.nextAppointment!).getTime() - new Date(b.nextAppointment!).getTime())
    .slice(0, 3)
})

const getGlucoseStatusClass = (status?: string) => {
  switch (status) {
    case 'low':
      return 'danger'
    case 'high':
    case 'critical':
      return 'warning'
    default:
      return 'success'
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: var(--spacing-xl);
}

/* 欢迎横幅 - 紧凑版 */
.welcome-banner {
  position: relative;
  background: linear-gradient(135deg, #1E3A5F 0%, #2A4F7F 100%);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(30, 58, 95, 0.2);
}

.welcome-content {
  position: relative;
  z-index: 1;
}

.welcome-greeting {
  flex: 1;
}

.welcome-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-display);
  letter-spacing: -0.5px;
}

.welcome-quote {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.85);
  font-weight: 400;
  font-style: italic;
  line-height: 1.4;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 健康数据快览 - 紧凑版 */
.health-overview {
  margin-bottom: var(--spacing-md);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xs);
}

.stat-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--color-primary);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-card.stat-primary::before {
  background: linear-gradient(90deg, #2E8B57, #3FA76F);
}

.stat-card.stat-success::before {
  background: linear-gradient(90deg, #2E8B57, #3FA76F);
}

.stat-card.stat-warning::before {
  background: linear-gradient(90deg, #C9A962, #D4B87A);
}

.stat-card.stat-info::before {
  background: linear-gradient(90deg, #1E3A5F, #2A4F7F);
}

.stat-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-alpha);
  color: var(--color-primary);
  flex-shrink: 0;
}

.stat-card.stat-success .stat-icon-wrapper {
  background: rgba(46, 139, 87, 0.1);
  color: #2E8B57;
}

.stat-card.stat-warning .stat-icon-wrapper {
  background: rgba(201, 169, 98, 0.1);
  color: #C9A962;
}

.stat-card.stat-info .stat-icon-wrapper {
  background: rgba(30, 58, 95, 0.1);
  color: #1E3A5F;
}

.stat-icon-wrapper svg {
  width: 18px;
  height: 18px;
}

.stat-body {
  flex: 1;
  min-width: 0;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-display);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: 500;
}

/* 血糖统计 - 紧凑版 */
.glucose-section {
  margin-bottom: var(--spacing-md);
}

.glucose-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xs);
}

.glucose-item {
  padding: var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.glucose-item:hover {
  background: var(--color-bg-cream);
  transform: translateY(-2px);
}

.glucose-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.glucose-value {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  font-weight: 700;
  font-family: var(--font-display);
}

.glucose-value.success {
  color: #2E8B57;
}

.glucose-value.warning {
  color: #C9A962;
}

.glucose-value.danger {
  color: #F56C6C;
}

/* 近期咨询 - 紧凑版 */
.consultation-section {
  margin-bottom: var(--spacing-md);
}

.consultation-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.consultation-item {
  padding: var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 3px solid #2E8B57;
}

.consultation-item:hover {
  background: var(--color-bg-cream);
  transform: translateX(4px);
}

.consultation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.consultation-date {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.consultation-doctor {
  font-size: var(--font-size-xs);
  color: #2E8B57;
  font-weight: 600;
}

.consultation-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  font-family: var(--font-body);
}

.consultation-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 即将到来的预约 - 紧凑版 */
.appointment-section {
  margin-bottom: var(--spacing-md);
}

.appointment-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.appointment-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.appointment-item:hover {
  background: var(--color-bg-cream);
  transform: translateX(4px);
}

.appointment-info {
  flex: 1;
  min-width: 0;
}

.appointment-name {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 2px;
}

.appointment-role {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: 2px;
}

.appointment-time {
  font-size: var(--font-size-xs);
  color: #2E8B57;
  font-weight: 500;
}

/* 链接按钮 */
.link-button {
  background: none;
  border: none;
  color: #2E8B57;
  font-size: var(--font-size-xs);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
}

.link-button:hover {
  background: rgba(46, 139, 87, 0.1);
  color: #3FA76F;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .welcome-banner {
    padding: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .welcome-title {
    font-size: var(--font-size-lg);
  }

  .welcome-quote {
    font-size: 10px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-value {
    font-size: var(--font-size-lg);
  }

  .glucose-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: var(--font-size-md);
  }

  .stat-value {
    font-size: var(--font-size-md);
  }
}
</style>

