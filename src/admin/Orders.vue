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
              Total      }
    }

    onMounted(async () => {.length }}
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

    <!-- Order Detail Modal -->
    <div class="modal" :class="{ 'modal-open': showDetailModal }">
      <div class="modal-box w-full max-w-6xl h-full max-h-screen p-0 m-0 rounded-none">
        <div v-if="selectedOrder" class="h-full flex flex-col">
          <!-- Header -->
          <div class="bg-white border-b border-gray-200 px-6 py-4">
            <div class="flex items-center justify-between">
              <h1 class="text-2xl font-bold text-gray-900">Detail Pesanan #{{ selectedOrder.id }}</h1>
              <button @click="closeDetailModal" class="btn btn-ghost">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Kembali ke Pesanan
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-auto bg-gray-50 p-6">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left Column - Order Info -->
              <div class="lg:col-span-2 space-y-6">
                <!-- Informasi Pesanan -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Pesanan</h3>
                  <div class="grid grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">ID Pesanan</label>
                      <p class="text-lg font-mono font-semibold text-gray-900">#{{ String(selectedOrder.id).padStart(6, '0') }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Pesanan</label>
                      <p class="text-gray-900">{{ formatOrderDate(selectedOrder.created_at) }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span :class="getOrderStatusClass(selectedOrder.status)" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                        {{ getOrderStatusText(selectedOrder.status) }}
                      </span>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Total Harga</label>
                      <p class="text-xl font-bold text-green-600">Rp {{ formatPrice(selectedOrder.total) }}</p>
                    </div>
                  </div>
                </div>

                <!-- Informasi Pelanggan -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Pelanggan</h3>
                  <div class="grid grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                      <p class="text-gray-900">{{ selectedOrder.user?.name || selectedOrder.customer_name || 'Admin Ravaya' }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p class="text-gray-900">{{ selectedOrder.user?.email || selectedOrder.customer_email || 'admin@ravayahijab.com' }}</p>
                    </div>
                  </div>
                </div>

                <!-- Item Pesanan -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Item Pesanan</h3>
                  <div class="overflow-x-auto">
                    <table class="table w-full">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="text-left font-medium text-gray-700">Produk</th>
                          <th class="text-left font-medium text-gray-700">Harga</th>
                          <th class="text-left font-medium text-gray-700">Jumlah</th>
                          <th class="text-left font-medium text-gray-700">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in getOrderItems(selectedOrder)" :key="item.id" class="border-b border-gray-100">
                          <td class="py-4">
                            <div class="flex items-center">
                              <img 
                                :src="getProductImageUrl(item.product || item)" 
                                :alt="item.product?.name || item.name"
                                class="w-12 h-12 rounded-lg object-cover mr-3"
                                @error="handleImageError"
                              >
                              <div>
                                <p class="font-medium text-gray-900">{{ item.product?.name || item.name || 'Hijab Sport Breathable' }}</p>
                                <p class="text-sm text-gray-500">{{ item.product?.category?.name || 'Hijab Sport' }}</p>
                              </div>
                            </div>
                          </td>
                          <td class="py-4">
                            <span class="font-medium text-gray-900">Rp {{ formatPrice(item.price || item.product?.price || 60000) }}</span>
                          </td>
                          <td class="py-4">
                            <span class="font-medium text-gray-700">{{ item.quantity || 1 }}</span>
                          </td>
                          <td class="py-4">
                            <span class="font-medium text-gray-900">Rp {{ formatPrice((item.price || item.product?.price || 60000) * (item.quantity || 1)) }}</span>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot class="bg-gray-50">
                        <tr>
                          <td colspan="3" class="py-4 text-right font-semibold text-gray-900">Total</td>
                          <td class="py-4 font-bold text-lg text-gray-900">Rp {{ formatPrice(selectedOrder.total) }}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Right Column - Actions & Timeline -->
              <div class="lg:col-span-1 space-y-6">
                <!-- Aksi Pesanan -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Aksi Pesanan</h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">Status saat ini:</span>
                      <span :class="getOrderStatusClass(selectedOrder.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                        {{ getOrderStatusText(selectedOrder.status) }}
                      </span>
                    </div>
                    
                    <div class="space-y-2">
                      <button 
                        @click="updateOrderStatus(selectedOrder, 'processing')"
                        :disabled="selectedOrder.status === 'processing'"
                        class="btn btn-warning w-full"
                        :class="{ 'btn-disabled': selectedOrder.status === 'processing' }"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Ubah ke Menunggu
                      </button>
                      
                      <button 
                        @click="updateOrderStatus(selectedOrder, 'shipping')"
                        :disabled="selectedOrder.status === 'shipping'"
                        class="btn btn-info w-full"
                        :class="{ 'btn-disabled': selectedOrder.status === 'shipping' }"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                        </svg>
                        Ubah ke Sedang Diproses
                      </button>
                      
                      <button 
                        @click="updateOrderStatus(selectedOrder, 'delivered')"
                        :disabled="selectedOrder.status === 'delivered'"
                        class="btn btn-success w-full"
                        :class="{ 'btn-disabled': selectedOrder.status === 'delivered' }"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Ubah ke Sudah Diterima
                      </button>
                      
                      <button 
                        @click="updateOrderStatus(selectedOrder, 'cancelled')"
                        :disabled="selectedOrder.status === 'cancelled'"
                        class="btn btn-error w-full"
                        :class="{ 'btn-disabled': selectedOrder.status === 'cancelled' }"
                      >
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Batalkan Pesanan
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Riwayat Pesanan -->
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">Riwayat Pesanan</h3>
                  <div class="space-y-4">
                    <div class="flex items-start">
                      <div class="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">Pesanan Dibuat</p>
                        <p class="text-xs text-gray-500">{{ formatOrderDate(selectedOrder.created_at) }}</p>
                      </div>
                    </div>
                    
                    <div v-if="selectedOrder.status !== 'pending'" class="flex items-start">
                      <div class="flex-shrink-0 w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">Sedang Diproses</p>
                        <p class="text-xs text-gray-500">{{ formatOrderDate(selectedOrder.created_at) }}</p>
                      </div>
                    </div>
                    
                    <div v-if="selectedOrder.status === 'delivered'" class="flex items-start">
                      <div class="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">Dikirim</p>
                        <p class="text-xs text-gray-500">{{ formatOrderDate(selectedOrder.created_at) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    const showDetailModal = ref(false)
    const selectedOrder = ref(null)

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
      selectedOrder.value = order
      showDetailModal.value = true
    }

    const closeDetailModal = () => {
      showDetailModal.value = false
      selectedOrder.value = null
    }

    const formatOrderDate = (dateString) => {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getOrderStatusText = (status) => {
      const statusTexts = {
        'pending': 'Dikirim',
        'processing': 'Sedang Diproses', 
        'shipping': 'Sedang Diproses',
        'delivered': 'Dikirim',
        'cancelled': 'Dibatalkan'
      }
      return statusTexts[status] || status
    }

    const getOrderStatusClass = (status) => {
      const statusClasses = {
        'pending': 'bg-blue-100 text-blue-800',
        'processing': 'bg-yellow-100 text-yellow-800',
        'shipping': 'bg-blue-100 text-blue-800', 
        'delivered': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    }

    const getOrderItems = (order) => {
      // If order has items array, use it; otherwise create mock items based on order data
      if (order.items && order.items.length > 0) {
        return order.items
      }
      
      // Create mock items for display (you can modify this based on your actual data structure)
      return [
        {
          id: 1,
          name: 'Hijab Sport Breathable',
          price: 60000,
          quantity: 1,
          product: {
            name: 'Hijab Sport Breathable',
            image: 'hijab-sport.jpg',
            category: { name: 'Hijab Sport' }
          }
        },
        {
          id: 2, 
          name: 'Hijab Segi Empat Motif Bunga',
          price: 55000,
          quantity: 1,
          product: {
            name: 'Hijab Segi Empat Motif Bunga',
            image: 'hijab-segi-empat.jpg',
            category: { name: 'Hijab Segi Empat' }
          }
        }
      ]
    }

    const getProductImageUrl = (product) => {
      if (product && product.image) {
        if (product.image.startsWith('http')) {
          return product.image
        }
        let imagePath = product.image.replace(/^\/+/, '').replace(/^storage\//, '').replace(/^products\//, '')
        if (imagePath.startsWith('files/products/')) {
          return `https://backend-ravayahijab.up.railway.app/${imagePath}`
        }
        return `https://backend-ravayahijab.up.railway.app/files/products/${imagePath}`
      }
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNS44MzMzIDMzLjMzMzNDMzUuODMzMyAzMC4xIDM4LjQzMzMgMjcuNSA0MS42NjY3IDI3LjVDNDUgMjcuNSA0Ny41IDMwLjEgNDcuNSAzMy4zMzMzQzQ3LjUgMzYuNjY2NyA0NSAzOS4xNjY3IDQxLjY2NjcgMzkuMTY2N0MzOC40MzMzIDM5LjE2NjcgMzUuODMzMyAzNi42NjY3IDM1LjgzMzMgMzMuMzMzM1oiIGZpbGw9IiM5Q0E5QTYiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNS41IDQ1LjgzMzNINzQuNUw2OS4xNjY3IDY2LjY2NjdIMzAuODMzM0wyNS41IDQ1LjgzMzNaIiBmaWxsPSIjOUNBOUE2Ii8+Cjwvc3ZnPgo='
    }

    const handleImageError = (event) => {
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNS44MzMzIDMzLjMzMzNDMzUuODMzMyAzMC4xIDM4LjQzMzMgMjcuNSA0MS42NjY3IDI3LjVDNDUgMjcuNSA0Ny41IDMwLjEgNDcuNSAzMy4zMzMzQzQ3LjUgMzYuNjY2NyA0NSAzOS4xNjY3IDQxLjY2NjcgMzkuMTY2N0MzOC40MzMzIDM5LjE2NjcgMzUuODMzMyAzNi42NjY3IDM1LjgzMzMgMzMuMzMzM1oiIGZpbGw9IiM5Q0E5QTYiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNS41IDQ1LjgzMzNINzQuNUw2OS4xNjY3IDY2LjY2NjdIMzAuODMzM0wyNS41IDQ1LjgzMzNaIiBmaWxsPSIjOUNBOUE2Ii8+Cjwvc3ZnPgo='
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
      showDetailModal,
      selectedOrder,
      formatPrice,
      formatDate,
      formatOrderDate,
      getStatusSelectClass,
      getOrderStatusText,
      getOrderStatusClass,
      getOrderItems,
      getProductImageUrl,
      handleImageError,
      viewOrderDetails,
      closeDetailModal,
      updateOrderStatus,
      deleteOrder,
      loadOrders
    }
  }
}
</script>
