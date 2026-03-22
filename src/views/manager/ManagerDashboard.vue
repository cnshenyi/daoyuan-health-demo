<template>
  <div class="manager-dashboard">
    <!-- 顶部欢迎区 -->
    <div class="welcome-section">
      <div class="welcome-top">
        <p class="welcome-date">{{ todayStr }}</p>
        <h1 class="welcome-name">{{ greeting }}，{{ userStore.user?.name }}</h1>
        <p class="welcome-hint">今日有 <strong>{{ urgentCount }}</strong> 位会员需要重点关注</p>
      </div>

      <!-- 快捷统计 -->
      <div class="quick-stats">
        <div class="quick-stat">
          <span class="qs-num">{{ memberProfiles.length }}</span>
          <span class="qs-label">管理会员</span>
        </div>
        <div class="qs-divider"></div>
        <div class="quick-stat">
          <span class="qs-num urgent">{{ urgentCount }}</span>
          <span class="qs-label">需关注</span>
        </div>
        <div class="qs-divider"></div>
        <div class="quick-stat">
          <span class="qs-num attention">{{ attentionCount }}</span>
          <span class="qs-label">待跟进</span>
        </div>
        <div class="qs-divider"></div>
        <div class="quick-stat">
          <span class="qs-num">{{ stableCount }}</span>
          <span class="qs-label">状态良好</span>
        </div>
      </div>
    </div>

    <!-- 今日待办 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">今日待办</h3>
        <span class="section-more">全部</span>
      </div>
      <div class="todo-list">
        <div v-for="todo in todayTodos" :key="todo.id" class="todo-card" @click="goTodo(todo)">
          <div class="todo-dot" :class="todo.priority"></div>
          <div class="todo-info">
            <p class="todo-text">{{ todo.text }}</p>
            <p class="todo-meta">{{ todo.member }} · {{ todo.time }}</p>
          </div>
          <div class="todo-action" :class="todo.done ? 'done' : ''">
            <svg v-if="todo.done" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 需关注会员 -->
    <div class="section" v-if="urgentMembers.length">
      <div class="section-header">
        <h3 class="section-title">需重点关注</h3>
        <span class="section-badge urgent-badge">{{ urgentMembers.length }}</span>
      </div>
      <div class="urgent-list">
        <div v-for="m in urgentMembers" :key="m.id" class="urgent-card" @click="goMember(m.id)">
          <div class="member-avatar" :class="m.gender">{{ m.name.slice(-1) }}</div>
          <div class="member-info">
            <div class="member-name-row">
              <span class="member-name">{{ m.name }}</span>
              <span class="status-tag urgent">紧急</span>
            </div>
            <p class="member-diag">{{ m.primaryDiagnosis.join('、') }}</p>
          </div>
          <div class="member-score poor">{{ m.healthScore }}</div>
        </div>
      </div>
    </div>

    <!-- 全部会员 -->
    <div class="section">
      <div class="section-header">
        <h3 class="section-title">我的会员</h3>
        <span class="section-more">{{ memberProfiles.length }}位</span>
      </div>
      <div class="member-list">
        <div v-for="m in memberProfiles" :key="m.id" class="member-card" @click="goMember(m.id)">
          <div class="member-avatar" :class="m.gender">{{ m.name.slice(-1) }}</div>
          <div class="member-info">
            <div class="member-name-row">
              <span class="member-name">{{ m.name }}</span>
              <span :class="['status-tag', m.status]">{{ statusLabel[m.status] }}</span>
            </div>
            <p class="member-diag">{{ m.age }}岁 · {{ m.primaryDiagnosis[0] }}</p>
            <p class="member-checkin">末次签到：{{ m.lastCheckIn }}</p>
          </div>
          <div :class="['member-score', scoreClass(m.healthScore)]">{{ m.healthScore }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { mockMemberProfiles } from '@/mock/data'

const router = useRouter()
const userStore = useUserStore()
const memberProfiles = mockMemberProfiles

// 问候语
const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'
const todayStr = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })

const urgentCount = computed(() => memberProfiles.filter(m => m.status === 'urgent').length)
const attentionCount = computed(() => memberProfiles.filter(m => m.status === 'attention').length)
const stableCount = computed(() => memberProfiles.filter(m => m.status === 'stable').length)
const urgentMembers = computed(() => memberProfiles.filter(m => m.status === 'urgent'))

const statusLabel: Record<string, string> = {
  stable: '稳定', attention: '关注', urgent: '紧急'
}

