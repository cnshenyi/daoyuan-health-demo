<template>
  <div class="page-container role-dashboard">
    <div class="role-banner mental-banner">
      <div class="banner-content">
        <p class="banner-date">{{ todayStr }}</p>
        <h1 class="banner-title">{{ greeting }}，{{ userStore.user?.name }}</h1>
        <p class="banner-subtitle">心理与教育工作台</p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-num">{{ memberProfiles.length }}</span>
        <span class="stat-label">我的会员</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">2</span>
        <span class="stat-label">评估待完成</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">5</span>
        <span class="stat-label">辅导计划</span>
      </div>
    </div>

    <!-- 今日待办 -->
    <h3 class="section-title">今日待办</h3>
    <div class="todo-list">
      <div v-for="t in todos" :key="t.id" class="todo-card" @click="t.action && router.push(t.action)">
        <span class="todo-icon" :style="{ background: t.color + '15', color: t.color }">{{ t.icon }}</span>
        <div class="todo-info">
          <span class="todo-title">{{ t.title }}</span>
          <span class="todo-desc">{{ t.desc }}</span>
        </div>
        <span class="todo-time">{{ t.time }}</span>
      </div>
    </div>

    <h3 class="section-title">会员管理</h3>
    <div class="member-list">
      <div
        v-for="m in memberProfiles"
        :key="m.id"
        class="member-card"
        @click="router.push('/mental/members/' + m.id)"
      >
        <div class="member-avatar" :class="m.gender">
          {{ m.name.slice(-1) }}
        </div>
        <div class="member-info">
          <div class="member-name">{{ m.name }}</div>
          <div class="member-meta">{{ m.age }}岁 · {{ m.primaryDiagnosis.join('、') }}</div>
        </div>
        <span :class="['status-tag', m.status]">{{ statusLabel[m.status] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { mockMemberProfiles } from '@/mock/data'

const userStore = useUserStore()
const router = useRouter()
const memberProfiles = mockMemberProfiles
const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }

const now = new Date()
const hour = now.getHours()
const greeting = hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'
const todayStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${'日一二三四五六'[now.getDay()]}曜日`

const todos = [
  { id: 1, icon: '🧘', title: '赵晓雯 - CBT第5次', desc: '焦虑情绪管理·认知重构练习', time: '10:00', color: '#8E44AD', action: '/mental/plans/mp-1' },
  { id: 2, icon: '😴', title: '沈轶 - 睡眠评估复评', desc: 'PSQI量表·上次评分9分', time: '14:00', color: '#2E8B57', action: '/mental/assessments' },
  { id: 3, icon: '📝', title: '吴大伟 - 糖尿病教育', desc: '第2次健康教育课程', time: '15:30', color: '#E67E22', action: '/mental/plans/mp-5' },
  { id: 4, icon: '🧠', title: '王芳 - 失眠认知干预', desc: '第3次咨询·睡眠日记回顾', time: '16:30', color: '#1E3A5F', action: '/mental/plans/mp-4' },
]
</script>

<style scoped>
.role-dashboard { padding: 0; }
.role-banner { padding: 24px 16px; color: #fff; border-radius: 0 0 16px 16px; }
.mental-banner { background: linear-gradient(135deg, #8E44AD 0%, #A569BD 100%); }
.banner-date { font-size: 12px; margin: 0 0 4px; color: rgba(255,255,255,0.75); }
.banner-title { font-size: 20px; font-weight: 700; margin: 0 0 4px 0; color: #fff; }
.banner-subtitle { font-size: 13px; margin: 0; color: rgba(255,255,255,0.85); }
.stats-row { display: flex; gap: 10px; padding: 16px; margin-top: -12px; }
.stat-card { flex: 1; background: #fff; border-radius: 10px; padding: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.stat-num { display: block; font-size: 24px; font-weight: 700; color: #1E3A5F; }
.stat-label { font-size: 12px; color: #999; }
.section-title { font-size: 16px; font-weight: 600; color: #1E3A5F; padding: 0 16px; margin: 8px 0 12px; }
.todo-list { padding: 0 16px 8px; display: flex; flex-direction: column; gap: 6px; }
.todo-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 10px; padding: 12px; cursor: pointer; }
.todo-card:active { transform: scale(0.98); }
.todo-icon { width: 36px; height: 36px; border-radius: 10px; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.todo-info { flex: 1; min-width: 0; }
.todo-title { font-size: 13px; font-weight: 600; color: #333; display: block; }
.todo-desc { font-size: 11px; color: #999; display: block; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.todo-time { font-size: 12px; color: #8E44AD; font-weight: 600; flex-shrink: 0; }
.member-list { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 10px; }
.member-card { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 10px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); cursor: pointer; }
.member-card:active { transform: scale(0.98); }
.member-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 600; color: #fff; flex-shrink: 0; }
.member-avatar.male { background: linear-gradient(135deg, #1E3A5F, #2a4a6f); }
.member-avatar.female { background: linear-gradient(135deg, #C9A962, #D4B87A); }
.member-info { flex: 1; min-width: 0; }
.member-name { font-size: 15px; font-weight: 600; color: #333; }
.member-meta { font-size: 12px; color: #999; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.status-tag { font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: 500; flex-shrink: 0; }
.status-tag.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.status-tag.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.status-tag.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
</style>
