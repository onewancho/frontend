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
      console.log('🚀 Creating product with JSON data...')
      
      // Ensure data types are correct for backend validation
      const cleanData = {
        name: String(productData.name || '').trim(),
        description: String(productData.description || '').trim(),
        price: Number(productData.price),
        stock: Number(productData.stock),
        category_id: Number(productData.category_id),
        status: String(productData.status || 'active')
      }
      
      console.log('📋 Cleaned JSON payload:', cleanData)
      
      const response = await api.post('/admin/products', cleanData)
      console.log('✅ Create product response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Create product JSON error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      })
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create product',
        errors: error.response?.data?.errors || null,
        status: error.response?.status,
        details: error.response?.data
      }
    }
  },

  // Create product with image upload (Admin only)
  async createProductWithImage(formData) {
    try {
      console.log('🚀 Creating product with FormData...')
      
      // Create a new FormData to ensure clean data
      const cleanFormData = new FormData()
      
      // Add data with proper types
      for (let [key, value] of formData.entries()) {
        if (key === 'image') {
          cleanFormData.append(key, value)
        } else if (key === 'price' || key === 'stock' || key === 'category_id') {
          cleanFormData.append(key, String(Number(value)))
        } else {
          cleanFormData.append(key, String(value))
        }
      }
      
      // Debug log
      console.log('📋 Clean FormData contents:')
      for (let [key, value] of cleanFormData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`)
        } else {
          console.log(`  ${key}: ${value} (${typeof value})`)
        }
      }
      
      const response = await api.post('/admin/products', cleanFormData)
      console.log('✅ Create product with image response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Create product FormData error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url
      })
      
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create product with image',
        errors: error.response?.data?.errors || null,
        status: error.response?.status,
        details: error.response?.data
      }
    }
  },

  // Update product (Admin only)
  async updateProduct(id, productData) {
    try {
      console.log('🔄 Updating product with JSON data...')
      
      // Ensure data types are correct
      const cleanData = {
        name: String(productData.name || '').trim(),
        description: String(productData.description || '').trim(),
        price: Number(productData.price),
        stock: Number(productData.stock),
        category_id: Number(productData.category_id),
        status: String(productData.status || 'active')
      }
      
      console.log('📋 Clean update data:', cleanData)
      
      const response = await api.put(`/admin/products/${id}`, cleanData)
      console.log('✅ Update product response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Update product error:', {
        status: error.response?.status,
        data: error.response?.data
      })
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update product',
        errors: error.response?.data?.errors || null,
        status: error.response?.status
      }
    }
  },

  // Update product with image upload (Admin only)
  async updateProductWithImage(id, formData) {
    try {
      console.log('🔄 Updating product with FormData...')
      
      // Laravel method spoofing for PUT with FormData
      const cleanFormData = new FormData()
      
      // Add _method for Laravel
      cleanFormData.append('_method', 'PUT')
      
      // Add clean data
      for (let [key, value] of formData.entries()) {
        if (key === 'image') {
          cleanFormData.append(key, value)
        } else if (key === 'price' || key === 'stock' || key === 'category_id') {
          cleanFormData.append(key, String(Number(value)))
        } else {
          cleanFormData.append(key, String(value))
        }
      }
      
      const response = await api.post(`/admin/products/${id}`, cleanFormData)
      console.log('✅ Update product with image response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Update product with image error:', {
        status: error.response?.status,
        data: error.response?.data
      })
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update product',
        errors: error.response?.data?.errors || null,
        status: error.response?.status
      }
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
  },

  // Get products by category (public)
  async getProductsByCategory(categoryId) {
    try {
      const response = await api.get(`/catalog/products?category_id=${categoryId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch products by category' }
    }
  },

  // Admin: Get products by category
  async getAdminProductsByCategory(categoryId) {
    try {
      const response = await api.get(`/admin/products?category_id=${categoryId}`)
      return { success: true, data: response.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch products by category' }
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
      console.log('📡 Fetching categories...')
      const response = await api.get('/catalog/categories')
      console.log('✅ Categories response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Get categories error:', error.response?.data)
      return { success: false, error: error.response?.data?.message || 'Failed to fetch categories' }
    }
  },

  // Admin: Get all categories
  async getAdminCategories() {
    try {
      console.log('📡 Fetching admin categories...')
      const response = await api.get('/admin/categories')
      console.log('✅ Admin categories response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Get admin categories error:', error.response?.data)
      return { success: false, error: error.response?.data?.message || 'Failed to fetch categories' }
    }
  },

  // Admin: Create category
  async createCategory(categoryData) {
    try {
      console.log('🚀 Creating category:', categoryData)
      
      const cleanData = {
        name: String(categoryData.name || '').trim(),
        description: String(categoryData.description || '').trim(),
        status: String(categoryData.status || 'active')
      }
      
      const response = await api.post('/admin/categories', cleanData)
      console.log('✅ Create category response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Create category error:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create category',
        errors: error.response?.data?.errors || null
      }
    }
  },

  // Admin: Update category
  async updateCategory(id, categoryData) {
    try {
      console.log('🔄 Updating category:', id, categoryData)
      
      const cleanData = {
        name: String(categoryData.name || '').trim(),
        description: String(categoryData.description || '').trim(),
        status: String(categoryData.status || 'active')
      }
      
      const response = await api.put(`/admin/categories/${id}`, cleanData)
      console.log('✅ Update category response:', response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('❌ Update category error:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update category',
        errors: error.response?.data?.errors || null
      }
    }
  },

  // Admin: Delete category
  async deleteCategory(id) {
    try {
      console.log('🗑️ Deleting category:', id)
      await api.delete(`/admin/categories/${id}`)
      console.log('✅ Category deleted successfully')
      return { success: true }
    } catch (error) {
      console.error('❌ Delete category error:', error.response?.data)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete category'
      }
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
