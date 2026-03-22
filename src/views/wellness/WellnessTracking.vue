<template>
  <div class="wellness-tracking">
    <div class="member-picker">
      <label class="picker-label">选择会员</label>
      <div class="picker-wrap">
        <select v-model="activeMember" class="picker-select">
          <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }} · {{ m.diag }}</option>
        </select>
        <span class="picker-arrow">▾</span>
      </div>
    </div>

    <!-- 体重趋势 -->
    <div class="section">
      <h4 class="sec-title">体重趋势</h4>
      <div class="chart-row">
        <div v-for="w in weightData" :key="w.date" class="bar-col">
          <div class="bar-wrap"><div class="bar" :style="{ height: ((w.val - 60) / 25 * 100) + '%' }"></div></div>
          <span class="bar-val">{{ w.val }}</span>
          <span class="bar-label">{{ w.date }}</span>
        </div>
      </div>
      <div class="chart-summary">
        <div class="sum-item"><span class="sum-val">{{ weightData[0]?.val }}kg</span><span class="sum-label">当前体重</span></div>
        <div class="sum-item"><span class="sum-val">25.8</span><span class="sum-label">BMI</span></div>
        <div class="sum-item"><span class="sum-val trend-down">-1.6kg</span><span class="sum-label">近1月变化</span></div>
      </div>
    </div>

    <!-- 依从性评分 -->
    <div class="section">
      <h4 class="sec-title">依从性评分</h4>
      <div class="score-grid">
        <div class="score-card">
          <div class="score-ring" style="--pct:78;--color:#E67E22"><span>78</span></div>
          <p>饮食依从</p>
        </div>
        <div class="score-card">
          <div class="score-ring" style="--pct:85;--color:#2E8B57"><span>85</span></div>
          <p>运动完成</p>
        </div>
        <div class="score-card">
          <div class="score-ring" style="--pct:70;--color:#1E3A5F"><span>70</span></div>
          <p>作息规律</p>
        </div>
        <div class="score-card">
          <div class="score-ring" style="--pct:65;--color:#8E44AD"><span>65</span></div>
          <p>心理状态</p>
        </div>
      </div>
    </div>

    <!-- 最近跟进 -->
    <div class="section">
      <h4 class="sec-title">最近跟进记录</h4>
      <div v-for="r in followUps" :key="r.date" class="follow-card">
        <div class="follow-header"><span class="follow-date">{{ r.date }}</span><span class="follow-by">{{ r.by }}</span></div>
        <p class="follow-text">{{ r.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const members = [
  { id: '1', name: '沈轶', diag: '2型糖尿病' }, { id: '3', name: '陈建国', diag: '痛风' }, { id: '7', name: '吴大伟', diag: '肥胖' },
  { id: '6', name: '赵晓雯', diag: '焦虑症' }, { id: '4', name: '王芳', diag: '颈椎病' },
]
const activeMember = ref('1')

const weightData = [
  { date: '02-22', val: 76.5 }, { date: '03-01', val: 76.1 }, { date: '03-08', val: 75.6 },
  { date: '03-15', val: 75.2 }, { date: '03-22', val: 74.9 },
]

const followUps = [
  { date: '03-20', by: '陈思琪', content: '饮食依从性良好，空腹血糖降至6.8mmol/L。建议继续低GI饮食，增加膳食纤维摄入。' },
  { date: '03-13', by: '张伟杰', content: '本周完成4次有氧运动，体能有所提升。下周开始增加力量训练频次至每周3次。' },
  { date: '03-06', by: '陈思琪', content: '体重下降0.5kg，碳水摄入偏高。调整方案：晚餐主食减半，增加蔬菜比例。' },
  { date: '02-27', by: '张伟杰', content: '运动耐受性评估完成，可逐步增加运动强度。注意运动后血糖监测。' },
]
</script>

<style scoped>
.wellness-tracking { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.member-picker { background: #fff; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px; }
.picker-label { font-size: 12px; color: #999; display: block; margin-bottom: 6px; }
.picker-wrap { position: relative; }
.picker-select { width: 100%; appearance: none; -webkit-appearance: none; border: 1px solid #e8e8e8; border-radius: 8px; padding: 10px 36px 10px 12px; font-size: 14px; font-weight: 600; color: #333; background: #f8f9fb; outline: none; cursor: pointer; }
.picker-select:focus { border-color: #E67E22; }
.picker-arrow { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #999; font-size: 12px; pointer-events: none; }
.section { background: #fff; border-radius: 12px; padding: 14px; margin-bottom: 10px; }
.sec-title { font-size: 14px; font-weight: 600; color: #E67E22; margin: 0 0 12px; }
.chart-row { display: flex; justify-content: space-around; align-items: flex-end; height: 100px; margin-bottom: 10px; }
.bar-col { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; }
.bar-wrap { height: 70px; width: 24px; background: #f5f5f5; border-radius: 4px; display: flex; align-items: flex-end; overflow: hidden; }
.bar { width: 100%; background: linear-gradient(180deg, #E67E22, #F39C12); border-radius: 4px 4px 0 0; transition: height 0.5s; }
.bar-val { font-size: 10px; color: #E67E22; font-weight: 600; }
.bar-label { font-size: 10px; color: #999; }
.chart-summary { display: flex; gap: 8px; }
.sum-item { flex: 1; text-align: center; background: #fef9f3; border-radius: 8px; padding: 8px 4px; }
.sum-val { font-size: 15px; font-weight: 700; color: #333; display: block; }
.sum-val.trend-down { color: #2E8B57; }
.sum-label { font-size: 10px; color: #999; }
.score-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; }
.score-card { text-align: center; }
.score-card p { font-size: 11px; color: #666; margin: 6px 0 0; }
.score-ring { width: 52px; height: 52px; border-radius: 50%; background: conic-gradient(var(--color) calc(var(--pct) * 1%), #f0f0f0 0); display: flex; align-items: center; justify-content: center; margin: 0 auto; position: relative; }
.score-ring::before { content: ''; position: absolute; width: 40px; height: 40px; border-radius: 50%; background: #fff; }
.score-ring span { position: relative; z-index: 1; font-size: 14px; font-weight: 700; color: var(--color); }
.follow-card { background: #f8f9fb; border-radius: 8px; padding: 10px 12px; margin-bottom: 6px; }
.follow-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.follow-date { font-size: 11px; color: #E67E22; font-weight: 600; }
.follow-by { font-size: 11px; color: #999; }
.follow-text { font-size: 12px; color: #666; margin: 0; line-height: 1.5; }
</style>