const scoreClass = (score: number) => {
  if (score >= 80) return 'good'
  if (score >= 65) return 'fair'
  return 'poor'
}

// 今日待办 mock
const todayTodos = [
  { id: 1, text: '陈建国 - 血压数据跟进', member: '陈建国', time: '10:00', priority: 'urgent', done: false },
  { id: 2, text: '李志远 - 本周病程记录录入', member: '李志远', time: '14:00', priority: 'urgent', done: false },
  { id: 3, text: '沈轶 - 血糖数据周报发送', member: '沈轶', time: '16:00', priority: 'attention', done: false },
  { id: 4, text: '张慧敏 - 体检报告回访', member: '张慧敏', time: '已完成', priority: 'stable', done: true },
]

const goMember = (id: string) => router.push('/manager/members/' + id)
const goTodo = (todo: any) => router.push('/manager/members/' + (mockMemberProfiles.find(m => m.name === todo.member)?.id || '1'))
</script>

<style scoped>
.manager-dashboard {
  padding: 0 0 80px;
  background: #f5f7fa;
  min-height: 100vh;
}

/* ========== 欢迎区 ========== */
.welcome-section {
  background: linear-gradient(145deg, #2E8B57 0%, #1a6b3c 100%);
  padding: 16px 16px 0;
  border-radius: 0 0 24px 24px;
}

.welcome-top {
  margin-bottom: 14px;
}

.welcome-date {
  font-size: 11px;
  color: rgba(255,255,255,0.6);
  margin: 0 0 3px;
  letter-spacing: 0.5px;
}

.welcome-name {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px;
  line-height: 1.3;
}

.welcome-hint {
  font-size: 12px;
  color: rgba(255,255,255,0.7);
  margin: 0;
}

.welcome-hint strong {
  color: #FFD580;
  font-weight: 700;
}

/* 快捷统计条 */
.quick-stats {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.12);
  border-radius: 12px 12px 0 0;
  padding: 12px 0;
  margin: 0 -16px;
  padding-left: 16px;
  padding-right: 16px;
}

.quick-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.qs-divider {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.2);
}

.qs-num {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.qs-num.urgent { color: #FFD580; }
.qs-num.attention { color: #FFB347; }

.qs-label {
  font-size: 11px;
  color: rgba(255,255,255,0.65);
}

/* ========== 通用 section ========== */
.section {
  margin: 16px 16px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1E3A5F;
  margin: 0;
}

.section-more {
  font-size: 12px;
  color: #999;
}

.section-badge {
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.urgent-badge {
  background: rgba(229,57,53,0.1);
  color: #E53935;
}

/* ========== 今日待办 ========== */
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.todo-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.15s;
}

.todo-card:active { transform: scale(0.98); }

.todo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.todo-dot.urgent { background: #E53935; }
.todo-dot.attention { background: #E67E22; }
.todo-dot.stable { background: #2E8B57; }

.todo-info {
  flex: 1;
  min-width: 0;
}

.todo-text {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 2px;
}

.todo-meta {
  font-size: 12px;
  color: #aaa;
  margin: 0;
}

.todo-action {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: #ddd;
}

.todo-action.done {
  color: #2E8B57;
}

.todo-action svg {
  width: 24px;
  height: 24px;
}

/* ========== 会员卡片 ========== */
.urgent-list,
.member-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.urgent-card,
.member-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.15s;
}

.urgent-card:active,
.member-card:active {
  transform: scale(0.98);
}

.urgent-card {
  border-left: 3px solid #E53935;
}

.member-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}

.member-avatar.male { background: linear-gradient(135deg, #1E3A5F, #2a4a6f); }
.member-avatar.female { background: linear-gradient(135deg, #C9A962, #D4B87A); }

.member-info { flex: 1; min-width: 0; }

.member-name-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.member-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}

.member-diag {
  font-size: 12px;
  color: #999;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.member-checkin {
  font-size: 11px;
  color: #bbb;
  margin: 2px 0 0;
}

.status-tag {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.status-tag.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.status-tag.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.status-tag.urgent { background: rgba(229,57,53,0.1); color: #E53935; }

.member-score {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.member-score.good { background: rgba(46,139,87,0.1); color: #2E8B57; }
.member-score.fair { background: rgba(230,126,34,0.1); color: #E67E22; }
.member-score.poor { background: rgba(229,57,53,0.1); color: #E53935; }
</style>
