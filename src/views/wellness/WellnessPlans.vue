<template>
  <div class="wellness-plans">
    <div class="filter-row">
      <span v-for="f in typeFilters" :key="f.key" :class="['filter-tag', activeType === f.key && 'active']" @click="activeType = f.key">{{ f.label }}</span>
    </div>
    <div class="plan-list">
      <div v-for="p in filtered" :key="p.id" class="plan-card" @click="router.push('/wellness/plans/' + p.id)">
        <div class="plan-top">
          <span :class="['plan-type', p.type]">{{ typeLabel[p.type] }}</span>
          <span class="plan-date">更新于 {{ p.updateDate }}</span>
        </div>
        <div class="plan-member">{{ p.memberName }}</div>
        <p class="plan-goal">{{ p.goal }}</p>
        <div class="plan-progress">
          <div class="prog-bar"><div class="prog-fill" :style="{ width: p.progress + '%' }"></div></div>
          <span class="prog-pct">{{ p.progress }}%</span>
        </div>
        <div class="plan-bottom">
          <span class="plan-owner">负责：{{ p.owner }}</span>
          <span :class="['plan-status', p.status]">{{ statusLabel[p.status] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeType = ref('all')

const typeFilters = [
  { key: 'all', label: '全部' },
  { key: 'nutrition', label: '营养方案' },
  { key: 'exercise', label: '运动康复' },
  { key: 'combined', label: '综合方案' },
]
const typeLabel: Record<string, string> = { nutrition: '营养', exercise: '运动', combined: '综合' }
const statusLabel: Record<string, string> = { active: '进行中', completed: '已完成', pending: '待开始' }

const plans = [
  { id: 'wp-1', memberName: '沈轶', type: 'nutrition', goal: '控制血糖，每日热量1800kcal，低GI饮食', progress: 65, updateDate: '03-20', owner: '陈思琪', status: 'active' },
  { id: 'wp-2', memberName: '沈轶', type: 'exercise', goal: '有氧运动每周5次，每次30分钟，配合力量训练', progress: 70, updateDate: '03-18', owner: '张伟杰', status: 'active' },
  { id: 'wp-3', memberName: '陈建国', type: 'nutrition', goal: '低嘌呤饮食，控制尿酸，限制红肉摄入', progress: 45, updateDate: '03-19', owner: '陈思琪', status: 'active' },
  { id: 'wp-4', memberName: '吴大伟', type: 'combined', goal: '减重计划：目标减重8kg，饮食+运动综合干预', progress: 30, updateDate: '03-17', owner: '陈思琪', status: 'active' },
  { id: 'wp-5', memberName: '赵晓雯', type: 'exercise', goal: '瑜伽+有氧运动缓解焦虑，改善睡眠质量', progress: 55, updateDate: '03-16', owner: '张伟杰', status: 'active' },
  { id: 'wp-6', memberName: '王芳', type: 'exercise', goal: '颈椎康复训练，每日颈部拉伸+核心稳定训练', progress: 80, updateDate: '03-15', owner: '张伟杰', status: 'active' },
  { id: 'wp-7', memberName: '张慧敏', type: 'nutrition', goal: '补铁饮食方案，增加富含铁质食物摄入', progress: 90, updateDate: '03-10', owner: '陈思琪', status: 'active' },
]

const filtered = computed(() => activeType.value === 'all' ? plans : plans.filter(p => p.type === activeType.value))
</script>

<style scoped>
.wellness-plans { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.filter-row { display: flex; gap: 8px; margin-bottom: 12px; overflow-x: auto; }
.filter-row::-webkit-scrollbar { display: none; }
.filter-tag { font-size: 12px; padding: 6px 14px; border-radius: 14px; background: #fff; color: #666; white-space: nowrap; cursor: pointer; }
.filter-tag.active { background: #E67E22; color: #fff; }
.plan-list { display: flex; flex-direction: column; gap: 8px; }
.plan-card { background: #fff; border-radius: 12px; padding: 14px; cursor: pointer; }
.plan-card:active { transform: scale(0.98); }
.plan-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.plan-type { font-size: 11px; padding: 3px 8px; border-radius: 8px; font-weight: 600; }
.plan-type.nutrition { background: rgba(230,126,34,0.1); color: #E67E22; }
.plan-type.exercise { background: rgba(46,139,87,0.1); color: #2E8B57; }
.plan-type.combined { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.plan-date { font-size: 11px; color: #bbb; }
.plan-member { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 4px; }
.plan-goal { font-size: 12px; color: #999; margin: 0 0 8px; line-height: 1.5; }
.plan-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.prog-bar { flex: 1; height: 5px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.prog-fill { height: 100%; background: linear-gradient(90deg, #E67E22, #F39C12); border-radius: 3px; }
.prog-pct { font-size: 11px; color: #E67E22; font-weight: 600; width: 30px; text-align: right; }
.plan-bottom { display: flex; justify-content: space-between; align-items: center; }
.plan-owner { font-size: 11px; color: #999; }
.plan-status { font-size: 10px; padding: 2px 8px; border-radius: 8px; }
.plan-status.active { background: rgba(230,126,34,0.1); color: #E67E22; }
.plan-status.completed { background: rgba(46,139,87,0.1); color: #2E8B57; }
.plan-status.pending { background: rgba(201,169,98,0.1); color: #C9A962; }
</style>
