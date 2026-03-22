<template>
  <div class="page-container role-dashboard">
    <div class="role-banner doctor-banner">
      <div class="banner-content">
        <p class="banner-date">{{ todayStr }}</p>
        <h1 class="banner-title">{{ greeting }}，{{ userStore.user?.name }} 医生</h1>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card"><span class="stat-num">{{ myPatients.length }}</span><span class="stat-label">我的患者</span></div>
      <div class="stat-card urgent"><span class="stat-num">{{ urgentCount }}</span><span class="stat-label">需关注</span></div>
      <div class="stat-card"><span class="stat-num">{{ todayTodos.length }}</span><span class="stat-label">今日待办</span></div>
      <div class="stat-card"><span class="stat-num">2</span><span class="stat-label">今日问诊</span></div>
    </div>

    <!-- 今日待办 -->
    <h3 class="section-title">今日待办</h3>
    <div class="todo-list">
      <div v-for="todo in todayTodos" :key="todo.id" class="todo-card" @click="goTodo(todo)">
        <div class="todo-dot" :class="todo.priority"></div>
        <div class="todo-info">
          <p class="todo-text">{{ todo.text }}</p>
          <p class="todo-meta">{{ todo.member }} · {{ todo.time }}</p>
        </div>
      </div>
    </div>

    <!-- 需关注患者 -->
    <h3 class="section-title" v-if="urgentPatients.length">需重点关注</h3>
    <div class="urgent-list">
      <div v-for="m in urgentPatients" :key="m.id" class="urgent-card" @click="router.push('/doctor/patients/' + m.id)">
        <div class="u-avatar" :style="{ background: m.gender === 'male' ? 'linear-gradient(135deg,#1E3A5F,#2a5a8f)' : 'linear-gradient(135deg,#8E44AD,#a569bd)' }">{{ m.name.slice(-1) }}</div>
        <div class="u-info">
          <span class="u-name">{{ m.name }}</span>
          <p class="u-meta">{{ m.primaryDiagnosis.join('、') }}</p>
        </div>
        <div class="u-score" style="background:rgba(229,57,53,0.1);color:#E53935">{{ m.healthScore }}</div>
      </div>
    </div>

    <!-- 患者列表 -->
    <h3 class="section-title">我的患者</h3>
    <div class="member-list">
      <div v-for="m in myPatients" :key="m.id" class="member-card" @click="router.push('/doctor/patients/' + m.id)">
        <div class="member-avatar" :style="{ background: m.gender === 'male' ? 'linear-gradient(135deg,#1E3A5F,#2a5a8f)' : 'linear-gradient(135deg,#8E44AD,#a569bd)' }">{{ m.name.slice(-1) }}</div>
        <div class="member-info">
          <div class="member-name">{{ m.name }}<span :class="['status-tag', m.status]">{{ statusLabel[m.status] }}</span></div>
          <div class="member-meta">{{ m.age }}岁 · {{ m.primaryDiagnosis.join('、') }}</div>
        </div>
        <div class="member-score" :class="scoreClass(m.healthScore)">{{ m.healthScore }}</div>
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

const myPatients = computed(() => mockMemberProfiles.filter(m => m.assignedDoctor === (userStore.user?.name || '李明华')))
const urgentCount = computed(() => myPatients.value.filter(m => m.status === 'urgent').length)
const urgentPatients = computed(() => myPatients.value.filter(m => m.status === 'urgent'))

const h = new Date().getHours()
const greeting = h < 12 ? '早上好' : h < 18 ? '下午好' : '晚上好'
const todayStr = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })

const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }
const scoreClass = (s: number) => s >= 80 ? 'good' : s >= 65 ? 'fair' : 'poor'

const todayTodos = [
  { id: 1, text: '陈建国 - 心内科会诊', member: '陈建国', time: '10:00', priority: 'urgent', action: 'detail', patientId: '3' },
  { id: 2, text: '沈轶 - 血糖复查结果查看', member: '沈轶', time: '11:00', priority: 'attention', action: 'detail', patientId: '1' },
  { id: 3, text: '周明 - INR监测随访', member: '周明', time: '14:00', priority: 'urgent', action: 'detail', patientId: '9' },
  { id: 4, text: '吴大伟 - 血脂复查', member: '吴大伟', time: '15:30', priority: 'attention', action: 'detail', patientId: '7' },
]

const goTodo = (todo: any) => router.push('/doctor/patients/' + todo.patientId)
</script>

<style scoped>
.role-dashboard { padding: 0; background: #f5f7fa; }
.role-banner { padding: 24px 16px 32px; color: #fff; border-radius: 0 0 16px 16px; }
.doctor-banner { background: linear-gradient(135deg, #1E3A5F 0%, #2a5a8f 100%); }
.banner-date { font-size: 12px; color: rgba(255,255,255,0.75); margin: 0 0 4px; }
.banner-title { font-size: 20px; font-weight: 700; margin: 0; color: #fff; }
.stats-row { display: flex; gap: 8px; padding: 0 16px; margin-top: -16px; }
.stat-card { flex: 1; background: #fff; border-radius: 10px; padding: 10px 6px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.stat-card.urgent .stat-num { color: #E53935; }
.stat-num { display: block; font-size: 22px; font-weight: 700; color: #1E3A5F; }
.stat-label { font-size: 11px; color: #999; }
.section-title { font-size: 15px; font-weight: 600; color: #1E3A5F; padding: 0 16px; margin: 16px 0 8px; }
.todo-list { padding: 0 16px; display: flex; flex-direction: column; gap: 6px; }
.todo-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 10px; padding: 12px; cursor: pointer; }
.todo-card:active { transform: scale(0.98); }
.todo-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.todo-dot.urgent { background: #E53935; }
.todo-dot.attention { background: #E67E22; }
.todo-info { flex: 1; }
.todo-text { font-size: 13px; color: #333; margin: 0; font-weight: 500; }
.todo-meta { font-size: 11px; color: #999; margin: 2px 0 0; }
.urgent-list { padding: 0 16px; display: flex; flex-direction: column; gap: 6px; }
.urgent-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 10px; padding: 12px; border-left: 3px solid #E53935; cursor: pointer; }
.urgent-card:active { transform: scale(0.98); }
.u-avatar { width: 36px; height: 36px; border-radius: 50%; color: #fff; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.u-info { flex: 1; min-width: 0; }
.u-name { font-size: 14px; font-weight: 600; color: #1E3A5F; }
.u-meta { font-size: 12px; color: #999; margin: 2px 0 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.u-score { width: 32px; height: 32px; border-radius: 50%; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.member-list { padding: 0 16px 80px; display: flex; flex-direction: column; gap: 8px; }
.member-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 10px; padding: 12px; cursor: pointer; }
.member-card:active { transform: scale(0.98); }
.member-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
.member-info { flex: 1; min-width: 0; }
.member-name { font-size: 14px; font-weight: 600; color: #333; display: flex; align-items: center; gap: 6px; }
.member-meta { font-size: 12px; color: #999; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.status-tag { font-size: 10px; padding: 1px 6px; border-radius: 4px; font-weight: 500; }
.status-tag.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.status-tag.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.status-tag.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
.member-score { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
.member-score.good { background: rgba(46,139,87,0.1); color: #2E8B57; }
.member-score.fair { background: rgba(230,126,34,0.1); color: #E67E22; }
.member-score.poor { background: rgba(229,57,53,0.1); color: #E53935; }
</style>
