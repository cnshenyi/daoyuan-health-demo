import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ServiceProject, HealthTrackingItem } from '@/types'
import { mockServiceProjects, mockHealthTrackingItems } from '@/mock/data'

export const useServiceStore = defineStore('service', () => {
  const projects = ref<ServiceProject[]>(mockServiceProjects)
  const trackingItems = ref<HealthTrackingItem[]>(mockHealthTrackingItems)

  const getProjectsByStatus = (status: string) => {
    return projects.value.filter(p => p.status === status)
  }

  const getTrackingItemsByCategory = (category: string) => {
    return trackingItems.value.filter(item => item.category === category)
  }

  return {
    projects,
    trackingItems,
    getProjectsByStatus,
    getTrackingItemsByCategory
  }
})
