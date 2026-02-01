import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { MemberInfo, MedicalHistory, MedicalTest } from '@/types'
import { mockMemberInfo, mockMedicalHistory, mockMedicalTests } from '@/mock/data'

export const useHealthStore = defineStore('health', () => {
  const memberInfo = ref<MemberInfo>(mockMemberInfo)
  const medicalHistory = ref<MedicalHistory>(mockMedicalHistory)
  const medicalTests = ref<MedicalTest[]>(mockMedicalTests)

  const getMedicalTestsByType = (type: string) => {
    return medicalTests.value.filter(test => test.type === type)
  }

  return {
    memberInfo,
    medicalHistory,
    medicalTests,
    getMedicalTestsByType
  }
})
