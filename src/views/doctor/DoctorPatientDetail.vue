<template>
  <div class="patient-detail">
    <PageNavBar :title="patient.name" />

    <!-- 患者头部 -->
    <div class="hero">
      <div class="hero-avatar" :style="{ background: patient.gender === 'male' ? 'linear-gradient(135deg,#1E3A5F,#2a5a8f)' : 'linear-gradient(135deg,#8E44AD,#a569bd)' }">{{ patient.name.slice(-1) }}</div>
      <div class="hero-info">
        <h3 class="hero-name">{{ patient.name }}</h3>
        <p class="hero-meta">{{ patient.age }}岁 · {{ patient.gender === 'male' ? '男' : '女' }} · {{ patient.membershipType === 'premium' ? '至尊会员' : '标准会员' }}</p>
      </div>
      <span :class="['hero-status', patient.status]">{{ statusLabel[patient.status] }}</span>
    </div>

    <!-- 评分行 -->
    <div class="score-row">
      <div class="score-item"><span class="score-val" :style="{ color: scoreColor(patient.healthScore) }">{{ patient.healthScore }}</span><span class="score-label">健康评分</span></div>
      <div class="score-item"><span class="score-val">{{ patient.lastCheckIn.slice(5) }}</span><span class="score-label">末次就诊</span></div>
      <div class="score-item"><span class="score-val" style="color:#C9A962">{{ nextFollowUp || '—' }}</span><span class="score-label">下次随访</span></div>
    </div>

    <!-- 主要诊断 -->
    <div class="section">
      <h4 class="sec-title">主要诊断</h4>
      <div class="diag-tags"><span v-for="d in patient.primaryDiagnosis" :key="d" class="diag-tag">{{ d }}</span></div>
    </div>

    <!-- 快捷操作 -->
    <div class="action-grid">
      <div class="action-btn" @click="showRxPanel = true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>
        <span>开处方</span>
      </div>
      <div class="action-btn" @click="router.push('/doctor/records/new?patient=' + patient.id)">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        <span>写病程</span>
      </div>
      <div class="action-btn" @click="showExamPanel = true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.88 18.47c.44-.7.7-1.51.7-2.39 0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5 2.01 4.5 4.5 4.5c.88 0 1.69-.26 2.39-.7L21.39 23 23 21.39l-3.12-2.92zm-3.8.11a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zm-.36-8.5c-.74.02-1.45.18-2.1.45l-.55-.83-3.8 6.18-3.01-3.52-3.63 5.81L1 17l5-8 3 3.5L13 6l2.72 4.08z"/></svg>
        <span>安排检查</span>
      </div>
      <div class="action-btn" @click="showConsultPanel = true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
        <span>会诊申请</span>
      </div>
    </div>

    <!-- 当前用药 -->
    <div class="section" v-if="patientRx.length">
      <h4 class="sec-title">当前用药方案</h4>
      <div v-for="rx in patientRx" :key="rx.id" class="rx-card">
        <div class="rx-header"><span class="rx-diag">{{ rx.diagnosis }}</span><span class="rx-date">{{ rx.date }}</span></div>
        <div v-for="med in rx.medications" :key="med.name" class="med-row">
          <span class="med-name">{{ med.name }}</span>
          <span class="med-info">{{ med.dosage }} · {{ med.frequency }} · {{ med.duration }}</span>
        </div>
      </div>
    </div>

    <!-- 检查结果 -->
    <div class="section" v-if="patientExams.length">
      <h4 class="sec-title">检查结果</h4>
      <div v-for="ex in patientExams" :key="ex.id" class="exam-card">
        <div class="exam-header">
          <span :class="['exam-status', ex.status]">{{ examStatusLabel[ex.status] }}</span>
          <span class="exam-date">{{ ex.date }}</span>
        </div>
        <p class="exam-items">{{ ex.items.join('、') }}</p>
        <p v-if="ex.result" class="exam-result">结果：{{ ex.result }}</p>
      </div>
    </div>

    <!-- 近期病程 -->
    <div class="section" v-if="patientRecords.length">
      <h4 class="sec-title">近期病历</h4>
      <div v-for="r in patientRecords" :key="r.id" class="mr-card">
        <div class="mr-header"><span :class="['mr-type', r.type]">{{ typeLabel[r.type] }}</span><span class="mr-date">{{ r.date }}</span></div>
        <p class="mr-complaint">{{ r.chiefComplaint }}</p>
        <p class="mr-treatment">{{ r.treatment }}</p>
      </div>
    </div>

    <!-- 处方面板 -->
    <div v-if="showRxPanel" class="panel-overlay" @click.self="showRxPanel = false">
      <div class="panel">
        <div class="panel-header"><h4>开具处方</h4><span class="panel-close" @click="showRxPanel = false">&times;</span></div>
        <div class="panel-body">
          <label class="field-label">诊断</label>
          <div class="diag-tags"><span v-for="d in patient.primaryDiagnosis" :key="d" class="diag-tag sel">{{ d }}</span></div>
          <label class="field-label">药物（示例）</label>
          <div class="mock-med">二甲双胍 850mg 每日两次 3个月</div>
          <div class="mock-med">阿托伐他汀 20mg 每晚一次 3个月</div>
          <button class="panel-btn" @click="showRxPanel = false">确认开具</button>
        </div>
      </div>
    </div>

    <!-- 检查面板 -->
    <div v-if="showExamPanel" class="panel-overlay" @click.self="showExamPanel = false">
      <div class="panel">
        <div class="panel-header"><h4>安排检查</h4><span class="panel-close" @click="showExamPanel = false">&times;</span></div>
        <div class="panel-body">
          <label class="field-label">检查类型</label>
          <div class="check-options">
            <span v-for="t in ['血液检查','影像检查','超声检查','心电图','其他']" :key="t" class="check-opt">{{ t }}</span>
          </div>
          <label class="field-label">紧急程度</label>
          <div class="check-options">
            <span class="check-opt">常规</span><span class="check-opt urgent">加急</span>
          </div>
          <button class="panel-btn" @click="showExamPanel = false">确认开单</button>
        </div>
      </div>
    </div>

    <!-- 会诊面板 -->
    <div v-if="showConsultPanel" class="panel-overlay" @click.self="showConsultPanel = false">
      <div class="panel">
        <div class="panel-header"><h4>会诊申请</h4><span class="panel-close" @click="showConsultPanel = false">&times;</span></div>
        <div class="panel-body">
          <label class="field-label">目标科室</label>
          <div class="check-options">
            <span v-for="d in ['心内科','内分泌科','骨科','神经科','其他']" :key="d" class="check-opt">{{ d }}</span>
          </div>
          <label class="field-label">会诊原因</label>
          <textarea class="consult-reason" rows="3" placeholder="请输入会诊原因..."></textarea>
          <button class="panel-btn" @click="showConsultPanel = false">提交申请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageNavBar from '@/components/PageNavBar.vue'
