import type {
  User,
  MemberInfo,
  MedicalHistory,
  MedicalTest,
  GlucoseReading,
  ProgressNote,
  TeamMember,
  ConsultationRecord,
  ServiceProject,
  HealthTrackingItem
} from '@/types'

// 当前用户
export const mockUser: User = {
  id: '1',
  username: 'shenyi',
  name: '沈轶',
  email: 'shenyi@example.com',
  phone: '+86 138 0000 0000',
  membershipType: 'premium',
  membershipStartDate: '2025-12-01',
  avatar: '/avatar-shenyi.jpg'
}

// 会员信息
export const mockMemberInfo: MemberInfo = {
  id: '1',
  name: '沈轶',
  age: 45,
  gender: 'male',
  occupation: '企业高管',
  maritalStatus: '已婚',
  membershipType: 'premium',
  membershipFee: 1700000,
  joinDate: '2025-12-01'
}

// 病史信息
export const mockMedicalHistory: MedicalHistory = {
  occupation: '企业高管',
  maritalStatus: '已婚',
  familyHistory: ['父亲：高血压', '母亲：糖尿病', '祖父：心脏病'],
  allergies: ['青霉素', '海鲜'],
  smokingHistory: '已戒烟5年，之前吸烟20年',
  drinkingHistory: '偶尔饮酒，每周1-2次',
  medicationHistory: ['二甲双胍（降糖药）', '阿托伐他汀（降脂药）', '氨氯地平（降压药）'],
  traumaHistory: ['2015年：车祸导致右腿骨折'],
  surgeryHistory: ['2016年：阑尾切除术', '2020年：胆囊切除术'],
  pastIllnesses: ['2型糖尿病（2018年确诊）', '高血压（2019年确诊）', '高血脂（2019年确诊）'],
  vaccinations: ['新冠疫苗（3针）', '流感疫苗（每年）', '肺炎疫苗（2023年）']
}

// 医疗检查结果
export const mockMedicalTests: MedicalTest[] = [
  {
    id: '1',
    type: 'blood',
    name: '血常规检查',
    date: '2025-12-15',
    result: '基本正常',
    status: 'normal',
    details: {
      wbc: '6.5 × 10^9/L',
      rbc: '4.8 × 10^12/L',
      hemoglobin: '145 g/L',
      platelets: '220 × 10^9/L'
    },
    doctor: '李医生'
  },
  {
    id: '2',
    type: 'glucose-lipid',
    name: '血糖血脂检查',
    date: '2025-12-15',
    result: '血糖偏高',
    status: 'abnormal',
    details: {
      fastingGlucose: '7.2 mmol/L',
      hba1c: '7.5%',
      totalCholesterol: '5.8 mmol/L',
      triglycerides: '2.1 mmol/L',
      hdl: '1.2 mmol/L',
      ldl: '3.5 mmol/L'
    },
    doctor: '王医生',
    notes: '建议加强血糖控制，调整饮食'
  },
  {
    id: '3',
    type: 'liver',
    name: '肝功能检查',
    date: '2025-12-15',
    result: '正常',
    status: 'normal',
    details: {
      alt: '28 U/L',
      ast: '25 U/L',
      totalBilirubin: '15 μmol/L',
      albumin: '45 g/L'
    },
    doctor: '李医生'
  },
  {
    id: '4',
    type: 'kidney',
    name: '肾功能检查',
    date: '2025-12-15',
    result: '正常',
    status: 'normal',
    details: {
      creatinine: '85 μmol/L',
      urea: '5.5 mmol/L',
      uricAcid: '350 μmol/L'
    },
    doctor: '李医生'
  },
  {
    id: '5',
    type: 'xray',
    name: '胸部X光检查',
    date: '2025-12-10',
    result: '未见明显异常',
    status: 'normal',
    details: {
      findings: '心肺未见明显异常，膈面光滑'
    },
    doctor: '赵医生'
  }
]

