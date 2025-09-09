<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-center mb-8">Katalog Produk</h1>
    
    <!-- Category Filter -->
    <div class="flex justify-center mb-8">
      <div class="tabs tabs-boxed">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="['tab', selectedCategory === category.id ? 'tab-active' : '']"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <div v-for="product in filteredProducts" :key="product.id" class="card bg-base-100 w-full shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Product"
            class="h-48 w-full object-cover"
          />
        </figure>
        <div class="card-body p-4">
          <h2 class="card-title text-sm">{{ product.name }}</h2>
          <p class="text-xs opacity-70">{{ product.description.substring(0, 60) }}...</p>
          <div class="flex justify-between items-center mt-2">
            <div class="text-lg font-bold text-primary">Rp {{ formatPrice(product.price) }}</div>
            <div class="badge badge-outline">Stok: {{ product.stock }}</div>
          </div>
          <div class="card-actions justify-end mt-2">
            <button @click="addToCart(product)" class="btn btn-primary btn-sm w-full">Beli Sekarang</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8">
      <div class="join">
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          :class="['join-item btn', currentPage === page ? 'btn-active' : '']"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
      selectedCategory: 0,
      categories: [
        { id: 0, name: 'Semua' },
        { id: 1, name: 'Hijab Segi Empat' },
        { id: 2, name: 'Hijab Pashmina' },
        { id: 3, name: 'Hijab Instant' },
        { id: 4, name: 'Hijab Sport' },
        { id: 5, name: 'Hijab Premium' }
      ],
      products: [
        {
          id: 1,
          category_id: 1,
          name: 'Hijab Segi Empat Voal Polos',
          price: 45000,
          description: 'Hijab segi empat dengan bahan voal premium, nyaman dan adem untuk digunakan sehari-hari',
          stock: 50
        },
        {
          id: 2,
          category_id: 1,
          name: 'Hijab Segi Empat Motif Bunga',
          price: 55000,
          description: 'Hijab segi empat dengan motif bunga yang elegan dan cocok untuk acara formal',
          stock: 30
        },
        {
          id: 3,
          category_id: 2,
          name: 'Pashmina Ceruti Premium',
          price: 75000,
          description: 'Pashmina dengan bahan ceruti premium yang halus dan tidak mudah kusut',
          stock: 25
        },
        {
          id: 4,
          category_id: 2,
          name: 'Pashmina Babydoll',
          price: 65000,
          description: 'Pashmina babydoll dengan tekstur halus dan nyaman digunakan',
          stock: 40
        },
        {
          id: 5,
          category_id: 3,
          name: 'Hijab Instant Drappery',
          price: 85000,
          description: 'Hijab instant dengan model drappery yang praktis dan stylish',
          stock: 20
        },
        {
          id: 6,
          category_id: 3,
          name: 'Hijab Instant Pet Antem',
          price: 70000,
          description: 'Hijab instant dengan pet antem untuk tampilan yang lebih modis',
          stock: 35
        },
        {
          id: 7,
          category_id: 4,
          name: 'Hijab Sport Breathable',
          price: 60000,
          description: 'Hijab khusus olahraga dengan bahan breathable yang menyerap keringat',
          stock: 45
        },
        {
          id: 8,
          category_id: 5,
          name: 'Hijab Premium Silk Touch',
          price: 120000,
          description: 'Hijab premium dengan bahan silk touch yang mewah dan elegan',
          stock: 15
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      let filtered = this.selectedCategory === 0 
        ? this.products 
        : this.products.filter(p => p.category_id === this.selectedCategory);
      
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return filtered.slice(startIndex, startIndex + this.itemsPerPage);
    },
    totalPages() {
      const filtered = this.selectedCategory === 0 
        ? this.products 
        : this.products.filter(p => p.category_id === this.selectedCategory);
      return Math.ceil(filtered.length / this.itemsPerPage);
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('id-ID').format(price);
    },
    addToCart(product) {
      // TODO: Implement add to cart functionality
      alert(`${product.name} ditambahkan ke keranjang!`);
    }
  },
  watch: {
    selectedCategory() {
      this.currentPage = 1;
    }
  }
}
</script>
