import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TeamMember, ConsultationRecord } from '@/types'
import { mockTeamMembers, mockConsultationRecords } from '@/mock/data'

export const useTeamStore = defineStore('team', () => {
  const members = ref<TeamMember[]>(mockTeamMembers)
  const consultations = ref<ConsultationRecord[]>(mockConsultationRecords)

  const getMemberById = (id: string) => {
    return members.value.find(member => member.id === id)
  }

  const getConsultationsByMember = (memberId: string) => {
    return consultations.value.filter(c => c.teamMemberId === memberId)
  }

  return {
    members,
    consultations,
    getMemberById,
    getConsultationsByMember
  }
})
