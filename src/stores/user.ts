import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'
import { mockUser } from '@/mock/data'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  const login = (username: string, _password: string) => {
    if (username) {
      user.value = mockUser
      isLoggedIn.value = true
      localStorage.setItem('user', JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const loginWithPhone = (phone: string, code: string) => {
    if (phone && code) {
      user.value = mockUser
      isLoggedIn.value = true
      localStorage.setItem('user', JSON.stringify(mockUser))
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
      // 始终使用最新的 mockUser 数据（包括头像）
      user.value = { ...JSON.parse(storedUser), avatar: mockUser.avatar }
      isLoggedIn.value = true
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    loginWithPhone,
    logout,
    checkAuth
  }
})
