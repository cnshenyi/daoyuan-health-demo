import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserRole } from '@/types'
import { mockUser } from '@/mock/data'

// 各角色的 mock 登录用户
const roleUserMap: Record<UserRole, User> = {
  member: { ...mockUser, role: 'member' },
  'health-manager': {
    id: 'hm-1',
    username: 'linyating',
    name: '林雅婷',
    email: 'linyating@daoyuan.com',
    phone: '+86 139 0000 0001',
    membershipType: 'premium',
    membershipStartDate: '2025-01-01',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    role: 'health-manager'
  },
  doctor: {
    id: 'doc-1',
    username: 'liminghua',
    name: '李明华',
    email: 'liminghua@daoyuan.com',
    phone: '+86 139 0000 0002',
    membershipType: 'premium',
    membershipStartDate: '2025-01-01',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    role: 'doctor'
  },
  wellness: {
    id: 'well-1',
    username: 'chensiqi',
    name: '陈思琪',
    email: 'chensiqi@daoyuan.com',
    phone: '+86 139 0000 0003',
    membershipType: 'premium',
    membershipStartDate: '2025-01-01',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
    role: 'wellness'
  },
  'mental-education': {
    id: 'me-1',
    username: 'zhoujianguo',
    name: '周建国',
    email: 'zhoujianguo@daoyuan.com',
    phone: '+86 139 0000 0004',
    membershipType: 'premium',
    membershipStartDate: '2025-01-01',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
    role: 'mental-education'
  }
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  const currentRole = computed<UserRole>(() => user.value?.role || 'member')

  const login = (username: string, _password: string) => {
    if (username) {
      user.value = { ...mockUser, role: 'member' }
      isLoggedIn.value = true
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  const loginWithPhone = (phone: string, code: string, role: UserRole = 'member') => {
    if (phone && code) {
      user.value = { ...roleUserMap[role] }
      isLoggedIn.value = true
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isLoggedIn.value = false
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      const role = parsed.role || 'member'
      const roleUser = roleUserMap[role as UserRole]
      user.value = { ...parsed, avatar: roleUser?.avatar || mockUser.avatar }
      isLoggedIn.value = true
    }
  }

  return {
    user,
    isLoggedIn,
    currentRole,
    login,
    loginWithPhone,
    logout,
    checkAuth
  }
})
