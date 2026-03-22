<template>
  <div class="health-data-page">
    <PageNavBar title="健康数据" />
    <div class="section">
      <h3 class="section-title">血糖记录</h3>
      <div class="chart-placeholder">
        <div class="chart-bars">
          <div v-for="(v, i) in glucoseData" :key="i" class="bar-col">
            <div class="bar" :style="{ height: (v.val / 12 * 80) + 'px' }" :class="v.status"></div>
            <span class="bar-label">{{ v.label }}</span>
          </div>
        </div>
        <div class="chart-unit">mmol/L</div>
      </div>
      <div class="data-list">
        <div v-for="g in glucoseData" :key="g.label" class="data-row">
          <span class="data-name">{{ g.fullLabel }}</span>
          <span :class="['data-val', g.status]">{{ g.val }} mmol/L</span>
          <span :class="['data-status', g.status]">{{ statusText[g.status] }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">血压记录</h3>
      <div class="bp-list">
        <div v-for="bp in bpData" :key="bp.date" class="bp-card">
          <div class="bp-date">{{ bp.date }}</div>
          <div class="bp-values">
            <span class="bp-sys">{{ bp.sys }}</span>
            <span class="bp-sep">/</span>
            <span class="bp-dia">{{ bp.dia }}</span>
            <span class="bp-unit">mmHg</span>
          </div>
          <span :class="['bp-status', bp.status]">{{ statusText[bp.status] }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">体重趋势</h3>
      <div class="weight-list">
        <div v-for="w in weightData" :key="w.date" class="weight-row">
          <span class="weight-date">{{ w.date }}</span>
          <div class="weight-bar-wrap">
            <div class="weight-bar" :style="{ width: ((w.val - 60) / 20 * 100) + '%' }"></div>
          </div>
          <span class="weight-val">{{ w.val }} kg</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const glucoseData = [
  { label: '周一', fullLabel: '空腹血糖', val: 7.2, status: 'high' },
  { label: '周二', fullLabel: '餐后2小时', val: 9.8, status: 'high' },
  { label: '周三', fullLabel: '空腹血糖', val: 6.8, status: 'normal' },
  { label: '周四', fullLabel: '餐后2小时', val: 8.5, status: 'normal' },
  { label: '周五', fullLabel: '空腹血糖', val: 7.5, status: 'high' },
  { label: '周六', fullLabel: '餐后2小时', val: 10.2, status: 'high' },
  { label: '周日', fullLabel: '空腹血糖', val: 6.5, status: 'normal' },
]
const bpData = [
  { date: '03-20', sys: 145, dia: 92, status: 'high' },
  { date: '03-19', sys: 138, dia: 88, status: 'high' },
  { date: '03-18', sys: 132, dia: 85, status: 'normal' },
  { date: '03-17', sys: 128, dia: 82, status: 'normal' },
  { date: '03-16', sys: 142, dia: 90, status: 'high' },
]
const weightData = [
  { date: '03-01', val: 76.5 },
  { date: '03-08', val: 75.8 },
  { date: '03-15', val: 75.2 },
  { date: '03-22', val: 74.9 },
]
import PageNavBar from '@/components/PageNavBar.vue'
const statusText: Record<string, string> = { normal: '正常', high: '偏高', low: '偏低', critical: '危急' }
</script>

<style scoped>
.health-data-page { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.section { background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
.section-title { font-size: 15px; font-weight: 600; color: #1E3A5F; margin: 0 0 12px; }
.chart-placeholder { background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
.chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 90px; margin-bottom: 4px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.bar { width: 100%; border-radius: 4px 4px 0 0; min-height: 4px; transition: height 0.3s; }
.bar.normal { background: #2E8B57; }
.bar.high { background: #E53935; }
.bar.low { background: #E67E22; }
.bar-label { font-size: 10px; color: #999; }
.chart-unit { font-size: 11px; color: #bbb; text-align: right; }
.data-list { display: flex; flex-direction: column; gap: 8px; }
.data-row { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.data-name { flex: 1; color: #666; }
.data-val { font-weight: 600; }
.data-val.normal, .data-status.normal { color: #2E8B57; }
.data-val.high, .data-status.high { color: #E53935; }
.data-val.low, .data-status.low { color: #E67E22; }
.data-status { font-size: 11px; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.04); }
.bp-list { display: flex; flex-direction: column; gap: 8px; }
.bp-card { display: flex; align-items: center; gap: 10px; padding: 10px; background: #f8f9fa; border-radius: 8px; }
.bp-date { font-size: 12px; color: #999; width: 40px; }
.bp-values { flex: 1; font-size: 16px; font-weight: 700; color: #333; }
.bp-sep { color: #999; margin: 0 2px; }
.bp-unit { font-size: 11px; color: #999; font-weight: 400; margin-left: 4px; }
.bp-status { font-size: 11px; padding: 2px 8px; border-radius: 10px; }
.bp-status.normal { background: rgba(46,139,87,0.1); color: #2E8B57; }
.bp-status.high { background: rgba(229,57,53,0.1); color: #E53935; }
.weight-list { display: flex; flex-direction: column; gap: 10px; }
.weight-row { display: flex; align-items: center; gap: 10px; }
.weight-date { font-size: 12px; color: #999; width: 40px; }
.weight-bar-wrap { flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.weight-bar { height: 100%; background: linear-gradient(90deg, #2E8B57, #5cb85c); border-radius: 4px; }
.weight-val { font-size: 13px; font-weight: 600; color: #333; width: 48px; text-align: right; }
</style>
