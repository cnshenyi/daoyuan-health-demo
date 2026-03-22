<template>
  <div class="member-detail">
    <PageNavBar :title="member.name" />
    <div class="hero">
      <div class="hero-avatar" :class="member.gender">{{ member.name.slice(-1) }}</div>
      <div class="hero-info">
        <h3>{{ member.name }}</h3>
        <p>{{ member.age }}岁 · {{ member.gender === 'male' ? '男' : '女' }} · {{ member.membershipType === 'premium' ? '尊享会员' : '标准会员' }}</p>
      </div>
      <span :class="['hero-status', member.status]">{{ statusLabel[member.status] }}</span>
    </div>

    <!-- 主要诊断 -->
    <div class="section">
      <h4 class="sec-title">主要诊断</h4>
      <div class="tag-list">
        <span v-for="d in member.primaryDiagnosis" :key="d" class="diag-tag">{{ d }}</span>
      </div>
    </div>

    <!-- 心理评估概览 -->
    <div class="section">
      <h4 class="sec-title">心理评估</h4>
      <div class="assess-grid">
        <div v-for="a in memberAssessments" :key="a.label" class="assess-item" @click="router.push('/mental/assessments')">
          <span class="assess-score" :style="{ color: a.color }">{{ a.score }}</span>
          <span class="assess-label">{{ a.label }}</span>
          <span class="assess-level" :style="{ color: a.color }">{{ a.level }}</span>
        </div>
      </div>
    </div>

    <!-- 情绪趋势 -->
    <div class="section">
      <h4 class="sec-title">情绪趋势（近4周）</h4>
      <div class="mood-row">
        <div v-for="m in moodData" :key="m.week" class="mood-item">
          <div class="mood-bar-wrap"><div class="mood-bar" :style="{ height: m.pct + '%', background: m.color }"></div></div>
          <span class="mood-emoji">{{ m.emoji }}</span>
          <span class="mood-week">{{ m.week }}</span>
        </div>
      </div>
    </div>

    <!-- 辅导计划 -->
    <div class="section">
      <h4 class="sec-title">辅导计划</h4>
      <div v-for="p in memberPlans" :key="p.name" class="plan-row" @click="router.push('/mental/plans')">
        <div class="plan-info"><span class="plan-name">{{ p.name }}</span><span class="plan-type">{{ p.type }}</span></div>
        <div class="plan-prog"><div class="prog-bar"><div class="prog-fill" :style="{ width: p.progress + '%' }"></div></div><span class="prog-pct">{{ p.progress }}%</span></div>
        <div class="plan-meta">已完成 {{ p.done }}/{{ p.total }} 次 · 下次 {{ p.next }}</div>
      </div>
    </div>

    <!-- 咨询记录 -->
    <div class="section">
      <h4 class="sec-title">最近咨询记录</h4>
      <div v-for="r in memberRecords" :key="r.date" class="record-card">
        <div class="rec-header"><span class="rec-date">{{ r.date }}</span><span class="rec-by">{{ r.by }}</span></div>
        <p class="rec-topic" v-if="r.topic">{{ r.topic }}</p>
        <p class="rec-text">{{ r.content }}</p>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="action-grid">
      <div class="action-card" @click="router.push('/mental/assessments')">
        <span class="action-icon">📋</span><span class="action-label">发起评估</span>
      </div>
      <div class="action-card" @click="router.push('/mental/plans')">
        <span class="action-icon">📝</span><span class="action-label">辅导计划</span>
      </div>
      <div class="action-card" @click="router.push('/mental/messages')">
        <span class="action-icon">💬</span><span class="action-label">发送消息</span>
      </div>
      <div class="action-card" @click="showToast('咨询已记录')">
        <span class="action-icon">🧠</span><span class="action-label">记录咨询</span>
      </div>
    </div>
    <div v-if="toastVisible" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockMemberProfiles } from '@/mock/data'
import PageNavBar from '@/components/PageNavBar.vue'

const route = useRoute()
const router = useRouter()
const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }
const member = mockMemberProfiles.find(m => m.id === route.params.id) || mockMemberProfiles[0]