import { mockMemberProfiles, mockPrescriptions, mockExaminationOrders, mockMedicalRecords } from '@/mock/data'

const route = useRoute()
const router = useRouter()
const pid = route.params.id as string
const patient = computed(() => mockMemberProfiles.find(m => m.id === pid) || mockMemberProfiles[0])

const statusLabel: Record<string, string> = { stable: '稳定', attention: '关注', urgent: '紧急' }
const examStatusLabel: Record<string, string> = { pending: '待检', 'in-progress': '进行中', completed: '已完成' }
const typeLabel: Record<string, string> = { initial: '初诊', 'follow-up': '复诊', consultation: '会诊', emergency: '急诊' }
const scoreColor = (s: number) => s >= 80 ? '#2E8B57' : s >= 70 ? '#E67E22' : '#E53935'

const patientRx = computed(() => mockPrescriptions.filter(r => r.patientId === pid))
const patientExams = computed(() => mockExaminationOrders.filter(e => e.patientId === pid))
const patientRecords = computed(() => mockMedicalRecords.filter(r => r.patientId === pid))
const nextFollowUp = computed(() => {
  const r = patientRecords.value.find(r => r.nextFollowUp)
  return r?.nextFollowUp?.slice(5) || ''
})

const showRxPanel = ref(false)
const showExamPanel = ref(false)
const showConsultPanel = ref(false)
</script>

