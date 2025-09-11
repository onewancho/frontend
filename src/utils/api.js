import axios from 'axios'

// Base API configuration
const BASE_URL = 'https://backend-ravayahijab.up.railway.app/api'

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Increased timeout
  withCredentials: false, // Railway doesn't need cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('🔑 Auth token added to request:', config.url)
    }
    
    // Handle FormData properly
    if (config.data instanceof FormData) {
      // Remove Content-Type for FormData to let browser set boundary
      delete config.headers['Content-Type']
      console.log('📁 FormData detected, removing Content-Type header')
    }
    
    console.log('📤 Request config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data instanceof FormData ? 'FormData' : config.data
    })
    
    return config
  },
  (error) => {
    console.error('❌ Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response success:', response.config.url)
    return response
  },
  (error) => {
    console.error('❌ API Response error:', error.config?.url, 'Status:', error.response?.status)
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.log('🚫 401 Unauthorized - clearing auth data')
      // Token expired or invalid
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        console.log('🔄 Redirecting to login...')
        window.location.href = '/login'
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('🚫 403 Access denied:', error.response.data)
    }
    
    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('💥 500 Server error:', error.response.data)
    }
    
    return Promise.reject(error)
  }
)

export default api
