import api from '../utils/api.js'

export const authService = {
  // Login dengan API token
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials)
      
      if (response.data.success) {
        const { user, token } = response.data.data
        
        // Store authentication data
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_data', JSON.stringify(user))
        
        return { success: true, data: { user, token } }
      }
      
      return { success: false, error: response.data.message || 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  },

  // Register dengan API
  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData)
      
      if (response.data.success) {
        const { user, token } = response.data.data
        
        // Store authentication data
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user_data', JSON.stringify(user))
        
        return { success: true, data: { user, token } }
      }
      
      return { success: false, error: response.data.message || 'Registration failed' }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  // Logout from all devices
  async logoutAll() {
    try {
      await api.post('/auth/logout-all')
    } catch (error) {
      console.error('Logout all error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  // Get current user from API
  async getCurrentUser() {
    try {
      console.log('🔍 Getting current user from API...')
      const response = await api.get('/auth/user')
      console.log('👤 User API response:', response.data)
      
      if (response.data.success) {
        const user = response.data.data
        localStorage.setItem('user_data', JSON.stringify(user))
        return user
      }
      return null
    } catch (error) {
      console.error('❌ Get user error:', error)
      console.error('❌ Auth check failed:', error.response?.status)
      return null
    }
  },

  // Get current user from storage
  getUserFromStorage() {
    const userStr = localStorage.getItem('user_data')
    return userStr ? JSON.parse(userStr) : null
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  },

  // Check if user is admin
  isAdmin() {
    const user = this.getUserFromStorage()
    return user?.role === 'admin' || user?.is_admin === true
  },

  // Refresh token
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh')
      if (response.data.success) {
        const { token } = response.data.data
        localStorage.setItem('auth_token', token)
        return { success: true, token }
      }
      return { success: false }
    } catch (error) {
      console.error('Token refresh error:', error)
      return { success: false }
    }
  }
}

