<template>
  <div class="message-detail">
    <PageNavBar :title="conv.name" />

    <!-- 聊天记录 -->
    <div class="chat-body" ref="chatBody">
      <div v-for="msg in messages" :key="msg.id" :class="['msg-row', msg.from === 'me' ? 'mine' : 'theirs']">
        <div v-if="msg.from !== 'me'" class="msg-avatar">{{ conv.name.slice(-1) }}</div>
        <div class="msg-bubble" :class="msg.from === 'me' ? 'bubble-me' : 'bubble-other'">
          <p class="msg-text">{{ msg.text }}</p>
          <span class="msg-time">{{ msg.time }}</span>
        </div>
      </div>
    </div>

    <!-- 输入区 -->
    <div class="chat-input-bar">
      <div class="template-row">
        <span v-for="t in quickReplies" :key="t" class="quick-tag" @click="inputText = t">{{ t }}</span>
      </div>
      <div class="input-row">
        <input v-model="inputText" class="chat-input" placeholder="输入消息..." @keyup.enter="sendMsg" />
        <button class="send-btn" @click="sendMsg">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PageNavBar from '@/components/PageNavBar.vue'

const route = useRoute()
const convId = Number(route.params.convId)

const conversations = [
  { id: 1, name: '沈轶', type: 'member' },
  { id: 2, name: '陈建国', type: 'urgent' },
  { id: 3, name: '李志远', type: 'urgent' },
  { id: 4, name: '李明华医生', type: 'doctor' },
  { id: 5, name: '张慧敏', type: 'member' },
  { id: 6, name: '王志强医生', type: 'doctor' },
  { id: 7, name: '周明', type: 'urgent' },
  { id: 8, name: '吴大伟', type: 'member' },
]
const conv = conversations.find(c => c.id === convId) || conversations[0]

const messages = ref([
  { id: 1, from: 'other', text: '林管家您好，我最近血压有点偏高，需要注意什么？', time: '09:30' },
  { id: 2, from: 'me', text: '您好！血压偏高需要注意以下几点：1）减少盐分摄入 2）保持规律作息 3）避免情绪激动。建议您记录每天的血压数值，我会定期查看。', time: '09:35' },
  { id: 3, from: 'other', text: '好的，我会注意的。需要复诊吗？', time: '09:40' },
  { id: 4, from: 'me', text: '建议您本周内安排一次复诊，我来帮您预约李明华医生。', time: '09:42' },
  { id: 5, from: 'other', text: '好的，麻烦您了', time: '09:43' },
])

const inputText = ref('')
const chatBody = ref<HTMLElement | null>(null)

const quickReplies = ['好的，安排', '请按时服药', '已为您预约', '请记录数据']

const sendMsg = () => {
  if (!inputText.value.trim()) return
  messages.value.push({
    id: Date.now(),
    from: 'me',
    text: inputText.value.trim(),
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  })
  inputText.value = ''
  nextTick(() => chatBody.value?.scrollTo({ top: chatBody.value.scrollHeight, behavior: 'smooth' }))
}

onMounted(() => nextTick(() => chatBody.value?.scrollTo({ top: chatBody.value.scrollHeight })))
</script>

<style scoped>
.message-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: calc(100vh - 56px - 60px);
  background: #f0f2f5;
  overflow: hidden;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  -webkit-overflow-scrolling: touch;
}

.msg-row { display: flex; align-items: flex-end; gap: 8px; }
.msg-row.mine { flex-direction: row-reverse; }

.msg-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1E3A5F, #2a4a6f);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.msg-bubble { max-width: 75%; display: flex; flex-direction: column; gap: 2px; }
.bubble-other .msg-text { background: #fff; color: #333; border-radius: 4px 12px 12px 12px; }
.bubble-me .msg-text { background: #2E8B57; color: #fff; border-radius: 12px 4px 12px 12px; }
.msg-text { font-size: 14px; padding: 8px 12px; margin: 0; line-height: 1.5; word-break: break-word; }
.msg-time { font-size: 10px; color: #aaa; }
.bubble-me .msg-time { text-align: right; }

.chat-input-bar {
  background: #fff;
  border-top: 1px solid #e8e8e8;
  padding: 8px 12px;
  padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px));
  flex-shrink: 0;
}

.template-row {
  display: flex;
  overflow-x: auto;
  gap: 6px;
  margin-bottom: 8px;
  -webkit-overflow-scrolling: touch;
}

.template-row::-webkit-scrollbar { display: none; }

.quick-tag {
  white-space: nowrap;
  font-size: 12px;
  padding: 4px 10px;
  background: rgba(46,139,87,0.08);
  color: #2E8B57;
  border-radius: 12px;
  cursor: pointer;
  flex-shrink: 0;
}

.input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chat-input {
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 8px 14px;
  font-size: 14px;
  outline: none;
  background: #f5f7fa;
}

.chat-input:focus { border-color: #2E8B57; background: #fff; }

.send-btn {
  width: 56px;
  height: 36px;
  background: #2E8B57;
  color: #fff;
  border: none;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
