<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h1>
        <p class="text-gray-600 text-lg max-w-2xl mx-auto">
          Kami siap membantu Anda. Jangan ragu untuk menghubungi kami melalui berbagai cara di bawah ini.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <!-- Contact Information -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Informasi Kontak</h2>
            
            <!-- Contact Items -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Address -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Alamat Toko</h3>
                  <p class="text-gray-600 mt-1">
                    Jl. Raya Hijab No. 123<br>
                    Kelurahan Fashion, Kecamatan Style<br>
                    Jakarta Selatan 12345
                  </p>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Telepon</h3>
                  <p class="text-gray-600 mt-1">
                    <a href="tel:+62218765432" class="hover:text-pink-500 transition-colors">
                      +62 21 8765 4321
                    </a>
                  </p>
                  <p class="text-gray-600">
                    <a href="https://wa.me/628123456789" target="_blank" class="hover:text-pink-500 transition-colors">
                      WA: +62 812 3456 7890
                    </a>
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Email</h3>
                  <p class="text-gray-600 mt-1">
                    <a href="mailto:info@ravayahijab.com" class="hover:text-pink-500 transition-colors">
                      info@ravayahijab.com
                    </a>
                  </p>
                  <p class="text-gray-600">
                    <a href="mailto:customer@ravayahijab.com" class="hover:text-pink-500 transition-colors">
                      customer@ravayahijab.com
                    </a>
                  </p>
                </div>
              </div>

              <!-- Working Hours -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Jam Operasional</h3>
                  <div class="text-gray-600 mt-1">
                    <p>Senin - Jumat: 09:00 - 18:00 WIB</p>
                    <p>Sabtu: 09:00 - 15:00 WIB</p>
                    <p>Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Customer Service Section -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Layanan Pelanggan</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 text-sm">WhatsApp</h4>
                  <p class="text-xs text-gray-600">Respons cepat</p>
                  <a href="https://wa.me/628123456789" target="_blank" class="text-green-600 hover:text-green-700 font-medium text-sm">
                    Chat Sekarang
                  </a>
                </div>
              </div>
              
              <div class="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 text-sm">Email Support</h4>
                  <p class="text-xs text-gray-600">Dalam 24 jam</p>
                  <a href="mailto:support@ravayahijab.com" class="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Kirim Email
                  </a>
                </div>
              </div>

              <div class="flex items-center space-x-3 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 text-sm">Kunjungi Toko</h4>
                  <p class="text-xs text-gray-600">Sen-Sab 09-18</p>
                  <p class="text-pink-600 hover:text-pink-700 font-medium text-sm">
                    Lihat Lokasi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-8 sticky top-24">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Kirim Pesan</h2>
            
            <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Name -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-gray-700 font-medium">Nama Lengkap</span>
              </label>
              <input 
                type="text" 
                v-model="formData.name"
                placeholder="Masukkan nama lengkap Anda"
                class="input input-bordered w-full focus:border-pink-500"
                :class="{ 'input-error': errors.name }"
                required 
              />
              <label v-if="errors.name" class="label">
                <span class="label-text-alt text-error">{{ errors.name }}</span>
              </label>
            </div>

            <!-- Email -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-gray-700 font-medium">Email</span>
              </label>
              <input 
                type="email" 
                v-model="formData.email"
                placeholder="Masukkan email Anda"
                class="input input-bordered w-full focus:border-pink-500"
                :class="{ 'input-error': errors.email }"
                required 
              />
              <label v-if="errors.email" class="label">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
              </label>
            </div>

            <!-- Subject -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-gray-700 font-medium">Subjek</span>
              </label>
              <select 
                v-model="formData.subject"
                class="select select-bordered w-full focus:border-pink-500"
                :class="{ 'select-error': errors.subject }"
                required
              >
                <option value="" disabled>Pilih subjek pesan</option>
                <option value="product_inquiry">Pertanyaan Produk</option>
                <option value="order_status">Status Pesanan</option>
                <option value="complaint">Keluhan</option>
                <option value="suggestion">Saran</option>
                <option value="partnership">Kerjasama</option>
                <option value="other">Lainnya</option>
              </select>
              <label v-if="errors.subject" class="label">
                <span class="label-text-alt text-error">{{ errors.subject }}</span>
              </label>
            </div>

            <!-- Message -->
            <div class="form-control">
              <label class="label">
                <span class="label-text text-gray-700 font-medium">Pesan</span>
              </label>
              <textarea 
                v-model="formData.message"
                placeholder="Tuliskan pesan Anda di sini..."
                class="textarea textarea-bordered w-full h-32 focus:border-pink-500"
                :class="{ 'textarea-error': errors.message }"
                required
              ></textarea>
              <label v-if="errors.message" class="label">
                <span class="label-text-alt text-error">{{ errors.message }}</span>
              </label>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ errorMessage }}</span>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ successMessage }}</span>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              class="btn btn-primary w-full bg-pink-500 hover:bg-pink-600 border-pink-500"
              :class="{ 'loading': isSubmitting }"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Kirim Pesan</span>
              <span v-else>Mengirim...</span>
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><script>
import { ref, reactive } from 'vue'

export default {
  name: 'Contact',
  setup() {
    const formData = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const errors = ref({})
    const errorMessage = ref('')
    const successMessage = ref('')
    const isSubmitting = ref(false)

    const validateForm = () => {
      errors.value = {}

      if (!formData.name.trim()) {
        errors.value.name = 'Nama harus diisi'
      } else if (formData.name.trim().length < 2) {
        errors.value.name = 'Nama minimal 2 karakter'
      }

      if (!formData.email.trim()) {
        errors.value.email = 'Email harus diisi'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.value.email = 'Format email tidak valid'
      }

      if (!formData.subject) {
        errors.value.subject = 'Subjek harus dipilih'
      }

      if (!formData.message.trim()) {
        errors.value.message = 'Pesan harus diisi'
      } else if (formData.message.trim().length < 10) {
        errors.value.message = 'Pesan minimal 10 karakter'
      }

      return Object.keys(errors.value).length === 0
    }

    const handleSubmit = async () => {
      if (!validateForm()) return

      isSubmitting.value = true
      errorMessage.value = ''
      successMessage.value = ''

      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Reset form
        Object.keys(formData).forEach(key => {
          formData[key] = ''
        })
        
        successMessage.value = 'Pesan Anda berhasil dikirim. Kami akan segera merespons.'
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          successMessage.value = ''
        }, 5000)
        
      } catch (error) {
        errorMessage.value = 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      errors,
      errorMessage,
      successMessage,
      isSubmitting,
      handleSubmit
    }
  }
}
</script>
