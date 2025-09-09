<template>
  <div class="min-h-screen bg-white flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block mb-6">
          <h1 class="text-3xl font-bold">
            <span class="text-pink-500">Ravaya</span>
            <span class="text-gray-900 ml-1">Hijab</span>
          </h1>
        </router-link>
        <h2 class="text-2xl font-normal text-gray-900 mb-2">Welcome Back</h2>
        <p class="text-gray-600">Sign in to your account</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              v-model="formData.email"
              placeholder="Enter your email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required 
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password"
              v-model="formData.password"
              placeholder="Enter your password"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              required 
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-50 border border-red-200 rounded-md">
            <p class="text-red-700 text-sm">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            :disabled="isLoading"
          >
            <span v-if="!isLoading">Sign In</span>
            <span v-else>Signing In...</span>
          </button>

          <!-- Register Link -->
          <div class="text-center mt-4">
            <p class="text-gray-600">
              Don't have an account? 
              <router-link to="/register" class="text-pink-500 hover:text-pink-600 font-medium">
                Sign up
              </router-link>
            </p>
          </div>
        </form>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <router-link to="/" class="text-gray-500 hover:text-gray-700">
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const formData = reactive({
      email: '',
      password: ''
    })

    const errorMessage = ref('')
    const isLoading = ref(false)

    const handleLogin = async () => {
      if (!formData.email || !formData.password) {
        errorMessage.value = 'Please fill in all fields'
        return
      }

      isLoading.value = true
      errorMessage.value = ''

      try {
        const result = await authStore.login({
          email: formData.email,
          password: formData.password
        })

        if (result.success) {
          // Get redirect path or use default based on role
          const redirectPath = localStorage.getItem('redirect_after_login')
          localStorage.removeItem('redirect_after_login')
          
          if (redirectPath) {
            router.push(redirectPath)
          } else if (result.data.user.role === 'admin' || result.data.user.is_admin) {
            router.push('/admin')
          } else {
            router.push('/')
          }
        } else {
          errorMessage.value = result.error || 'Login failed. Please check your credentials.'
        }
      } catch (error) {
        console.error('Login error:', error)
        errorMessage.value = 'An error occurred during login. Please try again.'
      } finally {
        isLoading.value = false
      }
    }

    return {
      formData,
      errorMessage,
      isLoading,
      handleLogin
    }
  }
}
</script>
