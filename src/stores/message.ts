import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Message {
  id: string
  type: 'system' | 'health' | 'emergency' | 'drug' | 'appointment' | 'report'
  title: string
  content: string
  summary?: string
  time: string
  read: boolean
  important: boolean
  data?: {
    hospital?: string
    doctor?: string
    department?: string
    drugName?: string
    indication?: string
    phase?: string
    source?: string
    appointmentTime?: string
    reportType?: string
    tags?: string[]
  }
}

export const useMessageStore = defineStore('message', () => {
  const messages = ref<Message[]>([
    // 重症急症转诊信息
    {
      id: '1',
      type: 'emergency',
      title: '【绿色通道】北京协和医院心内科专家号',
      content: '根据您近期的健康数据分析，我们已为您预留北京协和医院心内科张伟教授的专家号。张教授是国内心血管领域权威专家，擅长冠心病、心律失常等疾病的诊治。如需预约，请点击查看详情。',
      summary: '已为您预留协和医院心内科专家号',
      time: '2026-01-28 10:30',
      read: false,
      important: true,
      data: {
        hospital: '北京协和医院',
        doctor: '张伟教授',
        department: '心内科',
        tags: ['绿色通道', '专家号', '优先预约']
      }
    },
    {
      id: '2',
      type: 'emergency',
      title: '【转诊建议】上海瑞金医院内分泌科',
      content: '基于您的血糖监测数据，建议进行更深入的内分泌系统检查。上海瑞金医院内分泌科是国家重点学科，我们可以为您安排绿色通道就诊。',
      summary: '建议前往瑞金医院进行内分泌检查',
      time: '2025-12-30 14:20',
      read: false,
      important: true,
      data: {
        hospital: '上海瑞金医院',
        department: '内分泌科',
        tags: ['转诊建议', '重点学科']
      }
    },
    // 国际前沿新药推荐
    {
      id: '3',
      type: 'drug',
      title: '【新药资讯】司美格鲁肽口服制剂获批',
      content: '美国FDA近日批准了诺和诺德公司的司美格鲁肽口服制剂（Rybelsus）用于2型糖尿病治疗。这是首个获批的口服GLP-1受体激动剂，为不愿注射的患者提供了新选择。该药物在临床试验中显示出良好的降糖效果和心血管保护作用。',
      summary: '首个口服GLP-1受体激动剂获FDA批准',
      time: '2025-12-29 09:00',
      read: false,
      important: true,
      data: {
        drugName: '司美格鲁肽口服制剂（Rybelsus）',
        indication: '2型糖尿病',
        phase: '已上市',
        source: 'FDA官网',
        tags: ['新药上市', 'GLP-1', '口服制剂']
      }
    },
    {
      id: '4',
      type: 'drug',
      title: '【临床试验】新型SGLT2抑制剂招募中',
      content: '一项针对糖尿病肾病的新型SGLT2抑制剂III期临床试验正在招募患者。该药物在早期试验中显示出优于现有药物的肾脏保护作用。如您有兴趣参与，我们可以协助您了解详情并评估是否符合入组条件。',
      summary: '新型SGLT2抑制剂临床试验招募中',
      time: '2025-12-28 16:45',
      read: true,
      important: false,
      data: {
        drugName: '新型SGLT2抑制剂',
        indication: '糖尿病肾病',
        phase: 'III期临床',
        tags: ['临床试验', '招募中', '肾脏保护']
      }
    },
    {
      id: '5',
      type: 'drug',
      title: '【海外新药】日本批准新型降压药',
      content: '日本厚生劳动省批准了一款新型血管紧张素受体-脑啡肽酶抑制剂（ARNI），用于治疗高血压。该药物通过双重机制降压，同时具有心脏保护作用。目前该药物尚未在国内上市，如有需要可通过我们的海外医疗服务获取。',
      summary: '新型ARNI降压药在日本获批',
      time: '2025-12-27 11:30',
      read: true,
      important: false,
      data: {
        drugName: '新型ARNI降压药',
        indication: '高血压',
        phase: '日本已上市',
        source: '日本厚生劳动省',
        tags: ['海外新药', '降压', '心脏保护']
      }
    },
    // 系统通知
    {
      id: '6',
      type: 'appointment',
      title: '预约提醒：明日体检',
      content: '您预约的年度健康体检将于明日上午8:00在道远医疗健康管理中心进行。请空腹前往，携带身份证件。',
      summary: '明日8:00体检，请空腹',
      time: '2026-01-28 08:00',
      read: false,
      important: true,
      data: {
        appointmentTime: '2026-02-02 08:00',
        tags: ['体检', '空腹']
      }
    },
    {
      id: '7',
      type: 'report',
      title: '体检报告已出',
      content: '您1月15日的体检报告已生成，请点击查看详细解读。整体健康状况良好，部分指标需要关注。',
      summary: '1月体检报告已生成',
      time: '2025-12-20 15:30',
      read: true,
      important: false,
      data: {
        reportType: '年度体检',
        tags: ['报告', '已出']
      }
    },
    {
      id: '8',
      type: 'health',
      title: '健康提醒：血糖波动提示',
      content: '根据您近一周的血糖监测数据，餐后血糖波动较大。建议调整饮食结构，减少高GI食物摄入，并增加餐后适量运动。',
      summary: '近期餐后血糖波动较大',
      time: '2025-12-25 09:15',
      read: true,
      important: false,
      data: {
        tags: ['血糖', '饮食建议']
      }
    },
    {
      id: '9',
      type: 'system',
      title: '服务升级通知',
      content: '尊敬的会员，您的健康管理服务已升级至至尊版，新增国际远程会诊、海外就医协调等专属权益。',
      summary: '服务已升级至至尊版',
      time: '2025-12-15 10:00',
      read: true,
      important: false,
      data: {
        tags: ['服务升级', '至尊会员']
      }
    },
    {
      id: '10',
      type: 'emergency',
      title: '【专家会诊】多学科联合会诊安排',
      content: '根据您的健康档案，我们已为您安排了一次多学科联合会诊（MDT），由心内科、内分泌科、营养科专家共同参与，为您制定个性化健康管理方案。',
      summary: '已安排多学科联合会诊',
      time: '2025-12-22 14:00',
      read: true,
      important: true,
      data: {
        tags: ['MDT', '联合会诊', '个性化方案']
      }
    }
  ])

  const unreadCount = computed(() => messages.value.filter(m => !m.read).length)

  const importantMessages = computed(() => messages.value.filter(m => m.important))

  const markAsRead = (id: string) => {
    const message = messages.value.find(m => m.id === id)
    if (message) {
      message.read = true
    }
  }

  const markAllAsRead = () => {
    messages.value.forEach(m => m.read = true)
  }

  const getMessagesByType = (type: Message['type']) => {
    return messages.value.filter(m => m.type === type)
  }

  return {
    messages,
    unreadCount,
    importantMessages,
    markAsRead,
    markAllAsRead,
    getMessagesByType
  }
})
