<template>
  <div class="doctor-messages">
    <div class="filter-row">
      <span v-for="f in categories" :key="f.key" :class="['cat-tag', activeCat === f.key && 'active']" @click="activeCat = f.key">
        {{ f.label }}
        <i v-if="countByType(f.key)" class="cat-badge">{{ countByType(f.key) }}</i>
      </span>
    </div>
    <div class="conv-list">
      <div v-for="c in filtered" :key="c.id" class="conv-card" @click="router.push('/doctor/messages/' + c.id)">
        <div class="conv-avatar" :style="{ background: avatarColor[c.type] }">{{ c.name.slice(0, 1) }}</div>
        <div class="conv-info">
          <div class="conv-top"><span class="conv-name">{{ c.name }}</span><span class="conv-time">{{ c.time }}</span></div>
          <p class="conv-msg">{{ c.lastMsg }}</p>
        </div>
        <span v-if="c.unread" class="conv-badge">{{ c.unread }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { mockDoctorConversations } from '@/mock/data'

const router = useRouter()
const activeCat = ref('all')

const categories = [
  { key: 'all', label: '全部' },
  { key: 'patient', label: '患者' },
  { key: 'manager', label: '管家' },
  { key: 'doctor', label: '医生' },
  { key: 'consultation-group', label: '会诊' },
]

const avatarColor: Record<string, string> = {
  patient: 'linear-gradient(135deg,#1E3A5F,#2a5a8f)',
  manager: 'linear-gradient(135deg,#2E8B57,#3da76a)',
  doctor: 'linear-gradient(135deg,#8E44AD,#a569bd)',
  'consultation-group': 'linear-gradient(135deg,#E67E22,#f0a04b)',
}

const filtered = computed(() => activeCat.value === 'all' ? mockDoctorConversations : mockDoctorConversations.filter(c => c.type === activeCat.value))

const countByType = (key: string) => {
  const list = key === 'all' ? mockDoctorConversations : mockDoctorConversations.filter(c => c.type === key)
  return list.reduce((s, c) => s + c.unread, 0)
}
</script>

<style scoped>
.doctor-messages { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.filter-row { display: flex; gap: 8px; margin-bottom: 12px; overflow-x: auto; }
.filter-row::-webkit-scrollbar { display: none; }
.cat-tag { font-size: 12px; padding: 6px 14px; border-radius: 14px; background: #fff; color: #666; white-space: nowrap; cursor: pointer; position: relative; display: flex; align-items: center; gap: 4px; }
.cat-tag.active { background: #1E3A5F; color: #fff; }
.cat-badge { font-size: 10px; font-style: normal; background: #E53935; color: #fff; border-radius: 8px; padding: 0 5px; min-width: 16px; text-align: center; line-height: 16px; }
.cat-tag.active .cat-badge { background: rgba(255,255,255,0.3); }
.conv-list { display: flex; flex-direction: column; gap: 6px; }
.conv-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 12px; padding: 12px; cursor: pointer; }
.conv-card:active { transform: scale(0.98); }
.conv-avatar { width: 42px; height: 42px; border-radius: 50%; color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.conv-info { flex: 1; min-width: 0; }
.conv-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; }
.conv-name { font-size: 14px; font-weight: 600; color: #1E3A5F; }
.conv-time { font-size: 11px; color: #bbb; }
.conv-msg { font-size: 12px; color: #999; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.conv-badge { background: #E53935; color: #fff; font-size: 10px; min-width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center; justify-content: center; padding: 0 5px; flex-shrink: 0; }
</style>
