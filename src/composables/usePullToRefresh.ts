import { ref, onMounted, onUnmounted } from 'vue'

export interface PullToRefreshOptions {
  threshold?: number
  onRefresh: () => Promise<void>
  disabled?: boolean
}

export function usePullToRefresh(options: PullToRefreshOptions) {
  const {
    threshold = 80,
    onRefresh,
    disabled = false
  } = options

  const isPulling = ref(false)
  const isRefreshing = ref(false)
  const pullDistance = ref(0)

  let startY = 0
  let currentY = 0
  let scrollElement: HTMLElement | null = null

  const handleTouchStart = (e: TouchEvent) => {
    if (disabled || isRefreshing.value) return

    const target = e.target as HTMLElement
    scrollElement = target.closest('.main-content') || document.documentElement

    // Only start if at the top of the scroll
    if (scrollElement.scrollTop === 0) {
      startY = e.touches[0].clientY
      isPulling.value = true
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling.value || disabled || isRefreshing.value) return

    currentY = e.touches[0].clientY
    const distance = currentY - startY

    if (distance > 0 && scrollElement && scrollElement.scrollTop === 0) {
      e.preventDefault()
      pullDistance.value = Math.min(distance * 0.5, threshold * 1.5)
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling.value || disabled || isRefreshing.value) return

    isPulling.value = false

    if (pullDistance.value >= threshold) {
      isRefreshing.value = true
      pullDistance.value = threshold

      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        isRefreshing.value = false
        pullDistance.value = 0
      }
    } else {
      pullDistance.value = 0
    }
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      document.addEventListener('touchstart', handleTouchStart, { passive: false })
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  })

  return {
    isPulling,
    isRefreshing,
    pullDistance,
    threshold
  }
}
