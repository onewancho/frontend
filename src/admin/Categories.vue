<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Manajemen Kategori</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola kategori produk untuk mengorganisir toko Anda</p>
          </div>
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-500">
              Total kategori: {{ categories.length }}
            </div>
            <button 
              @click="loadCategories" 
              :disabled="isLoading"
              class="btn btn-sm btn-outline btn-primary"
            >
              <svg v-if="!isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <div v-else class="loading loading-spinner w-4 h-4 mr-2"></div>
              {{ isLoading ? 'Loading...' : 'Refresh' }}
            </button>
            <button @click="showCreateModal = true" class="btn btn-primary">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Tambah Kategori
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isPageLoading && categories.length === 0" class="flex justify-center items-center py-20">
      <div class="loading loading-spinner loading-lg text-primary"></div>
      <span class="ml-3 text-lg text-gray-600">Memuat data kategori...</span>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Total Categories -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-blue-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <div class="stat-title">Total Kategori</div>
            <div class="stat-value text-blue-500">{{ categories.length }}</div>
            <div class="stat-desc">Semua kategori produk</div>
          </div>
        </div>

        <!-- Active Categories -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-green-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="stat-title">Kategori Aktif</div>
            <div class="stat-value text-green-500">{{ categories.filter(c => c.status === 'active').length }}</div>
            <div class="stat-desc">Sedang digunakan</div>
          </div>
        </div>

        <!-- Inactive Categories -->
        <div class="stats shadow bg-white border border-gray-200">
          <div class="stat">
            <div class="stat-figure text-yellow-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="stat-title">Tidak Aktif</div>
            <div class="stat-value text-yellow-500">{{ categories.filter(c => c.status === 'inactive').length }}</div>
            <div class="stat-desc">Dinonaktifkan</div>
          </div>
        </div>
      </div>

      <!-- Categories Table -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b bg-gray-50">
          <h3 class="text-lg font-semibold text-gray-900">Daftar Kategori</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kategori</th>
                <th>Deskripsi</th>
                <th>Jumlah Produk</th>
                <th>Tanggal Dibuat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(category, index) in categories" :key="category.id">
                <td>
                  <span class="font-mono text-sm font-semibold">{{ index + 1 }}</span>
                </td>
                <td>
                  <div class="flex items-center">
                    <div>
                      <div class="font-semibold text-gray-900">{{ category.name }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="text-gray-600">{{ category.description || 'Tidak ada deskripsi' }}</span>
                </td>
                <td>
                  <div class="flex items-center">
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {{ category.products_count || 0 }} produk
                    </span>
                  </div>
                </td>
                <td>
                  <span class="text-sm text-gray-600">{{ formatDate(category.created_at) }}</span>
                </td>
                <td>
                  <div class="flex space-x-2">
                    <button 
                      @click="viewCategory(category)"
                      class="btn btn-sm btn-outline btn-primary"
                      title="Lihat Detail"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      Lihat
                    </button>
                    <button 
                      @click="editCategory(category)"
                      class="btn btn-sm btn-outline btn-info"
                      title="Edit Kategori"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button 
                      @click="deleteCategory(category.id)"
                      class="btn btn-sm btn-error btn-outline"
                      title="Hapus Kategori"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="categories.length === 0">
                <td colspan="5" class="text-center py-8 text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <p>Belum ada kategori</p>
                    <button @click="showCreateModal = true" class="btn btn-primary btn-sm mt-2">
                      Tambah Kategori Pertama
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div class="modal" :class="{ 'modal-open': showCreateModal || showEditModal }">
      <div class="modal-box max-w-xl">
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="font-bold text-xl text-gray-900">
            {{ showEditModal ? '✏️ Edit Kategori' : '➕ Tambah Kategori Baru' }}
          </h3>
          <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitCategory" class="py-6 space-y-6">
          <!-- Category Name -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold text-gray-700">📝 Nama Kategori</span>
              <span class="label-text-alt text-red-500 font-bold">*</span>
            </label>
            <input 
              v-model="categoryForm.name" 
              type="text" 
              class="input input-bordered input-lg focus:border-primary focus:outline-none"
              placeholder="Masukkan nama kategori..."
              required
            >
          </div>

          <!-- Description -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-semibold text-gray-700">📄 Deskripsi</span>
              <span class="label-text-alt text-gray-400">Opsional</span>
            </label>
            <textarea 
              v-model="categoryForm.description" 
              class="textarea textarea-bordered textarea-lg focus:border-primary focus:outline-none h-28"
              placeholder="Jelaskan kategori ini untuk memudahkan pengelolaan..."
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button type="button" @click="closeModal" class="btn btn-lg">
              ❌ Batal
            </button>
            <button type="submit" class="btn btn-primary btn-lg" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner loading-sm mr-2"></span>
              <span v-else>{{ showEditModal ? '💾 Simpan Perubahan' : '✅ Tambah Kategori' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Category Modal -->
    <div class="modal" :class="{ 'modal-open': showViewModal }">
      <div class="modal-box max-w-4xl">
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="font-bold text-2xl text-gray-900">🏷️ Detail Kategori</h3>
          <button @click="closeViewModal" class="btn btn-sm btn-circle btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="viewingCategory" class="py-6 space-y-8">
          <!-- Category Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Basic Info -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-blue-700 mb-1">🆔 ID Kategori</label>
                  <div class="text-xl font-bold text-blue-900">#{{ viewingCategory.id }}</div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-blue-700 mb-1">📝 Nama Kategori</label>
                  <div class="text-xl font-bold text-blue-900">{{ viewingCategory.name }}</div>
                </div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-green-700 mb-1">📦 Jumlah Produk</label>
                  <div class="text-3xl font-bold text-green-800">
                    {{ (categoryProducts && categoryProducts.length) || viewingCategory.products_count || 0 }}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-green-700 mb-1">📅 Tanggal Dibuat</label>
                  <div class="text-sm text-green-700">{{ formatDate(viewingCategory.created_at) }}</div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
              <label class="block text-sm font-medium text-purple-700 mb-2">📄 Deskripsi</label>
              <p class="text-purple-800">
                {{ viewingCategory.description || 'Tidak ada deskripsi untuk kategori ini.' }}
              </p>
            </div>
          </div>

          <!-- Products Section -->
          <div v-if="loadingProducts" class="text-center py-8">
            <div class="loading loading-spinner loading-lg text-primary"></div>
            <p class="mt-2 text-gray-600">Memuat produk kategori...</p>
          </div>

          <div v-else-if="categoryProducts && categoryProducts.length > 0">
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-xl font-bold text-gray-900">🛍️ Produk dalam Kategori</h4>
              <span class="badge badge-primary badge-lg">{{ categoryProducts.length }} produk</span>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="product in categoryProducts" 
                :key="product.id"
                class="card bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <figure class="px-4 pt-4">
                  <img 
                    :src="getProductImageUrl(product)" 
                    :alt="product.name"
                    class="rounded-xl w-full h-32 object-cover"
                    @error="handleImageError"
                  >
                </figure>
                <div class="card-body p-4">
                  <h5 class="card-title text-sm font-semibold text-gray-900 line-clamp-2">
                    {{ product.name }}
                  </h5>
                  <div class="flex justify-between items-center mt-2">
                    <span class="text-lg font-bold text-primary">
                      Rp {{ formatPrice(product.price) }}
                    </span>
                    <span class="text-xs text-gray-500">
                      Stok: {{ product.stock || 0 }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-12 bg-gray-50 rounded-xl">
            <div class="text-6xl mb-4">📦</div>
            <h4 class="text-xl font-semibold text-gray-700 mb-2">Belum Ada Produk</h4>
            <p class="text-gray-500">Kategori ini belum memiliki produk apapun.</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-6 border-t">
            <button @click="closeViewModal" class="btn btn-lg">
              ❌ Tutup
            </button>
            <button @click="editFromView(viewingCategory)" class="btn btn-primary btn-lg">
              ✏️ Edit Kategori
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { categoryService } from '../services/index.js'

export default {
  name: 'Categories',
  setup() {
    const categories = ref([])
    const isPageLoading = ref(false)
    const isLoading = ref(false)
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const showViewModal = ref(false)
    const editingCategory = ref(null)
    const viewingCategory = ref(null)
    const categoryProducts = ref([])
    const loadingProducts = ref(false)

    const categoryForm = ref({
      name: '',
      description: '',
      status: 'active'
    })

    const loadCategories = async () => {
      isPageLoading.value = true
      try {
        console.log('Loading categories...')
        const result = await categoryService.getCategories()
        console.log('Categories result:', result)
        
        if (result.success) {
          categories.value = result.data.data || result.data || []
          console.log('Categories loaded:', categories.value)
        } else {
          console.error('Failed to load categories:', result.error)
          categories.value = []
        }
      } catch (error) {
        console.error('Error loading categories:', error)
        categories.value = []
      } finally {
        isPageLoading.value = false
      }
    }

    const updateCategoryStatus = async (category, newStatus) => {
      try {
        const updateData = { ...category, status: newStatus }
        const result = await categoryService.updateCategory(category.id, updateData)
        
        if (result.success) {
          await loadCategories() // Reload categories
        } else {
          console.error('Failed to update category status:', result.error)
        }
      } catch (error) {
        console.error('Error updating category status:', error)
      }
    }

    const submitCategory = async () => {
      isLoading.value = true
      try {
        let result
        if (showEditModal.value && editingCategory.value) {
          result = await categoryService.updateCategory(editingCategory.value.id, categoryForm.value)
        } else {
          result = await categoryService.createCategory(categoryForm.value)
        }

        if (result.success) {
          await loadCategories()
          closeModal()
        } else {
          console.error('Failed to save category:', result.error)
        }
      } catch (error) {
        console.error('Error saving category:', error)
      } finally {
        isLoading.value = false
      }
    }

    const editCategory = (category) => {
      editingCategory.value = category
      categoryForm.value = {
        name: category.name,
        description: category.description || '',
        status: category.status
      }
      showEditModal.value = true
    }

    const deleteCategory = async (id) => {
      if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
        try {
          const result = await categoryService.deleteCategory(id)
          if (result.success) {
            await loadCategories()
          } else {
            console.error('Failed to delete category:', result.error)
          }
        } catch (error) {
          console.error('Error deleting category:', error)
        }
      }
    }

    const viewCategory = async (category) => {
      viewingCategory.value = category
      showViewModal.value = true
      
      // Load products for this category
      await loadCategoryProducts(category.id)
    }

    const loadCategoryProducts = async (categoryId) => {
      loadingProducts.value = true
      categoryProducts.value = []
      
      try {
        console.log('Loading products for category:', categoryId)
        // Assuming there's a productService.getProductsByCategory method
        // If not available, we'll use a generic API call
        const response = await fetch(`https://backend-ravayahijab.up.railway.app/api/products?category_id=${categoryId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        
        const result = await response.json()
        console.log('Category products result:', result)
        
        if (result.success && result.data) {
          categoryProducts.value = result.data.data || result.data || []
        } else {
          categoryProducts.value = []
        }
      } catch (error) {
        console.error('Error loading category products:', error)
        categoryProducts.value = []
      } finally {
        loadingProducts.value = false
      }
    }

    const closeViewModal = () => {
      showViewModal.value = false
      viewingCategory.value = null
      categoryProducts.value = []
    }

    const editFromView = (category) => {
      closeViewModal()
      editCategory(category)
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const getProductImageUrl = (product) => {
      if (product && product.image) {
        // Handle both full URLs and relative paths
        if (product.image.startsWith('http')) {
          return product.image
        }
        // Remove leading slash and /storage/ prefix if present
        let imagePath = product.image.replace(/^\/+/, '').replace(/^storage\//, '')
        return `https://backend-ravayahijab.up.railway.app/files/products/${imagePath}`
      }
      return '/images/placeholder-product.jpg'
    }

    const handleImageError = (event) => {
      event.target.src = '/images/placeholder-product.jpg'
    }

    const formatPrice = (price) => {
      if (!price) return '0'
      return new Intl.NumberFormat('id-ID').format(price)
    }

    const closeModal = () => {
      showCreateModal.value = false
      showEditModal.value = false
      editingCategory.value = null
      categoryForm.value = {
        name: '',
        description: '',
        status: 'active'
      }
    }

    onMounted(() => {
      loadCategories()
    })

    return {
      categories,
      isPageLoading,
      isLoading,
      showCreateModal,
      showEditModal,
      showViewModal,
      viewingCategory,
      categoryProducts,
      loadingProducts,
      categoryForm,
      submitCategory,
      updateCategoryStatus,
      editCategory,
      deleteCategory,
      viewCategory,
      closeViewModal,
      editFromView,
      formatDate,
      closeModal,
      loadCategories,
      getProductImageUrl,
      handleImageError,
      formatPrice
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>