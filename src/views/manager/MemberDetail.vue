<template>
  <div class="member-detail">
    <PageNavBar :title="member.name" />
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
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L19 8l-9 9z"/></svg>
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

    <!-- 快捷操作 -->
    <div class="info-section">
      <h3 class="info-title">快捷操作</h3>
      <div class="action-grid">
        <div class="action-btn" @click="goRecord">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          <span>录入记录</span>
        </div>
        <div class="action-btn" @click="goMessage">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
          <span>发消息</span>
        </div>
        <div class="action-btn" @click="goAppointment">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
          <span>安排预约</span>
        </div>
        <div class="action-btn" @click="goHealth">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
          <span>健康数据</span>
        </div>
        <div class="action-btn" @click="goService">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L19 8l-9 9z"/></svg>
          <span>服务进度</span>
        </div>
        <div class="action-btn" @click="goReport">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.1h-15V5h15v14.1zm0-16.1h-15c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
          <span>生成报告</span>
        </div>
      </div>
    </div>

    <!-- 消息发送面板 -->
    <div v-if="showMsgPanel" class="slide-panel">
      <div class="panel-header">
        <h3>发消息给 {{ member.name }}</h3>
        <span class="panel-close" @click="showMsgPanel = false">✕</span>
      </div>
      <p class="template-label">快捷模板</p>
      <div class="template-list">
        <span v-for="t in msgTemplates" :key="t" class="template-tag" @click="msgText = t">{{ t }}</span>
      </div>
      <textarea v-model="msgText" class="msg-textarea" rows="3" placeholder="输入消息内容..."></textarea>
      <button class="send-btn" @click="sendMessage">发送</button>
    </div>

    <!-- 预约面板 -->
    <div v-if="showAppointPanel" class="slide-panel">
      <div class="panel-header">
        <h3>为 {{ member.name }} 安排预约</h3>
        <span class="panel-close" @click="showAppointPanel = false">✕</span>
      </div>
      <div class="appoint-list">
        <div v-for="appt in appointmentOptions" :key="appt.type" class="appoint-item" @click="confirmAppoint(appt)">
          <span class="appoint-icon">{{ appt.icon }}</span>
          <div class="appoint-info">
            <p class="appoint-type">{{ appt.type }}</p>
            <p class="appoint-next">下次可约：{{ appt.next }}</p>
          </div>
          <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;color:#ccc"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </div>
      </div>
    </div>

    <!-- 近期病程记录 -->
    <div class="info-section">
      <div class="section-header">
        <h3 class="info-title" style="margin:0">近期病程记录</h3>
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mockMemberProfiles, mockProgressNotes } from '@/mock/data'
import PageNavBar from '@/components/PageNavBar.vue'
import { ElMessage } from 'element-plus'

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

const showMsgPanel = ref(false)
const showAppointPanel = ref(false)
const msgText = ref('')

const msgTemplates = [
  '您好，请问今天身体状况如何？',
  '提醒您今日按时服药',
  '您的体检报告已出，请查收',
  '预约已安排好，请准时赴约',
]

const sendMessage = () => {
  if (!msgText.value.trim()) return
  ElMessage.success('消息已发送')
  msgText.value = ''
  showMsgPanel.value = false
}

const appointmentOptions = [
  { icon: '🩺', type: '全科医生复诊', next: '2026-04-01' },
  { icon: '🔬', type: '专科会诊', next: '2026-04-05' },
  { icon: '🥗', type: '营养师咨询', next: '2026-03-28' },
  { icon: '💪', type: '理疗/运动指导', next: '2026-03-25' },
]

const confirmAppoint = (appt: any) => {
  ElMessage.success(`已为${member.value.name}安排${appt.type}预约`)
  showAppointPanel.value = false
}

const goProgressNotes = () => router.push('/manager/notes/' + memberId)
const goRecord = () => router.push('/manager/notes/' + memberId)
const goMessage = () => { showMsgPanel.value = !showMsgPanel.value; showAppointPanel.value = false }
const goHealth = () => router.push('/manager/members/' + memberId + '/health')
const goService = () => router.push('/manager/members/' + memberId + '/service')
const goAppointment = () => { showAppointPanel.value = !showAppointPanel.value; showMsgPanel.value = false }
const goReport = () => ElMessage.info('健康报告生成功能即将上线')
</script>

