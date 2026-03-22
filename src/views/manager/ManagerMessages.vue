<template>
  <div class="manager-messages">
    <div class="msg-list">
      <div v-for="conv in conversations" :key="conv.id" class="conv-card" @click="goConv(conv.id)">
        <div class="conv-avatar" :class="conv.type">{{ conv.name.slice(-1) }}</div>
        <div class="conv-info">
          <div class="conv-header">
            <span class="conv-name">{{ conv.name }}</span>
            <span class="conv-time">{{ conv.time }}</span>
          </div>
          <p class="conv-last">{{ conv.lastMsg }}</p>
        </div>
        <span v-if="conv.unread" class="unread-badge">{{ conv.unread }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const conversations = [
  { id: 1, name: '沈轶', type: 'member', lastMsg: '好的，我今天的血糖数据已记录', time: '10:23', unread: 0 },
  { id: 2, name: '陈建国', type: 'urgent', lastMsg: '最近血压有点偏高，需要关注', time: '09:45', unread: 2 },
  { id: 3, name: '李志远', type: 'urgent', lastMsg: '请问这周可以安排复诊吗？', time: '昨天', unread: 1 },
  { id: 4, name: '李明华医生', type: 'doctor', lastMsg: '沈轶的血糖方案已更新，请转达', time: '昨天', unread: 0 },
  { id: 5, name: '张慧敏', type: 'member', lastMsg: '体检报告已经收到了，谢谢', time: '周一', unread: 0 },
  { id: 6, name: '王志强医生', type: 'doctor', lastMsg: '李志远需要调整用药剂量', time: '周一', unread: 0 },
  { id: 7, name: '周明', type: 'urgent', lastMsg: '最近心跳有点不规律', time: '上周', unread: 0 },
  { id: 8, name: '吴大伟', type: 'member', lastMsg: '运动计划我已经开始执行了', time: '上周', unread: 0 },
]

const goConv = (id: number) => router.push('/manager/messages/' + id)
</script>

<style scoped>
.manager-messages { background: #f5f7fa; min-height: 100vh; padding-bottom: 80px; }
.msg-list { padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
.conv-card { display: flex; align-items: center; gap: 12px; background: #fff; border-radius: 10px; padding: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); cursor: pointer; position: relative; }
.conv-avatar { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 600; color: #fff; flex-shrink: 0; }
.conv-avatar.member { background: linear-gradient(135deg, #1E3A5F, #2a4a6f); }
.conv-avatar.urgent { background: linear-gradient(135deg, #E53935, #EF5350); }
.conv-avatar.doctor { background: linear-gradient(135deg, #2E8B57, #3DA06A); }
.conv-info { flex: 1; min-width: 0; }
.conv-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.conv-name { font-size: 15px; font-weight: 600; color: #333; }
.conv-time { font-size: 11px; color: #bbb; }
.conv-last { font-size: 13px; color: #999; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.unread-badge { width: 20px; height: 20px; border-radius: 50%; background: #E53935; color: #fff; font-size: 11px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
</style>