// 生成30天血糖监测数据（每5分钟一次）
const generateGlucoseReadings = (): GlucoseReading[] => {
  const readings: GlucoseReading[] = []
  const now = new Date()
  const daysToGenerate = 30
  const readingsPerDay = 288 // 24小时 * 12次/小时（每5分钟）
  const totalReadings = daysToGenerate * readingsPerDay

  for (let i = 0; i < totalReadings; i++) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000)
    const dayOfMonth = Math.floor(i / readingsPerDay)
    const hourOfDay = Math.floor((i % readingsPerDay) / 12)

    // 基础血糖值随天数略有波动
    const baseValue = 6.5 + Math.sin(dayOfMonth / 7) * 0.5

    // 根据时间段调整血糖值（模拟餐后血糖升高）
    let timeAdjustment = 0
    if (hourOfDay >= 7 && hourOfDay <= 9) timeAdjustment = 1.5 // 早餐后
    else if (hourOfDay >= 12 && hourOfDay <= 14) timeAdjustment = 1.8 // 午餐后
    else if (hourOfDay >= 18 && hourOfDay <= 20) timeAdjustment = 1.6 // 晚餐后
    else if (hourOfDay >= 0 && hourOfDay <= 6) timeAdjustment = -0.5 // 夜间偏低

    const variation = Math.sin(i / 12) * 0.8 + Math.random() * 1.2
    const value = Math.max(3.5, Math.min(13, baseValue + timeAdjustment + variation))

    let status: 'low' | 'normal' | 'high' | 'critical' = 'normal'
    if (value < 3.9) status = 'low'
    else if (value > 10) status = 'critical'
    else if (value > 7.8) status = 'high'

    readings.push({
      id: `glucose-${i}`,
      timestamp: timestamp.toISOString(),
      value: Math.round(value * 10) / 10,
      unit: 'mmol/L',
      status
    })
  }

  return readings.reverse()
}

export const mockGlucoseReadings: GlucoseReading[] = generateGlucoseReadings()

// 病程记录
export const mockProgressNotes: ProgressNote[] = [
  {
    id: '1',
    date: '2025-12-01-20',
    type: 'consultation',
    title: '全科医生视频咨询',
    content: '患者血糖控制情况良好，但仍需注意饮食控制。建议继续当前用药方案，增加运动量。',
    doctor: '李明华',
    doctorRole: '全科医生',
    medications: ['二甲双胍 500mg 每日两次', '阿托伐他汀 20mg 每晚一次']
  },
  {
    id: '2',
    date: '2025-12-01-18',
    type: 'medication-change',
    title: '药物调整',
    content: '根据最新血糖监测数据，调整二甲双胍剂量从500mg增加到850mg，每日两次。',
    doctor: '王志强',
    doctorRole: '内分泌专科医生',
    medications: ['二甲双胍 850mg 每日两次']
  },
  {
    id: '3',
    date: '2025-12-01-15',
    type: 'daily',
    title: '每日病程记录',
    content: '患者今日空腹血糖7.2mmol/L，餐后2小时血糖9.5mmol/L。血压130/85mmHg。患者自述睡眠质量改善，无明显不适。',
    doctor: '林雅婷',
    doctorRole: '健康管家'
  },
  {
    id: '4',
    date: '2025-12-01-12',
    type: 'treatment-plan',
    title: '营养治疗方案',
    content: '制定个性化饮食方案：每日总热量1800kcal，碳水化合物占50%，蛋白质占20%，脂肪占30%。建议少食多餐，控制精制糖摄入。',
    doctor: '陈思琪',
    doctorRole: '营养专家'
  },
  {
    id: '5',
    date: '2025-12-01-10',
    type: 'consultation',
    title: '理疗专家视频咨询',
    content: '评估患者运动能力，制定运动处方：每周5次有氧运动，每次30分钟，包括快走、游泳等。配合力量训练，每周2-3次。',
    doctor: '张伟杰',
    doctorRole: '理疗专家'
  }
]

