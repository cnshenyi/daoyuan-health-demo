<template>
  <div class="page-container role-dashboard">
    <div class="role-banner mental-banner">
      <div class="banner-content">
        <h1 class="banner-title">您好，{{ userStore.user?.name }}</h1>
        <p class="banner-subtitle">心理与教育工作台</p>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-num">{{ memberProfiles.length }}</span>
        <span class="stat-label">我的会员</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">2</span>
        <span class="stat-label">评估待完成</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">5</span>
        <span class="stat-label">辅导计划</span>
      </div>
    </div>

    <h3 class="section-title">会员管理</h3>
    <div class="member-list">
      <div
        v-for="m in memberProfiles"
        :key="m.id"
        class="member-card"
      >
        <div class="member-avatar" :class="m.gender">
          {{ m.name.slice(-1) }}
        </div>
        <div class="member-info">
          <div class="member-name">{{ m.name }}</div>
          <div class="member-meta">{{ m.age }}岁 · {{ m.primaryDiagnosis.join('、') }}</div>
        </div>
        <span :class="['status-tag', m.status]">{{ statusLabel[m.status] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { mockMemberProfiles } from '@/mock/data'

const userStore = useUserStore()
const memberProfiles = mockMemberProfiles
const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }
</script>

<style scoped>
.role-dashboard { padding: 0; }
.role-banner { padding: 24px 16px; color: #fff; border-radius: 0 0 16px 16px; }
.mental-banner { background: linear-gradient(135deg, #8E44AD 0%, #A569BD 100%); }
.banner-title { font-size: 20px; font-weight: 700; margin: 0 0 4px 0; }
.banner-subtitle { font-size: 13px; opacity: 0.85; margin: 0; }
.stats-row { display: flex; gap: 10px; padding: 16px; margin-top: -12px; }
.stat-card { flex: 1; background: #fff; border-radius: 10px; padding: 12px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.stat-num { display: block; font-size: 24px; font-weight: 700; color: #1E3A5F; }
.stat-label { font-size: 12px; color: #999; }
.section-title { font-size: 16px; font-weight: 600; color: #1E3A5F; padding: 0 16px; margin: 8px 0 12px; }
.member-list { padding: 0 16px 16px; display: flex; flex-direction: column; gap: 10px; }
.member-card { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 10px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.member-avatar { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 600; color: #fff; flex-shrink: 0; }
.member-avatar.male { background: linear-gradient(135deg, #1E3A5F, #2a4a6f); }
.member-avatar.female { background: linear-gradient(135deg, #C9A962, #D4B87A); }
.member-info { flex: 1; min-width: 0; }
.member-name { font-size: 15px; font-weight: 600; color: #333; }
.member-meta { font-size: 12px; color: #999; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.status-tag { font-size: 10px; padding: 2px 8px; border-radius: 4px; font-weight: 500; flex-shrink: 0; }
.status-tag.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.status-tag.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.status-tag.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
</style>
