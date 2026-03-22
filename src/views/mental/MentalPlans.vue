<template>
  <div class="mental-plans">
    <div class="filter-row">
      <span v-for="f in typeFilters" :key="f.key" :class="['filter-tag', activeType === f.key && 'active']" @click="activeType = f.key">{{ f.label }}</span>
    </div>
    <div class="plan-list">
      <div v-for="p in filtered" :key="p.id" class="plan-card" @click="router.push('/mental/plans/' + p.id)">
        <div class="plan-top">
          <span :class="['plan-type', p.type]">{{ typeLabel[p.type] }}</span>
          <span :class="['plan-status', p.status]">{{ statusLabel[p.status] }}</span>
        </div>
        <div class="plan-member">{{ p.memberName }}</div>
        <p class="plan-goal">{{ p.goal }}</p>
        <div class="plan-progress">
          <div class="prog-bar"><div class="prog-fill" :style="{ width: p.progress + '%' }"></div></div>
          <span class="prog-pct">{{ p.progress }}%</span>
        </div>
        <div class="plan-bottom">
          <span class="plan-sessions">已完成 {{ p.done }}/{{ p.total }} 次</span>
          <span class="plan-next">下次：{{ p.nextDate }}</span>
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
  { key: 'counseling', label: '心理咨询' },
  { key: 'cbt', label: '认知行为' },
  { key: 'mindfulness', label: '正念训练' },
  { key: 'education', label: '健康教育' },
]
const typeLabel: Record<string, string> = { counseling: '心理咨询', cbt: '认知行为', mindfulness: '正念训练', education: '健康教育' }
const statusLabel: Record<string, string> = { active: '进行中', completed: '已完成', paused: '已暂停' }

const plans = [
  { id: 'mp-1', memberName: '赵晓雯', type: 'cbt', goal: '焦虑情绪管理：识别焦虑触发因素，建立应对策略', progress: 50, done: 4, total: 8, nextDate: '03-25', status: 'active' },
  { id: 'mp-2', memberName: '赵晓雯', type: 'mindfulness', goal: '正念减压训练：每日冥想练习，提升情绪觉察力', progress: 60, done: 6, total: 10, nextDate: '03-24', status: 'active' },
  { id: 'mp-3', memberName: '沈轶', type: 'counseling', goal: '慢病心理适应：接纳疾病，建立积极生活态度', progress: 75, done: 3, total: 4, nextDate: '03-28', status: 'active' },
  { id: 'mp-4', memberName: '王芳', type: 'counseling', goal: '失眠认知干预：纠正睡眠错误认知，建立健康睡眠习惯', progress: 40, done: 2, total: 5, nextDate: '03-26', status: 'active' },
  { id: 'mp-5', memberName: '吴大伟', type: 'education', goal: '糖尿病自我管理教育：血糖监测、饮食管理、运动指导', progress: 30, done: 1, total: 3, nextDate: '03-27', status: 'active' },
  { id: 'mp-6', memberName: '陈建国', type: 'education', goal: '痛风健康教育：低嘌呤饮食知识、生活方式调整', progress: 100, done: 2, total: 2, nextDate: '-', status: 'completed' },
  { id: 'mp-7', memberName: '刘静', type: 'mindfulness', goal: '压力管理训练：渐进式肌肉放松+呼吸训练', progress: 45, done: 3, total: 6, nextDate: '03-29', status: 'active' },
]

const filtered = computed(() => activeType.value === 'all' ? plans : plans.filter(p => p.type === activeType.value))
</script>

<style scoped>
.mental-plans { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.filter-row { display: flex; gap: 8px; margin-bottom: 12px; overflow-x: auto; }
.filter-row::-webkit-scrollbar { display: none; }
.filter-tag { font-size: 12px; padding: 6px 14px; border-radius: 14px; background: #fff; color: #666; white-space: nowrap; cursor: pointer; }
.filter-tag.active { background: #8E44AD; color: #fff; }
.plan-list { display: flex; flex-direction: column; gap: 8px; }
.plan-card { background: #fff; border-radius: 12px; padding: 14px; cursor: pointer; }
.plan-card:active { transform: scale(0.98); }
.plan-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.plan-type { font-size: 11px; padding: 3px 8px; border-radius: 8px; font-weight: 600; }
.plan-type.counseling { background: rgba(142,68,173,0.1); color: #8E44AD; }
.plan-type.cbt { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.plan-type.mindfulness { background: rgba(46,139,87,0.1); color: #2E8B57; }
.plan-type.education { background: rgba(230,126,34,0.1); color: #E67E22; }
.plan-status { font-size: 10px; padding: 2px 8px; border-radius: 8px; }
.plan-status.active { background: rgba(142,68,173,0.1); color: #8E44AD; }
.plan-status.completed { background: rgba(46,139,87,0.1); color: #2E8B57; }
.plan-status.paused { background: rgba(201,169,98,0.1); color: #C9A962; }
.plan-member { font-size: 15px; font-weight: 600; color: #333; margin-bottom: 4px; }
.plan-goal { font-size: 12px; color: #999; margin: 0 0 8px; line-height: 1.5; }
.plan-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.prog-bar { flex: 1; height: 5px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
.prog-fill { height: 100%; background: linear-gradient(90deg, #8E44AD, #A569BD); border-radius: 3px; }
.prog-pct { font-size: 11px; color: #8E44AD; font-weight: 600; width: 30px; text-align: right; }
.plan-bottom { display: flex; justify-content: space-between; }
.plan-sessions { font-size: 11px; color: #666; }
.plan-next { font-size: 11px; color: #8E44AD; }
</style>
