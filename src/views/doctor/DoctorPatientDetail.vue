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
      <div class="action-btn" @click="showNotePanel = true">
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

    <!-- ========== 开处方面板 ========== -->
    <div v-if="showRxPanel" class="panel-overlay" @click.self="showRxPanel = false">
      <div class="panel">
        <div class="panel-header"><h4>开具处方</h4><span class="panel-close" @click="showRxPanel = false">&times;</span></div>
        <div class="panel-body">
          <label class="field-label">临床诊断</label>
          <div class="diag-tags">
            <span v-for="d in patient.primaryDiagnosis" :key="d" :class="['diag-tag', 'sel', rxForm.diagnosis.includes(d) && 'chosen']" @click="toggleRxDiag(d)">{{ d }}</span>
          </div>

          <label class="field-label">处方药物</label>
          <div v-for="(med, idx) in rxForm.meds" :key="idx" class="med-form-card">
            <div class="med-form-row">
              <input v-model="med.name" class="form-input flex2" placeholder="药品名称" />
              <input v-model="med.dosage" class="form-input flex1" placeholder="剂量" />
            </div>
            <div class="med-form-row">
              <select v-model="med.frequency" class="form-select flex1">
                <option value="">用法</option>
                <option>每日一次</option><option>每日两次</option><option>每日三次</option>
                <option>每晚一次</option><option>必要时</option>
              </select>
              <select v-model="med.route" class="form-select flex1">
                <option value="">给药途径</option>
                <option>口服</option><option>静脉注射</option><option>皮下注射</option>
                <option>外用</option><option>吸入</option>
              </select>
              <input v-model="med.duration" class="form-input flex1" placeholder="疗程" />
            </div>
            <input v-model="med.notes" class="form-input full" placeholder="备注（如：餐后服用、监测肝功能等）" />
            <span v-if="rxForm.meds.length > 1" class="med-remove" @click="rxForm.meds.splice(idx, 1)">&times;</span>
          </div>
          <div class="add-row" @click="addRxMed">+ 添加药物</div>

          <label class="field-label">医嘱备注</label>
          <textarea v-model="rxForm.notes" class="form-textarea" rows="2" placeholder="如：定期复查肝肾功能、注意低血糖反应等"></textarea>

          <label class="field-label">复诊日期</label>
          <input v-model="rxForm.followUp" type="date" class="form-input full" />

          <div class="panel-actions">
            <button class="panel-btn secondary" @click="showRxPanel = false">取消</button>
            <button class="panel-btn primary" @click="submitRx">确认开具</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 写病程面板 ========== -->
    <div v-if="showNotePanel" class="panel-overlay" @click.self="showNotePanel = false">
      <div class="panel">
        <div class="panel-header"><h4>病程记录</h4><span class="panel-close" @click="showNotePanel = false">&times;</span></div>
        <div class="panel-body">
          <label class="field-label">记录类型</label>
          <div class="check-options">
            <span v-for="t in noteTypes" :key="t.key" :class="['check-opt', noteForm.type === t.key && 'active']" @click="noteForm.type = t.key">{{ t.label }}</span>
          </div>

          <label class="field-label">主诉</label>
          <input v-model="noteForm.complaint" class="form-input full" placeholder="患者主要症状及持续时间" />

          <label class="field-label">现病史</label>
          <textarea v-model="noteForm.history" class="form-textarea" rows="3" placeholder="症状发展过程、伴随症状、加重/缓解因素等"></textarea>

          <label class="field-label">查体</label>
          <textarea v-model="noteForm.examination" class="form-textarea" rows="2" placeholder="T: ℃  P: 次/分  R: 次/分  BP: / mmHg&#10;阳性体征记录..."></textarea>

          <label class="field-label">诊断</label>
          <div class="diag-tags">
            <span v-for="d in patient.primaryDiagnosis" :key="d" :class="['diag-tag', 'sel', noteForm.diagnosis.includes(d) && 'chosen']" @click="toggleNoteDiag(d)">{{ d }}</span>
          </div>

          <label class="field-label">处理意见</label>
          <textarea v-model="noteForm.plan" class="form-textarea" rows="3" placeholder="治疗方案调整、用药变更、检查安排、随访计划等"></textarea>

          <div class="panel-actions">
            <button class="panel-btn secondary" @click="showNotePanel = false">取消</button>
            <button class="panel-btn primary" @click="submitNote">保存记录</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 安排检查面板 ========== -->
    <div v-if="showExamPanel" class="panel-overlay" @click.self="showExamPanel = false">
      <div class="panel">
        <div class="panel-header"><h4>安排检查</h4><span class="panel-close" @click="showExamPanel = false">&times;</span></div>
        <div class="panel-body">
          <label class="field-label">检查类别</label>
          <div class="check-options">
            <span v-for="t in examCategories" :key="t.key" :class="['check-opt', examForm.category === t.key && 'active']" @click="examForm.category = t.key">{{ t.label }}</span>
          </div>

          <label class="field-label">检查项目</label>
          <div class="check-options">
            <span v-for="item in currentExamItems" :key="item" :class="['check-opt', examForm.items.includes(item) && 'active']" @click="toggleExamItem(item)">{{ item }}</span>
          </div>

          <label class="field-label">临床诊断</label>
          <input v-model="examForm.diagnosis" class="form-input full" :placeholder="patient.primaryDiagnosis.join('、')" />

          <label class="field-label">检查目的</label>
          <textarea v-model="examForm.purpose" class="form-textarea" rows="2" placeholder="如：评估血糖控制情况、排除并发症等"></textarea>

          <label class="field-label">紧急程度</label>
          <div class="check-options">
            <span :class="['check-opt', examForm.urgency === 'routine' && 'active']" @click="examForm.urgency = 'routine'">常规</span>
            <span :class="['check-opt', 'urgent-opt', examForm.urgency === 'urgent' && 'active']" @click="examForm.urgency = 'urgent'">加急</span>
          </div>

          <label class="field-label">注意事项</label>
          <input v-model="examForm.notes" class="form-input full" placeholder="如：空腹采血、停用抗凝药物等" />

          <div class="panel-actions">
            <button class="panel-btn secondary" @click="showExamPanel = false">取消</button>
            <button class="panel-btn primary" @click="submitExam">确认开单</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 会诊申请面板 ========== -->
    <div v-if="showConsultPanel" class="panel-overlay" @click.self="showConsultPanel = false">
      <div class="panel">
        <div class="panel-header"><h4>会诊申请</h4><span class="panel-close" @click="showConsultPanel = false">&times;</span></div>
        <div class="panel-body">
          <label class="field-label">会诊类型</label>
          <div class="check-options">
            <span v-for="t in consultTypes" :key="t" :class="['check-opt', consultForm.type === t && 'active']" @click="consultForm.type = t">{{ t }}</span>
          </div>

          <label class="field-label">目标科室</label>
          <div class="check-options">
            <span v-for="d in departments" :key="d" :class="['check-opt', consultForm.dept === d && 'active']" @click="consultForm.dept = d">{{ d }}</span>
          </div>

          <label class="field-label">会诊医生（可选）</label>
          <input v-model="consultForm.doctor" class="form-input full" placeholder="指定会诊医生姓名" />

          <label class="field-label">患者病情摘要</label>
          <textarea v-model="consultForm.summary" class="form-textarea" rows="3" :placeholder="'主要诊断：' + patient.primaryDiagnosis.join('、') + '\n当前治疗方案及效果...'"></textarea>

          <label class="field-label">会诊目的</label>
          <textarea v-model="consultForm.reason" class="form-textarea" rows="2" placeholder="需要会诊科室协助解决的具体问题"></textarea>

          <label class="field-label">紧急程度</label>
          <div class="check-options">
            <span :class="['check-opt', consultForm.urgency === 'normal' && 'active']" @click="consultForm.urgency = 'normal'">普通</span>
            <span :class="['check-opt', consultForm.urgency === 'urgent' && 'active']" @click="consultForm.urgency = 'urgent'">紧急</span>
            <span :class="['check-opt', 'urgent-opt', consultForm.urgency === 'emergency' && 'active']" @click="consultForm.urgency = 'emergency'">急会诊</span>
          </div>

          <label class="field-label">期望会诊时间</label>
          <input v-model="consultForm.date" type="date" class="form-input full" />

          <div class="panel-actions">
            <button class="panel-btn secondary" @click="showConsultPanel = false">取消</button>
            <button class="panel-btn primary" @click="submitConsult">提交申请</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 提交成功提示 -->
    <div v-if="showSuccess" class="success-toast">{{ successMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import PageNavBar from '@/components/PageNavBar.vue'
import { mockMemberProfiles, mockPrescriptions, mockExaminationOrders, mockMedicalRecords } from '@/mock/data'

const route = useRoute()
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

// 面板开关
const showRxPanel = ref(false)
const showNotePanel = ref(false)
const showExamPanel = ref(false)
const showConsultPanel = ref(false)

// 成功提示
const showSuccess = ref(false)
const successMsg = ref('')
const toast = (msg: string) => { successMsg.value = msg; showSuccess.value = true; setTimeout(() => showSuccess.value = false, 2000) }

// ===== 处方表单 =====
const rxForm = reactive({
  diagnosis: [...(patient.value?.primaryDiagnosis || [])],
  meds: [{ name: '', dosage: '', frequency: '', route: '口服', duration: '', notes: '' }],
  notes: '',
  followUp: ''
})
const toggleRxDiag = (d: string) => {
  const i = rxForm.diagnosis.indexOf(d)
  i >= 0 ? rxForm.diagnosis.splice(i, 1) : rxForm.diagnosis.push(d)
}
const addRxMed = () => rxForm.meds.push({ name: '', dosage: '', frequency: '', route: '口服', duration: '', notes: '' })
const submitRx = () => { showRxPanel.value = false; toast('处方已开具') }

// ===== 病程记录表单 =====
const noteTypes = [
  { key: 'first', label: '首次病程' },
  { key: 'daily', label: '日常病程' },
  { key: 'round', label: '查房记录' },
  { key: 'rescue', label: '抢救记录' },
  { key: 'transfer', label: '转科记录' },
]
const noteForm = reactive({
  type: 'daily',
  complaint: '',
  history: '',
  examination: '',
  diagnosis: [...(patient.value?.primaryDiagnosis || [])],
  plan: ''
})
const toggleNoteDiag = (d: string) => {
  const i = noteForm.diagnosis.indexOf(d)
  i >= 0 ? noteForm.diagnosis.splice(i, 1) : noteForm.diagnosis.push(d)
}
const submitNote = () => { showNotePanel.value = false; toast('病程记录已保存') }

// ===== 检查表单 =====
const examCategories = [
  { key: 'blood', label: '血液检验' },
  { key: 'biochem', label: '生化检查' },
  { key: 'imaging', label: '影像检查' },
  { key: 'ultrasound', label: '超声检查' },
  { key: 'ecg', label: '心电图' },
  { key: 'other', label: '其他' },
]
const examItemsMap: Record<string, string[]> = {
  blood: ['血常规', '凝血功能', '血沉', 'D-二聚体', '血型鉴定'],
  biochem: ['肝功能', '肾功能', '血糖', '糖化血红蛋白', '血脂全套', '电解质', '心肌酶谱', '甲状腺功能', '肿瘤标志物'],
  imaging: ['胸部X光', '胸部CT', '头颅CT', '头颅MRI', '腹部CT', '冠脉CTA'],
  ultrasound: ['心脏超声', '腹部超声', '甲状腺超声', '颈动脉超声', '下肢血管超声'],
  ecg: ['常规心电图', '24小时动态心电图', '运动平板试验'],
  other: ['肺功能检查', '骨密度检测', '胃镜', '肠镜', '眼底检查'],
}
const examForm = reactive({
  category: 'blood',
  items: [] as string[],
  diagnosis: '',
  purpose: '',
  urgency: 'routine',
  notes: ''
})
const currentExamItems = computed(() => examItemsMap[examForm.category] || [])
const toggleExamItem = (item: string) => {
  const i = examForm.items.indexOf(item)
  i >= 0 ? examForm.items.splice(i, 1) : examForm.items.push(item)
}
const submitExam = () => { showExamPanel.value = false; toast('检查单已开具') }

// ===== 会诊表单 =====
const consultTypes = ['科间会诊', '多学科会诊(MDT)', '远程会诊', '急会诊']
const departments = ['心内科', '内分泌科', '肾内科', '骨科', '神经内科', '消化内科', '呼吸内科', '肿瘤科']
const consultForm = reactive({
  type: '科间会诊',
  dept: '',
  doctor: '',
  summary: '',
  reason: '',
  urgency: 'normal',
  date: ''
})
const submitConsult = () => { showConsultPanel.value = false; toast('会诊申请已提交') }
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
.diag-tag.sel { background: rgba(30,58,95,0.08); color: #1E3A5F; cursor: pointer; border: 1px solid transparent; }
.diag-tag.chosen { background: rgba(30,58,95,0.15); border-color: #1E3A5F; font-weight: 600; }
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

/* 面板通用 */
.panel-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.45); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
.panel { background: #fff; border-radius: 16px 16px 0 0; width: 100%; max-width: 500px; max-height: 85vh; overflow-y: auto; }
.panel-header { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-bottom: 1px solid #f0f0f0; position: sticky; top: 0; background: #fff; z-index: 1; }
.panel-header h4 { margin: 0; font-size: 16px; color: #1E3A5F; }
.panel-close { font-size: 24px; color: #999; cursor: pointer; line-height: 1; }
.panel-body { padding: 16px; }
.field-label { font-size: 13px; color: #333; font-weight: 600; display: block; margin: 14px 0 6px; }
.field-label:first-child { margin-top: 0; }

/* 表单控件 */
.form-input { border: 1px solid #e0e0e0; border-radius: 8px; padding: 9px 10px; font-size: 13px; outline: none; background: #f8f9fb; box-sizing: border-box; }
.form-input:focus { border-color: #1E3A5F; background: #fff; }
.form-input.full { width: 100%; }
.form-select { border: 1px solid #e0e0e0; border-radius: 8px; padding: 9px 8px; font-size: 13px; outline: none; background: #f8f9fb; box-sizing: border-box; appearance: auto; }
.form-select:focus { border-color: #1E3A5F; }
.form-textarea { width: 100%; border: 1px solid #e0e0e0; border-radius: 8px; padding: 9px 10px; font-size: 13px; resize: none; outline: none; background: #f8f9fb; box-sizing: border-box; line-height: 1.5; }
.form-textarea:focus { border-color: #1E3A5F; background: #fff; }

/* 药物表单卡片 */
.med-form-card { background: #f8f9fb; border-radius: 10px; padding: 10px; margin-bottom: 8px; position: relative; display: flex; flex-direction: column; gap: 6px; }
.med-form-row { display: flex; gap: 6px; }
.flex1 { flex: 1; min-width: 0; }
.flex2 { flex: 2; min-width: 0; }
.med-remove { position: absolute; top: 6px; right: 8px; font-size: 18px; color: #E53935; cursor: pointer; line-height: 1; }
.add-row { font-size: 13px; color: #1E3A5F; font-weight: 600; padding: 8px 0; cursor: pointer; text-align: center; border: 1px dashed #ccc; border-radius: 8px; margin-top: 4px; }

/* 选项标签 */
.check-options { display: flex; flex-wrap: wrap; gap: 8px; }
.check-opt { font-size: 12px; padding: 6px 14px; border-radius: 16px; background: #f0f2f5; color: #666; cursor: pointer; border: 1px solid transparent; transition: all 0.15s; }
.check-opt.active { background: rgba(30,58,95,0.12); color: #1E3A5F; border-color: #1E3A5F; font-weight: 600; }
.check-opt.urgent-opt.active { background: rgba(229,57,53,0.1); color: #E53935; border-color: #E53935; }

/* 面板按钮 */
.panel-actions { display: flex; gap: 10px; margin-top: 20px; }
.panel-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.panel-btn.primary { background: #1E3A5F; color: #fff; }
.panel-btn.secondary { background: #f0f2f5; color: #666; }

/* 成功提示 */
.success-toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(30,58,95,0.9); color: #fff; padding: 12px 28px; border-radius: 10px; font-size: 14px; font-weight: 600; z-index: 200; animation: fadeInOut 2s ease; }
@keyframes fadeInOut { 0% { opacity: 0; transform: translate(-50%,-50%) scale(0.8); } 15% { opacity: 1; transform: translate(-50%,-50%) scale(1); } 85% { opacity: 1; } 100% { opacity: 0; } }
</style>