// 根据会员ID返回不同数据
const assessMap: Record<string, any[]> = {
  '1': [{ label: 'PSQI 睡眠', score: 9, level: '较差', color: '#E67E22' }, { label: 'PSS 压力', score: 15, level: '中等', color: '#E67E22' }],
  '4': [{ label: 'PSQI 睡眠', score: 14, level: '严重', color: '#E53935' }, { label: 'PHQ-9 抑郁', score: 6, level: '轻度', color: '#E67E22' }],
  '6': [{ label: 'GAD-7 焦虑', score: 12, level: '中度', color: '#E53935' }, { label: 'PHQ-9 抑郁', score: 8, level: '轻度', color: '#E67E22' }, { label: 'PSQI 睡眠', score: 10, level: '较差', color: '#E67E22' }, { label: 'PSS 压力', score: 22, level: '偏高', color: '#E53935' }],
  '7': [{ label: 'PHQ-9 抑郁', score: 5, level: '轻微', color: '#2E8B57' }, { label: 'PSS 压力', score: 20, level: '中等', color: '#E67E22' }],
}
const defaultAssess = [{ label: 'PHQ-9 抑郁', score: 4, level: '正常', color: '#2E8B57' }, { label: 'GAD-7 焦虑', score: 5, level: '轻度', color: '#E67E22' }]
const memberAssessments = computed(() => assessMap[member.id] || defaultAssess)

const moodMap: Record<string, any[]> = {
  '6': [
    { week: '第1周', pct: 30, emoji: '😰', color: '#E53935' },
    { week: '第2周', pct: 40, emoji: '😟', color: '#E67E22' },
    { week: '第3周', pct: 55, emoji: '😐', color: '#E67E22' },
    { week: '第4周', pct: 65, emoji: '🙂', color: '#2E8B57' },
  ],
  '4': [
    { week: '第1周', pct: 25, emoji: '😴', color: '#E53935' },
    { week: '第2周', pct: 35, emoji: '😴', color: '#E53935' },
    { week: '第3周', pct: 45, emoji: '😐', color: '#E67E22' },
    { week: '第4周', pct: 50, emoji: '😐', color: '#E67E22' },
  ],
}
const defaultMood = [
  { week: '第1周', pct: 50, emoji: '😐', color: '#E67E22' },
  { week: '第2周', pct: 60, emoji: '🙂', color: '#2E8B57' },
  { week: '第3周', pct: 65, emoji: '🙂', color: '#2E8B57' },
  { week: '第4周', pct: 70, emoji: '😊', color: '#2E8B57' },
]
const moodData = computed(() => moodMap[member.id] || defaultMood)

const planMap: Record<string, any[]> = {
  '6': [
    { name: '认知行为训练', type: '心理咨询', progress: 50, done: 4, total: 8, next: '03-25' },
    { name: '正念减压训练', type: '正念训练', progress: 60, done: 6, total: 10, next: '03-24' },
  ],
  '1': [{ name: '慢病心理适应', type: '心理咨询', progress: 75, done: 3, total: 4, next: '03-28' }],
  '4': [{ name: '失眠认知干预', type: '心理咨询', progress: 40, done: 2, total: 5, next: '03-26' }],
  '7': [{ name: '糖尿病自我管理教育', type: '健康教育', progress: 30, done: 1, total: 3, next: '03-27' }],
}
const defaultPlans = [{ name: '健康心理教育', type: '健康教育', progress: 50, done: 1, total: 2, next: '03-30' }]
const memberPlans = computed(() => planMap[member.id] || defaultPlans)

const recordMap: Record<string, any[]> = {
  '6': [
    { date: '03-18', by: '周建国', topic: '认知重构练习', content: '患者能识别3种认知歪曲，练习了ABC模型。焦虑评分较上次下降。' },
    { date: '03-11', by: '周建国', topic: '焦虑触发因素分析', content: '梳理了主要焦虑触发场景，建立了焦虑层级表。' },
  ],
  '4': [
    { date: '03-16', by: '周建国', topic: '睡眠日记回顾', content: '入睡潜伏期仍较长（>45min），建议增加睡前放松训练。' },
    { date: '03-09', by: '刘晓燕', topic: '睡眠卫生教育', content: '讲解了睡眠卫生原则，制定了规律作息计划。' },
  ],
  '1': [
    { date: '03-20', by: '周建国', topic: '疾病接纳辅导', content: '患者对慢病管理态度积极，情绪稳定。建议继续正念练习。' },
  ],
}
const defaultRecords = [{ date: '03-15', by: '刘晓燕', content: '初次心理评估完成，整体心理状态良好。' }]
const memberRecords = computed(() => recordMap[member.id] || defaultRecords)

