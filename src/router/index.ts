import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('@/components/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'health-records',
        name: 'HealthRecords',
        component: () => import('@/views/HealthRecords.vue')
      },
      {
        path: 'glucose-monitoring',
        name: 'GlucoseMonitoring',
        component: () => import('@/views/GlucoseMonitoring.vue')
      },
      {
        path: 'progress-notes',
        name: 'ProgressNotes',
        component: () => import('@/views/ProgressNotes.vue')
      },
      {
        path: 'team-collaboration',
        name: 'TeamCollaboration',
        component: () => import('@/views/TeamCollaboration.vue')
      },
      {
        path: 'service-projects',
        name: 'ServiceProjects',
        component: () => import('@/views/ServiceProjects.vue')
      },
      {
        path: 'membership-benefits',
        name: 'MembershipBenefits',
        component: () => import('@/views/MembershipBenefits.vue')
      },
      {
        path: 'messages',
        name: 'Messages',
        component: () => import('@/views/Messages.vue')
      },
      {
        path: 'premium-service',
        name: 'PremiumService',
        component: () => import('@/views/PremiumService.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && userStore.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
