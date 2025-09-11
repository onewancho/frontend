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
      <div class="modal-box max-w-lg">
        <h3 class="font-bold text-xl text-gray-900 mb-6">
          Form Edit Kategori
        </h3>
        
        <form @submit.prevent="submitCategory" class="space-y-6">
          <!-- Category Name -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700">Nama Kategori</span>
              <span class="label-text-alt text-red-500">*</span>
            </label>
            <input 
              v-model="categoryForm.name" 
              type="text" 
              class="input input-bordered w-full focus:border-primary focus:outline-none"
              placeholder="Hijab Premium"
              required
            >
          </div>

          <!-- Description -->
          <div class="form-control">
            <label class="label">
              <span class="label-text font-medium text-gray-700">Deskripsi</span>
            </label>
            <textarea 
              v-model="categoryForm.description" 
              class="textarea textarea-bordered w-full h-32 focus:border-primary focus:outline-none resize-none"
              placeholder="Koleksi hijab premium dengan bahan berkualitas tinggi"
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-start space-x-3 pt-4">
            <button type="button" @click="closeModal" class="btn btn-ghost">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              Batal
            </button>
            <button type="submit" class="btn btn-warning" :disabled="isLoading">
              <span v-if="isLoading" class="loading loading-spinner loading-sm mr-2"></span>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Update Kategori
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Category Modal (Full Screen Design) -->
    <div class="modal" :class="{ 'modal-open': showViewModal }">
      <div class="modal-box w-full max-w-7xl h-full max-h-screen p-0 m-0 rounded-none">
        <div v-if="viewingCategory" class="h-full flex flex-col">
          <!-- Header -->
          <div class="bg-white border-b border-gray-200 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">Detail Kategori</h1>
                <p class="text-gray-600 mt-1">Informasi lengkap kategori {{ viewingCategory.name }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <button @click="editFromView(viewingCategory)" class="btn btn-warning">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit Kategori
                </button>
                <button @click="closeViewModal" class="btn btn-ghost">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Kembali
                </button>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-auto bg-gray-50 p-6">
            <!-- Statistics Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <!-- Total Produk -->
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div class="flex items-center">
                  <div class="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Total Produk</p>
                    <p class="text-3xl font-bold text-blue-600">{{ getTotalProducts() }}</p>
                  </div>
                </div>
              </div>

              <!-- Produk Tersedia -->
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div class="flex items-center">
                  <div class="bg-green-100 p-3 rounded-lg mr-4">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Produk Tersedia</p>
                    <p class="text-3xl font-bold text-green-600">{{ getAvailableProducts() }}</p>
                  </div>
                </div>
              </div>

              <!-- Stok Habis -->
              <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div class="flex items-center">
                  <div class="bg-orange-100 p-3 rounded-lg mr-4">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L4.35 18.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-500">Stok Habis</p>
                    <p class="text-3xl font-bold text-orange-600">{{ getOutOfStockProducts() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left Column - Category Info -->
              <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    Informasi Kategori
                  </h3>
                  
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kategori</label>
                      <p class="text-xl font-bold text-gray-900">{{ viewingCategory.name }}</p>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                      <p class="text-gray-600 leading-relaxed">
                        {{ viewingCategory.description || 'Koleksi hijab premium dengan bahan berkualitas tinggi' }}
                      </p>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Produk</label>
                      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {{ getTotalProducts() }} produk
                      </span>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Dibuat Pada</label>
                      <p class="text-gray-600">{{ formatDate(viewingCategory.created_at) }}</p>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Terakhir Diupdate</label>
                      <p class="text-gray-600">{{ formatDate(viewingCategory.updated_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Products Table -->
              <div class="lg:col-span-2">
                <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div class="p-6 border-b border-gray-200">
                    <div class="flex items-center justify-between">
                      <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        Produk dalam Kategori ini
                      </h3>
                      <button class="btn btn-primary btn-sm">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Tambah Produk
                      </button>
                    </div>
                  </div>

                  <div class="overflow-x-auto">
                    <div v-if="loadingProducts" class="p-8 text-center">
                      <div class="loading loading-spinner loading-lg text-primary"></div>
                      <p class="mt-2 text-gray-600">Memuat produk kategori...</p>
                    </div>

                    <table v-else-if="categoryProducts && categoryProducts.length > 0" class="table w-full">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="text-left font-medium text-gray-700">GAMBAR</th>
                          <th class="text-left font-medium text-gray-700">NAMA PRODUK</th>
                          <th class="text-left font-medium text-gray-700">HARGA</th>
                          <th class="text-left font-medium text-gray-700">STOK</th>
                          <th class="text-left font-medium text-gray-700">STATUS</th>
                          <th class="text-left font-medium text-gray-700">AKSI</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="product in categoryProducts" :key="product.id" class="border-b border-gray-100 hover:bg-gray-50">
                          <td class="py-4">
                            <img 
                              :src="getProductImageUrl(product)" 
                              :alt="product.name"
                              class="w-12 h-12 rounded-lg object-cover"
                              @error="handleImageError"
                            >
                          </td>
                          <td class="py-4">
                            <div>
                              <p class="font-medium text-gray-900">{{ product.name }}</p>
                              <p class="text-sm text-gray-500">{{ product.description?.substring(0, 50) }}...</p>
                            </div>
                          </td>
                          <td class="py-4">
                            <span class="font-bold text-gray-900">Rp {{ formatPrice(product.price) }}</span>
                          </td>
                          <td class="py-4">
                            <span class="font-medium text-gray-700">{{ product.stock || 0 }}</span>
                          </td>
                          <td class="py-4">
                            <span v-if="product.stock > 0" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Tersedia
                            </span>
                            <span v-else class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Habis
                            </span>
                          </td>
                          <td class="py-4">
                            <div class="flex items-center space-x-2">
                              <button @click="viewProduct(product)" class="btn btn-sm btn-ghost text-green-600 hover:bg-green-50">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                                Lihat
                              </button>
                              <button @click="editProduct(product)" class="btn btn-sm btn-outline btn-info">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                                Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div v-else class="p-12 text-center">
                      <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                      <h4 class="text-lg font-medium text-gray-700 mb-2">Belum Ada Produk</h4>
                      <p class="text-gray-500 mb-4">Kategori ini belum memiliki produk apapun.</p>
                      <button class="btn btn-primary">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Tambah Produk Pertama
                      </button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { categoryService, productService } from '../services/index.js'

export default {
  name: 'Categories',
  setup() {
    const router = useRouter()
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
        
        // Use the admin product service to get products by category
        const result = await productService.getAdminProductsByCategory(categoryId)
        console.log('Category products result:', result)
        
        if (result.success && result.data) {
          // Handle different response structures
          if (result.data.data) {
            categoryProducts.value = result.data.data
          } else if (Array.isArray(result.data)) {
            categoryProducts.value = result.data
          } else {
            categoryProducts.value = []
          }
          console.log('Loaded category products:', categoryProducts.value)
        } else {
          console.error('Failed to load category products:', result.error)
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
      console.log('Getting image URL for product:', product)
      if (product && product.image) {
        console.log('Original image path:', product.image)
        // Handle both full URLs and relative paths
        if (product.image.startsWith('http')) {
          console.log('Using full URL:', product.image)
          return product.image
        }
        // Remove leading slash and /storage/ prefix if present, handle different path formats
        let imagePath = product.image.replace(/^\/+/, '').replace(/^storage\//, '').replace(/^products\//, '')
        // Ensure the path doesn't start with files/products if already present
        if (imagePath.startsWith('files/products/')) {
          const finalUrl = `https://backend-ravayahijab.up.railway.app/${imagePath}`
          console.log('Using existing files/products path:', finalUrl)
          return finalUrl
        }
        const finalUrl = `https://backend-ravayahijab.up.railway.app/files/products/${imagePath}`
        console.log('Constructed image URL:', finalUrl)
        return finalUrl
      }
      console.log('No image found, using placeholder')
      // Use a data URL placeholder instead of path that might not exist
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zNS44MzMzIDMzLjMzMzNDMzUuODMzMyAzMC4xIDM4LjQzMzMgMjcuNSA0MS42NjY3IDI3LjVDNDUgMjcuNSA0Ny41IDMwLjEgNDcuNSAzMy4zMzMzQzQ3LjUgMzYuNjY2NyA0NSAzOS4xNjY3IDQxLjY2NjcgMzkuMTY2N0MzOC40MzMzIDM5LjE2NjcgMzUuODMzMyAzNi42NjY3IDM1LjgzMzMgMzMuMzMzM1oiIGZpbGw9IiM5Q0E5QTYiLz4KPHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNS41IDQ1LjgzMzNINzQuNUw2OS4xNjY3IDY2LjY2NjdIMzAuODMzM0wyNS41IDQ1LjgzMzNaIiBmaWxsPSIjOUNBOUE2Ii8+Cjwvc3ZnPgo='
    }

    const handleImageError = (event) => {
      event.target.src = '/images/placeholder-product.jpg'
    }

    const formatPrice = (price) => {
      if (!price) return '0'
      return new Intl.NumberFormat('id-ID').format(price)
    }

    const getTotalProducts = () => {
      // Priority: actual loaded products, then category products_count, then 0
      if (categoryProducts.value && categoryProducts.value.length > 0) {
        return categoryProducts.value.length
      }
      return viewingCategory.value?.products_count || 0
    }

    const getAvailableProducts = () => {
      if (!categoryProducts.value || categoryProducts.value.length === 0) {
        return 0
      }
      return categoryProducts.value.filter(product => (product.stock || 0) > 0).length
    }

    const getOutOfStockProducts = () => {
      if (!categoryProducts.value || categoryProducts.value.length === 0) {
        return 0
      }
      return categoryProducts.value.filter(product => (product.stock || 0) <= 0).length
    }

    const viewProduct = (product) => {
      console.log('Navigating to products page for product:', product)
      // Navigate to admin products page
      router.push('/admin/products')
    }

    const editProduct = (product) => {
      console.log('Navigating to edit product:', product)
      // Navigate to admin products page with edit mode
      // We'll pass the product ID as a query parameter
      router.push({
        path: '/admin/products',
        query: { edit: product.id }
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
      formatPrice,
      getTotalProducts,
      getAvailableProducts,
      getOutOfStockProducts,
      viewProduct,
      editProduct
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