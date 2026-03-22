<template>
  <div class="wellness-messages">
    <div class="conv-list">
      <div v-for="c in conversations" :key="c.id" class="conv-card" @click="router.push('/wellness/messages/' + c.id)">
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
  { id: 1, name: '沈轶', lastMsg: '陈老师，今天的饮食记录已上传', time: '10:30', unread: 1 },
  { id: 2, name: '吴大伟', lastMsg: '这周运动完成了4次', time: '09:00', unread: 0 },
  { id: 3, name: '林雅婷（管家）', lastMsg: '陈建国的尿酸数据有更新', time: '昨天', unread: 2 },
  { id: 4, name: '赵晓雯', lastMsg: '瑜伽课后感觉好多了', time: '昨天', unread: 0 },
  { id: 5, name: '王芳', lastMsg: '颈椎操做完感觉酸痛正常吗？', time: '周五', unread: 1 },
  { id: 6, name: '张慧敏', lastMsg: '补铁食谱收到了，谢谢', time: '周四', unread: 0 },
  { id: 7, name: '李明华医生', lastMsg: '沈轶的运动方案需要调整吗？', time: '周三', unread: 0 },
]
</script>

<style scoped>
.wellness-messages { background: #f5f7fa; min-height: 100vh; padding: 12px 16px 80px; }
.conv-list { display: flex; flex-direction: column; gap: 6px; }
.conv-card { display: flex; align-items: center; gap: 10px; background: #fff; border-radius: 12px; padding: 12px; cursor: pointer; }
.conv-card:active { transform: scale(0.98); }
.conv-avatar { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg,#E67E22,#F39C12); color: #fff; font-size: 15px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.conv-info { flex: 1; min-width: 0; }
.conv-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; }
.conv-name { font-size: 14px; font-weight: 600; color: #333; }
.conv-time { font-size: 11px; color: #bbb; }
.conv-msg { font-size: 12px; color: #999; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.conv-badge { background: #E53935; color: #fff; font-size: 10px; min-width: 18px; height: 18px; border-radius: 9px; display: flex; align-items: center; justify-content: center; padding: 0 5px; flex-shrink: 0; }
</style>
