import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

export const useAdminGuard = () => {
  const router = useRouter()
  const authStore = useAuthStore()

  const checkAdminAccess = () => {
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      console.warn('User not authenticated, redirecting to login')
      localStorage.setItem('redirect_after_login', router.currentRoute.value.fullPath)
      router.push('/login')
      return false
    }

    // Check if user is admin
    if (!authStore.isAdmin) {
      console.warn('User is not admin, access denied')
      router.push('/?error=access_denied')
      return false
    }

    return true
  }

  const protectRoute = () => {
    onMounted(() => {
      checkAdminAccess()
    })
  }

  return {
    checkAdminAccess,
    protectRoute,
    isAdmin: authStore.isAdmin,
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user
  }
}
