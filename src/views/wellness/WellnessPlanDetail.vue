<template>
  <div class="plan-detail">
    <PageNavBar :title="plan.memberName + ' - ' + typeLabel[plan.type]" />
    <div class="hero">
      <div class="hero-avatar">{{ plan.memberName.slice(-1) }}</div>
      <div class="hero-info"><h3>{{ plan.memberName }}</h3><p>{{ plan.goal }}</p></div>
      <span :class="['hero-status', plan.status]">{{ plan.status === 'active' ? '进行中' : '已完成' }}</span>
    </div>
    <div class="progress-section">
      <div class="prog-header"><span>总体进度</span><span class="prog-val">{{ plan.progress }}%</span></div>
      <div class="prog-bar"><div class="prog-fill" :style="{ width: plan.progress + '%' }"></div></div>
    </div>

    <!-- 营养方案 -->
    <div class="section" v-if="plan.type === 'nutrition' || plan.type === 'combined'">
      <h4 class="sec-title">营养方案</h4>
      <div class="info-grid">
        <div class="info-item"><span class="info-val">1800</span><span class="info-label">每日热量(kcal)</span></div>
        <div class="info-item"><span class="info-val">50%</span><span class="info-label">碳水化合物</span></div>
        <div class="info-item"><span class="info-val">20%</span><span class="info-label">蛋白质</span></div>
        <div class="info-item"><span class="info-val">30%</span><span class="info-label">脂肪</span></div>
      </div>
      <label class="sub-title">饮食建议</label>
      <div class="tag-list">
        <span v-for="t in dietTips" :key="t" class="tip-tag good">{{ t }}</span>
      </div>
      <label class="sub-title">禁忌食物</label>
      <div class="tag-list">
        <span v-for="t in dietAvoid" :key="t" class="tip-tag bad">{{ t }}</span>
      </div>
    </div>

    <!-- 运动方案 -->
    <div class="section" v-if="plan.type === 'exercise' || plan.type === 'combined'">
      <h4 class="sec-title">运动方案</h4>
      <div v-for="ex in exercises" :key="ex.name" class="exercise-card">
        <div class="ex-header"><span class="ex-name">{{ ex.name }}</span><span class="ex-freq">{{ ex.frequency }}</span></div>
        <p class="ex-detail">时长 {{ ex.duration }} · {{ ex.intensity }}</p>
        <p v-if="ex.notes" class="ex-notes">{{ ex.notes }}</p>
      </div>
    </div>

    <!-- 阶段目标 -->
    <div class="section">
      <h4 class="sec-title">阶段目标</h4>
      <div v-for="g in goals" :key="g.label" class="goal-row">
        <div class="goal-check" :class="g.done ? 'done' : ''">
          <svg v-if="g.done" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        </div>
        <div class="goal-info"><span class="goal-label">{{ g.label }}</span><span class="goal-target">{{ g.target }}</span></div>
      </div>
    </div>

    <!-- 跟进记录 -->
    <div class="section">
      <h4 class="sec-title">跟进记录</h4>
      <div v-for="r in records" :key="r.date" class="record-card">
        <span class="rec-date">{{ r.date }}</span>
        <p class="rec-text">{{ r.content }}</p>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-bar">
      <button class="action-btn update" @click="showToast('方案已更新')">更新方案</button>
      <button class="action-btn follow" @click="showToast('跟进已记录')">记录跟进</button>
    </div>
    <div v-if="toastVisible" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import PageNavBar from '@/components/PageNavBar.vue'

const route = useRoute()
const typeLabel: Record<string, string> = { nutrition: '营养方案', exercise: '运动方案', combined: '综合方案' }

const plansData: Record<string, any> = {
  'wp-1': { memberName: '沈轶', type: 'nutrition', goal: '控制血糖，每日热量1800kcal，低GI饮食', progress: 65, status: 'active' },
  'wp-2': { memberName: '沈轶', type: 'exercise', goal: '有氧运动每周5次，每次30分钟', progress: 70, status: 'active' },
  'wp-3': { memberName: '陈建国', type: 'nutrition', goal: '低嘌呤饮食，控制尿酸', progress: 45, status: 'active' },
  'wp-4': { memberName: '吴大伟', type: 'combined', goal: '减重计划：目标减重8kg', progress: 30, status: 'active' },
  'wp-5': { memberName: '赵晓雯', type: 'exercise', goal: '瑜伽+有氧运动缓解焦虑', progress: 55, status: 'active' },
  'wp-6': { memberName: '王芳', type: 'exercise', goal: '颈椎康复训练', progress: 80, status: 'active' },
  'wp-7': { memberName: '张慧敏', type: 'nutrition', goal: '补铁饮食方案', progress: 90, status: 'active' },
}
const plan = plansData[route.params.id as string] || plansData['wp-1']

const dietTips = ['全谷物主食', '深色蔬菜', '优质蛋白（鱼、鸡胸）', '低GI水果', '坚果适量', '橄榄油']
const dietAvoid = ['精制糖', '油炸食品', '高盐腌制', '含糖饮料', '动物内脏', '酒精']

