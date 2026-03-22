<template>
  <div class="doctor-patients">
    <div class="search-bar">
      <svg class="search-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
      <input v-model="searchText" class="search-input" placeholder="搜索患者姓名..." />
    </div>
    <div class="filter-row">
      <span v-for="f in statusFilters" :key="f.key" :class="['filter-tag', activeStatus === f.key && 'active']" @click="activeStatus = f.key">{{ f.label }}</span>
    </div>
    <div class="filter-row">
      <span v-for="f in diagnosisFilters" :key="f.key" :class="['filter-tag diag', activeDiag === f.key && 'active']" @click="activeDiag = f.key">{{ f.label }}</span>
    </div>
    <div class="patient-list">
      <div v-for="p in filtered" :key="p.id" class="patient-card" @click="router.push('/doctor/patients/' + p.id)">
        <div class="p-avatar" :style="{ background: p.gender === 'male' ? 'linear-gradient(135deg,#1E3A5F,#2a5a8f)' : 'linear-gradient(135deg,#8E44AD,#a569bd)' }">{{ p.name.slice(-1) }}</div>
        <div class="p-info">
          <div class="p-top"><span class="p-name">{{ p.name }}</span><span :class="['p-status', p.status]">{{ statusLabel[p.status] }}</span></div>
          <p class="p-meta">{{ p.age }}岁 · {{ p.primaryDiagnosis.join('、') }}</p>
          <p class="p-meta">末次就诊 {{ p.lastCheckIn }}</p>
        </div>
        <div class="p-score" :style="{ background: scoreColor(p.healthScore) + '18', color: scoreColor(p.healthScore) }">{{ p.healthScore }}</div>
      </div>
      <div v-if="!filtered.length" class="empty">暂无匹配患者</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockMemberProfiles } from '@/mock/data'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const searchText = ref('')
const activeStatus = ref('all')
const activeDiag = ref('all')

const statusFilters = [
  { key: 'all', label: '全部' },
  { key: 'urgent', label: '紧急' },
  { key: 'attention', label: '关注' },
  { key: 'stable', label: '稳定' },
]
const diagnosisFilters = [
  { key: 'all', label: '全部诊断' },
  { key: 'diabetes', label: '糖尿病' },
  { key: 'hypertension', label: '高血压' },
  { key: 'cardiac', label: '心脏病' },
]
const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }

const myPatients = computed(() => mockMemberProfiles.filter(m => m.assignedDoctor === (userStore.user?.name || '李明华')))

const diagMatch = (diag: string[], key: string) => {
  if (key === 'all') return true
  const map: Record<string, string[]> = { diabetes: ['糖尿病'], hypertension: ['高血压'], cardiac: ['冠心病', '心房颤动'] }
  return diag.some(d => map[key]?.some(kw => d.includes(kw)))
}

const filtered = computed(() => myPatients.value.filter(p => {
  if (searchText.value && !p.name.includes(searchText.value)) return false
  if (activeStatus.value !== 'all' && p.status !== activeStatus.value) return false
  if (!diagMatch(p.primaryDiagnosis, activeDiag.value)) return false
  return true
}))

const scoreColor = (s: number) => s >= 80 ? '#2E8B57' : s >= 70 ? '#E67E22' : '#E53935'
</script>

<style scoped>
.doctor-patients { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.search-bar { display: flex; align-items: center; background: #fff; border-radius: 10px; padding: 0 12px; margin-bottom: 10px; }
.search-icon { width: 18px; height: 18px; color: #999; flex-shrink: 0; }
.search-input { flex: 1; border: none; outline: none; padding: 10px 8px; font-size: 14px; background: transparent; }
.filter-row { display: flex; gap: 8px; margin-bottom: 8px; overflow-x: auto; }
.filter-row::-webkit-scrollbar { display: none; }
.filter-tag { font-size: 12px; padding: 5px 12px; border-radius: 14px; background: #fff; color: #666; white-space: nowrap; cursor: pointer; }
.filter-tag.active { background: #1E3A5F; color: #fff; }
.filter-tag.diag.active { background: rgba(30,58,95,0.12); color: #1E3A5F; }
.patient-list { display: flex; flex-direction: column; gap: 8px; }
.patient-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 12px; padding: 12px; cursor: pointer; }
.patient-card:active { transform: scale(0.98); }
.p-avatar { width: 40px; height: 40px; border-radius: 50%; color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.p-info { flex: 1; min-width: 0; }
.p-top { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; }
.p-name { font-size: 14px; font-weight: 600; color: #1E3A5F; }
.p-status { font-size: 10px; padding: 2px 6px; border-radius: 8px; }
.p-status.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
.p-status.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.p-status.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.p-meta { font-size: 12px; color: #999; margin: 0; line-height: 1.6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.p-score { width: 36px; height: 36px; border-radius: 50%; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.empty { text-align: center; color: #ccc; padding: 40px 0; font-size: 14px; }
</style>
