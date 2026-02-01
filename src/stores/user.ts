import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'
import { mockUser } from '@/mock/data'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isLoggedIn = ref(false)

  const login = (username: string, password: string) => {
    if (username && password) {
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
      user.value = JSON.parse(storedUser)
      isLoggedIn.value = true
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    checkAuth
  }
})
