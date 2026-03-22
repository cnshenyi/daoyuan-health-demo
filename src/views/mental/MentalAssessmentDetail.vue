<template>
  <div class="assessment-detail">
    <PageNavBar :title="assessment.memberName + ' - ' + assessment.scaleName" />
    <div class="hero">
      <div class="hero-avatar">{{ assessment.memberName.slice(-1) }}</div>
      <div class="hero-info"><h3>{{ assessment.memberName }}</h3><p>{{ assessment.scaleName }}</p></div>
      <span :class="['hero-status', assessment.status]">{{ statusLabel[assessment.status] }}</span>
    </div>

    <!-- 评分结果 -->
    <div class="section">
      <h4 class="sec-title">评分结果</h4>
      <div class="score-display">
        <div class="score-circle" :style="{ '--pct': scorePct, '--color': assessment.levelColor }">
          <span class="score-num">{{ assessment.score }}</span>
          <span class="score-max">/{{ assessment.maxScore }}</span>
        </div>
        <div class="score-info">
          <span class="score-level" :style="{ color: assessment.levelColor }">{{ assessment.level }}</span>
          <p class="score-desc">{{ assessment.levelDesc }}</p>
        </div>
      </div>
    </div>

    <!-- 分数解读 -->
    <div class="section">
      <h4 class="sec-title">分数解读</h4>
      <div v-for="r in ranges" :key="r.label" class="range-row">
        <div class="range-bar-bg"><div class="range-bar-fill" :style="{ width: r.width, background: r.color }"></div></div>
        <div class="range-info">
          <span class="range-label">{{ r.label }}</span>
          <span class="range-val" :style="{ color: r.color }">{{ r.range }}</span>
        </div>
        <span v-if="r.current" class="range-current">← 当前</span>
      </div>
    </div>

    <!-- 趋势对比 -->
    <div class="section" v-if="history.length > 1">
      <h4 class="sec-title">趋势对比</h4>
      <div class="trend-row">
        <div v-for="h in history" :key="h.date" class="trend-item">
          <div class="trend-bar-wrap"><div class="trend-bar" :style="{ height: (h.score / assessment.maxScore * 100) + '%', background: h.color }"></div></div>
          <span class="trend-score">{{ h.score }}</span>
          <span class="trend-date">{{ h.date }}</span>
        </div>
      </div>
      <div class="trend-change">
        <span :class="['change-val', trendDir]">{{ trendDir === 'down' ? '↓' : '↑' }} {{ Math.abs(history[history.length-1].score - history[history.length-2].score) }}分</span>
        <span class="change-label">较上次{{ trendDir === 'down' ? '下降' : '上升' }}</span>
      </div>
    </div>

    <!-- 建议措施 -->
    <div class="section">
      <h4 class="sec-title">建议措施</h4>
      <div v-for="(s, i) in suggestions" :key="i" class="suggest-card">
        <span class="suggest-icon" :style="{ background: s.color + '15', color: s.color }">
          <svg v-if="s.icon === 'counseling'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <svg v-else-if="s.icon === 'education'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          <svg v-else-if="s.icon === 'exercise'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M4 17l4-4 2 2 4-6 2 2 4-4"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
          <svg v-else-if="s.icon === 'sleep'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </span>
        <div class="suggest-info"><span class="suggest-title">{{ s.title }}</span><p class="suggest-desc">{{ s.desc }}</p></div>
      </div>
    </div>

    <div class="action-bar">
      <button class="action-btn primary" @click="showToast('已安排复评')">安排复评</button>
      <button class="action-btn secondary" @click="showToast('报告已导出')">导出报告</button>
    </div>
    <div v-if="toastVisible" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import PageNavBar from '@/components/PageNavBar.vue'

const route = useRoute()
const statusLabel: Record<string, string> = { completed: '已完成', review: '需复评', pending: '待评估' }

const assessmentsData: Record<string, any> = {
  'as-1': { memberName: '赵晓雯', scaleName: 'PHQ-9 抑郁量表', status: 'completed', score: 8, maxScore: 27, level: '轻度抑郁', levelColor: '#E67E22', levelDesc: '存在轻度抑郁症状，建议定期随访，配合心理辅导。' },
  'as-2': { memberName: '赵晓雯', scaleName: 'GAD-7 焦虑量表', status: 'completed', score: 12, maxScore: 21, level: '中度焦虑', levelColor: '#E53935', levelDesc: '焦虑症状较明显，建议结合认知行为治疗和放松训练。' },
  'as-3': { memberName: '沈轶', scaleName: 'PSQI 睡眠质量', status: 'review', score: 9, maxScore: 21, level: '睡眠质量差', levelColor: '#E67E22', levelDesc: '睡眠质量欠佳，建议改善睡眠卫生习惯，必要时药物辅助。' },
  'as-4': { memberName: '王芳', scaleName: 'PSQI 睡眠质量', status: 'completed', score: 14, maxScore: 21, level: '严重睡眠障碍', levelColor: '#E53935', levelDesc: '睡眠严重受损，需综合干预，建议转诊睡眠专科。' },
  'as-7': { memberName: '赵晓雯', scaleName: 'GAD-7 焦虑量表', status: 'review', score: 12, maxScore: 21, level: '中度焦虑', levelColor: '#E53935', levelDesc: '焦虑症状较明显，建议结合认知行为治疗和放松训练。' },
  'as-8': { memberName: '刘静', scaleName: '压力感知量表 PSS-10', status: 'completed', score: 18, maxScore: 40, level: '中等压力', levelColor: '#E67E22', levelDesc: '压力水平中等，建议学习压力管理技巧，适当运动放松。' },
}
const assessment = assessmentsData[route.params.id as string] || assessmentsData['as-1']
const scorePct = computed(() => Math.round(assessment.score / assessment.maxScore * 100))