// 团队成员
export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: '李明华',
    role: 'gp',
    roleName: '全科医生',
    specialty: '全科医学',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 13,
    completedConsultations: 8,
    nextAppointment: '2026-02-15'
  },
  {
    id: '2',
    name: '王志强',
    role: 'specialist',
    roleName: '专科医生',
    specialty: '内分泌科',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 12,
    completedConsultations: 6,
    nextAppointment: '2026-02-10'
  },
  {
    id: '3',
    name: '陈思琪',
    role: 'nutritionist',
    roleName: '营养专家',
    specialty: '临床营养',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 12,
    completedConsultations: 5,
    nextAppointment: '2026-02-08'
  },
  {
    id: '4',
    name: '张伟杰',
    role: 'physiotherapist',
    roleName: '理疗专家',
    specialty: '运动康复',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 12,
    completedConsultations: 5,
    nextAppointment: '2026-02-12'
  },
  {
    id: '5',
    name: '刘晓燕',
    role: 'educator',
    roleName: '教育专家',
    specialty: '健康教育',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 12,
    completedConsultations: 4,
    nextAppointment: '2026-02-05'
  },
  {
    id: '6',
    name: '林雅婷',
    role: 'health-manager',
    roleName: '健康管家',
    specialty: '健康管理',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 52,
    completedConsultations: 35,
    nextAppointment: '2026-02-03'
  },
  {
    id: '7',
    name: '孙佳怡',
    role: 'nurse',
    roleName: '护士',
    specialty: '护理',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 24,
    completedConsultations: 16,
    nextAppointment: '2026-02-06'
  },
  {
    id: '8',
    name: '周建国',
    role: 'psychologist',
    roleName: '心理治疗师',
    specialty: '临床心理',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 12,
    completedConsultations: 3,
    nextAppointment: '2026-02-20'
  },
  {
    id: '9',
    name: '吴俊豪',
    role: 'personal-trainer',
    roleName: '私人教练',
    specialty: '运动训练',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=150&h=150&fit=crop&crop=face',
    consultationsPerYear: 24,
    completedConsultations: 12,
    nextAppointment: '2026-02-08'
  }
]

// 咨询记录
export const mockConsultationRecords: ConsultationRecord[] = [
  {
    id: '1',
    memberId: '1',
    teamMemberId: '1',
    date: '2026-01-20',
    type: 'video',
    duration: 30,
    summary: '血糖控制评估与用药调整',
    notes: '患者血糖控制良好，继续当前治疗方案',
    prescriptions: ['二甲双胍 500mg 每日两次']
  },
  {
    id: '2',
    memberId: '1',
    teamMemberId: '3',
    date: '2026-01-12',
    type: 'video',
    duration: 45,
    summary: '营养方案制定',
    notes: '制定个性化饮食方案，控制总热量摄入',
    followUp: '2周后复查'
  }
]

// 服务项目
export const mockServiceProjects: ServiceProject[] = [
  {
    id: '1',
    name: '病史系统全面回顾',
    description: '全面回顾职业、婚姻、家族史、过敏史、吸烟史、饮酒史、用药史、创伤史、手术史、既往病史、预防接种',
    frequency: 1,
    frequencyUnit: 'year',
    completed: 1,
    remaining: 0,
    lastCompleted: '2025-12-05',
    status: 'completed'
  },
  {
    id: '2',
    name: '国际健康病历建档',
    description: '建立私密性专属健康档案，持续更新维护',
    frequency: 1,
    frequencyUnit: 'year',
    completed: 1,
    remaining: 0,
    lastCompleted: '2025-12-05',
    status: 'completed'
  },
  {
    id: '3',
    name: '专属健康管家陪诊',
    description: '健康管家全程陪同就医，协调医疗资源',
    frequency: 4,
    frequencyUnit: 'year',
    completed: 0,
    remaining: 4,
    nextScheduled: '2025-09-15',
    status: 'on-track'
  },
  {
    id: '4',
    name: '健康生活动态监测',
    description: '每周健康状况跟踪，生活方式指导',
    frequency: 52,
    frequencyUnit: 'year',
    completed: 4,
    remaining: 48,
    nextScheduled: '2025-12-28',
    lastCompleted: '2025-12-21',
    status: 'on-track'
  },
  {
    id: '5',
    name: '全科专家精准诊疗',
    description: '全科医生定期诊疗，包括面诊和视频咨询',
    frequency: 26,
    frequencyUnit: 'year',
    completed: 2,
    remaining: 24,
    nextScheduled: '2025-08-15',
    lastCompleted: '2025-12-20',
    status: 'on-track'
  },
  {
    id: '6',
    name: '精准健康体检评估',
    description: '全面健康体检，包括各项实验室检查和影像学检查',
    frequency: 4,
    frequencyUnit: 'year',
    completed: 1,
    remaining: 3,
    nextScheduled: '2025-12-15',
    lastCompleted: '2025-12-15',
    status: 'on-track'
  },
  {
    id: '7',
    name: '体检报告精细解读',
    description: '专业医生详细解读体检报告，制定健康改善方案',
    frequency: 4,
    frequencyUnit: 'year',
    completed: 1,
    remaining: 3,
    nextScheduled: '2025-12-20',
    lastCompleted: '2025-12-18',
    status: 'on-track'
  },
  {
    id: '8',
    name: '慢性疾病管理建议',
    description: '针对糖尿病、高血压等慢性病的专业管理建议',
    frequency: 4,
    frequencyUnit: 'year',
    completed: 1,
    remaining: 3,
    nextScheduled: '2025-12-10',
    lastCompleted: '2025-12-10',
    status: 'on-track'
  },
  {
    id: '9',
    name: '重症急症转诊建议',
    description: '紧急情况下的转诊指导和医疗资源协调',
    frequency: 0,
    frequencyUnit: 'year',
    completed: 0,
    remaining: 0,
    status: 'on-track'
  },
  {
    id: '10',
    name: '国际前沿新药推荐',
    description: '跟踪国际最新药物研发动态，推荐适合的新药',
    frequency: 0,
    frequencyUnit: 'year',
    completed: 0,
    remaining: 0,
    status: 'on-track'
  }
]

