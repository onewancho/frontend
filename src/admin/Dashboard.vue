<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p class="mt-1 text-sm text-gray-600">Selamat datang di panel admin Ravaya Hijab</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              Terakhir diperbarui: {{ lastUpdated }}
            </div>
            <button 
              @click="refreshData" 
              :disabled="isLoading"
              class="btn btn-sm btn-outline btn-primary"
            >
              <svg v-if="!isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <div v-else class="loading loading-spinner w-4 h-4 mr-2"></div>
              {{ isLoading ? 'Loading...' : 'Refresh' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && !dashboardData.totalProducts" class="flex justify-center items-center py-20">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <span class="ml-3 text-lg text-gray-600">Memuat data dashboard...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="errorMessage" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="alert alert-error">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ errorMessage }}</span>
        <button @click="refreshData" class="btn btn-sm btn-ghost">Coba Lagi</button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Products -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-blue-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div class="stat-title">Total Produk</div>
            <div class="stat-value text-blue-500">{{ dashboardData.totalProducts || 0 }}</div>
            <div class="stat-desc">Produk aktif dalam sistem</div>
          </div>
        </div>

        <!-- Total Orders -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-green-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="stat-title">Total Pesanan</div>
            <div class="stat-value text-green-500">{{ dashboardData.totalOrders || 0 }}</div>
            <div class="stat-desc">Semua pesanan</div>
          </div>
        </div>

        <!-- Total Revenue -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-yellow-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="stat-title">Total Pendapatan</div>
            <div class="stat-value text-yellow-500">Rp {{ formatPrice(dashboardData.totalRevenue) }}</div>
            <div class="stat-desc">Pendapatan kotor</div>
          </div>
        </div>

        <!-- Active Users -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-purple-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <div class="stat-title">Pengguna Aktif</div>
            <div class="stat-value text-purple-500">{{ dashboardData.activeUsers || 0 }}</div>
            <div class="stat-desc">Users terdaftar</div>
          </div>
        </div>
      </div>

      <!-- Order Status Overview -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Pending</p>
              <p class="text-xl font-semibold">{{ dashboardData.pendingOrders || 0 }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Processing</p>
              <p class="text-xl font-semibold">{{ dashboardData.processingOrders || 0 }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-orange-400 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Shipped</p>
              <p class="text-xl font-semibold">{{ dashboardData.shippedOrders || 0 }}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Completed</p>
              <p class="text-xl font-semibold">{{ dashboardData.completedOrders || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Recent Orders -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b bg-gray-50">
            <h3 class="text-lg font-semibold text-gray-900">Pesanan Terbaru</h3>
          </div>
          <div class="p-6">
            <div v-if="recentOrders.length === 0" class="text-center text-gray-500 py-8">
              <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <p>Belum ada pesanan terbaru</p>
            </div>
            <div v-else class="space-y-4">
              <div 
                v-for="order in recentOrders.slice(0, 5)" 
                :key="order.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="font-semibold text-gray-900">{{ order.customer_name || order.customer }}</p>
                  <p class="text-sm text-gray-600">Order #{{ order.id }} - {{ order.formatted_date || order.date }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-green-600">Rp {{ formatPrice(order.total) }}</p>
                  <span :class="getStatusClass(order.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="p-6 border-b bg-gray-50">
            <h3 class="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 gap-4">
              <router-link to="/admin/products" class="btn btn-outline btn-primary">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                Kelola Produk
              </router-link>
              <router-link to="/admin/orders" class="btn btn-outline btn-success">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Kelola Pesanan
              </router-link>
              <router-link to="/admin/users" class="btn btn-outline btn-warning">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                Kelola User
              </router-link>
              <router-link to="/admin/reports" class="btn btn-outline btn-info">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Laporan
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Low Stock Alert -->
      <div v-if="lowStockProducts.length > 0" class="mt-6">
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <svg class="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
            <h3 class="text-lg font-semibold text-yellow-800">Peringatan Stok Rendah</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="product in lowStockProducts" 
              :key="product.id"
              class="bg-white p-4 rounded border border-yellow-300"
            >
              <p class="font-semibold">{{ product.name }}</p>
              <p class="text-sm text-gray-600">Stok tersisa: {{ product.stock }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api.js'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()
    const isLoading = ref(false)
    const errorMessage = ref('')
    const lastUpdated = ref('')
    
    // Data states
    const dashboardData = ref({
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      activeUsers: 0,
      pendingOrders: 0,
      processingOrders: 0,
      shippedOrders: 0,
      completedOrders: 0
    })
    
    const recentOrders = ref([])
    const lowStockProducts = ref([])
    
    // Auto refresh interval
    let refreshInterval = null

    // Check admin access
    const checkAdminAccess = () => {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (!token) {
        router.push('/auth/login')
        return false
      }
      
      if (userData) {
        try {
          const user = JSON.parse(userData)
          if (user.role !== 'admin' && !user.is_admin) {
            router.push('/auth/login')
            return false
          }
        } catch (error) {
          console.error('Error parsing user data:', error)
          router.push('/auth/login')
          return false
        }
      }
      
      return true
    }

    // Format price helper
    const formatPrice = (price) => {
      if (!price) return '0'
      return parseFloat(price).toLocaleString('id-ID')
    }

    // Get status class for orders
    const getStatusClass = (status) => {
      const statusClasses = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'processing': 'bg-blue-100 text-blue-800',
        'shipped': 'bg-orange-100 text-orange-800',
        'delivered': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    // Fetch dashboard statistics
    const fetchDashboardStats = async () => {
      try {

        const response = await api.get('/admin/dashboard/stats')

        
        if (response.data.success) {
          const stats = response.data.data
          dashboardData.value = {
            totalProducts: stats.total_products || 0,
            totalOrders: stats.total_orders || 0,
            totalRevenue: parseFloat(stats.total_revenue) || 0,
            activeUsers: stats.active_users || 0,
            pendingOrders: stats.pending_orders || 0,
            processingOrders: stats.processing_orders || 0,
            shippedOrders: stats.shipped_orders || 0,
            completedOrders: stats.completed_orders || 0
          }
          return stats
        } else {
          throw new Error(response.data.message || 'Failed to fetch dashboard stats')
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        throw error
      }
    }

    // Fetch recent orders
    const fetchRecentOrders = async () => {
      try {

        const response = await api.get('/admin/dashboard/recent-orders')

        
        if (response.data.success) {
          recentOrders.value = response.data.data || []
          return response.data.data
        } else {
          throw new Error(response.data.message || 'Failed to fetch recent orders')
        }
      } catch (error) {
        console.error('Error fetching recent orders:', error)
        throw error
      }
    }

    // Fetch low stock products
    const fetchLowStockProducts = async () => {
      try {

        const response = await api.get('/admin/dashboard/low-stock')

        
        if (response.data.success) {
          lowStockProducts.value = response.data.data || []
          return response.data.data
        } else {
          // Don't throw error for low stock as it's optional
          console.warn('Low stock API failed:', response.data.message)
          lowStockProducts.value = []
          return []
        }
      } catch (error) {
        console.error('Error fetching low stock products:', error)
        lowStockProducts.value = []
        return []
      }
    }

    // Load all dashboard data
    const loadDashboardData = async () => {
      isLoading.value = true
      errorMessage.value = ''
      
      try {

        
        // Fetch all data in parallel
        await Promise.all([
          fetchDashboardStats(),
          fetchRecentOrders(),
          fetchLowStockProducts()
        ])
        
        lastUpdated.value = new Date().toLocaleTimeString('id-ID')

        
      } catch (error) {
        console.error('Error loading dashboard data:', error)
        errorMessage.value = error.response?.data?.message || error.message || 'Gagal memuat data dashboard'
      } finally {
        isLoading.value = false
      }
    }

    // Refresh data
    const refreshData = () => {

      loadDashboardData()
    }

    // Start auto refresh
    const startAutoRefresh = () => {
      refreshInterval = setInterval(() => {

        loadDashboardData()
      }, 30000) // Refresh every 30 seconds
    }

    // Stop auto refresh
    const stopAutoRefresh = () => {
      if (refreshInterval) {
        clearInterval(refreshInterval)
        refreshInterval = null
      }
    }

    // Lifecycle hooks
    onMounted(async () => {

      
      // Check admin access first
      if (!checkAdminAccess()) {
        return
      }
      
      // Load initial data
      await loadDashboardData()
      
      // Start auto refresh
      startAutoRefresh()
    })

    onUnmounted(() => {

      stopAutoRefresh()
    })

    return {
      isLoading,
      errorMessage,
      lastUpdated,
      dashboardData,
      recentOrders,
      lowStockProducts,
      refreshData,
      formatPrice,
      getStatusClass
    }
  }
}
</script>

<style scoped>
/* Additional custom styles if needed */
.stats {
  background-color: white;
}

.stat-figure svg {
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1));
}

.loading {
  display: inline-block;
}
</style>
