<template>
  <div class="page-container glucose-monitoring">
    <div class="page-header">
      <h1 class="page-title">血糖监测</h1>
      <p class="page-description">24小时连续血糖监测数据</p>
    </div>

    <!-- 血糖统计卡片 -->
    <div class="stats-overview">
      <div class="stat-card current">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">当前血糖</div>
          <div class="stat-value">
            <span class="value-number">{{ glucoseStore.latestReading?.value || 0 }}</span>
            <span class="value-unit">mmol/L</span>
          </div>
          <div :class="['stat-status', glucoseStore.latestReading?.status]">
            {{ getStatusText(glucoseStore.latestReading?.status) }}
          </div>
        </div>
      </div>

      <div class="stat-card average">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 3v18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M18 17l-5-5-4 4-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">平均血糖</div>
          <div class="stat-value">
            <span class="value-number">{{ glucoseStore.averageGlucose }}</span>
            <span class="value-unit">mmol/L</span>
          </div>
          <div class="stat-status normal">24小时平均</div>
        </div>
      </div>

      <div class="stat-card high">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">偏高次数</div>
          <div class="stat-value">
            <span class="value-number">{{ glucoseStore.highReadingsCount }}</span>
            <span class="value-unit">次</span>
          </div>
          <div class="stat-status high">需要注意</div>
        </div>
      </div>

      <div class="stat-card low">
        <div class="stat-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">偏低次数</div>
          <div class="stat-value">
            <span class="value-number">{{ glucoseStore.lowReadingsCount }}</span>
            <span class="value-unit">次</span>
          </div>
          <div class="stat-status low">需要关注</div>
        </div>
      </div>
    </div>

    <!-- 血糖趋势图 -->
    <div class="medical-card chart-card">
      <div class="medical-card-header">
        <h3 class="medical-card-title">血糖趋势</h3>
        <div class="chart-legend">
          <span class="legend-item">
            <span class="legend-dot normal"></span>
            正常
          </span>
          <span class="legend-item">
            <span class="legend-dot high"></span>
            偏高
          </span>
          <span class="legend-item">
            <span class="legend-dot low"></span>
            偏低
          </span>
        </div>
      </div>
      <div ref="chartRef" class="chart-container"></div>
    </div>

    <!-- 血糖记录列表 -->
    <div class="medical-card">
      <div class="medical-card-header">
        <h3 class="medical-card-title">血糖记录</h3>
        <span class="record-count">共 {{ displayReadings.length }} 条记录</span>
      </div>
      <div class="readings-list">
        <div
          v-for="reading in displayReadings"
          :key="reading.id"
          :class="['reading-item', reading.status]"
        >
          <div class="reading-time">
            <div class="time-hour">{{ formatTime(reading.timestamp).hour }}</div>
            <div class="time-minute">:{{ formatTime(reading.timestamp).minute }}</div>
          </div>
          <div class="reading-content">
            <div class="reading-value">
              <span class="value">{{ reading.value }}</span>
              <span class="unit">mmol/L</span>
            </div>
            <div class="reading-type">{{ formatDate(reading.timestamp) }}</div>
          </div>
          <div class="reading-status">
            <span :class="['status-badge', reading.status]">
              {{ getStatusText(reading.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 血糖范围说明 -->
    <div class="medical-card info-card">
      <div class="medical-card-header">
        <h3 class="medical-card-title">血糖参考范围</h3>
      </div>
      <div class="range-info">
        <div class="range-item normal">
          <div class="range-icon">✓</div>
          <div class="range-content">
            <div class="range-label">正常范围</div>
            <div class="range-value">3.9 - 6.1 mmol/L</div>
            <div class="range-desc">空腹血糖正常值</div>
          </div>
        </div>
        <div class="range-item high">
          <div class="range-icon">⚠</div>
          <div class="range-content">
            <div class="range-label">偏高</div>
            <div class="range-value">> 6.1 mmol/L</div>
            <div class="range-desc">需要注意饮食和运动</div>
          </div>
        </div>
        <div class="range-item low">
          <div class="range-icon">!</div>
          <div class="range-content">
            <div class="range-label">偏低</div>
            <div class="range-value">< 3.9 mmol/L</div>
            <div class="range-desc">需要及时补充糖分</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useGlucoseStore } from '@/stores/glucose'
import * as echarts from 'echarts'

const glucoseStore = useGlucoseStore()
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

// 只显示最近50条记录，避免页面过长
const displayReadings = computed(() => {
  return glucoseStore.readings.slice(-50).reverse()
})

// 图表数据 - 取最近24小时的数据（每小时取一个点）
const chartData = computed(() => {
  const readings = glucoseStore.readings.slice(-288) // 24小时 * 12次/小时
  const hourlyData: { time: string; value: number; status: string }[] = []
  
  // 每小时取一个平均值
  for (let i = 0; i < 24; i++) {
    const startIdx = i * 12
    const endIdx = Math.min(startIdx + 12, readings.length)
    const hourReadings = readings.slice(startIdx, endIdx)
    
    if (hourReadings.length > 0) {
      const avgValue = hourReadings.reduce((sum, r) => sum + r.value, 0) / hourReadings.length
      const date = new Date(hourReadings[0].timestamp)
      hourlyData.push({
        time: `${date.getHours().toString().padStart(2, '0')}:00`,
        value: Math.round(avgValue * 10) / 10,
        status: avgValue < 3.9 ? 'low' : avgValue > 7.8 ? 'high' : 'normal'
      })
    }
  }
  
  return hourlyData
})

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option: echarts.EChartsOption = {
    grid: {
      left: '12%',
      right: '5%',
      top: '10%',
      bottom: '12%'
    },
    xAxis: {
      type: 'category',
      data: chartData.value.map(d => d.time),
      axisLine: {
        lineStyle: { color: '#1E3A5F', width: 1 }
      },
      axisLabel: {
        color: '#1E3A5F',
        fontSize: 10,
        fontWeight: 500,
        interval: 5
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 3,
      max: 12,
      axisLine: { show: false },
      axisLabel: {
        color: '#1E3A5F',
        fontSize: 10,
        fontWeight: 500
      },
      splitLine: {
        lineStyle: { color: 'rgba(30, 58, 95, 0.1)', type: 'solid' }
      }
    },
    series: [
      {
        type: 'line',
        data: chartData.value.map(d => d.value),
        smooth: 0.4,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#C9A962' },
            { offset: 0.5, color: '#2E8B57' },
            { offset: 1, color: '#1E3A5F' }
          ]),
          width: 3,
          shadowColor: 'rgba(201, 169, 98, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 5
        },
        itemStyle: {
          color: '#C9A962',
          borderColor: '#fff',
          borderWidth: 2,
          shadowColor: 'rgba(201, 169, 98, 0.5)',
          shadowBlur: 8
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(201, 169, 98, 0.4)' },
            { offset: 0.5, color: 'rgba(46, 139, 87, 0.2)' },
            { offset: 1, color: 'rgba(30, 58, 95, 0.05)' }
          ])
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { type: 'dashed', width: 1 },
          data: [
            {
              yAxis: 3.9,
              lineStyle: { color: 'rgba(245, 108, 108, 0.6)' },
              label: { 
                show: true, 
                formatter: '偏低线',
                color: '#F56C6C',
                fontSize: 9,
                position: 'insideEndTop'
              }
            },
            {
              yAxis: 7.8,
              lineStyle: { color: 'rgba(201, 169, 98, 0.6)' },
              label: { 
                show: true, 
                formatter: '偏高线',
                color: '#C9A962',
                fontSize: 9,
                position: 'insideEndTop'
              }
            }
          ]
        },
        markArea: {
          silent: true,
          data: [
            [
              { yAxis: 3.9, itemStyle: { color: 'rgba(46, 139, 87, 0.08)' } },
              { yAxis: 7.8 }
            ]
          ]
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(30, 58, 95, 0.95)',
      borderColor: '#C9A962',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: (params: any) => {
        const data = params[0]
        const value = data.value
        let status = '正常'
        let statusColor = '#2E8B57'
        if (value < 3.9) { status = '偏低'; statusColor = '#F56C6C' }
        else if (value > 7.8) { status = '偏高'; statusColor = '#C9A962' }
        return `<div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.7); margin-bottom: 6px;">${data.name}</div>
          <div style="font-size: 20px; font-weight: 700; color: #C9A962;">${value} <span style="font-size: 12px; font-weight: 400;">mmol/L</span></div>
          <div style="font-size: 11px; color: ${statusColor}; margin-top: 4px;">● ${status}</div>
        </div>`
      }
    }
  }
  
  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})

