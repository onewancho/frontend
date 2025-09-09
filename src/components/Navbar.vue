<template>
  <div class="navbar bg-white/95 backdrop-blur-md shadow-sm fixed top-0 z-50 border-b border-gray-100">
    <div class="navbar-start">
      <div class="dropdown lg:hidden">
        <div tabindex="0" role="button" class="btn btn-ghost">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100">
          <li><router-link to="/" class="text-gray-700 hover:text-pink-500 font-medium">Beranda</router-link></li>
          <li><router-link to="/products" class="text-gray-700 hover:text-pink-500 font-medium">Produk</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/orders" class="text-gray-700 hover:text-pink-500 font-medium">Pesanan</router-link></li>
          <li><router-link to="/contact" class="text-gray-700 hover:text-pink-500 font-medium">Kontak</router-link></li>
          <div class="divider"></div>
          <li v-if="!isAuthenticated"><router-link to="/login" class="text-gray-700 hover:text-pink-500 font-medium">Masuk</router-link></li>
          <li v-if="!isAuthenticated"><router-link to="/register" class="text-pink-500 hover:text-pink-600 font-medium">Daftar</router-link></li>
        </ul>
      </div>
      <router-link to="/" class="btn btn-ghost text-xl font-bold text-gray-900">
        <span class="text-pink-500">Ravaya</span>
        <span class="ml-1">Hijab</span>
      </router-link>
    </div>
    
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 space-x-2">
        <li>
          <router-link 
            to="/" 
            class="btn btn-ghost text-gray-700 hover:text-pink-500 font-medium"
            :class="{ 'text-pink-500 bg-pink-50': $route.name === 'Home' }"
          >
            Beranda
          </router-link>
        </li>
        <li>
          <router-link 
            to="/products" 
            class="btn btn-ghost text-gray-700 hover:text-pink-500 font-medium"
            :class="{ 'text-pink-500 bg-pink-50': $route.name === 'Products' }"
          >
            Produk
          </router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link 
            to="/orders" 
            class="btn btn-ghost text-gray-700 hover:text-pink-500 font-medium"
            :class="{ 'text-pink-500 bg-pink-50': $route.name === 'Orders' }"
          >
            Pesanan
          </router-link>
        </li>
        <li>
          <router-link 
            to="/contact" 
            class="btn btn-ghost text-gray-700 hover:text-pink-500 font-medium"
            :class="{ 'text-pink-500 bg-pink-50': $route.name === 'Contact' }"
          >
            Kontak
          </router-link>
        </li>
        <li v-if="isAdmin" class="dropdown dropdown-hover">
          <div tabindex="0" role="button" class="btn btn-ghost text-gray-700 hover:text-pink-500 font-medium">
            Admin
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100">
            <li><router-link to="/admin" class="text-gray-700 hover:text-pink-500">Dashboard</router-link></li>
            <li><router-link to="/admin/categories" class="text-gray-700 hover:text-pink-500">Kategori</router-link></li>
            <li><router-link to="/admin/products" class="text-gray-700 hover:text-pink-500">Produk</router-link></li>
            <li><router-link to="/admin/users" class="text-gray-700 hover:text-pink-500">Pengguna</router-link></li>
            <li><router-link to="/admin/orders" class="text-gray-700 hover:text-pink-500">Pesanan</router-link></li>
            <li><router-link to="/admin/reports" class="text-gray-700 hover:text-pink-500">Laporan</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
    
    <div class="navbar-end">
      <!-- Cart Icon -->
      <div v-if="isAuthenticated" class="mr-4">
        <div class="indicator">
          <button @click="goToCart" class="btn btn-ghost btn-circle hover:bg-pink-50 hover:text-pink-500 transition-colors">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m3.6 12a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </button>
          <span v-if="cartItemCount > 0" class="badge badge-sm badge-primary indicator-item bg-pink-500 border-pink-500">{{ cartItemCount }}</span>
        </div>
      </div>

      <!-- Auth Buttons -->
      <div v-if="!isAuthenticated" class="hidden lg:flex space-x-2">
        <router-link to="/login" class="btn btn-ghost text-gray-700 hover:text-pink-500 font-medium">
          Masuk
        </router-link>
        <router-link to="/register" class="btn bg-pink-500 hover:bg-pink-600 text-white border-pink-500 hover:border-pink-600 btn-hover">
          Daftar
        </router-link>
      </div>

      <!-- User Menu -->
      <div v-if="isAuthenticated" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full bg-pink-100 flex items-center justify-center">
            <span class="text-pink-600 font-semibold text-sm">{{ userInitial }}</span>
          </div>
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-box w-52 border border-gray-100">
          <li class="menu-title">
            <span class="text-gray-500 text-xs">{{ user?.name || 'User' }}</span>
          </li>
          <li><a class="text-gray-700 hover:text-pink-500">Profil</a></li>
          <li><a class="text-gray-700 hover:text-pink-500">Pengaturan</a></li>
          <div class="divider"></div>
          <li><a @click="handleLogout" class="text-red-500 hover:text-red-600">Keluar</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useCartStore } from '../stores/cart.js'

export default {
  name: "Navbar",
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const cartStore = useCartStore()

    const handleLogout = async () => {
      await authStore.logout()
      router.push('/')
    }

    const goToCart = () => {
      // Navigate to orders page with cart tab query parameter
      router.push('/orders?tab=cart')
    }

    return {
      // Auth
      isAuthenticated: authStore.isAuthenticated,
      isAdmin: authStore.isAdmin,
      user: authStore.user,
      userInitial: authStore.userInitial,
      handleLogout,
      
      // Cart
      cartItemCount: cartStore.itemCount,
      goToCart
    }
  }
}
</script>
