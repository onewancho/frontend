<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="hero min-h-screen bg-white relative">
      <div class="hero-content text-center">
        <div class="max-w-4xl">
          <!-- Simple Logo -->
          <div class="mb-16">
            <h1 class="text-8xl font-light text-gray-900 mb-6 tracking-wide">
              <span class="text-pink-500">Ravaya</span> 
              <span class="text-gray-800">Hijab</span>
            </h1>
            <div class="w-24 h-1 bg-pink-500 mx-auto mb-8"></div>
            <p class="text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Rayakan kecantikan Anda dengan Ravaya Hijab, di mana kenyamanan dan gaya modern berpadu dalam setiap helainya. Dibuat dari bahan premium yang adem dan ringan, koleksi kami dirancang untuk membuat Anda tampil menawan dan percaya diri di setiap momen
            </p>
          </div>

          <!-- CTA Button -->
          <div class="space-y-6">
            <router-link 
              to="/products" 
              class="btn btn-lg bg-pink-500 hover:bg-pink-600 text-white border-none px-12 py-4 rounded-full font-normal text-lg"
            >
              Shop Now
            </router-link>
            <div class="text-sm text-gray-500 font-light">
              Free shipping on orders over Rp 500,000
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Preview -->
    <section class="py-20 bg-gray-50" v-if="featuredProducts.length > 0">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-light text-gray-900 mb-4">Featured Collection</h2>
          <div class="w-16 h-1 bg-pink-500 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="product in featuredProducts.slice(0, 4)" 
            :key="product.id"
            class="group cursor-pointer"
          >
            <div class="aspect-square overflow-hidden bg-white mb-4">
              <img 
                :src="getProductImage(product)" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="text-center space-y-2">
              <h3 class="text-lg font-normal text-gray-900">{{ product.name }}</h3>
              <p class="text-xl text-pink-500 font-light">Rp {{ formatPrice(product.price) }}</p>
            </div>
          </div>
        </div>

        <div class="text-center mt-16">
          <router-link 
            to="/products" 
            class="text-gray-900 hover:text-pink-500 font-normal underline underline-offset-4 transition-colors duration-300"
          >
            View All Products
          </router-link>
        </div>
      </div>
    </section>

    <!-- Simple About Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-light text-gray-900 mb-8">About Ravaya</h2>
          <div class="w-16 h-1 bg-pink-500 mx-auto mb-12"></div>
          <p class="text-xl text-gray-600 font-light leading-relaxed mb-12">
            We believe every woman deserves to feel confident and beautiful in her hijab. 
            Our collection combines modern design with traditional values, 
            offering premium quality hijabs for the contemporary muslim woman.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div class="text-center">
              <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 class="text-lg font-normal text-gray-900 mb-2">Premium Quality</h3>
              <p class="text-gray-600 font-light">Made from the finest materials</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-normal text-gray-900 mb-2">Modern Design</h3>
              <p class="text-gray-600 font-light">Contemporary styles for today's woman</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-normal text-gray-900 mb-2">Fast Delivery</h3>
              <p class="text-gray-600 font-light">Quick and secure shipping nationwide</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-4xl font-light text-gray-900 mb-4">Stay Updated</h2>
          <div class="w-16 h-1 bg-pink-500 mx-auto mb-8"></div>
          <p class="text-lg text-gray-600 font-light mb-8">
            Subscribe to our newsletter for latest collections and exclusive offers
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              class="input input-bordered flex-1 bg-white border-gray-300 focus:border-pink-500 rounded-full"
            />
            <button class="btn bg-pink-500 hover:bg-pink-600 text-white border-none px-8 rounded-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { productService } from '../services/index.js'

export default {
  name: 'Home',
  setup() {
    const featuredProducts = ref([])

    // Load featured products from API
    const loadFeaturedProducts = async () => {
      try {
        const result = await productService.getProducts()
        if (result.success) {
          // Take first 4 products as featured
          const products = result.data.data || result.data
          featuredProducts.value = Array.isArray(products) ? products.slice(0, 4) : []
        }
      } catch (error) {
        console.error('Failed to load featured products:', error)
        // Fallback to empty array if API fails
        featuredProducts.value = []
      }
    }

    // Get product image URL
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
        return `https://backend-ravayahijab.up.railway.app/storage/${product.image}`
      }
      return '/images/Beranda-1.png'
    }

    // Format price
    const formatPrice = (price) => {
      return new Intl.NumberFormat('id-ID').format(price)
    }

    onMounted(() => {
      loadFeaturedProducts()
    })

    return {
      featuredProducts,
      getProductImage,
      formatPrice
    }
  }
}
</script>
