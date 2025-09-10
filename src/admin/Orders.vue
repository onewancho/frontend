<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Manajemen Pesanan</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola semua pesanan pelanggan dan status pengiriman</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              Total pesanan: {{ orders.length }}
            </div>
            <button 
              @click="loadOrders" 
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
    <div v-if="isLoading && orders.length === 0" class="flex justify-center items-center py-20">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <span class="ml-3 text-lg text-gray-600">Memuat data pesanan...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="alert alert-error">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{{ error }}</span>
        <button @click="loadOrders" class="btn btn-sm btn-ghost">Coba Lagi</button>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <!-- Total Orders -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-blue-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="stat-title">Total Pesanan</div>
            <div class="stat-value text-blue-500">{{ orders.length }}</div>
            <div class="stat-desc">Semua pesanan</div>
          </div>
        </div>

        <!-- Pending Orders -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-yellow-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="stat-title">Pending</div>
            <div class="stat-value text-yellow-500">{{ orderStats.pending }}</div>
            <div class="stat-desc">Menunggu konfirmasi</div>
          </div>
        </div>

        <!-- Processing Orders -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-blue-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="stat-title">Processing</div>
            <div class="stat-value text-blue-500">{{ orderStats.processing }}</div>
            <div class="stat-desc">Sedang diproses</div>
          </div>
        </div>

        <!-- Shipped Orders -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-orange-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="stat-title">Shipped</div>
            <div class="stat-value text-orange-500">{{ orderStats.shipped }}</div>
            <div class="stat-desc">Dalam pengiriman</div>
          </div>
        </div>

        <!-- Delivered Orders -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-green-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="stat-title">Delivered</div>
            <div class="stat-value text-green-500">{{ orderStats.delivered }}</div>
            <div class="stat-desc">Berhasil dikirim</div>
          </div>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-900">Daftar Pesanan</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Pelanggan</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id">
                <td>
                  <div class="flex items-center">
                    <span class="font-mono text-sm font-semibold">#{{ order.id }}</span>
                  </div>
                </td>
                <td>
                  <div class="flex items-center">
                    <div>
                      <div class="font-semibold text-gray-900">{{ order.customer_name || order.user?.name || 'Unknown' }}</div>
                      <div class="text-sm text-gray-600">{{ order.customer_email || order.user?.email || '' }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="font-semibold text-green-600">Rp {{ formatPrice(order.total_amount || order.total) }}</span>
                </td>
                <td>
                  <select 
                    :value="order.status" 
                    @change="updateOrderStatus(order, $event.target.value)"
                    class="select select-sm select-bordered"
                    :class="getStatusSelectClass(order.status)"
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="confirmed">✅ Confirmed</option>
                    <option value="processing">⚡ Processing</option>
                    <option value="shipped">🚚 Shipped</option>
                    <option value="delivered">📦 Delivered</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                </td>
                <td>
                  <span class="text-gray-600">{{ formatDate(order.created_at) }}</span>
                </td>
                <td>
                  <div class="flex space-x-2">
                    <button 
                      @click="viewOrderDetails(order)"
                      class="btn btn-sm btn-outline btn-info"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Detail
                    </button>
                    <button 
                      @click="deleteOrder(order)"
                      class="btn btn-sm btn-error btn-outline"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useAdminGuard } from '../composables/useAdminGuard.js'
import { orderService } from '../services/index.js'

export default {
  name: 'AdminOrders',
  setup() {
    const { checkAdminAccess } = useAdminGuard()
    
    const orders = ref([])
    const isLoading = ref(true)
    const error = ref('')

    // Computed properties for statistics
    const orderStats = computed(() => {
      const pending = orders.value.filter(order => order.status === 'pending').length
      const processing = orders.value.filter(order => order.status === 'processing' || order.status === 'confirmed').length
      const shipped = orders.value.filter(order => order.status === 'shipped').length
      const delivered = orders.value.filter(order => order.status === 'delivered').length
      const cancelled = orders.value.filter(order => order.status === 'cancelled').length

      return { pending, processing, shipped, delivered, cancelled }
    })

    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getStatusSelectClass = (status) => {
      const statusClasses = {
        'pending': 'select-warning',
        'confirmed': 'select-info',
        'processing': 'select-primary',
        'shipped': 'select-accent',
        'delivered': 'select-success',
        'cancelled': 'select-error'
      }
      return statusClasses[status] || 'select-bordered'
    }

    const viewOrderDetails = (order) => {
      // TODO: Implement order details modal or navigate to details page
      alert(`Detail pesanan #${order.id} akan ditampilkan di sini`)
    }

    const loadOrders = async () => {
      try {
        isLoading.value = true
        const result = await orderService.getAllOrders()
        
        if (result.success) {
          orders.value = result.data.data || result.data || []
        } else {
          error.value = result.error || 'Failed to load orders'
        }
      } catch (err) {
        console.error('Load orders error:', err)
        error.value = 'Failed to load orders'
      } finally {
        isLoading.value = false
      }
    }

    const updateOrderStatus = async (order, newStatus) => {
      try {
        const result = await orderService.updateOrderStatus(order.id, newStatus)
        
        if (result.success) {
          await loadOrders() // Reload orders
        } else {
          alert('Gagal mengupdate status pesanan: ' + result.error)
        }
      } catch (error) {
        console.error('Update status error:', error)
        alert('Gagal mengupdate status pesanan')
      }
    }

    const deleteOrder = async (order) => {
      if (!confirm(`Apakah Anda yakin ingin menghapus pesanan #${order.id}?`)) return

      try {
        const result = await orderService.deleteOrder(order.id)
        
        if (result.success) {
          await loadOrders() // Reload orders
        } else {
          alert('Gagal menghapus pesanan: ' + result.error)
        }
      } catch (error) {
        console.error('Delete order error:', error)
        alert('Gagal menghapus pesanan')
      }
    }

    onMounted(async () => {
      // Check admin access first
      if (!checkAdminAccess()) return
      
      // Load orders
      await loadOrders()
    })

    return {
      orders,
      orderStats,
      isLoading,
      error,
      formatPrice,
      formatDate,
      getStatusSelectClass,
      viewOrderDetails,
      updateOrderStatus,
      deleteOrder,
      loadOrders
    }
  }
}
</script>
