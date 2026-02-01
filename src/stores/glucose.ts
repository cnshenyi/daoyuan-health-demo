import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { GlucoseReading } from '@/types'
import { mockGlucoseReadings } from '@/mock/data'

export const useGlucoseStore = defineStore('glucose', () => {
  const readings = ref<GlucoseReading[]>(mockGlucoseReadings)

  const latestReading = computed(() => {
    return readings.value[readings.value.length - 1]
  })

  const averageGlucose = computed(() => {
    if (readings.value.length === 0) return 0
    const sum = readings.value.reduce((acc, reading) => acc + reading.value, 0)
    return Math.round((sum / readings.value.length) * 10) / 10
  })

  const highReadingsCount = computed(() => {
    return readings.value.filter(r => r.status === 'high' || r.status === 'critical').length
  })

  const lowReadingsCount = computed(() => {
    return readings.value.filter(r => r.status === 'low').length
  })

  const getLast24Hours = () => {
    return readings.value.slice(-288)
  }

  return {
    readings,
    latestReading,
    averageGlucose,
    highReadingsCount,
    lowReadingsCount,
    getLast24Hours
  }
})
