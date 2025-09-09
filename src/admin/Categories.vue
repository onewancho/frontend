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
                <th>ID</th>
                <th>Nama Kategori</th>
                <th>Deskripsi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="category in categories" :key="category.id">
                <td>
                  <span class="font-mono text-sm font-semibold">#{{ category.id }}</span>
                </td>
                <td>
                  <div class="flex items-center">
                    <div class="avatar placeholder mr-3">
                      <div class="bg-neutral text-neutral-content rounded-full w-8">
                        <span class="text-xs">{{ category.name.charAt(0).toUpperCase() }}</span>
                      </div>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">{{ category.name }}</div>
                      <div class="text-sm text-gray-600">Kategori produk</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="text-gray-600">{{ category.description || 'Tidak ada deskripsi' }}</span>
                </td>
                <td>
                  <select 
                    :value="category.status" 
                    @change="updateCategoryStatus(category, $event.target.value)"
                    class="select select-sm select-bordered"
                    :class="category.status === 'active' ? 'select-success' : 'select-warning'"
                  >
                    <option value="active">✅ Aktif</option>
                    <option value="inactive">⏸️ Tidak Aktif</option>
                  </select>
                </td>
                <td>
                  <div class="flex space-x-2">
                    <button 
                      @click="editCategory(category)"
                      class="btn btn-sm btn-outline btn-info"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Edit
                    </button>
                    <button 
                      @click="deleteCategory(category.id)"
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
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">
          {{ showEditModal ? 'Edit Kategori' : 'Tambah Kategori' }}
        </h3>
        
        <form @submit.prevent="submitCategory">
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Nama Kategori</span>
            </label>
            <input 
              v-model="categoryForm.name" 
              type="text" 
              class="input input-bordered"
              placeholder="Masukkan nama kategori"
              required
            >
          </div>

          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Deskripsi</span>
            </label>
            <textarea 
              v-model="categoryForm.description" 
              class="textarea textarea-bordered"
              placeholder="Masukkan deskripsi kategori"
              rows="3"
            ></textarea>
          </div>

          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text">Status</span>
            </label>
            <select v-model="categoryForm.status" class="select select-bordered">
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>

          <div class="modal-action">
            <button type="button" @click="closeModal" class="btn btn-ghost">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
              {{ showEditModal ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </form>
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
    const editingCategory = ref(null)

    const categoryForm = ref({
      name: '',
      description: '',
      status: 'active'
    })

    const loadCategories = async () => {
      isPageLoading.value = true
      try {
        const result = await categoryService.getCategories()
        if (result.success) {
          categories.value = result.data.data || []
        } else {
          console.error('Failed to load categories:', result.error)
        }
      } catch (error) {
        console.error('Error loading categories:', error)
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
      categoryForm,
      submitCategory,
      updateCategoryStatus,
      editCategory,
      deleteCategory,
      closeModal,
      loadCategories
    }
  }
}
</script>