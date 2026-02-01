<template>
  <div class="skeleton-wrapper">
    <!-- Card Skeleton -->
    <div v-if="type === 'card'" class="skeleton-card">
      <div class="skeleton-header"></div>
      <div class="skeleton-body">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>

    <!-- List Skeleton -->
    <div v-else-if="type === 'list'" class="skeleton-list">
      <div v-for="i in count" :key="i" class="skeleton-list-item">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
    </div>

    <!-- Table Skeleton -->
    <div v-else-if="type === 'table'" class="skeleton-table">
      <div class="skeleton-table-header">
        <div v-for="i in 4" :key="i" class="skeleton-line"></div>
      </div>
      <div v-for="i in count" :key="i" class="skeleton-table-row">
        <div v-for="j in 4" :key="j" class="skeleton-line"></div>
      </div>
    </div>

    <!-- Stats Skeleton -->
    <div v-else-if="type === 'stats'" class="skeleton-stats">
      <div v-for="i in count" :key="i" class="skeleton-stat-card">
        <div class="skeleton-circle"></div>
        <div class="skeleton-stat-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
    </div>

    <!-- Default Skeleton -->
    <div v-else class="skeleton-default">
      <div v-for="i in count" :key="i" class="skeleton-line" :class="{ short: i % 3 === 0 }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'card' | 'list' | 'table' | 'stats' | 'default'
    count?: number
  }>(),
  {
    type: 'default',
    count: 3
  }
)
</script>

<style scoped>
.skeleton-wrapper {
  width: 100%;
}

/* Base skeleton animation */
@keyframes shimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

.skeleton-line,
.skeleton-header,
.skeleton-avatar,
.skeleton-circle {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 400% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}

/* Card Skeleton */
.skeleton-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.skeleton-header {
  height: 24px;
  width: 40%;
  margin-bottom: 16px;
}

.skeleton-body .skeleton-line {
  height: 16px;
  margin-bottom: 12px;
}

.skeleton-line.short {
  width: 60%;
}

/* List Skeleton */
.skeleton-list-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 12px;
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-content {
  flex: 1;
}

.skeleton-content .skeleton-line {
  height: 16px;
  margin-bottom: 8px;
}

/* Table Skeleton */
.skeleton-table {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.skeleton-table-header,
.skeleton-table-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 12px;
}

.skeleton-table-header .skeleton-line {
  height: 20px;
}

.skeleton-table-row .skeleton-line {
  height: 16px;
}

/* Stats Skeleton */
.skeleton-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.skeleton-stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.skeleton-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-stat-content {
  flex: 1;
}

.skeleton-stat-content .skeleton-line {
  height: 20px;
  margin-bottom: 8px;
}

/* Default Skeleton */
.skeleton-default .skeleton-line {
  height: 16px;
  margin-bottom: 12px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .skeleton-card {
    padding: 16px;
  }

  .skeleton-stats {
    grid-template-columns: 1fr;
  }

  .skeleton-table-header,
  .skeleton-table-row {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
