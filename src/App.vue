<template>
  <div id="app" class="min-h-screen bg-white">
    <Navbar v-if="showNavbar" />
    <main :class="showNavbar ? 'pt-16' : ''">
      <router-view />
    </main>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './stores/auth.js'

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const authStore = useAuthStore()
    const route = useRoute()

    // Hide navbar on login and register pages
    const showNavbar = computed(() => {
      const hideNavbarRoutes = ['Login', 'Register']
      return !hideNavbarRoutes.includes(route.name)
    })

    onMounted(() => {
      // Initialize auth state from localStorage
      authStore.init()
      api.get("/sanctum/csrf-cookie");

    })

    return {
      showNavbar
    }
  }
}
</script>

<style>
/* Basic styles for now */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  color: #1f2937;
}
</style>
