<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Laporan Penjualan</h1>
            <p class="mt-1 text-sm text-gray-600">Dashboard analitik dan laporan bisnis</p>
          </div>
          <button 
            @click="refreshData" 
            :disabled="loading"
            class="btn btn-primary"
          >
            <span v-if="loading" class="loading loading-spinner loading-sm"></span>
            {{ loading ? 'Loading...' : 'Refresh Data' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !dataLoaded" class="flex justify-center items-center py-20">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <span class="ml-3 text-lg text-gray-600">Memuat data laporan...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
        <div>
          <button class="btn btn-sm btn-ghost" @click="refreshData">Coba Lagi</button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Sales -->
        <div class="stats shadow bg-white">
          <div class="stat">
            <div class="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="stat-title">Total Penjualan</div>
            <div class="stat-value text-primary">{{ formatCurrency(stats.totalSales) }}</div>
            <div class="stat-desc">Total revenue</div>
          </div>
        </div>

        <!-- Total Orders -->
        <div class="stats shadow bg-white">
          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="stat-title">Total Pesanan</div>
            <div class="stat-value text-secondary">{{ stats.totalOrders }}</div>
            <div class="stat-desc">Jumlah orders</div>
          </div>
        </div>

        <!-- Total Products -->
        <div class="stats shadow bg-white">
          <div class="stat">
            <div class="stat-figure text-accent">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div class="stat-title">Total Produk</div>
            <div class="stat-value text-accent">{{ stats.totalProducts }}</div>
            <div class="stat-desc">Produk aktif</div>
          </div>
        </div>

        <!-- Average Order -->
        <div class="stats shadow bg-white">
          <div class="stat">
            <div class="stat-figure text-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div class="stat-title">Rata-rata Pesanan</div>
            <div class="stat-value text-success">{{ formatCurrency(stats.averageOrder) }}</div>
            <div class="stat-desc">Per pesanan</div>
          </div>
        </div>
      </div>

      <!-- Charts and Data -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Top Products -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Produk Terlaris
            </h2>
            <div class="divider mt-0 mb-4"></div>
            
            <div v-if="topProducts.length === 0" class="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p>Belum ada data produk terlaris</p>
            </div>
            
            <div v-else class="space-y-3">
              <div 
                v-for="(product, index) in topProducts.slice(0, 5)" 
                :key="product.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div class="flex items-center space-x-3">
                  <div class="badge badge-primary font-bold">{{ index + 1 }}</div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ product.name }}</p>
                    <p class="text-sm text-gray-600">{{ product.total_sold || 0 }} terjual</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-green-600">{{ formatCurrency(product.total_revenue || 0) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-lg font-semibold text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Pesanan Terbaru
            </h2>
            <div class="divider mt-0 mb-4"></div>
            
            <div v-if="recentOrders.length === 0" class="text-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p>Belum ada pesanan terbaru</p>
            </div>
            
            <div v-else class="space-y-3">
              <div 
                v-for="order in recentOrders.slice(0, 5)" 
                :key="order.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p class="font-semibold text-gray-900">{{ order.customer_name || 'Customer' }}</p>
                  <p class="text-sm text-gray-600">Order #{{ order.id }}</p>
                  <p class="text-xs text-gray-400">{{ formatDate(order.created_at) }}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-green-600">{{ formatCurrency(order.total) }}</p>
                  <span :class="getStatusClass(order.status)" class="badge badge-sm">
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sales Report Table -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title text-lg font-semibold text-gray-900 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Ringkasan Laporan
          </h2>
          
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Metrik</th>
                  <th>Nilai</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-semibold">Total Penjualan</td>
                  <td class="text-green-600 font-bold">{{ formatCurrency(stats.totalSales) }}</td>
                  <td class="text-gray-600">Semua transaksi</td>
                </tr>
                <tr>
                  <td class="font-semibold">Total Pesanan</td>
                  <td class="text-blue-600 font-bold">{{ stats.totalOrders }}</td>
                  <td class="text-gray-600">Jumlah orders</td>
                </tr>
                <tr>
                  <td class="font-semibold">Rata-rata per Pesanan</td>
                  <td class="text-purple-600 font-bold">{{ formatCurrency(stats.averageOrder) }}</td>
                  <td class="text-gray-600">Revenue / Orders</td>
                </tr>
                <tr>
                  <td class="font-semibold">Total Produk</td>
                  <td class="text-orange-600 font-bold">{{ stats.totalProducts }}</td>
                  <td class="text-gray-600">Produk aktif</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../utils/api.js'

