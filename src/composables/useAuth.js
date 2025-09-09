// src/composables/useAuth.js
import { useAuthStore } from '../stores/auth.js'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export const useAuth = () => {
  const authStore = useAuthStore()
  const router = useRouter()

  // Check if user is authenticated
  const requireAuth = () => {
    if (!authStore.isAuthenticated) {
      router.push('/login')
      return false
    }
    return true
  }

  // Check if user is admin
  const requireAdmin = () => {
    if (!authStore.isAuthenticated) {
      router.push('/login')
      return false
    }
    
    if (!authStore.isAdmin) {
      router.push('/') // Redirect to home if not admin
      return false
    }
    
    return true
  }

  // Check if user is guest (not authenticated)
  const requireGuest = () => {
    if (authStore.isAuthenticated) {
      router.push('/') // Redirect to home if already authenticated
      return false
    }
    return true
  }

  return {
    requireAuth,
    requireAdmin,
    requireGuest,
    user: computed(() => authStore.user),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    isAdmin: computed(() => authStore.isAdmin),
    isLoading: computed(() => authStore.isLoading),
    userInitial: computed(() => authStore.userInitial),
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    logoutAll: authStore.logoutAll
  }
}
