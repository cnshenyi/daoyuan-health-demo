import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProgressNote } from '@/types'
import { mockProgressNotes } from '@/mock/data'

export const useProgressStore = defineStore('progress', () => {
  const notes = ref<ProgressNote[]>(mockProgressNotes)

  const getNotesByType = (type: string) => {
    return notes.value.filter(note => note.type === type)
  }

  const getNotesByDoctor = (doctor: string) => {
    return notes.value.filter(note => note.doctor === doctor)
  }

  return {
    notes,
    getNotesByType,
    getNotesByDoctor
  }
})