export default {
  name: 'AdminReports',
  setup() {
    const router = useRouter()
    
    // State
    const loading = ref(false)
    const error = ref('')
    const dataLoaded = ref(false)
    
    // Data
    const stats = ref({
      totalSales: 0,
      totalOrders: 0,
      totalProducts: 0,
      averageOrder: 0
    })
    
    const topProducts = ref([])
    const recentOrders = ref([])

    // Authentication check
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token')
      const userData = localStorage.getItem('user_data')
      
      if (!token) {
        router.push('/login')
        return false
      }
      
      if (userData) {
        try {
          const user = JSON.parse(userData)
          if (user.role !== 'admin' && !user.is_admin) {
            router.push('/login')
            return false
          }
        } catch (e) {
          router.push('/login')
          return false
        }
      }
      
      return true
    }

    // Utility functions
    const formatCurrency = (amount) => {
      if (!amount || isNaN(amount)) return 'Rp 0'
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short', 
        day: 'numeric'
      })
    }

    const getStatusClass = (status) => {
      const statusMap = {
        'pending': 'badge-warning',
        'processing': 'badge-info',
        'shipped': 'badge-primary',
        'delivered': 'badge-success',
        'cancelled': 'badge-error'
      }
      return statusMap[status] || 'badge-ghost'
    }

    // API Functions
    const fetchDashboardStats = async () => {
      try {
        const response = await api.get('/admin/dashboard/stats')
        if (response.data.success) {
          const data = response.data.data
          
          stats.value = {
            totalSales: parseFloat(data.total_revenue) || 0,
            totalOrders: parseInt(data.total_orders) || 0,
            totalProducts: parseInt(data.total_products) || 0,
            averageOrder: data.total_orders > 0 ? 
              Math.round(parseFloat(data.total_revenue) / parseInt(data.total_orders)) : 0
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err)
        throw new Error('Gagal mengambil statistik dashboard')
      }
    }

    const fetchTopProducts = async () => {
      try {
        const response = await api.get('/admin/reports/top-products')
        if (response.data.success) {
          topProducts.value = response.data.data.products || []
        }
      } catch (err) {
        console.error('Error fetching top products:', err)
        // Non-critical, don't throw
        topProducts.value = []
      }
    }

    const fetchRecentOrders = async () => {
      try {
        const response = await api.get('/admin/dashboard/recent-orders')
        if (response.data.success) {
          recentOrders.value = response.data.data || []
        }
      } catch (err) {
        console.error('Error fetching recent orders:', err)
        // Non-critical, don't throw
        recentOrders.value = []
      }
    }

    const loadData = async () => {
      loading.value = true
      error.value = ''
      
      try {
        // Fetch critical data first
        await fetchDashboardStats()
        
        // Then fetch non-critical data
        await Promise.allSettled([
          fetchTopProducts(),
          fetchRecentOrders()
        ])
        
        dataLoaded.value = true
      } catch (err) {
        error.value = err.message || 'Gagal memuat data laporan'
      } finally {
        loading.value = false
      }
    }

    const refreshData = () => {
      loadData()
    }

    // Lifecycle
    onMounted(async () => {
      if (!checkAuth()) return
      await loadData()
    })

    return {
      loading,
      error,
      dataLoaded,
      stats,
      topProducts,
      recentOrders,
      formatCurrency,
      formatDate,
      getStatusClass,
      refreshData
    }
  }
}
</script>

<style scoped>
.stats {
  background-color: white;
  border: 1px solid #e5e7eb;
}

.card {
  border: 1px solid #e5e7eb;
}

.loading {
  display: inline-block;
}
</style>