watch(chartData, () => {
  if (chartInstance) {
    chartInstance.setOption({
      xAxis: { data: chartData.value.map(d => d.time) },
      series: [{ data: chartData.value.map(d => d.value) }]
    })
  }
})

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return {
    hour: date.getHours().toString().padStart(2, '0'),
    minute: date.getMinutes().toString().padStart(2, '0')
  }
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

const getStatusText = (status?: string) => {
  const statusMap: Record<string, string> = {
    normal: '正常',
    high: '偏高',
    low: '偏低',
    critical: '危险'
  }
  return statusMap[status || 'normal'] || '正常'
}
</script>

<style scoped>
.glucose-monitoring {
  padding-bottom: var(--spacing-xl);
}

/* 统计概览 */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.stat-card {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--color-primary);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.stat-card.current::before {
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-light));
}

.stat-card.average::before {
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
}

.stat-card.high::before {
  background: linear-gradient(90deg, var(--color-warning), #F0B860);
}

.stat-card.low::before {
  background: linear-gradient(90deg, var(--color-danger), #F78989);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  background: var(--color-primary-alpha);
  color: var(--color-primary);
}

.stat-card.current .stat-icon {
  background: var(--color-accent-alpha);
  color: var(--color-accent);
}

.stat-card.average .stat-icon {
  background: var(--color-primary-alpha);
  color: var(--color-primary);
}

.stat-card.high .stat-icon {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
}

.stat-card.low .stat-icon {
  background: rgba(245, 108, 108, 0.1);
  color: var(--color-danger);
}

.stat-icon svg {
  width: 20px;
  height: 20px;
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

.stat-value {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.value-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  line-height: 1;
}

.value-unit {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.stat-status {
  display: inline-block;
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 600;
}

.stat-status.normal {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.stat-status.high {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
}

.stat-status.low {
  background: rgba(245, 108, 108, 0.1);
  color: var(--color-danger);
}

/* 图表卡片 */
.chart-card {
  margin-bottom: var(--spacing-md);
}

.chart-legend {
  display: flex;
  gap: var(--spacing-md);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-dot.normal {
  background: var(--color-success);
}

.legend-dot.high {
  background: var(--color-warning);
}

.legend-dot.low {
  background: var(--color-danger);
}

.chart-container {
  height: 240px;
  width: 100%;
  background: linear-gradient(180deg, rgba(30, 58, 95, 0.02) 0%, rgba(201, 169, 98, 0.02) 100%);
  border-radius: var(--radius-md);
}

/* 血糖记录 */
.record-count {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: 500;
}

.readings-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  max-height: 400px;
  overflow-y: auto;
}

.reading-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.reading-item:hover {
  background: var(--color-bg-cream);
}

.reading-item.normal {
  border-left-color: var(--color-success);
}

.reading-item.high {
  border-left-color: var(--color-warning);
}

.reading-item.low {
  border-left-color: var(--color-danger);
}

.reading-time {
  display: flex;
  align-items: baseline;
  min-width: 50px;
  flex-shrink: 0;
}

.time-hour {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.time-minute {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  font-family: var(--font-display);
}

.reading-content {
  flex: 1;
  min-width: 0;
}

.reading-value {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.reading-value .value {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.reading-value .unit {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.reading-type {
  font-size: 10px;
  color: var(--color-text-secondary);
}

.reading-status {
  flex-shrink: 0;
}

.status-badge {
  display: inline-block;
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 10px;
  font-weight: 600;
}

.status-badge.normal {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.status-badge.high {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
}

.status-badge.low {
  background: rgba(245, 108, 108, 0.1);
  color: var(--color-danger);
}

.status-badge.critical {
  background: rgba(245, 108, 108, 0.2);
  color: var(--color-danger);
}

/* 范围说明 */
.info-card {
  margin-top: var(--spacing-md);
}

.range-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.range-item {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.range-item:hover {
  background: var(--color-bg-cream);
}

.range-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-md);
  flex-shrink: 0;
}

.range-item.normal .range-icon {
  background: rgba(46, 139, 87, 0.1);
  color: var(--color-success);
}

.range-item.high .range-icon {
  background: rgba(230, 162, 60, 0.1);
  color: var(--color-warning);
}

.range-item.low .range-icon {
  background: rgba(245, 108, 108, 0.1);
  color: var(--color-danger);
}

.range-content {
  flex: 1;
}

.range-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.range-value {
  font-size: var(--font-size-md);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}

.range-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* 移动端响应式 */
@media (max-width: 480px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xs);
  }

  .stat-card {
    padding: var(--spacing-sm);
  }

  .stat-icon {
    width: 32px;
    height: 32px;
  }

  .stat-icon svg {
    width: 16px;
    height: 16px;
  }

  .value-number {
    font-size: var(--font-size-xl);
  }

  .chart-container {
    height: 180px;
  }
}
</style>