export const productService = {
  // Get all products (public)
  async getProducts(params = {}) {
    try {
      const response = await api.get('/catalog/products', { params })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch products' }
    }
  },

  // Get all products for admin
  async getAdminProducts(params = {}) {
    try {
      const response = await api.get('/admin/products', { params })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch products' }
    }
  },

  // Get single product (public)
  async getProduct(id) {
    try {
      const response = await api.get(`/catalog/products/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch product' }
    }
  },

  // Create product (Admin only)
  async createProduct(productData) {
    try {
      const response = await api.post('/admin/products', productData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create product' }
    }
  },

  // Update product (Admin only)
  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/admin/products/${id}`, productData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update product' }
    }
  },

  // Delete product (Admin only)
  async deleteProduct(id) {
    try {
      await api.delete(`/admin/products/${id}`)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete product' }
    }
  }
}

export const orderService = {
  // Get user orders (requires authentication)
  async getOrders() {
    try {
      console.log('📡 Making API call to /orders...')
      console.log('🔑 Auth token exists:', !!localStorage.getItem('auth_token'))
      
      const response = await api.get('/orders')
      console.log('📥 Raw API response status:', response.status)
      console.log('� Raw API response headers:', response.headers)
      console.log('📥 Raw API response data:', response.data)
      
      // Backend returns { success: true, data: [...] }
      if (response.data && response.data.success) {
        console.log('✅ API success response detected')
        console.log('📊 Orders data:', response.data.data)
        return { success: true, data: response.data.data }
      } else {
        console.log('⚠️ Unexpected response format:', response.data)
        return { success: true, data: response.data }
      }
    } catch (error) {
      console.error('❌ Orders API error:', error)
      console.error('❌ Response status:', error.response?.status)
      console.error('❌ Response data:', error.response?.data)
      console.error('❌ Response headers:', error.response?.headers)
      console.error('❌ Full error object:', error)
      
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Failed to fetch orders',
        statusCode: error.response?.status
      }
    }
  },

  // Create order (requires authentication)
  async createOrder(orderData) {
    try {
      const response = await api.post('/orders', orderData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create order' }
    }
  },

  // Get single order (requires authentication)
  async getOrder(id) {
    try {
      const response = await api.get(`/orders/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch order' }
    }
  },

  // Admin: Get all orders
  async getAllOrders() {
    try {
      const response = await api.get('/admin/orders')
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch orders' }
    }
  },

  // Admin: Update order status
  async updateOrderStatus(id, status) {
    try {
      const response = await api.patch(`/admin/orders/${id}/status`, { status })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update order' }
    }
  },

  // Admin: Delete order
  async deleteOrder(id) {
    try {
      await api.delete(`/admin/orders/${id}`)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete order' }
    }
  }
}

export const categoryService = {
  // Get all categories (public)
  async getCategories() {
    try {
      const response = await api.get('/catalog/categories')
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch categories' }
    }
  },

  // Admin: Create category
  async createCategory(categoryData) {
    try {
      const response = await api.post('/admin/categories', categoryData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to create category' }
    }
  },

  // Admin: Update category
  async updateCategory(id, categoryData) {
    try {
      const response = await api.put(`/admin/categories/${id}`, categoryData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update category' }
    }
  },

  // Admin: Delete category
  async deleteCategory(id) {
    try {
      await api.delete(`/admin/categories/${id}`)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete category' }
    }
  }
}

export const userService = {
  // Admin: Get all users
  async getUsers() {
    try {
      const response = await api.get('/admin/users')
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch users' }
    }
  },

  // Admin: Create user
  async createUser(userData) {
    try {
      console.log('🔍 userService.createUser called with:', userData)
      const response = await api.post('/admin/users', userData)
      console.log('📥 userService.createUser response:', response)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ userService.createUser error:', error)
      console.error('❌ Response data:', error.response?.data)
      console.error('❌ Response status:', error.response?.status)
      return { success: false, error: error.response?.data?.message || 'Failed to create user' }
    }
  },

  // Admin: Update user
  async updateUser(id, userData) {
    try {
      const response = await api.put(`/admin/users/${id}`, userData)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update user' }
    }
  },

  // Admin: Delete user
  async deleteUser(id) {
    try {
      await api.delete(`/admin/users/${id}`)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete user' }
    }
  },

  // Admin: Toggle user status
  async toggleUserStatus(id) {
    try {
      const response = await api.patch(`/admin/users/${id}/toggle-status`)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to toggle user status' }
    }
  }
}

export const dashboardService = {
  // Admin: Get dashboard statistics
  async getStats() {
    try {
      const response = await api.get('/admin/dashboard/stats')
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch dashboard stats' }
    }
  },

  // Admin: Get recent orders
  async getRecentOrders() {
    try {
      const response = await api.get('/admin/dashboard/recent-orders')
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch recent orders' }
    }
  },

  // Admin: Get low stock products
  async getLowStockProducts() {
    try {
      const response = await api.get('/admin/dashboard/low-stock')
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch low stock products' }
    }
  }
}

export const reportService = {
  // Admin: Get general reports with date range
  async getReports(dateFrom, dateTo) {
    try {
      const response = await api.get('/admin/reports', {
        params: { date_from: dateFrom, date_to: dateTo }
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch reports' }
    }
  },

  // Admin: Get sales report
  async getSalesReport(dateFrom, dateTo) {
    try {
      const response = await api.get('/admin/reports/sales', {
        params: { date_from: dateFrom, date_to: dateTo }
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch sales report' }
    }
  },

  // Admin: Get top products
  async getTopProducts(dateFrom, dateTo) {
    try {
      const response = await api.get('/admin/reports/top-products', {
        params: { date_from: dateFrom, date_to: dateTo }
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch top products' }
    }
  },

  // Admin: Export report
  async exportReport(type, format, dateFrom, dateTo) {
    try {
      const response = await api.get(`/admin/reports/export/${type}`, {
        params: { 
          format,
          date_from: dateFrom, 
          date_to: dateTo 
        },
        responseType: 'blob'
      })
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to export report' }
    }
  }
}
