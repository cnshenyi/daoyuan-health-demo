<template>
  <div class="plan-detail">
    <PageNavBar :title="plan.memberName + ' - ' + typeLabel[plan.type]" />
    <div class="hero">
      <div class="hero-avatar">{{ plan.memberName.slice(-1) }}</div>
      <div class="hero-info"><h3>{{ plan.memberName }}</h3><p>{{ plan.goal }}</p></div>
      <span :class="['hero-status', plan.status]">{{ plan.status === 'active' ? '进行中' : '已完成' }}</span>
    </div>

    <!-- 进度 -->
    <div class="progress-section">
      <div class="prog-header"><span>总体进度</span><span class="prog-val">{{ plan.progress }}%</span></div>
      <div class="prog-bar"><div class="prog-fill" :style="{ width: plan.progress + '%' }"></div></div>
      <div class="prog-sessions">已完成 {{ plan.done }}/{{ plan.total }} 次 · 下次：{{ plan.nextDate }}</div>
    </div>

    <!-- 治疗目标 -->
    <div class="section">
      <h4 class="sec-title">治疗目标</h4>
      <div v-for="g in goals" :key="g.label" class="goal-row">
        <div class="goal-check" :class="g.done ? 'done' : ''">
          <svg v-if="g.done" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <div class="goal-info"><span class="goal-label">{{ g.label }}</span><span class="goal-target">{{ g.target }}</span></div>
      </div>
    </div>

    <!-- 治疗方案 -->
    <div class="section">
      <h4 class="sec-title">治疗方案</h4>
      <div v-for="s in strategies" :key="s.name" class="strategy-card">
        <span class="strategy-icon">{{ s.icon }}</span>
        <div class="strategy-info">
          <span class="strategy-name">{{ s.name }}</span>
          <p class="strategy-desc">{{ s.desc }}</p>
          <span class="strategy-freq">{{ s.frequency }}</span>
        </div>
      </div>
    </div>

    <!-- 咨询记录 -->
    <div class="section">
      <h4 class="sec-title">咨询记录</h4>
      <div v-for="r in records" :key="r.date" class="record-card">
        <div class="rec-header">
          <span class="rec-session">第{{ r.session }}次</span>
          <span class="rec-date">{{ r.date }}</span>
        </div>
        <p class="rec-topic">主题：{{ r.topic }}</p>
        <p class="rec-text">{{ r.content }}</p>
        <div v-if="r.homework" class="rec-homework">
          <span class="hw-label">课后作业：</span>{{ r.homework }}
        </div>
      </div>
    </div>

    <!-- 评估变化 -->
    <div class="section" v-if="assessTrend.length">
      <h4 class="sec-title">评估变化</h4>
      <div class="trend-row">
        <div v-for="t in assessTrend" :key="t.date" class="trend-item">
          <div class="trend-bar-wrap"><div class="trend-bar" :style="{ height: (t.score / t.max * 100) + '%', background: t.color }"></div></div>
          <span class="trend-score">{{ t.score }}</span>
          <span class="trend-date">{{ t.date }}</span>
        </div>
      </div>
      <div class="trend-label">{{ assessTrend[0].name }}</div>
    </div>

    <div class="action-bar">
      <button class="action-btn primary" @click="showToast('咨询记录已保存')">记录咨询</button>
      <button class="action-btn secondary" @click="showToast('方案已更新')">调整方案</button>
    </div>
    <div v-if="toastVisible" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageNavBar from '@/components/PageNavBar.vue'

const route = useRoute()
const typeLabel: Record<string, string> = { counseling: '心理咨询', cbt: '认知行为', mindfulness: '正念训练', education: '健康教育' }

const plansData: Record<string, any> = {
  'mp-1': { memberName: '赵晓雯', type: 'cbt', goal: '焦虑情绪管理：识别焦虑触发因素，建立应对策略', progress: 50, done: 4, total: 8, nextDate: '03-25', status: 'active' },
  'mp-2': { memberName: '赵晓雯', type: 'mindfulness', goal: '正念减压训练：每日冥想练习，提升情绪觉察力', progress: 60, done: 6, total: 10, nextDate: '03-24', status: 'active' },
  'mp-3': { memberName: '沈轶', type: 'counseling', goal: '慢病心理适应：接纳疾病，建立积极生活态度', progress: 75, done: 3, total: 4, nextDate: '03-28', status: 'active' },
  'mp-4': { memberName: '王芳', type: 'counseling', goal: '失眠认知干预：纠正睡眠错误认知，建立健康睡眠习惯', progress: 40, done: 2, total: 5, nextDate: '03-26', status: 'active' },
  'mp-5': { memberName: '吴大伟', type: 'education', goal: '糖尿病自我管理教育：血糖监测、饮食管理、运动指导', progress: 30, done: 1, total: 3, nextDate: '03-27', status: 'active' },
  'mp-6': { memberName: '陈建国', type: 'education', goal: '痛风健康教育：低嘌呤饮食知识、生活方式调整', progress: 100, done: 2, total: 2, nextDate: '-', status: 'completed' },
  'mp-7': { memberName: '刘静', type: 'mindfulness', goal: '压力管理训练：渐进式肌肉放松+呼吸训练', progress: 45, done: 3, total: 6, nextDate: '03-29', status: 'active' },
}
const plan = plansData[route.params.id as string] || plansData['mp-1']

const goals = [
  { label: '第1阶段', target: '建立治疗联盟，识别核心问题', done: true },
  { label: '第2阶段', target: '学习应对技巧，认知重构练习', done: true },
  { label: '第3阶段', target: '巩固技能，预防复发', done: false },
  { label: '第4阶段', target: '独立应用，结束治疗', done: false },
]