// 健康跟踪管理项目
export const mockHealthTrackingItems: HealthTrackingItem[] = [
  {
    id: '1',
    name: '疾病诊断',
    description: '综合疾病症状、体检报告及病史，精准判断病因，制定个性化诊疗方案',
    category: 'diagnosis',
    status: 'active',
    progress: 75,
    lastUpdate: '2025-12-01-20',
    assignedTo: '李明华'
  },
  {
    id: '2',
    name: '用药指导',
    description: '周期性监测用药效果与多态性，规避药物相互作用风险',
    category: 'medication',
    status: 'active',
    progress: 80,
    lastUpdate: '2025-12-01-18',
    assignedTo: '王志强'
  },
  {
    id: '3',
    name: '饮食调理',
    description: '根据疾病类型，配合药物、膳食与营养补充进行综合调理',
    category: 'diet',
    status: 'active',
    progress: 65,
    lastUpdate: '2025-12-01-12',
    assignedTo: '陈思琪'
  },
  {
    id: '4',
    name: '作息优化',
    description: '根据生活状态和睡眠质量，制定作息计划，优化生物钟',
    category: 'sleep',
    status: 'active',
    progress: 50,
    lastUpdate: '2025-12-01-15',
    assignedTo: '刘晓燕'
  },
  {
    id: '5',
    name: '运动建议',
    description: '结合生活状态和体能评估，制定物理治疗、运动方式、运动时间及锻炼方案',
    category: 'exercise',
    status: 'active',
    progress: 70,
    lastUpdate: '2025-12-01-10',
    assignedTo: '张伟杰'
  },
  {
    id: '6',
    name: '体重控制',
    description: '通过医学评估、代谢评估，制定个性化体重干预和体重长期管理方案',
    category: 'weight',
    status: 'active',
    progress: 60,
    lastUpdate: '2025-12-01-12',
    assignedTo: '陈思琪'
  },
  {
    id: '7',
    name: '心理辅导',
    description: '根据心理状况评估，制定心理教育、心理咨询、心理治疗和心理训练等心理辅导计划',
    category: 'psychology',
    status: 'pending',
    progress: 0,
    lastUpdate: '2025-12-01-05',
    assignedTo: '周建国'
  },
  {
    id: '8',
    name: '亚健康调理',
    description: '通过综合性诊疗和干预手段，预防疾病发生，改善身体状态与调理身体疾病',
    category: 'sub-health',
    status: 'active',
    progress: 55,
    lastUpdate: '2025-12-01-21',
    assignedTo: '林雅婷'
  }
]
