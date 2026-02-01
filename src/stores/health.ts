import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MemberInfo, MedicalHistory, MedicalTest } from '@/types'
import { mockMemberInfo, mockMedicalHistory, mockMedicalTests } from '@/mock/data'

// 体检报告类型
interface CheckupReport {
  id: string
  title: string
  date: string
  status: 'normal' | 'attention' | 'abnormal'
  summary: string
  items: {
    name: string
    value: string
    unit: string
    normalRange: string
    status: 'normal' | 'attention' | 'abnormal'
  }[]
}

// 检验结果类型
interface LabTest {
  id: string
  name: string
  date: string
  category: string
  items: {
    name: string
    value: string
    unit: string
    normalRange: string
    status: 'normal' | 'high' | 'low'
  }[]
}

// 模拟体检报告数据
const mockCheckupReports: CheckupReport[] = [
  {
    id: '1',
    title: '2025年度健康体检',
    date: '2025-12-15',
    status: 'attention',
    summary: '整体健康状况良好，血糖指标需要关注，建议定期复查。',
    items: [
      { name: '空腹血糖', value: '6.8', unit: 'mmol/L', normalRange: '3.9-6.1', status: 'attention' },
      { name: '血压', value: '125/82', unit: 'mmHg', normalRange: '90-140/60-90', status: 'normal' },
      { name: '总胆固醇', value: '5.2', unit: 'mmol/L', normalRange: '<5.2', status: 'normal' },
      { name: '甘油三酯', value: '1.8', unit: 'mmol/L', normalRange: '<1.7', status: 'attention' },
      { name: 'BMI', value: '24.5', unit: 'kg/m²', normalRange: '18.5-24', status: 'attention' }
    ]
  },
  {
    id: '2',
    title: '入会健康体检',
    date: '2025-06-15',
    status: 'normal',
    summary: '各项指标正常，继续保持良好的生活习惯。',
    items: [
      { name: '空腹血糖', value: '5.6', unit: 'mmol/L', normalRange: '3.9-6.1', status: 'normal' },
      { name: '血压', value: '118/76', unit: 'mmHg', normalRange: '90-140/60-90', status: 'normal' },
      { name: '总胆固醇', value: '4.8', unit: 'mmol/L', normalRange: '<5.2', status: 'normal' },
      { name: '甘油三酯', value: '1.4', unit: 'mmol/L', normalRange: '<1.7', status: 'normal' },
      { name: 'BMI', value: '23.8', unit: 'kg/m²', normalRange: '18.5-24', status: 'normal' }
    ]
  }
]

// 模拟检验结果数据
const mockLabTests: LabTest[] = [
  {
    id: '1',
    name: '糖化血红蛋白检测',
    date: '2026-01-28',
    category: '血糖监测',
    items: [
      { name: 'HbA1c', value: '6.5', unit: '%', normalRange: '<6.0', status: 'high' },
      { name: '平均血糖', value: '7.8', unit: 'mmol/L', normalRange: '<7.0', status: 'high' }
    ]
  },
  {
    id: '2',
    name: '肝功能检查',
    date: '2025-12-15',
    category: '肝脏功能',
    items: [
      { name: 'ALT', value: '28', unit: 'U/L', normalRange: '0-40', status: 'normal' },
      { name: 'AST', value: '25', unit: 'U/L', normalRange: '0-40', status: 'normal' },
      { name: '总胆红素', value: '12', unit: 'μmol/L', normalRange: '3.4-17.1', status: 'normal' }
    ]
  },
  {
    id: '3',
    name: '肾功能检查',
    date: '2025-12-15',
    category: '肾脏功能',
    items: [
      { name: '肌酐', value: '85', unit: 'μmol/L', normalRange: '44-133', status: 'normal' },
      { name: '尿素氮', value: '5.2', unit: 'mmol/L', normalRange: '2.9-8.2', status: 'normal' },
      { name: '尿酸', value: '380', unit: 'μmol/L', normalRange: '208-428', status: 'normal' }
    ]
  },
  {
    id: '4',
    name: '血脂检查',
    date: '2025-09-15',
    category: '心血管',
    items: [
      { name: '总胆固醇', value: '5.2', unit: 'mmol/L', normalRange: '<5.2', status: 'normal' },
      { name: '甘油三酯', value: '1.8', unit: 'mmol/L', normalRange: '<1.7', status: 'high' },
      { name: 'HDL-C', value: '1.2', unit: 'mmol/L', normalRange: '>1.0', status: 'normal' },
      { name: 'LDL-C', value: '3.1', unit: 'mmol/L', normalRange: '<3.4', status: 'normal' }
    ]
  }
]

export const useHealthStore = defineStore('health', () => {
  const memberInfo = ref<MemberInfo>(mockMemberInfo)
  const medicalHistory = ref<MedicalHistory>(mockMedicalHistory)
  const medicalTests = ref<MedicalTest[]>(mockMedicalTests)
  const checkupReports = ref<CheckupReport[]>(mockCheckupReports)
  const labTests = ref<LabTest[]>(mockLabTests)

  const getMedicalTestsByType = (type: string) => {
    return medicalTests.value.filter(test => test.type === type)
  }

  return {
    memberInfo,
    medicalHistory,
    medicalTests,
    checkupReports,
    labTests,
    getMedicalTestsByType
  }
})
