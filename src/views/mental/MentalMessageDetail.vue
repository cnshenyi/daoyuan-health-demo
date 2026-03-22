<template>
  <div class="message-detail">
    <PageNavBar :title="conv.name" />
    <div class="chat-body" ref="chatBody">
      <div v-for="msg in messages" :key="msg.id" :class="['msg-row', msg.from === 'me' ? 'mine' : 'theirs']">
        <div v-if="msg.from !== 'me'" class="msg-avatar">{{ conv.name.slice(-1) }}</div>
        <div class="msg-bubble" :class="msg.from === 'me' ? 'bubble-me' : 'bubble-other'">
          <p class="msg-text">{{ msg.text }}</p>
          <span class="msg-time">{{ msg.time }}</span>
        </div>
      </div>
    </div>
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
  { id: 1, name: '赵晓雯' }, { id: 2, name: '沈轶' }, { id: 3, name: '王芳' },
  { id: 4, name: '林雅婷（管家）' }, { id: 5, name: '吴大伟' }, { id: 6, name: '刘静' }, { id: 7, name: '李明华医生' },
]
const conv = conversations.find(c => c.id === convId) || conversations[0]

const messages = ref([
  { id: 1, from: 'other', text: '周老师，今天的正念冥想练习完成了，感觉比昨天放松一些', time: '10:30' },
  { id: 2, from: 'me', text: '很好！能感受到放松说明练习有效果。今天试着把练习时间延长到15分钟，注意关注呼吸的节奏。', time: '10:45' },
  { id: 3, from: 'other', text: '好的，不过昨晚又失眠了，翻来覆去到凌晨2点', time: '10:50' },
  { id: 4, from: 'me', text: '睡前可以做5分钟渐进式肌肉放松，从脚趾开始逐步放松到头部。另外睡前1小时不要看手机。', time: '10:55' },
  { id: 5, from: 'other', text: '明白了，我今晚试试，谢谢周老师', time: '10:56' },
])

const inputText = ref('')
const chatBody = ref<HTMLElement | null>(null)
const quickReplies = ['练习完成，很好', '建议增加冥想时间', '下次咨询已安排', '放松训练音频已发送']

const sendMsg = () => {
  if (!inputText.value.trim()) return
  messages.value.push({ id: Date.now(), from: 'me', text: inputText.value.trim(), time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) })
  inputText.value = ''
  nextTick(() => chatBody.value?.scrollTo({ top: chatBody.value.scrollHeight, behavior: 'smooth' }))
}
onMounted(() => nextTick(() => chatBody.value?.scrollTo({ top: chatBody.value.scrollHeight })))
</script>

<style scoped>
.message-detail { display: flex; flex-direction: column; height: 100%; max-height: calc(100vh - 56px - 60px); background: #f0f2f5; overflow: hidden; }
.chat-body { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 10px; -webkit-overflow-scrolling: touch; }
.msg-row { display: flex; align-items: flex-end; gap: 8px; }
.msg-row.mine { flex-direction: row-reverse; }
.msg-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#8E44AD,#A569BD); color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.msg-bubble { max-width: 75%; display: flex; flex-direction: column; gap: 2px; }
.bubble-other .msg-text { background: #fff; color: #333; border-radius: 4px 12px 12px 12px; }
.bubble-me .msg-text { background: #8E44AD; color: #fff; border-radius: 12px 4px 12px 12px; }
.msg-text { font-size: 14px; padding: 8px 12px; margin: 0; line-height: 1.5; word-break: break-word; }
.msg-time { font-size: 10px; color: #aaa; }
.bubble-me .msg-time { text-align: right; }
.chat-input-bar { background: #fff; border-top: 1px solid #e8e8e8; padding: 8px 12px; padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px)); flex-shrink: 0; }
.template-row { display: flex; overflow-x: auto; gap: 6px; margin-bottom: 8px; -webkit-overflow-scrolling: touch; }
.template-row::-webkit-scrollbar { display: none; }
.quick-tag { white-space: nowrap; font-size: 12px; padding: 4px 10px; background: rgba(142,68,173,0.08); color: #8E44AD; border-radius: 12px; cursor: pointer; flex-shrink: 0; }
.input-row { display: flex; gap: 8px; align-items: center; }
.chat-input { flex: 1; border: 1px solid #e0e0e0; border-radius: 20px; padding: 8px 14px; font-size: 14px; outline: none; background: #f5f7fa; }
.chat-input:focus { border-color: #8E44AD; background: #fff; }
.send-btn { width: 56px; height: 36px; background: #8E44AD; color: #fff; border: none; border-radius: 18px; font-size: 13px; font-weight: 600; cursor: pointer; flex-shrink: 0; }
</style>