const strategies = [
  { icon: '🧠', name: '认知重构', desc: '识别自动化负面思维，用理性思维替代', frequency: '每次咨询' },
  { icon: '📝', name: '思维记录', desc: '记录触发事件、自动思维、情绪反应和理性回应', frequency: '每日练习' },
  { icon: '🧘', name: '放松训练', desc: '渐进式肌肉放松 + 腹式呼吸练习', frequency: '每日2次' },
  { icon: '🎯', name: '行为实验', desc: '设计安全情境验证负面预期的准确性', frequency: '每周1次' },
]

const records = [
  { session: 4, date: '03-18', topic: '认知重构练习', content: '患者能够识别3种常见的认知歪曲（灾难化、过度概括、读心术）。练习了ABC模型，对工作场景中的焦虑进行了认知重构。', homework: '每天记录2个自动思维并尝试理性回应' },
  { session: 3, date: '03-11', topic: '焦虑触发因素分析', content: '梳理了主要焦虑触发场景：工作汇报、社交聚会、独处时的反刍思维。建立了焦虑层级表，从低到高排列。', homework: '完成焦虑层级表中第1-3级的暴露练习' },
  { session: 2, date: '03-04', topic: '心理教育与目标设定', content: '介绍了CBT的基本原理和治疗框架。与患者共同制定了治疗目标：降低GAD-7评分至10分以下。', homework: '阅读CBT自助手册第1-2章' },
]

const assessTrend = [
  { date: '01-15', score: 16, max: 21, color: '#E53935', name: 'GAD-7 焦虑量表' },
  { date: '02-15', score: 14, max: 21, color: '#E67E22', name: 'GAD-7 焦虑量表' },
  { date: '03-20', score: 12, max: 21, color: '#E67E22', name: 'GAD-7 焦虑量表' },
]

const toastVisible = ref(false)
const toastMsg = ref('')
const showToast = (msg: string) => { toastMsg.value = msg; toastVisible.value = true; setTimeout(() => toastVisible.value = false, 1500) }
</script>

<style scoped>
.plan-detail { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.hero { display: flex; align-items: center; gap: 12px; padding: 16px; background: #fff; }
.hero-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg,#8E44AD,#A569BD); color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.hero-info { flex: 1; }
.hero-info h3 { font-size: 15px; font-weight: 600; color: #333; margin: 0 0 2px; }
.hero-info p { font-size: 12px; color: #999; margin: 0; }
.hero-status { font-size: 11px; padding: 3px 8px; border-radius: 8px; background: rgba(142,68,173,0.1); color: #8E44AD; }
.progress-section { background: #fff; padding: 14px 16px; margin-top: 1px; }
.prog-header { display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 6px; }
.prog-val { font-weight: 700; color: #8E44AD; }
.prog-bar { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.prog-fill { height: 100%; background: linear-gradient(90deg,#8E44AD,#A569BD); border-radius: 4px; }
.prog-sessions { font-size: 12px; color: #999; margin-top: 6px; }
.section { background: #fff; margin-top: 8px; padding: 14px 16px; }
.sec-title { font-size: 14px; font-weight: 600; color: #8E44AD; margin: 0 0 10px; }
.goal-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
.goal-row:last-child { border: none; }
.goal-check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #ddd; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.goal-check.done { background: #8E44AD; border-color: #8E44AD; }
.goal-check svg { width: 14px; height: 14px; color: #fff; }
.goal-info { flex: 1; }
.goal-label { font-size: 13px; color: #333; font-weight: 500; display: block; }
.goal-target { font-size: 11px; color: #999; }
.strategy-card { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f5f5f5; }
.strategy-card:last-child { border: none; }
.strategy-icon { font-size: 24px; flex-shrink: 0; }
.strategy-info { flex: 1; }
.strategy-name { font-size: 13px; font-weight: 600; color: #333; display: block; }
.strategy-desc { font-size: 12px; color: #666; margin: 2px 0; }
.strategy-freq { font-size: 11px; color: #8E44AD; }
.record-card { background: #f8f5fb; border-radius: 10px; padding: 12px; margin-bottom: 8px; }
.rec-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.rec-session { font-size: 12px; font-weight: 600; color: #8E44AD; }
.rec-date { font-size: 11px; color: #999; }
.rec-topic { font-size: 12px; font-weight: 600; color: #333; margin: 0 0 4px; }
.rec-text { font-size: 12px; color: #666; margin: 0 0 6px; line-height: 1.5; }
.rec-homework { font-size: 11px; color: #8E44AD; background: rgba(142,68,173,0.06); padding: 6px 8px; border-radius: 6px; }
.hw-label { font-weight: 600; }
.trend-row { display: flex; justify-content: space-around; align-items: flex-end; height: 80px; margin-bottom: 8px; }
.trend-item { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.trend-bar-wrap { height: 60px; width: 28px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: flex-end; overflow: hidden; }
.trend-bar { width: 100%; border-radius: 4px 4px 0 0; }
.trend-score { font-size: 11px; font-weight: 600; color: #333; }
.trend-date { font-size: 10px; color: #999; }
.trend-label { text-align: center; font-size: 12px; color: #666; }
.action-bar { display: flex; gap: 10px; padding: 16px; }
.action-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.action-btn.primary { background: #8E44AD; color: #fff; }
.action-btn.secondary { background: rgba(142,68,173,0.1); color: #8E44AD; }
.toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(142,68,173,0.9); color: #fff; padding: 10px 24px; border-radius: 8px; font-size: 14px; z-index: 200; }
</style>
