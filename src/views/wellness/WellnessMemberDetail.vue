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

    <!-- 健康评分 -->
    <div class="section">
      <h4 class="sec-title">健康评分</h4>
      <div class="score-bar-wrap">
        <div class="score-bar"><div class="score-fill" :style="{ width: member.healthScore + '%' }"></div></div>
        <span class="score-val">{{ member.healthScore }}分</span>
      </div>
    </div>

    <!-- 主要诊断 -->
    <div class="section">
      <h4 class="sec-title">主要诊断</h4>
      <div class="tag-list">
        <span v-for="d in member.primaryDiagnosis" :key="d" class="diag-tag">{{ d }}</span>
      </div>
    </div>

    <!-- 营养方案概览 -->
    <div class="section">
      <h4 class="sec-title">营养方案</h4>
      <div class="plan-summary" v-for="p in nutritionPlans" :key="p.label">
        <span class="plan-label">{{ p.label }}</span>
        <span class="plan-val">{{ p.value }}</span>
      </div>
    </div>

    <!-- 运动方案概览 -->
    <div class="section">
      <h4 class="sec-title">运动康复</h4>
      <div class="plan-summary" v-for="p in exercisePlans" :key="p.label">
        <span class="plan-label">{{ p.label }}</span>
        <span class="plan-val">{{ p.value }}</span>
      </div>
    </div>

    <!-- 最近跟进 -->
    <div class="section">
      <h4 class="sec-title">最近跟进</h4>
      <div v-for="r in records" :key="r.date" class="record-card">
        <div class="rec-header"><span class="rec-date">{{ r.date }}</span><span class="rec-by">{{ r.by }}</span></div>
        <p class="rec-text">{{ r.content }}</p>
      </div>
    </div>

    <div class="action-bar">
      <button class="action-btn primary" @click="router.push('/wellness/plans')">查看方案</button>
      <button class="action-btn secondary" @click="router.push('/wellness/tracking')">跟踪数据</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { mockMemberProfiles } from '@/mock/data'
import PageNavBar from '@/components/PageNavBar.vue'

const route = useRoute()
const router = useRouter()
const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }
const member = mockMemberProfiles.find(m => m.id === route.params.id) || mockMemberProfiles[0]

const nutritionPlans = [
  { label: '每日热量', value: '1800 kcal' },
  { label: '饮食类型', value: '低GI / 低嘌呤' },
  { label: '饮食依从性', value: '78%' },
]
const exercisePlans = [
  { label: '运动频次', value: '每周5次' },
  { label: '运动类型', value: '有氧 + 力量' },
  { label: '运动完成率', value: '85%' },
]
const records = [
  { date: '03-20', by: '陈思琪', content: '饮食依从性良好，空腹血糖降至6.8mmol/L。' },
  { date: '03-13', by: '张伟杰', content: '本周完成4次有氧运动，体能有所提升。' },
]
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
.sec-title { font-size: 14px; font-weight: 600; color: #E67E22; margin: 0 0 10px; }
.score-bar-wrap { display: flex; align-items: center; gap: 10px; }
.score-bar { flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.score-fill { height: 100%; background: linear-gradient(90deg, #E67E22, #F39C12); border-radius: 4px; }
.score-val { font-size: 14px; font-weight: 700; color: #E67E22; }
.tag-list { display: flex; flex-wrap: wrap; gap: 6px; }
.diag-tag { font-size: 12px; padding: 4px 10px; border-radius: 10px; background: rgba(230,126,34,0.08); color: #E67E22; }
.plan-summary { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
.plan-summary:last-child { border: none; }
.plan-label { font-size: 13px; color: #666; }
.plan-val { font-size: 13px; font-weight: 600; color: #333; }
.record-card { background: #f8f9fb; border-radius: 8px; padding: 10px 12px; margin-bottom: 6px; }
.rec-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.rec-date { font-size: 11px; color: #E67E22; font-weight: 600; }
.rec-by { font-size: 11px; color: #999; }
.rec-text { font-size: 12px; color: #666; margin: 0; line-height: 1.5; }
.action-bar { display: flex; gap: 10px; padding: 16px; }
.action-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.action-btn.primary { background: #E67E22; color: #fff; }
.action-btn.secondary { background: rgba(230,126,34,0.1); color: #E67E22; }
</style>
