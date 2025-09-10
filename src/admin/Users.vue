<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">👥 Pengguna</h1>
          <p class="text-gray-600 mt-1">Kelola pengguna dan akses sistem</p>
        </div>
        <button @click="showCreateModal = true" class="btn btn-primary">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Tambah Pengguna
        </button>
      </div>
      
      <!-- Breadcrumb -->
      <div class="breadcrumbs text-sm">
        <ul>
          <li><a href="/admin" class="text-blue-600 hover:text-blue-800">Dashboard</a></li>
          <li class="text-gray-500">Pengguna</li>
        </ul>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ users.length }}</h2>
            <p class="text-gray-600">Total Pengguna</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ users.filter(u => u.status === 'active').length }}</h2>
            <p class="text-gray-600">Pengguna Aktif</p>
          </div>
          <div class="bg-green-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ users.filter(u => u.role === 'admin').length }}</h2>
            <p class="text-gray-600">Administrator</p>
          </div>
          <div class="bg-purple-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ users.filter(u => u.role === 'customer').length }}</h2>
            <p class="text-gray-600">Customer</p>
          </div>
          <div class="bg-orange-100 p-3 rounded-full">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6 border-b bg-gray-50">
        <h3 class="text-lg font-semibold text-gray-900">Manajemen Pengguna</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pengguna</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Terdaftar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <span class="font-mono text-sm font-semibold">#{{ user.id }}</span>
              </td>
              <td>
                <div class="flex items-center">
                  <div>
                    <div class="font-semibold text-gray-900 flex items-center gap-2">
                      {{ user.name }}
                      <svg v-if="user.role === 'admin'" class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <div class="text-sm text-gray-600">
                      {{ user.role === 'admin' ? 'Administrator' : 'Customer' }}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-gray-700">{{ user.email }}</span>
              </td>
              <td>
                <span v-if="user.role === 'admin'" class="badge badge-outline badge-primary">
                  Admin
                </span>
                <span v-else class="badge badge-outline badge-info">
                  Customer
                </span>
              </td>
              <td>
                <select 
                  :value="user.status" 
                  @change="updateUserStatus(user, $event.target.value)"
                  class="select select-sm select-bordered"
                  :class="user.status === 'active' ? 'select-success' : 'select-warning'"
                >
                  <option value="active">✅ Aktif</option>
                  <option value="inactive">⏸️ Nonaktif</option>
                </select>
              </td>
              <td>
                <span class="text-sm text-gray-600">{{ formatDate(user.created_at) }}</span>
              </td>
              <td>
                <div class="flex space-x-2">
                  <button 
                    @click="editUser(user)"
                    class="btn btn-sm btn-outline btn-info"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                  </button>
                  <button 
                    @click="deleteUser(user.id)"
                    class="btn btn-sm btn-error btn-outline"
                    :disabled="user.role === 'admin'"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="7" class="text-center py-8 text-gray-500">
                <div class="flex flex-col items-center">
                  <svg class="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                  <p>Belum ada pengguna</p>
                  <button @click="showCreateModal = true" class="btn btn-primary btn-sm mt-2">
                    Tambah Pengguna Pertama
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit User Modal -->
    <div class="modal" :class="{ 'modal-open': showCreateModal || showEditModal }">
      <div class="modal-box max-w-2xl">
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="font-bold text-lg text-gray-900">
            {{ showEditModal ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}
          </h3>
          <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="submitUser" class="space-y-4 mt-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Nama Lengkap</span>
              </label>
              <input 
                v-model="userForm.name" 
                type="text" 
                placeholder="Masukkan nama lengkap..."
                class="input input-bordered"
                required
              >
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Email</span>
              </label>
              <input 
                v-model="userForm.email" 
                type="email" 
                placeholder="Masukkan email..."
                class="input input-bordered"
                required
              >
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Telepon</span>
              </label>
              <input 
                v-model="userForm.phone" 
                type="tel" 
                placeholder="Masukkan nomor telepon..."
                class="input input-bordered"
              >
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Role</span>
              </label>
              <select v-model="userForm.role" class="select select-bordered">
                <option value="customer">Customer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div v-if="!showEditModal" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Password</span>
              </label>
              <input 
                v-model="userForm.password" 
                type="password" 
                placeholder="Masukkan password..."
                class="input input-bordered"
                :required="!showEditModal"
              >
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Konfirmasi Password</span>
              </label>
              <input 
                v-model="userForm.password_confirmation" 
                type="password" 
                placeholder="Konfirmasi password..."
                class="input input-bordered"
                :required="!showEditModal"
              >
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium">Status</span>
            </label>
            <select v-model="userForm.status" class="select select-bordered">
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
              {{ showEditModal ? 'Simpan Perubahan' : 'Tambah Pengguna' }}
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
import { userService } from '../services/index.js'

export default {
  name: 'Users',
  setup() {
    const users = ref([])
    const isPageLoading = ref(false)
    const isLoading = ref(false)
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const editingUser = ref(null)

    const userForm = ref({
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      role: 'customer',
      status: 'active'
    })

    const loadUsers = async () => {
      isPageLoading.value = true
      try {
        const result = await userService.getUsers()
        if (result.success) {
          users.value = result.data.data || []
        } else {
          console.error('Failed to load users:', result.error)
        }
      } catch (error) {
        console.error('Error loading users:', error)
      } finally {
        isPageLoading.value = false
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const resetForm = () => {
      userForm.value = {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        role: 'customer',
        status: 'active'
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      showEditModal.value = false
      editingUser.value = null
      resetForm()
    }

    const editUser = (user) => {
      editingUser.value = user
      userForm.value = {
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: user.status,
        password: '',
        password_confirmation: ''
      }
      showEditModal.value = true
    }

    const submitUser = async () => {
      isLoading.value = true
      try {
        let result
        if (showEditModal.value) {
          result = await userService.updateUser(editingUser.value.id, userForm.value)
        } else {
          result = await userService.createUser(userForm.value)
        }

        if (result.success) {
          await loadUsers()
          closeModal()
        } else {
          console.error('Failed to save user:', result.error)
        }
      } catch (error) {
        console.error('Error saving user:', error)
      } finally {
        isLoading.value = false
      }
    }

    const updateUserStatus = async (user, newStatus) => {
      try {
        const result = await userService.updateUser(user.id, { status: newStatus })
        if (result.success) {
          user.status = newStatus
        }
      } catch (error) {
        console.error('Error updating user status:', error)
      }
    }

    const deleteUser = async (userId) => {
      if (confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
        try {
          const result = await userService.deleteUser(userId)
          if (result.success) {
            await loadUsers()
          }
        } catch (error) {
          console.error('Error deleting user:', error)
        }
      }
    }

    onMounted(() => {
      loadUsers()
    })

    return {
      users,
      isPageLoading,
      isLoading,
      showCreateModal,
      showEditModal,
      userForm,
      loadUsers,
      formatDate,
      closeModal,
      editUser,
      submitUser,
      updateUserStatus,
      deleteUser
    }
  }
}
</script>