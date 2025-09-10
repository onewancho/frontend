<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola inventori dan produk toko Anda</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              Total produk: {{ products.length }}
            </div>
            <button 
              @click="loadProducts" 
              :disabled="isPageLoading"
              class="btn btn-sm btn-outline btn-primary"
            >
              <svg v-if="!isPageLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <div v-else class="loading loading-spinner w-4 h-4 mr-2"></div>
              {{ isPageLoading ? 'Loading...' : 'Refresh' }}
            </button>
            <button @click="showCreateModal = true" class="btn btn-primary">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Tambah Produk
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isPageLoading && products.length === 0" class="flex justify-center items-center py-20">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <span class="ml-3 text-lg text-gray-600">Memuat data produk...</span>
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
            <div class="stat-value text-blue-500">{{ products.length }}</div>
            <div class="stat-desc">Semua produk</div>
          </div>
        </div>

        <!-- Active Products -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-green-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="stat-title">Produk Aktif</div>
            <div class="stat-value text-green-500">{{ products.filter(p => p.status === 'active').length }}</div>
            <div class="stat-desc">Siap dijual</div>
          </div>
        </div>

        <!-- Low Stock -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-red-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="stat-title">Stok Rendah</div>
            <div class="stat-value text-red-500">{{ products.filter(p => p.stock <= 10).length }}</div>
            <div class="stat-desc">Perlu restock</div>
          </div>
        </div>

        <!-- Average Price -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-purple-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="stat-title">Rata-rata Harga</div>
            <div class="stat-value text-purple-500 text-sm">
              {{ formatCurrency(calculateAveragePrice()) }}
            </div>
            <div class="stat-desc">Harga rata-rata</div>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-900">Inventory Produk</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>
                  <span class="font-mono text-sm font-semibold">#{{ product.id }}</span>
                </td>
                <td>
                  <div class="flex items-center">
                    <div class="avatar mr-3">
                      <div class="w-10 h-10 rounded-lg">
                        <img 
                          :src="getProductImageUrl(product)" 
                          :alt="product.name"
                          class="w-full h-full object-cover rounded-lg"
                          @error="handleImageError"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">{{ product.name }}</div>
                      <div class="text-sm text-gray-600">{{ product.description || 'Tidak ada deskripsi' }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span v-if="product.category" class="badge badge-outline badge-primary">
                    {{ product.category.name }}
                  </span>
                  <span v-else class="badge badge-ghost">
                    Tanpa kategori
                  </span>
                </td>
                <td>
                  <span class="font-semibold text-green-600">{{ formatCurrency(product.price) }}</span>
                </td>
                <td>
                  <div class="flex items-center">
                    <span :class="product.stock <= 10 ? 'text-red-600 font-bold' : 'text-gray-700'">
                      {{ product.stock }}
                    </span>
                    <svg v-if="product.stock <= 10" class="w-4 h-4 ml-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  </div>
                </td>
                <td>
                  <select 
                    :value="product.status" 
                    @change="updateProductStatus(product, $event.target.value)"
                    class="select select-sm select-bordered"
                    :class="product.status === 'active' ? 'select-success' : 'select-warning'"
                  >
                    <option value="active">✅ Aktif</option>
                    <option value="inactive">⏸️ Nonaktif</option>
                  </select>
                </td>
                <td>
                  <div class="flex space-x-2">
                    <button 
                      @click="editProduct(product)"
                      class="btn btn-sm btn-outline btn-info"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button 
                      @click="deleteProduct(product.id)"
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
              <tr v-if="products.length === 0">
                <td colspan="7" class="text-center py-8 text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                    <p>Belum ada produk</p>
                    <button @click="showCreateModal = true" class="btn btn-primary btn-sm mt-2">
                      Tambah Produk Pertama
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Product Modal -->
    <div class="modal" :class="{ 'modal-open': showCreateModal || showEditModal }">
      <div class="modal-box max-w-2xl">
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="font-bold text-lg text-gray-900">
            {{ showEditModal ? 'Edit Produk' : 'Tambah Produk Baru' }}
          </h3>
          <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitProduct" class="space-y-4 mt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Nama Produk</span>
              </label>
              <input 
                v-model="productForm.name" 
                type="text" 
                placeholder="Masukkan nama produk..." 
                class="input input-bordered"
                required
              >
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Kategori</span>
              </label>
              <select v-model="productForm.category_id" class="select select-bordered">
                <option value="">Pilih kategori...</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Harga</span>
              </label>
              <input 
                v-model="productForm.price" 
                type="number" 
                min="0" 
                step="0.01"
                placeholder="0"
                class="input input-bordered"
                required
              >
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Stok</span>
              </label>
              <input 
                v-model="productForm.stock" 
                type="number" 
                min="0"
                placeholder="0"
                class="input input-bordered"
                required
              >
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Deskripsi</span>
            </label>
            <textarea 
              v-model="productForm.description" 
              placeholder="Deskripsi produk (opsional)..."
              class="textarea textarea-bordered h-20"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Status</span>
            </label>
            <select v-model="productForm.status" class="select select-bordered">
              <option value="active">✅ Aktif</option>
              <option value="inactive">⏸️ Nonaktif</option>
            </select>
          </div>

          <div class="modal-action pt-4 border-t">
            <button type="button" @click="closeModal" class="btn btn-ghost">
              Batal
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
              {{ showEditModal ? 'Simpan Perubahan' : 'Tambah Produk' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Loading overlay -->
    <div v-if="isPageLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg">
        <div class="flex items-center gap-3">
          <span class="loading loading-spinner loading-md"></span>
          <span>Memuat data...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { productService, categoryService } from '../services/index.js'

export default {
  name: 'Products',
  setup() {
    const products = ref([])
    const categories = ref([])
    const isPageLoading = ref(false)
    const isLoading = ref(false)
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const editingProduct = ref(null)

    const productForm = ref({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category_id: '',
      status: 'active'
    })

    const formatCurrency = (amount) => {
      if (isNaN(amount) || amount === null || amount === undefined) {
        return 'Rp 0'
      }
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(amount)
    }

    const calculateAveragePrice = () => {
      if (products.value.length === 0) return 0
      
      const validPrices = products.value
        .map(p => parseFloat(p.price))
        .filter(price => !isNaN(price) && price > 0)
      
      if (validPrices.length === 0) return 0
      
      const sum = validPrices.reduce((total, price) => total + price, 0)
      return sum / validPrices.length
    }

    const getProductImageUrl = (product) => {
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
      
      // Fallback to local default image instead of Unsplash
      return '/images/Beranda-1.png'
    }

    const handleImageError = (event) => {
      // Fallback to local default image if image fails to load
      event.target.src = '/images/Beranda-1.png'
    }

    const loadProducts = async () => {
      isPageLoading.value = true
      try {
        const result = await productService.getAdminProducts()
        if (result.success) {
          products.value = result.data.data || []
        } else {
          console.error('Failed to load products:', result.error)
        }
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        isPageLoading.value = false
      }
    }

    const loadCategories = async () => {
      try {
        const result = await categoryService.getCategories()
        if (result.success) {
          categories.value = result.data.data || []
        } else {
          console.error('Failed to load categories:', result.error)
        }
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    const submitProduct = async () => {
      isLoading.value = true
      try {
        let result
        if (showEditModal.value && editingProduct.value) {
          result = await productService.updateProduct(editingProduct.value.id, productForm.value)
        } else {
          result = await productService.createProduct(productForm.value)
        }

        if (result.success) {
          await loadProducts()
          closeModal()
        } else {
          console.error('Failed to save product:', result.error)
        }
      } catch (error) {
        console.error('Error saving product:', error)
      } finally {
        isLoading.value = false
      }
    }

    const editProduct = (product) => {
      editingProduct.value = product
      productForm.value = {
        name: product.name,
        description: product.description || '',
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        status: product.status
      }
      showEditModal.value = true
    }

    const deleteProduct = async (id) => {
      if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
        try {
          const result = await productService.deleteProduct(id)
          if (result.success) {
            await loadProducts()
          } else {
            console.error('Failed to delete product:', result.error)
          }
        } catch (error) {
          console.error('Error deleting product:', error)
        }
      }
    }

    const updateProductStatus = async (product, newStatus) => {
      try {
        const updateData = { ...product, status: newStatus }
        const result = await productService.updateProduct(product.id, updateData)
        if (result.success) {
          await loadProducts()
        } else {
          console.error('Failed to update product status:', result.error)
        }
      } catch (error) {
        console.error('Error updating product status:', error)
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      showEditModal.value = false
      editingProduct.value = null
      productForm.value = {
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category_id: '',
        status: 'active'
      }
    }

    onMounted(async () => {
      await Promise.all([loadProducts(), loadCategories()])
    })

    return {
      products,
      categories,
      isPageLoading,
      isLoading,
      showCreateModal,
      showEditModal,
      productForm,
      formatCurrency,
      calculateAveragePrice,
      getProductImageUrl,
      handleImageError,
      submitProduct,
      editProduct,
      deleteProduct,
      updateProductStatus,
      closeModal,
      loadProducts
    }
  }
}
</script>