// 用户信息
export interface User {
  id: string
  username: string
  name: string
  email: string
  phone: string
  membershipType: 'standard' | 'premium'
  membershipStartDate: string
  avatar?: string
}

// 会员信息
export interface MemberInfo {
  id: string
  name: string
  age: number
  gender: 'male' | 'female'
  occupation: string
  maritalStatus: string
  membershipType: 'standard' | 'premium'
  membershipFee: number
  joinDate: string
}

// 病史信息
export interface MedicalHistory {
  occupation: string
  maritalStatus: string
  familyHistory: string[]
  allergies: string[]
  smokingHistory: string
  drinkingHistory: string
  medicationHistory: string[]
  traumaHistory: string[]
  surgeryHistory: string[]
  pastIllnesses: string[]
  vaccinations: string[]
}

// 医疗检查结果
export interface MedicalTest {
  id: string
  type: 'blood' | 'xray' | 'ultrasound' | 'ct' | 'mri' | 'cbc' | 'tumor-marker' | 'liver' | 'kidney' | 'thyroid' | 'cardiac' | 'glucose-lipid' | 'urine'
  name: string
  date: string
  result: string
  status: 'normal' | 'abnormal' | 'critical'
  details: Record<string, any>
  doctor: string
  notes?: string
}

// 血糖监测数据
export interface GlucoseReading {
  id: string
  timestamp: string
  value: number
  unit: 'mmol/L' | 'mg/dL'
  status: 'low' | 'normal' | 'high' | 'critical'
  notes?: string
  mealRelation?: 'fasting' | 'before-meal' | 'after-meal' | 'bedtime'
}

// 病程记录
export interface ProgressNote {
  id: string
  date: string
  type: 'daily' | 'medication-change' | 'treatment-plan' | 'consultation'
  title: string
  content: string
  doctor: string
  doctorRole: string
  medications?: string[]
  attachments?: string[]
}

// 团队成员
export interface TeamMember {
  id: string
  name: string
  role: 'gp' | 'specialist' | 'nutritionist' | 'physiotherapist' | 'educator' | 'health-manager' | 'nurse' | 'psychologist' | 'personal-trainer'
  roleName: string
  specialty?: string
  avatar?: string
  consultationsPerYear: number
  completedConsultations: number
  nextAppointment?: string
}

// 咨询记录
export interface ConsultationRecord {
  id: string
  memberId: string
  teamMemberId: string
  date: string
  type: 'in-person' | 'video' | 'phone'
  duration: number
  summary: string
  notes: string
  prescriptions?: string[]
  followUp?: string
}

// 服务项目
export interface ServiceProject {
  id: string
  name: string
  description: string
  frequency: number
  frequencyUnit: 'year' | 'month' | 'week'
  completed: number
  remaining: number
  nextScheduled?: string
  lastCompleted?: string
  status: 'on-track' | 'delayed' | 'completed'
}

// 健康跟踪管理项目
export interface HealthTrackingItem {
  id: string
  name: string
  description: string
  category: 'diagnosis' | 'medication' | 'diet' | 'sleep' | 'exercise' | 'weight' | 'psychology' | 'sub-health'
  status: 'active' | 'completed' | 'pending'
  progress: number
  lastUpdate: string
  assignedTo: string
}
