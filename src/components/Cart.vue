<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Keranjang Belanja</h1>
    
    <div v-if="cartItems.length === 0" class="text-center py-16">
      <div class="text-6xl mb-4">🛒</div>
      <h2 class="text-2xl font-bold mb-4">Keranjang Anda Kosong</h2>
      <p class="mb-6">Belum ada produk yang ditambahkan ke keranjang</p>
      <router-link to="/products" class="btn btn-primary">Belanja Sekarang</router-link>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div v-for="item in cartItems" :key="item.id" class="card bg-base-100 shadow-sm mb-4">
          <div class="card-body">
            <div class="flex items-center gap-4">
              <img 
                :src="getProductImage(item)" 
                :alt="item.name" 
                class="w-20 h-20 rounded object-cover"
                @error="handleImageError"
              />
              <div class="flex-1">
                <h3 class="font-bold">{{ item.name }}</h3>
                <p class="text-sm opacity-70">{{ item.description.substring(0, 80) }}...</p>
                <div class="text-lg font-bold text-primary">Rp {{ formatPrice(item.price) }}</div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="decreaseQty(item)" class="btn btn-sm btn-outline">-</button>
                <span class="px-4 py-2 border rounded">{{ item.qty }}</span>
                <button @click="increaseQty(item)" class="btn btn-sm btn-outline">+</button>
              </div>
              <div class="text-lg font-bold">Rp {{ formatPrice(item.price * item.qty) }}</div>
              <button @click="removeItem(item)" class="btn btn-sm btn-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-sm sticky top-4">
          <div class="card-body">
            <h3 class="card-title">Ringkasan Pesanan</h3>
            
            <div class="divider"></div>
            
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>Subtotal ({{ totalItems }} item)</span>
                <span>Rp {{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span>Ongkos Kirim</span>
                <span>Rp {{ formatPrice(shippingCost) }}</span>
              </div>
            </div>
            
            <div class="divider"></div>
            
            <div class="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span class="text-primary">Rp {{ formatPrice(total) }}</span>
            </div>
            
            <button @click="checkout" class="btn btn-primary w-full mt-4">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      shippingCost: 15000,
      cartItems: [
        {
          id: 1,
          name: 'Hijab Segi Empat Voal Polos',
          price: 45000,
          description: 'Hijab segi empat dengan bahan voal premium, nyaman dan adem untuk digunakan sehari-hari',
          qty: 2
        },
        {
          id: 2,
          name: 'Pashmina Ceruti Premium',
          price: 75000,
          description: 'Pashmina dengan bahan ceruti premium yang halus dan tidak mudah kusut',
          qty: 1
        }
      ]
    }
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.qty, 0);
    },
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
    },
    total() {
      return this.subtotal + this.shippingCost;
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price);
    },
    getProductImage(product) {
      // Use image_url if available (this is the complete URL from backend)
      if (product.image_url) {
        return product.image_url
      }
      
      // Use image field if available
      if (product.image) {
        // If image is already a full URL, use it as is
        if (product.image.startsWith('http')) {
          return product.image
        }
        
        // If image starts with /, use as local path
        if (product.image.startsWith('/')) {
          return product.image
        }
        
        // Otherwise, assume it's from storage (API)
        return `https://backend-production-1895.up.railway.app/storage/${product.image}`
      }
      
      // Fallback to local default image
      return '/images/Beranda-1.png'
    },
    handleImageError(event) {
      // Fallback to local default image if image fails to load
      event.target.src = '/images/Beranda-1.png'
    },
    increaseQty(item) {
      item.qty++;
    },
    decreaseQty(item) {
      if (item.qty > 1) {
        item.qty--;
      }
    },
    removeItem(item) {
      const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
    },
    checkout() {
      // TODO: Implement checkout functionality
      alert('Fitur checkout akan segera tersedia!');
    }
  }
}
</script>
