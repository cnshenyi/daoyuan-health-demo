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
  // ========== 会员端 ==========
  {
    path: '/',
    component: () => import('@/components/Layout.vue'),
    meta: { requiresAuth: true, role: 'member' },
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
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue')
      }
    ]
  },
  // ========== 健康管家端 ==========
  {
    path: '/manager',
    component: () => import('@/views/manager/ManagerLayout.vue'),
    meta: { requiresAuth: true, role: 'health-manager' },
    children: [
      {
        path: '',
        name: 'ManagerDashboard',
        component: () => import('@/views/manager/ManagerDashboard.vue')
      },
      {
        path: 'members',
        name: 'MemberList',
        component: () => import('@/views/manager/MemberList.vue')
      },
      {
        path: 'members/:id',
        name: 'MemberDetail',
        component: () => import('@/views/manager/MemberDetail.vue')
      },
      {
        path: 'tasks',
        name: 'ManagerTasks',
        component: () => import('@/views/manager/ManagerTasks.vue')
      },
      {
        path: 'messages',
        name: 'ManagerMessages',
        component: () => import('@/views/manager/ManagerMessages.vue')
      },
      {
        path: 'notes/:id',
        name: 'ManagerNotes',
        component: () => import('@/views/manager/ManagerNotes.vue')
      },
      {
        path: 'notes/new',
        name: 'ManagerNotesNew',
        component: () => import('@/views/manager/ManagerNotes.vue')
      }
    ]
  },
  // ========== 医生端 ==========
  {
    path: '/doctor',
    component: () => import('@/views/doctor/DoctorLayout.vue'),
    meta: { requiresAuth: true, role: 'doctor' },
    children: [
      {
        path: '',
        name: 'DoctorDashboard',
        component: () => import('@/views/doctor/DoctorDashboard.vue')
      }
    ]
  },
  // ========== 营养与康复端 ==========
  {
    path: '/wellness',
    component: () => import('@/views/wellness/WellnessLayout.vue'),
    meta: { requiresAuth: true, role: 'wellness' },
    children: [
      {
        path: '',
        name: 'WellnessDashboard',
        component: () => import('@/views/wellness/WellnessDashboard.vue')
      }
    ]
  },
  // ========== 心理与教育端 ==========
  {
    path: '/mental',
    component: () => import('@/views/mental/MentalLayout.vue'),
    meta: { requiresAuth: true, role: 'mental-education' },
    children: [
      {
        path: '',
        name: 'MentalDashboard',
        component: () => import('@/views/mental/MentalDashboard.vue')
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
    // 已登录访问登录页，根据角色跳转
    const roleHomeMap: Record<string, string> = {
      member: '/',
      'health-manager': '/manager',
      doctor: '/doctor',
      wellness: '/wellness',
      'mental-education': '/mental'
    }
    next(roleHomeMap[userStore.currentRole] || '/')
  } else {
    next()
  }
})

export default router
