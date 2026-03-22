<template>
  <div class="mental-assessments">
    <div class="filter-row">
      <span v-for="f in filters" :key="f.key" :class="['filter-tag', activeFilter === f.key && 'active']" @click="activeFilter = f.key">{{ f.label }}</span>
      <span class="add-btn" @click="showNewAssess = true">+ 发起评估</span>
    </div>

    <!-- 量表列表 -->
    <div class="scale-list">
      <div v-for="s in filteredScales" :key="s.id" class="scale-card" @click="router.push('/mental/assessments/' + s.id)">
        <div class="scale-icon" :style="{ background: s.color + '15', color: s.color }">
          <svg v-if="s.icon === 'depression'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <svg v-else-if="s.icon === 'anxiety'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 15h8"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          <svg v-else-if="s.icon === 'sleep'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <svg v-else-if="s.icon === 'stress'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <div class="scale-info">
          <div class="scale-top"><span class="scale-name">{{ s.name }}</span><span :class="['scale-status', s.status]">{{ statusLabel[s.status] }}</span></div>
          <p class="scale-member">{{ s.memberName }} · {{ s.scaleName }}</p>
          <div class="scale-bottom">
            <span class="scale-score" v-if="s.score !== null">评分：<b :style="{ color: s.scoreColor }">{{ s.score }}</b>/{{ s.maxScore }}</span>
            <span class="scale-date">{{ s.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 发起评估弹窗 -->
    <div v-if="showNewAssess" class="modal-mask" @click.self="showNewAssess = false">
      <div class="modal-body">
        <h3 class="modal-title">发起心理评估</h3>

        <label class="form-label">选择会员</label>
        <select v-model="newForm.member" class="form-select">
          <option value="">请选择会员</option>
          <option v-for="m in memberOptions" :key="m" :value="m">{{ m }}</option>
        </select>

        <label class="form-label">评估量表</label>
        <div class="check-grid">
          <label v-for="s in scaleOptions" :key="s.value" class="check-item" :class="newForm.scales.includes(s.value) && 'checked'">
            <input type="checkbox" :value="s.value" v-model="newForm.scales" hidden />
            <span class="check-icon" :style="{ color: s.color }">
              <svg v-if="s.icon === 'depression'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              <svg v-else-if="s.icon === 'anxiety'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M8 15h8"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              <svg v-else-if="s.icon === 'sleep'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              <svg v-else-if="s.icon === 'stress'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </span>
            <span class="check-name">{{ s.label }}</span>
          </label>
        </div>

        <label class="form-label">评估目的</label>
        <textarea v-model="newForm.purpose" class="form-textarea" rows="2" placeholder="如：焦虑症状复评、治疗效果评估..."></textarea>

        <label class="form-label">紧急程度</label>
        <div class="radio-row">
          <label v-for="u in urgencyOptions" :key="u.value" :class="['radio-tag', newForm.urgency === u.value && 'active']">
            <input type="radio" :value="u.value" v-model="newForm.urgency" hidden />{{ u.label }}
          </label>
        </div>

        <div class="modal-actions">
          <button class="modal-btn cancel" @click="showNewAssess = false">取消</button>
          <button class="modal-btn confirm" @click="submitAssess">发起评估</button>
        </div>
      </div>
    </div>
    <div v-if="toastVisible" class="toast">{{ toastMsg }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeFilter = ref('all')
const showNewAssess = ref(false)
const toastVisible = ref(false)
const toastMsg = ref('')

const filters = [
  { key: 'all', label: '全部' },
  { key: 'pending', label: '待评估' },
  { key: 'completed', label: '已完成' },
  { key: 'review', label: '需复评' },
]
const statusLabel: Record<string, string> = { pending: '待评估', completed: '已完成', review: '需复评' }

const memberOptions = ['赵晓雯', '沈轶', '王芳', '陈建国', '吴大伟', '刘静', '张慧敏']
const scaleOptions = [
  { value: 'phq9', label: 'PHQ-9 抑郁', icon: 'depression', color: '#1E3A5F' },
  { value: 'gad7', label: 'GAD-7 焦虑', icon: 'anxiety', color: '#8E44AD' },
  { value: 'psqi', label: 'PSQI 睡眠', icon: 'sleep', color: '#2E8B57' },
  { value: 'pss10', label: 'PSS-10 压力', icon: 'stress', color: '#E67E22' },
  { value: 'sas', label: 'SAS 焦虑自评', icon: 'anxiety', color: '#8E44AD' },
  { value: 'sds', label: 'SDS 抑郁自评', icon: 'depression', color: '#1E3A5F' },
]
const urgencyOptions = [
  { value: 'normal', label: '常规' },
  { value: 'urgent', label: '加急' },
  { value: 'followup', label: '复评' },
]

const newForm = reactive({ member: '', scales: [] as string[], purpose: '', urgency: 'normal' })

const submitAssess = () => {
  if (!newForm.member || !newForm.scales.length) return
  showNewAssess.value = false
  toastMsg.value = '评估已发起'
  toastVisible.value = true
  setTimeout(() => toastVisible.value = false, 1500)
  newForm.member = ''; newForm.scales = []; newForm.purpose = ''; newForm.urgency = 'normal'
}

const scales = [
  { id: 'as-1', memberName: '赵晓雯', scaleName: 'PHQ-9 抑郁量表', name: '抑郁筛查', icon: 'depression', color: '#1E3A5F', status: 'completed', score: 8, maxScore: 27, scoreColor: '#E67E22', date: '03-20' },
  { id: 'as-2', memberName: '赵晓雯', scaleName: 'GAD-7 焦虑量表', name: '焦虑评估', icon: 'anxiety', color: '#8E44AD', status: 'completed', score: 12, maxScore: 21, scoreColor: '#E53935', date: '03-20' },
  { id: 'as-3', memberName: '沈轶', scaleName: 'PSQI 睡眠质量', name: '睡眠评估', icon: 'sleep', color: '#2E8B57', status: 'review', score: 9, maxScore: 21, scoreColor: '#E67E22', date: '03-15' },
  { id: 'as-4', memberName: '王芳', scaleName: 'PSQI 睡眠质量', name: '睡眠评估', icon: 'sleep', color: '#2E8B57', status: 'completed', score: 14, maxScore: 21, scoreColor: '#E53935', date: '03-18' },
  { id: 'as-5', memberName: '陈建国', scaleName: '压力感知量表 PSS-10', name: '压力评估', icon: 'stress', color: '#E67E22', status: 'pending', score: null, maxScore: 40, scoreColor: '', date: '待安排' },
  { id: 'as-6', memberName: '吴大伟', scaleName: 'PHQ-9 抑郁量表', name: '抑郁筛查', icon: 'depression', color: '#1E3A5F', status: 'pending', score: null, maxScore: 27, scoreColor: '', date: '待安排' },
  { id: 'as-7', memberName: '赵晓雯', scaleName: 'GAD-7 焦虑量表', name: '焦虑复评', icon: 'anxiety', color: '#8E44AD', status: 'review', score: 12, maxScore: 21, scoreColor: '#E53935', date: '03-20' },
  { id: 'as-8', memberName: '刘静', scaleName: '压力感知量表 PSS-10', name: '压力评估', icon: 'stress', color: '#E67E22', status: 'completed', score: 18, maxScore: 40, scoreColor: '#E67E22', date: '03-16' },
]

const filteredScales = computed(() => activeFilter.value === 'all' ? scales : scales.filter(s => s.status === activeFilter.value))
</script>

<style scoped>
.mental-assessments { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.filter-row { display: flex; gap: 8px; margin-bottom: 12px; overflow-x: auto; align-items: center; }
.filter-row::-webkit-scrollbar { display: none; }
.filter-tag { font-size: 12px; padding: 6px 14px; border-radius: 14px; background: #fff; color: #666; white-space: nowrap; cursor: pointer; }
.filter-tag.active { background: #8E44AD; color: #fff; }
.add-btn { font-size: 12px; padding: 6px 14px; border-radius: 14px; background: rgba(142,68,173,0.1); color: #8E44AD; font-weight: 600; white-space: nowrap; cursor: pointer; margin-left: auto; }
.scale-list { display: flex; flex-direction: column; gap: 8px; }
.scale-card { display: flex; gap: 12px; background: #fff; border-radius: 12px; padding: 14px; cursor: pointer; }
.scale-card:active { transform: scale(0.98); }
.scale-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.scale-icon svg { width: 20px; height: 20px; }
.scale-info { flex: 1; min-width: 0; }
.scale-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; }
.scale-name { font-size: 14px; font-weight: 600; color: #333; }
.scale-status { font-size: 10px; padding: 2px 8px; border-radius: 8px; }
.scale-status.completed { background: rgba(46,139,87,0.1); color: #2E8B57; }
.scale-status.pending { background: rgba(201,169,98,0.1); color: #C9A962; }
.scale-status.review { background: rgba(142,68,173,0.1); color: #8E44AD; }
.scale-member { font-size: 12px; color: #999; margin: 0 0 4px; }
.scale-bottom { display: flex; justify-content: space-between; align-items: center; }
.scale-score { font-size: 12px; color: #666; }
.scale-score b { font-size: 14px; }
.scale-date { font-size: 11px; color: #bbb; }
.modal-mask { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
.modal-body { background: #fff; border-radius: 16px 16px 0 0; padding: 20px 16px; width: 100%; max-width: 500px; max-height: 85vh; overflow-y: auto; }
.modal-title { font-size: 16px; font-weight: 700; color: #1E3A5F; margin: 0 0 16px; text-align: center; }
.form-label { font-size: 13px; font-weight: 600; color: #333; display: block; margin: 12px 0 6px; }
.form-select { width: 100%; border: 1px solid #e8e8e8; border-radius: 8px; padding: 10px 12px; font-size: 14px; color: #333; background: #f8f9fb; outline: none; appearance: none; -webkit-appearance: none; }
.form-select:focus { border-color: #8E44AD; }
.check-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.check-item { display: flex; align-items: center; gap: 8px; padding: 10px; border: 1px solid #e8e8e8; border-radius: 10px; cursor: pointer; }
.check-item.checked { border-color: #8E44AD; background: rgba(142,68,173,0.05); }
.check-icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.check-icon svg { width: 18px; height: 18px; }
.check-name { font-size: 12px; color: #333; font-weight: 500; }
.form-textarea { width: 100%; border: 1px solid #e8e8e8; border-radius: 8px; padding: 10px 12px; font-size: 13px; color: #333; background: #f8f9fb; outline: none; resize: none; font-family: inherit; box-sizing: border-box; }
.form-textarea:focus { border-color: #8E44AD; }
.radio-row { display: flex; gap: 8px; }
.radio-tag { font-size: 12px; padding: 6px 16px; border-radius: 14px; background: #f5f5f5; color: #666; cursor: pointer; }
.radio-tag.active { background: #8E44AD; color: #fff; }
.modal-actions { display: flex; gap: 10px; margin-top: 16px; }
.modal-btn { flex: 1; padding: 12px; border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.modal-btn.cancel { background: #f5f5f5; color: #666; }
.modal-btn.confirm { background: #8E44AD; color: #fff; }
.toast { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(142,68,173,0.9); color: #fff; padding: 10px 24px; border-radius: 8px; font-size: 14px; z-index: 200; }
</style>
