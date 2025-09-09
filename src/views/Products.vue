<template>
  <div class="min-h-screen bg-white pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-light text-gray-900 mb-4">Products</h1>
        <div class="w-16 h-1 bg-pink-500 mx-auto mb-6"></div>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto font-light">
          Discover our premium hijab collection with modern designs
        </p>
      </div>

      <!-- Filters -->
      <div class="mb-12 flex flex-wrap gap-4 justify-center">
        <div class="form-control">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search products..."
            class="input input-bordered w-full max-w-xs focus:border-pink-500 bg-white"
          />
        </div>
        <div class="form-control">
          <select 
            v-model="selectedCategory" 
            class="select select-bordered w-full max-w-xs focus:border-pink-500 bg-white"
          >
            <option value="">All Categories</option>
            <option value="hijab-segi-empat">Hijab Segi Empat</option>
            <option value="hijab-pashmina">Hijab Pashmina</option>
            <option value="hijab-instan">Hijab Instan</option>
            <option value="hijab-bergo">Hijab Bergo</option>
          </select>
        </div>
        <div class="form-control">
          <select 
            v-model="sortBy" 
            class="select select-bordered w-full max-w-xs focus:border-pink-500 bg-white"
          >
            <option value="name">Sort: Name</option>
            <option value="price_asc">Sort: Price (Low to High)</option>
            <option value="price_desc">Sort: Price (High to Low)</option>
            <option value="newest">Sort: Newest</option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <span class="loading loading-spinner loading-lg text-pink-500"></span>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-error max-w-md mx-auto mb-8 bg-red-50 border border-red-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-red-700">{{ errorMessage }}</span>
      </div>

      <!-- Products Grid with Pagination -->
      <div v-if="!isLoading && paginatedProducts.length > 0" class="space-y-8">
        <!-- Products Grid: 2 rows x 3 columns = 6 products per page -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="product in paginatedProducts" 
            :key="product.id"
            class="group cursor-pointer"
          >
            <!-- Product Image -->
            <div class="aspect-square overflow-hidden bg-gray-100 mb-6">
              <img 
                :src="getProductImage(product)" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            
            <!-- Product Info -->
            <div class="space-y-3">
              <h3 class="text-lg font-normal text-gray-900 group-hover:text-pink-500 transition-colors duration-300">
                {{ product.name }}
              </h3>
              <p class="text-gray-600 text-sm font-light line-clamp-2">
                {{ product.description }}
              </p>
              <div class="flex items-center justify-between">
                <div class="text-xl text-pink-500 font-light">
                  Rp {{ formatPrice(product.price) }}
                </div>
                <div v-if="product.stock > 0" class="text-sm text-gray-500">
                  Stock: {{ product.stock }}
                </div>
                <div v-else class="text-sm text-red-500">
                  Out of stock
                </div>
              </div>
              
              <!-- Add to Cart Button -->
              <button 
                @click="addToCart(product)"
                :disabled="product.stock === 0 || isAddingToCart[product.id]"
                class="w-full py-3 bg-gray-900 text-white hover:bg-pink-500 transition-colors duration-300 font-normal disabled:bg-gray-300 disabled:cursor-not-allowed"
                :class="{ 'loading': isAddingToCart[product.id] }"
              >
                <span v-if="!isAddingToCart[product.id]">
                  {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
                </span>
                <span v-else>Adding...</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-16" v-if="totalPages > 1">
          <div class="join">
            <button 
              class="join-item btn btn-outline"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              Previous
            </button>
            
            <button 
              v-for="page in visiblePages" 
              :key="page"
              class="join-item btn"
              :class="{ 'btn-active bg-pink-500 text-white border-pink-500': page === currentPage, 'btn-outline': page !== currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            
            <button 
              class="join-item btn btn-outline"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>

        <!-- Pagination Info -->
        <div class="text-center text-gray-500 text-sm" v-if="filteredProducts.length > 0">
          Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }} of {{ filteredProducts.length }} products
        </div>
      </div>

      <!-- No Products -->
      <div v-if="!isLoading && filteredProducts.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-normal text-gray-900 mb-2">No Products Found</h3>
        <p class="text-gray-600 font-light">Try adjusting your search filters</p>
      </div>

      <!-- Success Toast -->
      <div v-if="showSuccessToast" class="toast toast-top toast-end">
        <div class="alert alert-success bg-green-50 border border-green-200">
          <span class="text-green-700">Product added to cart successfully!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { productService } from '../services/index.js'
