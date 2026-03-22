<template>
  <div class="doctor-records">
    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      <input v-model="searchText" class="search-input" placeholder="搜索患者姓名..." />
    </div>
    <div class="filter-row">
      <span v-for="f in typeFilters" :key="f.key" :class="['filter-tag', activeType === f.key && 'active']" @click="activeType = f.key">{{ f.label }}</span>
    </div>
    <div class="filter-row">
      <span v-for="f in timeFilters" :key="f.key" :class="['filter-tag time', activeTime === f.key && 'active']" @click="activeTime = f.key">{{ f.label }}</span>
    </div>
    <div class="record-list">
      <div v-for="r in filtered" :key="r.id" class="record-card" @click="router.push('/doctor/patients/' + r.patientId)">
        <div class="rc-header">
          <span :class="['rc-type', r.type]">{{ typeLabel[r.type] }}</span>
          <span class="rc-date">{{ r.date }}</span>
        </div>
        <div class="rc-patient">{{ r.patientName }} · {{ r.chiefComplaint }}</div>
        <div class="rc-diag">
          <span v-for="d in r.diagnosis" :key="d" class="diag-tag">{{ d }}</span>
        </div>
        <p class="rc-treatment">{{ r.treatment }}</p>
        <div v-if="r.nextFollowUp" class="rc-followup">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
          下次随访 {{ r.nextFollowUp }}
        </div>
      </div>
      <div v-if="!filtered.length" class="empty">暂无匹配病历</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockMedicalRecords } from '@/mock/data'

const router = useRouter()
const searchText = ref('')
const activeType = ref('all')
const activeTime = ref('all')

const typeFilters = [
  { key: 'all', label: '全部' },
  { key: 'initial', label: '初诊' },
  { key: 'follow-up', label: '复诊' },
  { key: 'consultation', label: '会诊' },
  { key: 'emergency', label: '急诊' },
]
const timeFilters = [
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'all', label: '全部' },
]
const typeLabel: Record<string, string> = { initial: '初诊', 'follow-up': '复诊', consultation: '会诊', emergency: '急诊' }

const filterByTime = (date: string, key: string) => {
  if (key === 'all') return true
  const d = new Date(date), now = new Date()
  if (key === 'week') { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w }
  if (key === 'month') { return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear() }
  return true
}

const filtered = computed(() => mockMedicalRecords.filter(r => {
  if (searchText.value && !r.patientName.includes(searchText.value)) return false
  if (activeType.value !== 'all' && r.type !== activeType.value) return false
  if (!filterByTime(r.date, activeTime.value)) return false
  return true
}))
</script>

<style scoped>
.doctor-records { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.search-bar { display: flex; align-items: center; background: #fff; border-radius: 10px; padding: 0 12px; margin-bottom: 10px; }
.search-icon { width: 18px; height: 18px; color: #999; flex-shrink: 0; }
.search-input { flex: 1; border: none; outline: none; padding: 10px 8px; font-size: 14px; background: transparent; }
.filter-row { display: flex; gap: 8px; margin-bottom: 8px; overflow-x: auto; }
.filter-row::-webkit-scrollbar { display: none; }
.filter-tag { font-size: 12px; padding: 5px 12px; border-radius: 14px; background: #fff; color: #666; white-space: nowrap; cursor: pointer; }
.filter-tag.active { background: #1E3A5F; color: #fff; }
.filter-tag.time.active { background: rgba(30,58,95,0.12); color: #1E3A5F; }
.record-list { display: flex; flex-direction: column; gap: 8px; }
.record-card { background: #fff; border-radius: 12px; padding: 14px; cursor: pointer; }
.record-card:active { transform: scale(0.98); }
.rc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.rc-type { font-size: 11px; padding: 3px 8px; border-radius: 8px; font-weight: 600; }
.rc-type.initial { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.rc-type.follow-up { background: rgba(46,139,87,0.1); color: #2E8B57; }
.rc-type.consultation { background: rgba(142,68,173,0.1); color: #8E44AD; }
.rc-type.emergency { background: rgba(229,57,53,0.1); color: #E53935; }
.rc-date { font-size: 12px; color: #999; }
.rc-patient { font-size: 14px; font-weight: 600; color: #1E3A5F; margin-bottom: 6px; }
.rc-diag { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 6px; }
.diag-tag { font-size: 11px; padding: 2px 8px; border-radius: 8px; background: #f0f2f5; color: #666; }
.rc-treatment { font-size: 12px; color: #999; margin: 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.rc-followup { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #C9A962; margin-top: 8px; padding-top: 8px; border-top: 1px solid #f5f5f5; }
.rc-followup svg { width: 14px; height: 14px; }
.empty { text-align: center; color: #ccc; padding: 40px 0; font-size: 14px; }
</style>
