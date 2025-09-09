import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0
  }),

  getters: {
    itemCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    }
  },

  actions: {
    // Initialize cart from localStorage
    init() {
      const savedCart = localStorage.getItem('cart_items')
      if (savedCart) {
        try {
          this.items = JSON.parse(savedCart)
          this.calculateTotal()
          console.log('Cart loaded from localStorage:', this.items.length, 'items')
        } catch (error) {
          console.error('Error loading cart from localStorage:', error)
          this.items = []
          this.total = 0
        }
      }
    },

    // Save cart to localStorage
    saveToStorage() {
      try {
        localStorage.setItem('cart_items', JSON.stringify(this.items))
        localStorage.setItem('cart_total', this.total.toString())
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    },

    // Add item to cart
    addItem(product, quantity = 1) {
      console.log('Adding item to cart:', product.name, 'quantity:', quantity)
      
      const existingItem = this.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += quantity
        console.log('Updated existing item quantity:', existingItem.quantity)
      } else {
        this.items.push({
          ...product,
          quantity
        })
        console.log('Added new item to cart')
      }
      
      this.calculateTotal()
      this.saveToStorage()
    },

    // Remove item from cart
    removeItem(productId) {
      console.log('Removing item from cart:', productId)
      const index = this.items.findIndex(item => item.id === productId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.calculateTotal()
        this.saveToStorage()
        console.log('Item removed, remaining items:', this.items.length)
      }
    },

    // Update item quantity
    updateQuantity(productId, quantity) {
      console.log('Updating quantity for item:', productId, 'to:', quantity)
      const item = this.items.find(item => item.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId)
        } else {
          item.quantity = quantity
          this.calculateTotal()
          this.saveToStorage()
        }
      }
    },

    // Clear cart
    clearCart() {
      console.log('Clearing cart')
      this.items = []
      this.total = 0
      this.saveToStorage()
    },

    // Calculate total
    calculateTotal() {
      this.total = this.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
      }, 0)
      console.log('Cart total calculated:', this.total)
    }
  }
})