const toastVisible = ref(false)
const toastMsg = ref('')
const showToast = (msg: string) => { toastMsg.value = msg; toastVisible.value = true; setTimeout(() => toastVisible.value = false, 1500) }
</script>

<style scoped>
.member-detail { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.hero { display: flex; align-items: center; gap: 12px; padding: 16px; background: #fff; }
.hero-avatar { width: 48px; height: 48px; border-radius: 50%; color: #fff; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.hero-avatar.male { background: linear-gradient(135deg, #1E3A5F, #2a4a6f); }
.hero-avatar.female { background: linear-gradient(135deg, #C9A962, #D4B87A); }
.hero-info { flex: 1; }
.hero-info h3 { font-size: 16px; font-weight: 600; color: #333; margin: 0 0 2px; }
.hero-info p { font-size: 12px; color: #999; margin: 0; }
.hero-status { font-size: 11px; padding: 3px 8px; border-radius: 8px; }
.hero-status.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.hero-status.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.hero-status.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
.section { background: #fff; margin-top: 8px; padding: 14px 16px; }
.sec-title { font-size: 14px; font-weight: 600; color: #8E44AD; margin: 0 0 10px; }
.tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.diag-tag { font-size: 12px; padding: 4px 10px; border-radius: 10px; background: rgba(142,68,173,0.08); color: #8E44AD; }
.assess-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.assess-item { background: #f8f5fb; border-radius: 10px; padding: 10px; text-align: center; cursor: pointer; }
.assess-item:active { transform: scale(0.96); }
.assess-score { font-size: 22px; font-weight: 700; display: block; }
.assess-label { font-size: 11px; color: #999; display: block; margin: 2px 0; }
.assess-level { font-size: 12px; font-weight: 600; }
.mood-row { display: flex; justify-content: space-around; align-items: flex-end; height: 90px; margin-bottom: 4px; }
.mood-item { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.mood-bar-wrap { height: 50px; width: 24px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: flex-end; overflow: hidden; }
.mood-bar { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.5s; }
.mood-emoji { font-size: 16px; }
.mood-week { font-size: 10px; color: #999; }
.plan-row { padding: 10px 0; border-bottom: 1px solid #f5f5f5; cursor: pointer; }
.plan-row:last-child { border: none; }
.plan-info { display: flex; justify-content: space-between; margin-bottom: 6px; }
.plan-name { font-size: 13px; font-weight: 600; color: #333; }
.plan-type { font-size: 11px; color: #8E44AD; }
.plan-prog { display: flex; align-items: center; gap: 8px; }
.prog-bar { flex: 1; height: 5px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.prog-fill { height: 100%; background: linear-gradient(90deg, #8E44AD, #A569BD); border-radius: 3px; }
.prog-pct { font-size: 11px; color: #8E44AD; font-weight: 600; }
.plan-meta { font-size: 11px; color: #999; margin-top: 4px; }
.record-card { background: #f8f5fb; border-radius: 8px; padding: 10px 12px; margin-bottom: 6px; }
.rec-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.rec-date { font-size: 11px; color: #8E44AD; font-weight: 600; }
.rec-by { font-size: 11px; color: #999; }
.rec-topic { font-size: 12px; font-weight: 600; color: #333; margin: 0 0 2px; }
.rec-text { font-size: 12px; color: #666; margin: 0; line-height: 1.5; }
.action-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; padding: 12px 16px; }
.action-card { display: flex; flex-direction: column; align-items: center; gap: 6px; background: #fff; border-radius: 10px; padding: 12px 4px; cursor: pointer; }
.action-card:active { transform: scale(0.96); }
.action-icon { font-size: 22px; }
.action-label { font-size: 11px; color: #333; font-weight: 500; }
.toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(142,68,173,0.9); color: #fff; padding: 10px 24px; border-radius: 8px; font-size: 14px; z-index: 200; }
</style>