<style scoped>
.patient-detail { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.hero { display: flex; align-items: center; gap: 12px; padding: 16px; background: #fff; }
.hero-avatar { width: 50px; height: 50px; border-radius: 50%; color: #fff; font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.hero-info { flex: 1; }
.hero-name { font-size: 16px; font-weight: 700; color: #1E3A5F; margin: 0 0 2px; }
.hero-meta { font-size: 12px; color: #999; margin: 0; }
.hero-status { font-size: 11px; padding: 3px 10px; border-radius: 10px; }
.hero-status.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
.hero-status.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.hero-status.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
.score-row { display: flex; background: #fff; margin-top: 1px; padding: 12px 16px; gap: 8px; }
.score-item { flex: 1; text-align: center; }
.score-val { font-size: 18px; font-weight: 700; color: #1E3A5F; display: block; }
.score-label { font-size: 11px; color: #999; }
.section { background: #fff; margin-top: 8px; padding: 14px 16px; }
.sec-title { font-size: 14px; font-weight: 600; color: #1E3A5F; margin: 0 0 10px; }
.diag-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.diag-tag { font-size: 12px; padding: 4px 10px; border-radius: 10px; background: #f0f2f5; color: #666; }
.diag-tag.sel { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 12px 16px; }
.action-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; background: #fff; border-radius: 12px; padding: 14px 8px; cursor: pointer; }
.action-btn:active { transform: scale(0.96); }
.action-btn svg { width: 24px; height: 24px; color: #1E3A5F; }
.action-btn span { font-size: 12px; color: #333; font-weight: 500; }
.rx-card { background: #f8f9fb; border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; }
.rx-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
.rx-diag { font-size: 13px; font-weight: 600; color: #1E3A5F; }
.rx-date { font-size: 11px; color: #999; }
.med-row { display: flex; justify-content: space-between; align-items: center; padding: 4px 0; }
.med-name { font-size: 13px; color: #333; font-weight: 500; }
.med-info { font-size: 11px; color: #999; }
.exam-card { background: #f8f9fb; border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; }
.exam-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.exam-status { font-size: 11px; padding: 2px 8px; border-radius: 8px; }
.exam-status.pending { background: rgba(201,169,98,0.1); color: #C9A962; }
.exam-status.in-progress { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.exam-status.completed { background: rgba(46,139,87,0.1); color: #2E8B57; }
.exam-date { font-size: 11px; color: #999; }
.exam-items { font-size: 13px; color: #333; margin: 0 0 2px; }
.exam-result { font-size: 12px; color: #2E8B57; margin: 0; }
.mr-card { background: #f8f9fb; border-radius: 10px; padding: 10px 12px; margin-bottom: 8px; }
.mr-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
.mr-type { font-size: 11px; padding: 2px 8px; border-radius: 8px; font-weight: 600; }
.mr-type.initial { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.mr-type.follow-up { background: rgba(46,139,87,0.1); color: #2E8B57; }
.mr-type.consultation { background: rgba(142,68,173,0.1); color: #8E44AD; }
.mr-type.emergency { background: rgba(229,57,53,0.1); color: #E53935; }
.mr-date { font-size: 11px; color: #999; }
.mr-complaint { font-size: 13px; color: #333; margin: 0 0 2px; font-weight: 500; }
.mr-treatment { font-size: 12px; color: #999; margin: 0; }
.panel-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
.panel { background: #fff; border-radius: 16px 16px 0 0; width: 100%; max-width: 500px; max-height: 70vh; overflow-y: auto; }
.panel-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #f0f0f0; }
.panel-header h4 { margin: 0; font-size: 16px; color: #1E3A5F; }
.panel-close { font-size: 24px; color: #999; cursor: pointer; line-height: 1; }
.panel-body { padding: 16px; }
.field-label { font-size: 13px; color: #666; display: block; margin: 12px 0 6px; }
.field-label:first-child { margin-top: 0; }
.mock-med { font-size: 13px; color: #333; padding: 8px 12px; background: #f8f9fb; border-radius: 8px; margin-bottom: 6px; }
.check-options { display: flex; flex-wrap: wrap; gap: 8px; }
.check-opt { font-size: 12px; padding: 6px 14px; border-radius: 16px; background: #f0f2f5; color: #666; cursor: pointer; }
.check-opt.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
.consult-reason { width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; padding: 10px; font-size: 13px; resize: none; outline: none; box-sizing: border-box; }
.consult-reason:focus { border-color: #1E3A5F; }
.panel-btn { width: 100%; margin-top: 16px; padding: 12px; background: #1E3A5F; color: #fff; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
</style>
