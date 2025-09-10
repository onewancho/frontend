<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Manajemen Pesanan</h1>
        <p class="text-gray-600 text-lg">Kelola pesanan Anda dengan mudah</p>
      </div>



      <!-- Tabs -->
      <div class="tabs tabs-boxed bg-white p-1 shadow-sm mb-8 max-w-md mx-auto">
        <button 
          @click="activeTab = 'cart'"
          :class="{ 'tab-active': activeTab === 'cart' }"
          class="tab tab-lg flex-1"
        >
          Keranjang ({{ cartStore.itemCount }})
        </button>
        <button 
          @click="activeTab = 'orders'"
          :class="{ 'tab-active': activeTab === 'orders' }"
          class="tab tab-lg flex-1"
        >
          Riwayat Pesanan
        </button>
      </div>

      <!-- Cart Tab -->
      <div v-if="activeTab === 'cart'" class="max-w-4xl mx-auto">
        <!-- Empty Cart -->
        <div v-if="cartStore.items.length === 0" class="text-center bg-white rounded-lg shadow-sm p-12">
          <div class="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Keranjang Kosong</h3>
          <p class="text-gray-600 mb-6">Belum ada produk dalam keranjang Anda</p>
          <router-link to="/products" class="btn btn-primary bg-pink-500 hover:bg-pink-600 border-pink-500">
            Mulai Belanja
          </router-link>
        </div>

        <!-- Cart Items -->
        <div v-else class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Keranjang Belanja</h2>
          
          <!-- Cart Item List -->
          <div class="space-y-4 mb-6">
            <div 
              v-for="item in cartStore.items" 
              :key="item.id"
              class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
            >
              <img 
                :src="item.image || defaultProductImage" 
                :alt="item.name"
                class="w-16 h-16 object-cover rounded-lg"
              >
              <div class="flex-1">
                <h4 class="font-semibold text-gray-900">{{ item.name }}</h4>
                <p class="text-pink-500 font-semibold">Rp {{ formatPrice(item.price) }}</p>
              </div>
              <div class="flex items-center space-x-2">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="btn btn-sm btn-outline"
                >
                  -
                </button>
                <span class="w-12 text-center">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="btn btn-sm btn-outline"
                >
                  +
                </button>
                <button 
                  @click="removeFromCart(item.id)"
                  class="btn btn-sm btn-error ml-4"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>

          <!-- Checkout Form -->
          <div class="border-t pt-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="label">
                  <span class="label-text font-semibold">Alamat Pengiriman</span>
                </label>
                <textarea 
                  v-model="shippingAddress"
                  class="textarea textarea-bordered w-full"
                  placeholder="Masukkan alamat lengkap untuk pengiriman"
                  rows="3"
                ></textarea>
              </div>
              <div class="space-y-4">
                <div class="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span class="font-semibold">Rp {{ formatPrice(cartStore.total) }}</span>
                </div>
                <div class="flex justify-between text-lg">
                  <span>Ongkos Kirim:</span>
                  <span class="font-semibold">Rp {{ formatPrice(shippingCost) }}</span>
                </div>
                <div class="flex justify-between text-xl font-bold text-pink-500 border-t pt-2">
                  <span>Total:</span>
                  <span>Rp {{ formatPrice(cartStore.total + shippingCost) }}</span>
                </div>
                <button 
                  @click="processCheckout"
                  :disabled="isProcessingOrder || !shippingAddress.trim()"
                  class="btn btn-primary bg-pink-500 hover:bg-pink-600 border-pink-500 w-full"
                >
                  <span v-if="isProcessingOrder" class="loading loading-spinner"></span>
                  {{ isProcessingOrder ? 'Memproses...' : 'Checkout' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Orders Tab -->
      <div v-if="activeTab === 'orders'" class="max-w-4xl mx-auto">
        <!-- Authentication Required -->
        <div v-if="!authStore.isAuthenticated" class="text-center bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <div class="text-yellow-600 text-6xl mb-4">🔐</div>
          <h3 class="text-xl font-semibold text-yellow-800 mb-2">Login Diperlukan</h3>
          <p class="text-yellow-700 mb-4">Silakan login terlebih dahulu untuk melihat riwayat pesanan</p>
          <router-link to="/login" class="btn btn-primary bg-pink-500 hover:bg-pink-600 border-pink-500">
            Login Sekarang
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-else-if="isLoadingOrders" class="text-center py-12">
          <div class="loading loading-spinner loading-lg text-pink-500"></div>
          <p class="mt-4 text-gray-600">Memuat riwayat pesanan...</p>
        </div>

        <!-- No Orders -->
        <div v-else-if="orders.length === 0" class="text-center bg-white rounded-lg shadow-sm p-12">
          <div class="text-gray-400 text-6xl mb-4">📦</div>
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Belum Ada Pesanan</h3>
          <p class="text-gray-600 mb-6">Anda belum memiliki riwayat pesanan</p>
          <button @click="activeTab = 'cart'" class="btn btn-primary bg-pink-500 hover:bg-pink-600 border-pink-500">
            Mulai Belanja
          </button>
        </div>

        <!-- Orders List -->
        <div v-else class="space-y-4">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Riwayat Pesanan</h2>
            <p class="text-gray-600">{{ orders.length }} pesanan ditemukan</p>
          </div>

          <div 
            v-for="order in orders" 
            :key="order.id"
            class="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Order #{{ order.id }}</h3>
                <p class="text-sm text-gray-600">{{ formatDate(order.created_at) }}</p>
              </div>
              <div class="text-right">
                <span 
                  class="badge"
                  :class="getStatusBadgeClass(order.status)"
                >
                  {{ getStatusText(order.status) }}
                </span>
              </div>
            </div>

            <!-- Order Items -->
            <div class="space-y-2 mb-4">
              <div 
                v-for="item in order.order_items || order.items || []" 
                :key="item.id"
                class="flex justify-between items-center text-sm"
              >
                <span>{{ item.product?.name || item.product_name || 'Produk' }} x{{ item.quantity }}</span>
                <span class="font-semibold">Rp {{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>

            <div class="border-t pt-4">
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-lg font-semibold text-pink-500">
                    Total: Rp {{ formatPrice(order.total_amount || order.total) }}
                  </p>
                  <p v-if="order.shipping_address" class="text-sm text-gray-600 mt-1">
                    Alamat: {{ order.shipping_address }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccessModal" class="modal modal-open">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-center mb-4">Pesanan Berhasil!</h3>
          <div class="text-center">
            <div class="text-6xl mb-4">✅</div>
            <p class="mb-6">Pesanan Anda telah berhasil diproses dan disimpan ke database.</p>
          </div>
          <div class="modal-action justify-center">
            <button @click="closeSuccessModal" class="btn btn-primary bg-pink-500 hover:bg-pink-600 border-pink-500">
              Lihat Riwayat Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import { useAuthStore } from '../stores/auth.js'
import { orderService } from '../services/index.js'

export default {
  name: 'Orders',
  setup() {
    const route = useRoute()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    
    // Set initial tab based on query parameter
    const initialTab = route.query.tab === 'cart' ? 'cart' : 'cart'
    
    // Reactive data
    const activeTab = ref(initialTab)
    const shippingAddress = ref('')
    const shippingCost = ref(15000)
    const isProcessingOrder = ref(false)
    const isLoadingOrders = ref(false)
    const orders = ref([])
    const showSuccessModal = ref(false)

    const defaultProductImage = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'

    // Utility functions
    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price || 0)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getStatusText = (status) => {
      const statusMap = {
        'pending': 'Menunggu',
        'confirmed': 'Dikonfirmasi',
        'processing': 'Diproses',
        'shipping': 'Dikirim',
        'delivered': 'Diterima',
        'cancelled': 'Dibatalkan',
        'completed': 'Selesai'
      }
      return statusMap[status] || status
    }

    const getStatusBadgeClass = (status) => {
      const classMap = {
        'pending': 'badge-warning',
        'confirmed': 'badge-info',
        'processing': 'badge-info',
        'shipping': 'badge-primary',
        'delivered': 'badge-success',
        'cancelled': 'badge-error',
        'completed': 'badge-success'
      }
      return classMap[status] || 'badge-neutral'
    }

    // Cart functions
    const updateQuantity = (productId, newQuantity) => {
      cartStore.updateQuantity(productId, newQuantity)
    }

    const removeFromCart = (productId) => {
      cartStore.removeItem(productId)
    }

    // API functions with orderService instead of direct fetch
    const fetchOrders = async () => {
      if (!authStore.isAuthenticated) {
        orders.value = []
        return
      }

      isLoadingOrders.value = true

      try {
        const result = await orderService.getOrders()
        
        if (result.success) {
          orders.value = result.data || []
        } else {
          orders.value = []
          alert(`Gagal memuat riwayat pesanan: ${result.error}`)
        }
      } catch (error) {
        console.error('💥 Error fetching orders:', error)
        orders.value = []
        alert('Terjadi kesalahan saat memuat riwayat pesanan')
      } finally {
        isLoadingOrders.value = false
      }
    }

    const processCheckout = async () => {
      if (!authStore.isAuthenticated) {
        alert('Silakan login terlebih dahulu')
        return
      }

      if (!shippingAddress.value.trim()) {
        alert('Silakan masukkan alamat pengiriman')
        return
      }

      if (cartStore.items.length === 0) {
        alert('Keranjang kosong')
        return
      }

      isProcessingOrder.value = true

      try {
        const orderData = {
          items: cartStore.items.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          shipping_address: shippingAddress.value.trim(),
          shipping_cost: shippingCost.value,
          total: cartStore.total + shippingCost.value
        }

        // Use orderService for checkout
        const result = await orderService.createOrder(orderData)

        if (result.success) {
          // Clear cart and reset form
          cartStore.clearCart()
          shippingAddress.value = ''
          
          // Show success modal
          showSuccessModal.value = true
        } else {
          alert(`Gagal memproses pesanan: ${result.error}`)
        }
      } catch (error) {
        console.error('Checkout error:', error)
        alert('Terjadi kesalahan saat memproses pesanan')
      } finally {
        isProcessingOrder.value = false
      }
    }

    const refreshOrders = () => {
      fetchOrders()
    }

    const closeSuccessModal = () => {
      showSuccessModal.value = false
      activeTab.value = 'orders'
      fetchOrders()
    }

    // Lifecycle hooks
    onMounted(async () => {
      // Initialize cart store
      cartStore.init()
      
      // Initialize auth store
      await authStore.init()
      
      // Wait a bit for auth to settle, then fetch orders if authenticated
      setTimeout(() => {
        if (authStore.isAuthenticated && activeTab.value === 'orders') {
          fetchOrders()
        }
      }, 500)
    })

    // Watchers
    watch(() => authStore.isAuthenticated, (newValue) => {
      if (newValue && activeTab.value === 'orders') {
        fetchOrders()
      } else if (!newValue) {
        orders.value = []
      }
    })

    watch(activeTab, (newTab) => {
      if (newTab === 'orders' && authStore.isAuthenticated) {
        fetchOrders()
      }
    })

    // Watch for route query changes to handle cart navigation
    watch(() => route.query.tab, (newTab) => {
      if (newTab === 'cart') {
        activeTab.value = 'cart'
      }
    })

    return {
      // Stores
      cartStore,
      authStore,
      
      // Data
      activeTab,
      shippingAddress,
      shippingCost,
      isProcessingOrder,
      isLoadingOrders,
      orders,
      showSuccessModal,
      defaultProductImage,
      
      // Methods
      formatPrice,
      formatDate,
      getStatusText,
      getStatusBadgeClass,
      updateQuantity,
      removeFromCart,
      fetchOrders,
      processCheckout,
      refreshOrders,
      closeSuccessModal
    }
  }
}
</script>

<style scoped>
.modal-open {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>