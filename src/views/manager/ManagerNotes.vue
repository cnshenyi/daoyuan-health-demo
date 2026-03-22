<template>
  <div class="notes-page">
    <PageNavBar title="病程记录" />
    <!-- 新建记录入口 -->
    <div class="new-note-bar">
      <span class="new-note-label">{{ memberName }} 的病程记录</span>
      <button class="new-note-btn" @click="showForm = true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        新建
      </button>
    </div>

    <!-- 新建表单 -->
    <div v-if="showForm" class="note-form">
      <h3 class="form-title">新建病程记录</h3>
      <div class="form-item">
        <label>记录类型</label>
        <div class="type-tabs">
          <span v-for="t in noteTypes" :key="t.key" :class="['type-tab', { active: newNote.type === t.key }]" @click="newNote.type = t.key">{{ t.label }}</span>
        </div>
      </div>
      <div class="form-item">
        <label>标题</label>
        <input v-model="newNote.title" placeholder="请输入标题" class="form-input" />
      </div>
      <div class="form-item">
        <label>内容</label>
        <textarea v-model="newNote.content" placeholder="请输入病程记录内容" class="form-textarea" rows="4"></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-cancel" @click="showForm = false">取消</button>
        <button class="btn-submit" @click="submitNote">保存记录</button>
      </div>
    </div>

    <!-- 记录列表 -->
    <div class="notes-list">
      <div v-for="note in notes" :key="note.id" class="note-card">
        <div class="note-header">
          <span :class="['note-type', note.type]">{{ typeLabel[note.type] }}</span>
          <span class="note-date">{{ note.date }}</span>
        </div>
        <h4 class="note-title">{{ note.title }}</h4>
        <p class="note-content">{{ note.content }}</p>
        <div class="note-footer">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <span>{{ note.doctor }} · {{ note.doctorRole }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mockProgressNotes, mockMemberProfiles } from '@/mock/data'
import PageNavBar from '@/components/PageNavBar.vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const memberId = (route.params.id as string) || (route.query.member as string) || '1'
const memberName = computed(() => mockMemberProfiles.find(m => m.id === memberId)?.name || '会员')

const showForm = ref(false)
const notes = ref([...mockProgressNotes])

const newNote = ref({ type: 'daily', title: '', content: '' })

const noteTypes = [
  { key: 'daily', label: '日常记录' },
  { key: 'consultation', label: '咨询记录' },
  { key: 'medication-change', label: '用药调整' },
  { key: 'treatment-plan', label: '治疗方案' },
]

const typeLabel: Record<string, string> = {
  daily: '日常',
  consultation: '咨询',
  'medication-change': '用药',
  'treatment-plan': '方案',
}

const submitNote = () => {
  if (!newNote.value.title || !newNote.value.content) {
    ElMessage.warning('请填写标题和内容')
    return
  }
  notes.value.unshift({
    id: 'new-' + Date.now(),
    date: new Date().toISOString().slice(0, 10),
    type: newNote.value.type as any,
    title: newNote.value.title,
    content: newNote.value.content,
    doctor: '林雅婷',
    doctorRole: '健康管家',
  })
  newNote.value = { type: 'daily', title: '', content: '' }
  showForm.value = false
  ElMessage.success('记录已保存')
}
</script>

<style scoped>
.notes-page { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.new-note-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #f0f0f0; }
.new-note-label { font-size: 14px; color: #666; }
.new-note-btn { display: flex; align-items: center; gap: 4px; padding: 6px 14px; background: #2E8B57; border: none; border-radius: 8px; color: #fff; font-size: 13px; font-weight: 500; cursor: pointer; }
.new-note-btn svg { width: 16px; height: 16px; }
.note-form { margin: 12px 16px; background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
.form-title { font-size: 15px; font-weight: 600; color: #1E3A5F; margin: 0 0 14px; }
.form-item { margin-bottom: 12px; }
.form-item label { display: block; font-size: 12px; color: #888; margin-bottom: 6px; font-weight: 500; }
.type-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.type-tab { font-size: 12px; padding: 4px 12px; border-radius: 6px; border: 1px solid #e0e0e0; color: #666; cursor: pointer; transition: all 0.2s; }
.type-tab.active { background: #2E8B57; color: #fff; border-color: #2E8B57; }
.form-input { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; color: #333; outline: none; }
.form-input:focus { border-color: #2E8B57; }
.form-textarea { width: 100%; box-sizing: border-box; padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 14px; color: #333; outline: none; resize: none; line-height: 1.6; }
.form-textarea:focus { border-color: #2E8B57; }
.form-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 14px; }
.btn-cancel { padding: 8px 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff; color: #666; font-size: 14px; cursor: pointer; }
.btn-submit { padding: 8px 20px; border: none; border-radius: 8px; background: #2E8B57; color: #fff; font-size: 14px; font-weight: 500; cursor: pointer; }
.notes-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; }
.note-card { background: #fff; border-radius: 10px; padding: 14px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
.note-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.note-type { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 600; }
.note-type.daily { background: rgba(46,139,87,0.1); color: #2E8B57; }
.note-type.consultation { background: rgba(30,58,95,0.1); color: #1E3A5F; }
.note-type.medication-change { background: rgba(230,126,34,0.1); color: #E67E22; }
.note-type.treatment-plan { background: rgba(142,68,173,0.1); color: #8E44AD; }
.note-date { font-size: 11px; color: #bbb; }
.note-title { font-size: 14px; font-weight: 600; color: #333; margin: 0 0 6px; }
.note-content { font-size: 13px; color: #666; margin: 0 0 10px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.note-footer { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #aaa; }
.note-footer svg { width: 14px; height: 14px; }
</style>
