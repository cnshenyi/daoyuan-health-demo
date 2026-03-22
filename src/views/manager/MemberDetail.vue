<template>
  <div class="member-detail">
    <!-- 会员头部信息 -->
    <div class="member-hero">
      <div class="hero-avatar" :class="member.gender">{{ member.name.slice(-1) }}</div>
      <div class="hero-info">
        <h2 class="hero-name">{{ member.name }}</h2>
        <p class="hero-meta">{{ member.age }}岁 · {{ member.gender === 'male' ? '男' : '女' }} · {{ member.membershipType === 'premium' ? '至尊会员' : '标准会员' }}</p>
        <p class="hero-join">入会：{{ member.joinDate }}</p>
      </div>
      <span :class="['status-badge', member.status]">{{ statusLabel[member.status] }}</span>
    </div>

    <!-- 健康评分 -->
    <div class="score-section">
      <div class="score-card" v-for="s in scoreItems" :key="s.label">
        <span class="score-val" :class="s.cls">{{ s.val }}</span>
        <span class="score-lbl">{{ s.label }}</span>
      </div>
    </div>

    <!-- 主诊信息 -->
    <div class="info-section">
      <h3 class="info-title">主要诊断</h3>
      <div class="tag-list">
        <span v-for="d in member.primaryDiagnosis" :key="d" class="diag-tag">{{ d }}</span>
      </div>
    </div>

    <!-- 负责团队 -->
    <div class="info-section">
      <h3 class="info-title">负责团队</h3>
      <div class="team-row">
        <div class="team-item">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <div>
            <p class="team-role">健康管家</p>
            <p class="team-name">{{ member.assignedManager }}</p>
          </div>
        </div>
        <div class="team-item">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>
          <div>
            <p class="team-role">主治医生</p>
            <p class="team-name">{{ member.assignedDoctor }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近病程记录 -->
    <div class="info-section">
      <div class="section-header">
        <h3 class="info-title">近期病程记录</h3>
        <span class="section-more" @click="goProgressNotes">查看全部</span>
      </div>
      <div class="note-list">
        <div v-for="note in recentNotes" :key="note.id" class="note-card">
          <div class="note-dot" :class="note.type"></div>
          <div class="note-info">
            <p class="note-title">{{ note.title }}</p>
            <p class="note-meta">{{ note.doctor }} · {{ note.date }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="action-grid">
      <div class="action-btn" @click="goRecord">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        <span>录入记录</span>
      </div>
      <div class="action-btn" @click="goMessage">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        <span>发送消息</span>
      </div>
      <div class="action-btn" @click="goHealth">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
        <span>健康数据</span>
      </div>
      <div class="action-btn" @click="goService">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L19 8l-9 9z"/></svg>
        <span>服务进度</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockMemberProfiles, mockProgressNotes } from '@/mock/data'

const route = useRoute()
const router = useRouter()

const memberId = route.params.id as string
const member = computed(() => mockMemberProfiles.find(m => m.id === memberId) || mockMemberProfiles[0])

const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }

const scoreItems = computed(() => [
  { label: '健康评分', val: member.value.healthScore, cls: member.value.healthScore >= 80 ? 'good' : member.value.healthScore >= 65 ? 'fair' : 'poor' },
  { label: '末次签到', val: member.value.lastCheckIn.slice(5), cls: '' },
  { label: '入会天数', val: Math.floor((Date.now() - new Date(member.value.joinDate).getTime()) / 86400000), cls: '' },
])

const recentNotes = mockProgressNotes.slice(0, 3)

const goProgressNotes = () => router.push('/manager/notes/' + memberId)
const goRecord = () => router.push('/manager/notes/new?member=' + memberId)
const goMessage = () => router.push('/manager/messages')
const goHealth = () => router.push('/manager/members/' + memberId + '/health')
const goService = () => router.push('/manager/members/' + memberId + '/service')
</script>

<style scoped>
.member-detail {
  padding: 0 0 80px;
  background: #f5f7fa;
  min-height: 100vh;
}

.member-hero {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.hero-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.hero-avatar.male { background: linear-gradient(135deg, #1E3A5F, #2a4a6f); }
.hero-avatar.female { background: linear-gradient(135deg, #C9A962, #D4B87A); }

.hero-info { flex: 1; }
.hero-name { font-size: 18px; font-weight: 700; color: #1E3A5F; margin: 0 0 3px; }
.hero-meta { font-size: 12px; color: #666; margin: 0 0 2px; }
.hero-join { font-size: 11px; color: #aaa; margin: 0; }

.status-badge { font-size: 11px; padding: 3px 10px; border-radius: 12px; font-weight: 600; flex-shrink: 0; }
.status-badge.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.status-badge.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.status-badge.urgent { background: rgba(229,57,53,0.1); color: #E53935; }

.score-section {
  display: flex;
  background: #fff;
  margin-top: 10px;
  padding: 16px;
  gap: 0;
}

.score-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-right: 1px solid #f0f0f0;
}

.score-card:last-child { border-right: none; }

.score-val { font-size: 22px; font-weight: 700; color: #1E3A5F; }
.score-val.good { color: #2E8B57; }
.score-val.fair { color: #E67E22; }
.score-val.poor { color: #E53935; }
.score-lbl { font-size: 11px; color: #aaa; }

.info-section {
  background: #fff;
  margin-top: 10px;
  padding: 14px 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.info-title { font-size: 14px; font-weight: 600; color: #1E3A5F; margin: 0 0 10px; }
.section-more { font-size: 12px; color: #2E8B57; cursor: pointer; }

.tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
.diag-tag { font-size: 12px; padding: 4px 10px; background: rgba(30,58,95,0.06); color: #1E3A5F; border-radius: 6px; }

.team-row { display: flex; gap: 12px; }
.team-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 8px;
}

.team-item svg { width: 24px; height: 24px; color: #2E8B57; flex-shrink: 0; }
.team-role { font-size: 11px; color: #999; margin: 0; }
.team-name { font-size: 14px; font-weight: 600; color: #333; margin: 2px 0 0; }

.note-list { display: flex; flex-direction: column; gap: 8px; }
.note-card { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
.note-card:last-child { border-bottom: none; }
.note-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; background: #2E8B57; }
.note-dot.medication-change { background: #E67E22; }
.note-dot.consultation { background: #1E3A5F; }
.note-dot.treatment-plan { background: #8E44AD; }
.note-info { flex: 1; }
.note-title { font-size: 13px; font-weight: 500; color: #333; margin: 0 0 2px; }
.note-meta { font-size: 11px; color: #aaa; margin: 0; }

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px 16px 0;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: all 0.2s;
}

.action-btn:active { transform: scale(0.97); }

.action-btn svg { width: 28px; height: 28px; color: #2E8B57; }
.action-btn span { font-size: 13px; font-weight: 500; color: #333; }
</style>
