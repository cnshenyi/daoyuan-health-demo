<template>
  <div class="manager-tasks">
    <div class="tasks-header">
      <div class="date-tabs">
        <span :class="['date-tab', { active: activeDay === 'today' }]" @click="activeDay = 'today'">今日</span>
        <span :class="['date-tab', { active: activeDay === 'week' }]" @click="activeDay = 'week'">本周</span>
      </div>
      <span class="tasks-count">{{ pendingCount }} 项待完成</span>
    </div>

    <div class="tasks-list">
      <div v-for="task in currentTasks" :key="task.id" class="task-card" :class="{ done: task.done }">
        <div class="task-check" @click="toggleTask(task.id)">
          <svg v-if="task.done" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
        </div>
        <div class="task-info">
          <p class="task-text">{{ task.text }}</p>
          <p class="task-meta">
            <span :class="['priority-dot', task.priority]"></span>
            {{ task.member }} · {{ task.time }}
          </p>
        </div>
        <span :class="['priority-tag', task.priority]">{{ priorityLabel[task.priority] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeDay = ref('today')

const allTasks = ref([
  { id: 1, text: '陈建国 - 血压数据跟进', member: '陈建国', time: '10:00', priority: 'urgent', done: false, day: 'today' },
  { id: 2, text: '李志远 - 本周病程记录录入', member: '李志远', time: '14:00', priority: 'urgent', done: false, day: 'today' },
  { id: 3, text: '沈轶 - 血糖数据周报发送', member: '沈轶', time: '16:00', priority: 'attention', done: false, day: 'today' },
  { id: 4, text: '张慧敏 - 体检报告回访', member: '张慧敏', time: '09:00', priority: 'stable', done: true, day: 'today' },
  { id: 5, text: '周明 - 心律监测数据审核', member: '周明', time: '11:00', priority: 'urgent', done: false, day: 'week' },
  { id: 6, text: '吴大伟 - 营养方案更新', member: '吴大伟', time: '周二', priority: 'attention', done: false, day: 'week' },
  { id: 7, text: '刘静 - 运动计划执行回访', member: '刘静', time: '周三', priority: 'attention', done: false, day: 'week' },
  { id: 8, text: '王芳 - 颈椎康复进度跟进', member: '王芳', time: '周四', priority: 'stable', done: false, day: 'week' },
  { id: 9, text: '赵晓雯 - 心理辅导预约确认', member: '赵晓雯', time: '周五', priority: 'stable', done: false, day: 'week' },
])

const currentTasks = computed(() => allTasks.value.filter(t => t.day === activeDay.value))
const pendingCount = computed(() => currentTasks.value.filter(t => !t.done).length)

const priorityLabel: Record<string, string> = { urgent: '紧急', attention: '关注', stable: '正常' }

const toggleTask = (id: number) => {
  const task = allTasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}
</script>

<style scoped>
.manager-tasks { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.tasks-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #f0f0f0; }
.date-tabs { display: flex; gap: 4px; background: #f5f7fa; border-radius: 8px; padding: 3px; }
.date-tab { padding: 5px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; color: #999; cursor: pointer; transition: all 0.2s; }
.date-tab.active { background: #fff; color: #2E8B57; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
.tasks-count { font-size: 12px; color: #999; }
.tasks-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
.task-card { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 10px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); transition: opacity 0.2s; }
.task-card.done { opacity: 0.5; }
.task-check { width: 24px; height: 24px; flex-shrink: 0; cursor: pointer; color: #2E8B57; }
.task-check svg { width: 24px; height: 24px; }
.task-info { flex: 1; min-width: 0; }
.task-text { font-size: 14px; font-weight: 500; color: #333; margin: 0 0 4px; }
.task-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #aaa; margin: 0; }
.priority-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.priority-dot.urgent { background: #E53935; }
.priority-dot.attention { background: #E67E22; }
.priority-dot.stable { background: #2E8B57; }
.priority-tag { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; flex-shrink: 0; }
.priority-tag.urgent { background: rgba(229,57,53,0.1); color: #E53935; }
.priority-tag.attention { background: rgba(230,126,34,0.1); color: #E67E22; }
.priority-tag.stable { background: rgba(46,139,87,0.1); color: #2E8B57; }
</style>
