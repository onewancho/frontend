import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { authService } from '../services/index.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin' || state.user?.is_admin === true,
    userInitial: (state) => state.user?.name?.charAt(0).toUpperCase() || 'U'
  },

  actions: {
    // Initialize auth state from storage
    async init() {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (token && userData) {
        try {
          this.user = JSON.parse(userData)
          this.isAuthenticated = true
          
          // Verify token with backend in background
          this.verifyTokenInBackground()
        } catch (error) {
          console.error('Error parsing stored user data:', error)
          this.clearAuth()
        }
      }
    },

    // Verify token in background without blocking navigation
    async verifyTokenInBackground() {
      try {
        const user = await authService.getCurrentUser()
        if (user) {
          this.user = user
          this.isAuthenticated = true
        } else {
          this.clearAuth()
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        this.clearAuth()
      }
    },

    // Login
    async login(credentials) {
      this.isLoading = true
      try {
        console.log('Attempting login with credentials:', { email: credentials.email, password: '***' })
        const result = await authService.login(credentials)
        console.log('Login result:', result)
        
        if (result.success) {
          this.user = result.data.user
          this.isAuthenticated = true
          
          // Store auth data
          localStorage.setItem('auth_token', result.data.token)
          localStorage.setItem('user_data', JSON.stringify(result.data.user))
          
          console.log('Login successful, user:', result.data.user)
        } else {
          console.error('Login failed:', result.error)
        }
        return result
      } catch (error) {
        console.error('Login exception:', error)
        return { success: false, error: 'Terjadi kesalahan saat login' }
      } finally {
        this.isLoading = false
      }
    },

    // Register
    async register(userData) {
      this.isLoading = true
      try {
        console.log('Attempting registration with:', { 
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: '***'
        })
        
        const result = await authService.register(userData)
        console.log('Registration result:', result)
        
        if (result.success) {
          this.user = result.data.user
          this.isAuthenticated = true
          
          // Store auth data
          localStorage.setItem('auth_token', result.data.token)
          localStorage.setItem('user_data', JSON.stringify(result.data.user))
          
          console.log('Registration successful, user:', result.data.user)
        } else {
          console.error('Registration failed:', result.error)
        }
        return result
      } catch (error) {
        console.error('Register exception:', error)
        return { success: false, error: 'Terjadi kesalahan saat registrasi' }
      } finally {
        this.isLoading = false
      }
    },

    // Logout
    async logout() {
      this.isLoading = true
      try {
        await authService.logout()
      } finally {
        this.clearAuth()
        this.isLoading = false
        // Ensure reactivity is triggered
        await nextTick()
      }
    },

    // Logout from all devices
    async logoutAll() {
      this.isLoading = true
      try {
        await authService.logoutAll()
      } finally {
        this.clearAuth()
        this.isLoading = false
        // Ensure reactivity is triggered
        await nextTick()
      }
    },

    // Clear authentication data
    clearAuth() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      // Force trigger reactivity
      this.$patch({
        user: null,
        isAuthenticated: false
      })
    }
  }
})
