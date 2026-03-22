<template>
  <div class="member-list-page">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <div class="search-input">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
        <input v-model="searchText" placeholder="搜索会员姓名" />
      </div>
      <div class="filter-tabs">
        <span v-for="f in filters" :key="f.key" :class="['filter-tab', { active: activeFilter === f.key }]" @click="activeFilter = f.key">{{ f.label }}</span>
      </div>
    </div>

    <div class="list-body">
      <div v-for="m in filteredMembers" :key="m.id" class="member-card" @click="goDetail(m.id)">
        <div class="member-avatar" :class="m.gender">{{ m.name.slice(-1) }}</div>
        <div class="member-info">
          <div class="name-row">
            <span class="member-name">{{ m.name }}</span>
            <span :class="['status-tag', m.status]">{{ statusLabel[m.status] }}</span>
          </div>
          <p class="member-diag">{{ m.age }}岁 · {{ m.primaryDiagnosis.join('、') }}</p>
          <p class="member-meta">{{ m.membershipType === 'premium' ? '至尊会员' : '标准会员' }} · {{ m.lastCheckIn }}</p>
        </div>
        <div :class="['member-score', scoreClass(m.healthScore)]">{{ m.healthScore }}</div>
      </div>
      <div v-if="filteredMembers.length === 0" class="empty-state">暂无符合条件的会员</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockMemberProfiles } from '@/mock/data'

const router = useRouter()
const searchText = ref('')
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: '全部' },
  { key: 'urgent', label: '紧急' },
  { key: 'attention', label: '关注' },
  { key: 'stable', label: '稳定' },
]

const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }

const filteredMembers = computed(() => mockMemberProfiles.filter(m => {
  const matchSearch = !searchText.value || m.name.includes(searchText.value)
  const matchFilter = activeFilter.value === 'all' || m.status === activeFilter.value
  return matchSearch && matchFilter
}))

const scoreClass = (score: number) => score >= 80 ? 'good' : score >= 65 ? 'fair' : 'poor'
const goDetail = (id: string) => router.push('/manager/members/' + id)
</script>

<style scoped>
.member-list-page { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.search-bar { background: #fff; padding: 12px 16px 0; position: sticky; top: 0; z-index: 10; border-bottom: 1px solid #f0f0f0; }
.search-input { display: flex; align-items: center; gap: 8px; background: #f5f7fa; border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; }
.search-input svg { width: 18px; height: 18px; color: #aaa; flex-shrink: 0; }
.search-input input { border: none; background: transparent; outline: none; font-size: 14px; color: #333; flex: 1; }
.search-input input::placeholder { color: #bbb; }
.filter-tabs { display: flex; }
.filter-tab { flex: 1; text-align: center; font-size: 13px; color: #999; padding: 8px 0; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; font-weight: 500; }
.filter-tab.active { color: #2E8B57; border-bottom-color: #2E8B57; }
.list-body { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
.member-card { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 10px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); cursor: pointer; transition: transform 0.15s; }
.member-card:active { transform: scale(0.98); }
.member-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600; color: #fff; flex-shrink: 0; }
.member-avatar.male { background: linear-gradient(135deg, #1E3A5F, #2a4a6f); }
.member-avatar.female { background: linear-gradient(135deg, #C9A962, #D4B87A); }
.member-info { flex: 1; min-width: 0; }
.name-row { display: flex; align-items: center; gap: 6px; margin-bottom: 3px; }
.member-name { font-size: 15px; font-weight: 600; color: #333; }
.member-diag { font-size: 12px; color: #888; margin: 0 0 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.member-meta { font-size: 11px; color: #bbb; margin: 0; }
.status-tag { font-size: 10px; padding: 1px 6px; border-radius: 4px; font-weight: 500; }
.status-tag.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.status-tag.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.status-tag.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
.member-score { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }
.member-score.good { background: rgba(46,139,87,0.1); color: #2E8B57; }
.member-score.fair { background: rgba(230,126,34,0.1); color: #E67E22; }
.member-score.poor { background: rgba(229,57,53,0.1); color: #E53935; }
.empty-state { text-align: center; color: #bbb; padding: 40px 0; font-size: 14px; }
</style>