const ranges = [
  { label: '正常', range: '0-4', width: '15%', color: '#2E8B57', current: assessment.score <= 4 },
  { label: '轻度', range: '5-9', width: '33%', color: '#E67E22', current: assessment.score >= 5 && assessment.score <= 9 },
  { label: '中度', range: '10-14', width: '52%', color: '#E67E22', current: assessment.score >= 10 && assessment.score <= 14 },
  { label: '中重度', range: '15-19', width: '70%', color: '#E53935', current: assessment.score >= 15 && assessment.score <= 19 },
  { label: '重度', range: '20-27', width: '100%', color: '#B71C1C', current: assessment.score >= 20 },
]

const history = [
  { date: '01-15', score: 15, color: '#E53935' },
  { date: '02-15', score: 11, color: '#E67E22' },
  { date: '03-20', score: assessment.score, color: assessment.levelColor },
]
const trendDir = computed(() => history[history.length-1].score <= history[history.length-2].score ? 'down' : 'up')

const suggestions = [
  { icon: 'counseling', title: '正念冥想', desc: '每日10-15分钟正念练习，缓解焦虑情绪', color: '#8E44AD' },
  { icon: 'education', title: '认知行为训练', desc: '识别负面自动思维，建立积极认知模式', color: '#1E3A5F' },
  { icon: 'exercise', title: '规律运动', desc: '每周3-5次有氧运动，每次30分钟以上', color: '#2E8B57' },
  { icon: 'sleep', title: '睡眠改善', desc: '固定作息时间，睡前1小时避免电子设备', color: '#E67E22' },
]

const toastVisible = ref(false)
const toastMsg = ref('')
const showToast = (msg: string) => { toastMsg.value = msg; toastVisible.value = true; setTimeout(() => toastVisible.value = false, 1500) }
</script>

<style scoped>
.assessment-detail { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.hero { display: flex; align-items: center; gap: 12px; padding: 16px; background: #fff; }
.hero-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg,#8E44AD,#A569BD); color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.hero-info { flex: 1; }
.hero-info h3 { font-size: 15px; font-weight: 600; color: #333; margin: 0 0 2px; }
.hero-info p { font-size: 12px; color: #999; margin: 0; }
.hero-status { font-size: 11px; padding: 3px 8px; border-radius: 8px; }
.hero-status.completed { background: rgba(46,139,87,0.1); color: #2E8B57; }
.hero-status.review { background: rgba(142,68,173,0.1); color: #8E44AD; }
.section { background: #fff; margin-top: 8px; padding: 14px 16px; }
.sec-title { font-size: 14px; font-weight: 600; color: #8E44AD; margin: 0 0 12px; }
.score-display { display: flex; align-items: center; gap: 16px; }
.score-circle { width: 80px; height: 80px; border-radius: 50%; background: conic-gradient(var(--color) calc(var(--pct) * 1%), #f0f0f0 0); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; flex-shrink: 0; }
.score-circle::before { content: ''; position: absolute; width: 64px; height: 64px; border-radius: 50%; background: #fff; }
.score-num { position: relative; z-index: 1; font-size: 22px; font-weight: 700; color: #333; line-height: 1; }
.score-max { position: relative; z-index: 1; font-size: 11px; color: #999; }
.score-info { flex: 1; }
.score-level { font-size: 16px; font-weight: 700; display: block; margin-bottom: 4px; }
.score-desc { font-size: 12px; color: #666; margin: 0; line-height: 1.5; }
.range-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.range-bar-bg { width: 80px; height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; flex-shrink: 0; }
.range-bar-fill { height: 100%; border-radius: 3px; }
.range-info { flex: 1; display: flex; justify-content: space-between; }
.range-label { font-size: 12px; color: #666; }
.range-val { font-size: 11px; font-weight: 600; }
.range-current { font-size: 10px; color: #8E44AD; font-weight: 600; flex-shrink: 0; }
.trend-row { display: flex; justify-content: space-around; align-items: flex-end; height: 80px; margin-bottom: 8px; }
.trend-item { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.trend-bar-wrap { height: 60px; width: 28px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: flex-end; overflow: hidden; }
.trend-bar { width: 100%; border-radius: 4px 4px 0 0; transition: height 0.5s; }
.trend-score { font-size: 11px; font-weight: 600; color: #333; }
.trend-date { font-size: 10px; color: #999; }
.trend-change { text-align: center; padding: 8px; background: #f8f5fb; border-radius: 8px; }
.change-val { font-size: 16px; font-weight: 700; }
.change-val.down { color: #2E8B57; }
.change-val.up { color: #E53935; }
.change-label { font-size: 12px; color: #666; margin-left: 4px; }
.suggest-card { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f5f5f5; }
.suggest-card:last-child { border: none; }
.suggest-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.suggest-icon svg { width: 18px; height: 18px; }
.suggest-info { flex: 1; }
.suggest-title { font-size: 13px; font-weight: 600; color: #333; display: block; margin-bottom: 2px; }
.suggest-desc { font-size: 12px; color: #999; margin: 0; }
.action-bar { display: flex; gap: 10px; padding: 16px; }
.action-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.action-btn.primary { background: #8E44AD; color: #fff; }
.action-btn.secondary { background: rgba(142,68,173,0.1); color: #8E44AD; }
.toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(142,68,173,0.9); color: #fff; padding: 10px 24px; border-radius: 8px; font-size: 14px; z-index: 200; }
</style>
