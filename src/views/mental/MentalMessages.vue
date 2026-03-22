<template>
  <div class="mental-messages">
    <div class="conv-list">
      <div v-for="c in conversations" :key="c.id" class="conv-card" @click="router.push('/mental/messages/' + c.id)">
        <div class="conv-avatar">{{ c.name.slice(0, 1) }}</div>
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
import { useRouter } from 'vue-router'
const router = useRouter()
const conversations = [
  { id: 1, name: '赵晓雯', lastMsg: '周老师，今天冥想练习完成了', time: '11:20', unread: 1 },
  { id: 2, name: '沈轶', lastMsg: '最近睡眠有改善，谢谢建议', time: '09:45', unread: 0 },
  { id: 3, name: '王芳', lastMsg: '失眠又严重了，能加一次咨询吗', time: '昨天', unread: 2 },
  { id: 4, name: '林雅婷（管家）', lastMsg: '吴大伟的情绪评估需要安排', time: '昨天', unread: 1 },
  { id: 5, name: '吴大伟', lastMsg: '教育课程的资料收到了', time: '周五', unread: 0 },
  { id: 6, name: '刘静', lastMsg: '放松训练的音频能再发一次吗', time: '周四', unread: 0 },
  { id: 7, name: '李明华医生', lastMsg: '赵晓雯的焦虑评估结果如何？', time: '周三', unread: 0 },
]
</script>

<style scoped>
.mental-messages { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.conv-list { display: flex; flex-direction: column; gap: 6px; }
.conv-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 12px; padding: 12px; cursor: pointer; }
.conv-card:active { transform: scale(0.98); }
.conv-avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg,#8E44AD,#A569BD); color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.conv-info { flex: 1; min-width: 0; }
.conv-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; }
.conv-name { font-size: 14px; font-weight: 600; color: #333; }
.conv-time { font-size: 11px; color: #bbb; }
.conv-msg { font-size: 12px; color: #999; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.conv-badge { background: #E53935; color: #fff; font-size: 10px; min-width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center; justify-content: center; padding: 0 5px; flex-shrink: 0; }
</style>