import { useCartStore } from '../stores/cart.js'
import { useAuthStore } from '../stores/auth.js'

export default {
  name: 'Products',
  setup() {
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    const products = ref([])
    const isLoading = ref(false)
    const errorMessage = ref('')
    const searchQuery = ref('')
    const selectedCategory = ref('')
    const sortBy = ref('name')
    const isAddingToCart = reactive({})
    const showSuccessToast = ref(false)

    // Pagination
    const currentPage = ref(1)
    const itemsPerPage = 6 // Maximum 6 products per page

    const defaultProductImage = '/images/Beranda-1.png'

    // Get product image with fallback
    const getProductImage = (product) => {
      // Use image_url if available (this is the complete URL from backend)
      if (product.image_url) {
        return product.image_url
      }
      // Fallback to image field for backward compatibility
      if (product.image) {
        // If image starts with http, use as is (external URL)
        if (product.image.startsWith('http')) {
          return product.image
        }
        // If image starts with /, use as local path
        if (product.image.startsWith('/')) {
          return product.image
        }
        // Otherwise, assume it's from storage (API)
        return `http://localhost:8000/storage/${product.image}`
      }
      return defaultProductImage
    }

    const filteredProducts = computed(() => {
      let filtered = products.value

      // Filter by search query
      if (searchQuery.value) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }

      // Filter by category
      if (selectedCategory.value) {
        filtered = filtered.filter(product => product.category === selectedCategory.value)
      }

      // Sort products
      switch (sortBy.value) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'newest':
          filtered.sort((a, b) => b.id - a.id)
          break
        default:
          filtered.sort((a, b) => a.name.localeCompare(b.name))
      }

      return filtered
    })

    // Pagination computed properties
    const totalPages = computed(() => {
      return Math.ceil(filteredProducts.value.length / itemsPerPage)
    })

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage
      const end = start + itemsPerPage
      return filteredProducts.value.slice(start, end)
    })

    const visiblePages = computed(() => {
      const total = totalPages.value
      const current = currentPage.value
      const pages = []

      if (total <= 7) {
        // Show all pages if total is 7 or less
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // Show first page
        pages.push(1)

        if (current > 4) {
          pages.push('...')
        }

        // Show pages around current page
        const start = Math.max(2, current - 2)
        const end = Math.min(total - 1, current + 2)

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (current < total - 3) {
          pages.push('...')
        }

        // Show last page
        if (total > 1) {
          pages.push(total)
        }
      }

      return pages.filter(page => page !== '...' || pages.indexOf(page) === pages.lastIndexOf(page))
    })

    // Pagination methods
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        // Scroll to top of products section
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    // Reset to first page when filters change
    watch([searchQuery, selectedCategory, sortBy], () => {
      currentPage.value = 1
    })

    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price)
    }

    const fetchProducts = async () => {
      isLoading.value = true
      errorMessage.value = ''

      try {
        const result = await productService.getProducts()
        if (result.success) {
          products.value = result.data.data || result.data
        } else {
          errorMessage.value = result.error || 'Failed to load products'
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        errorMessage.value = 'An error occurred while loading products'
      } finally {
        isLoading.value = false
      }
    }

    const addToCart = async (product) => {
      if (!authStore.isAuthenticated) {
        // Redirect to login if not authenticated
        alert('Silakan login terlebih dahulu untuk menambahkan produk ke keranjang')
        // You can add router navigation to login page here
        // router.push('/login')
        return
      }

      isAddingToCart[product.id] = true

      try {
        cartStore.addItem(product, 1)
        showSuccessToast.value = true
        setTimeout(() => {
          showSuccessToast.value = false
        }, 3000)
      } catch (error) {
        console.error('Error adding to cart:', error)
        alert('Gagal menambahkan produk ke keranjang')
      } finally {
        isAddingToCart[product.id] = false
      }
    }

    onMounted(() => {
      fetchProducts()
    })

    return {
      products,
      filteredProducts,
      paginatedProducts,
      isLoading,
      errorMessage,
      searchQuery,
      selectedCategory,
      sortBy,
      isAddingToCart,
      showSuccessToast,
      currentPage,
      totalPages,
      visiblePages,
      itemsPerPage,
      defaultProductImage,
      getProductImage,
      formatPrice,
      addToCart,
      goToPage
    }
  }
}
</script>