const exercises = [
  { name: '快走/慢跑', frequency: '每周5次', duration: '30分钟', intensity: '中等强度', notes: '心率控制在120-140次/分' },
  { name: '力量训练', frequency: '每周2-3次', duration: '20分钟', intensity: '低-中强度', notes: '以自重训练为主，避免过度负重' },
  { name: '拉伸放松', frequency: '每日', duration: '10分钟', intensity: '低强度', notes: '运动前后各5分钟' },
]

const goals = [
  { label: '第1阶段（1-4周）', target: '建立饮食运动习惯', done: true },
  { label: '第2阶段（5-8周）', target: '体重下降2-3kg，血糖趋稳', done: true },
  { label: '第3阶段（9-12周）', target: '各项指标达标，形成长期习惯', done: false },
]

const records = [
  { date: '03-20', content: '患者本周饮食依从性良好，空腹血糖降至6.8mmol/L。运动完成4次/5次，建议继续保持。' },
  { date: '03-13', content: '体重下降0.5kg，BMI 25.8。碳水摄入偏高，建议减少精制主食比例。' },
  { date: '03-06', content: '开始执行新方案，患者配合度较好。初始体重76.5kg，BMI 26.2。' },
]

const toastVisible = ref(false)
const toastMsg = ref('')
const showToast = (msg: string) => { toastMsg.value = msg; toastVisible.value = true; setTimeout(() => toastVisible.value = false, 1500) }
</script>

<style scoped>
.plan-detail { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.hero { display: flex; align-items: center; gap: 12px; padding: 16px; background: #fff; }
.hero-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg,#E67E22,#F39C12); color: #fff; font-size: 16px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.hero-info { flex: 1; }
.hero-info h3 { font-size: 15px; font-weight: 600; color: #333; margin: 0 0 2px; }
.hero-info p { font-size: 12px; color: #999; margin: 0; }
.hero-status { font-size: 11px; padding: 3px 8px; border-radius: 8px; background: rgba(230,126,34,0.1); color: #E67E22; }
.progress-section { background: #fff; padding: 14px 16px; margin-top: 1px; }
.prog-header { display: flex; justify-content: space-between; font-size: 13px; color: #666; margin-bottom: 6px; }
.prog-val { font-weight: 700; color: #E67E22; }
.prog-bar { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.prog-fill { height: 100%; background: linear-gradient(90deg,#E67E22,#F39C12); border-radius: 4px; }
.section { background: #fff; margin-top: 8px; padding: 14px 16px; }
.sec-title { font-size: 14px; font-weight: 600; color: #E67E22; margin: 0 0 10px; }
.sub-title { font-size: 12px; color: #666; font-weight: 600; display: block; margin: 10px 0 6px; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px; }
.info-item { text-align: center; background: #fef9f3; border-radius: 8px; padding: 8px 4px; }
.info-val { font-size: 16px; font-weight: 700; color: #E67E22; display: block; }
.info-label { font-size: 10px; color: #999; }
.tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.tip-tag { font-size: 11px; padding: 4px 10px; border-radius: 10px; }
.tip-tag.good { background: rgba(46,139,87,0.08); color: #2E8B57; }
.tip-tag.bad { background: rgba(229,57,53,0.08); color: #E53935; }
.exercise-card { background: #fef9f3; border-radius: 10px; padding: 10px 12px; margin-bottom: 6px; }
.ex-header { display: flex; justify-content: space-between; margin-bottom: 2px; }
.ex-name { font-size: 13px; font-weight: 600; color: #333; }
.ex-freq { font-size: 11px; color: #E67E22; }
.ex-detail { font-size: 12px; color: #666; margin: 0; }
.ex-notes { font-size: 11px; color: #999; margin: 2px 0 0; }
.goal-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
.goal-row:last-child { border: none; }
.goal-check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #ddd; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.goal-check.done { background: #E67E22; border-color: #E67E22; }
.goal-check svg { width: 14px; height: 14px; color: #fff; }
.goal-info { flex: 1; }
.goal-label { font-size: 13px; color: #333; font-weight: 500; display: block; }
.goal-target { font-size: 11px; color: #999; }
.record-card { background: #f8f9fb; border-radius: 8px; padding: 10px 12px; margin-bottom: 6px; }
.rec-date { font-size: 11px; color: #E67E22; font-weight: 600; }
.rec-text { font-size: 12px; color: #666; margin: 4px 0 0; line-height: 1.5; }
.action-bar { display: flex; gap: 10px; padding: 16px; }
.action-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.action-btn.update { background: #E67E22; color: #fff; }
.action-btn.follow { background: rgba(230,126,34,0.1); color: #E67E22; }
.toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(230,126,34,0.9); color: #fff; padding: 10px 24px; border-radius: 8px; font-size: 14px; z-index: 200; }
</style>
