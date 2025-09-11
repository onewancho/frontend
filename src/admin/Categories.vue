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
      <div class="modal-box max-w-2xl">
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="font-bold text-xl text-gray-900">
            {{ showEditModal ? 'Edit Kategori' : 'Tambah Kategori Baru' }}
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
              <span class="label-text font-medium">Nama Kategori</span>
              <span class="label-text-alt text-red-500">*</span>
            </label>
            <input 
              v-model="categoryForm.name" 
              type="text" 
              class="input input-bordered focus:border-primary"
              placeholder="Contoh: Fashion, Elektronik, Makanan"
              required
            >
            <label class="label">
              <span class="label-text-alt text-gray-500">Nama kategori akan ditampilkan di website</span>
            </label>
          </div>

          <!-- Description -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Deskripsi</span>
              <span class="label-text-alt text-gray-500">Opsional</span>
            </label>
            <textarea 
              v-model="categoryForm.description" 
              class="textarea textarea-bordered focus:border-primary h-24"
              placeholder="Jelaskan kategori ini untuk memudahkan pengelolaan produk..."
            ></textarea>
            <label class="label">
              <span class="label-text-alt text-gray-500">Deskripsi membantu dalam pengelolaan produk</span>
            </label>
          </div>

          <!-- Status -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Status Kategori</span>
            </label>
            <div class="grid grid-cols-2 gap-4">
              <label class="cursor-pointer">
                <input 
                  type="radio" 
                  v-model="categoryForm.status" 
                  value="active" 
                  class="radio radio-success" 
                />
                <div class="ml-3">
                  <div class="font-medium text-green-700">✅ Aktif</div>
                  <div class="text-sm text-gray-500">Kategori dapat digunakan</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input 
                  type="radio" 
                  v-model="categoryForm.status" 
                  value="inactive" 
                  class="radio radio-warning" 
                />
                <div class="ml-3">
                  <div class="font-medium text-yellow-700">⏸️ Tidak Aktif</div>
                  <div class="text-sm text-gray-500">Kategori disembunyikan</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button type="button" @click="closeModal" class="btn btn-ghost">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Batal
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner loading-sm mr-2"></span>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {{ showEditModal ? 'Simpan Perubahan' : 'Tambah Kategori' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Category Modal -->
    <div class="modal" :class="{ 'modal-open': showViewModal }">
      <div class="modal-box max-w-2xl">
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="font-bold text-xl text-gray-900">Detail Kategori</h3>
          <button @click="closeViewModal" class="btn btn-sm btn-circle btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div v-if="viewingCategory" class="py-6 space-y-6">
          <!-- Category Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Info -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ID Kategori</label>
                <div class="text-lg font-semibold text-gray-900">#{{ viewingCategory.id }}</div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
                <div class="text-lg font-semibold text-gray-900">{{ viewingCategory.name }}</div>
              </div>
            </div>

            <!-- Statistics -->
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Produk</label>
                <div class="text-2xl font-bold text-blue-600">
                  {{ viewingCategory.products_count || 0 }} produk
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Dibuat</label>
                <div class="text-sm text-gray-600">{{ formatDate(viewingCategory.created_at) }}</div>
              </div>

              <div v-if="viewingCategory.updated_at">
                <label class="block text-sm font-medium text-gray-700 mb-1">Terakhir Diupdate</label>
                <div class="text-sm text-gray-600">{{ formatDate(viewingCategory.updated_at) }}</div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-700">
                {{ viewingCategory.description || 'Tidak ada deskripsi untuk kategori ini.' }}
              </p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button @click="closeViewModal" class="btn btn-ghost">
              Tutup
            </button>
            <button @click="editFromView(viewingCategory)" class="btn btn-info">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit Kategori
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

    const viewCategory = (category) => {
      viewingCategory.value = category
      showViewModal.value = true
    }

    const closeViewModal = () => {
      showViewModal.value = false
      viewingCategory.value = null
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
      loadCategories
    }
  }
}
</script>