<style scoped>
.member-detail { padding: 0 0 80px; background: #f5f7fa; min-height: 100vh; }
.member-hero { display: flex; align-items: center; gap: 12px; padding: 16px; background: #fff; border-bottom: 1px solid #f0f0f0; }
.hero-avatar { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: #fff; flex-shrink: 0; }
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
.score-section { display: flex; background: #fff; margin-top: 10px; padding: 16px; }
.score-card { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; border-right: 1px solid #f0f0f0; }
.score-card:last-child { border-right: none; }
.score-val { font-size: 20px; font-weight: 700; color: #1E3A5F; }
.score-val.good { color: #2E8B57; }
.score-val.fair { color: #E67E22; }
.score-val.poor { color: #E53935; }
.score-lbl { font-size: 11px; color: #aaa; }
.info-section { background: #fff; margin-top: 10px; padding: 14px 16px; }
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.info-title { font-size: 14px; font-weight: 600; color: #1E3A5F; margin: 0 0 10px; }
.section-more { font-size: 12px; color: #2E8B57; cursor: pointer; }
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
.diag-tag { font-size: 12px; padding: 4px 10px; background: rgba(30,58,95,0.06); color: #1E3A5F; border-radius: 6px; }
.team-row { display: flex; gap: 12px; }
.team-item { flex: 1; display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: #f8f9fa; border-radius: 8px; }
.team-item svg { width: 20px; height: 20px; color: #2E8B57; flex-shrink: 0; }
.team-role { font-size: 11px; color: #999; margin: 0; }
.team-name { font-size: 13px; font-weight: 600; color: #333; margin: 2px 0 0; }
.action-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.action-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 8px; background: #f8f9fa; border-radius: 10px; cursor: pointer; transition: background 0.2s; }
.action-btn:active { background: #eef0f3; }
.action-btn svg { width: 22px; height: 22px; color: #2E8B57; }
.action-btn span { font-size: 12px; color: #333; }
.slide-panel { background: #fff; margin-top: 10px; border-radius: 12px; padding: 16px; border: 1px solid #e8e8e8; }
.panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.panel-header h3 { font-size: 15px; font-weight: 600; color: #1E3A5F; margin: 0; }
.panel-close { font-size: 18px; color: #aaa; cursor: pointer; padding: 4px; }
.template-label { font-size: 12px; color: #999; margin: 0 0 8px; }
.template-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.template-tag { font-size: 12px; padding: 5px 10px; background: rgba(46,139,87,0.08); color: #2E8B57; border-radius: 6px; cursor: pointer; }
.msg-textarea { width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; padding: 10px; font-size: 14px; resize: none; box-sizing: border-box; }
.send-btn { width: 100%; margin-top: 10px; height: 40px; background: #2E8B57; color: #fff; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
.appoint-list { display: flex; flex-direction: column; gap: 10px; }
.appoint-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 8px; cursor: pointer; }
.appoint-item:active { background: #eef0f3; }
.appoint-icon { font-size: 20px; }
.appoint-info { flex: 1; }
.appoint-type { font-size: 14px; font-weight: 600; color: #333; margin: 0 0 2px; }
.appoint-next { font-size: 12px; color: #999; margin: 0; }
.note-list { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
.note-card { display: flex; align-items: center; gap: 12px; padding: 10px; background: #f8f9fa; border-radius: 8px; }
.note-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.note-dot.daily { background: #2E8B57; }
.note-dot.medication-change { background: #E67E22; }
.note-dot.treatment-plan { background: #1E3A5F; }
.note-dot.consultation { background: #8E44AD; }
.note-title { font-size: 13px; color: #333; margin: 0 0 2px; font-weight: 500; }
.note-meta { font-size: 11px; color: #aaa; margin: 0; }
</style>
