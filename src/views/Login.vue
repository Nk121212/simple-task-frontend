<template>
  <div
    class="d-flex align-items-center justify-content-center vh-100"
    style="background: linear-gradient(to right, #6366f1, #9333ea, #ec4899)"
  >
    <div class="bg-white rounded-4 shadow-lg p-5 w-100" style="max-width: 400px">
      <h2 class="h3 text-center text-dark mb-4 fw-bold">Welcome Back</h2>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="usernameInput" class="form-label text-secondary mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            id="usernameInput"
            placeholder="Enter your username"
            required
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <label for="passwordInput" class="form-label text-secondary mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            id="passwordInput"
            placeholder="Enter your password"
            required
            class="form-control"
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary w-100 py-2 mt-3 fw-semibold"
          style="background-color: #6366f1; border-color: #6366f1"
        >
          Login
        </button>

        <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
      </form>

      <p class="text-center text-muted small mt-4">
        Don't have an account?
        <a href="#" class="text-primary fw-semibold text-decoration-none">Sign up</a>
      </p>
    </div>
  </div>
</template>

<script setup>
// Bagian <script setup> tidak perlu diubah karena tidak ada dependensi ke Tailwind CSS
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post(`${apiUrl}/login`, {
      username: username.value,
      password: password.value,
    })
    localStorage.setItem('token', res.data.token)
    router.push('/tasks')
  } catch (err) {
    error.value = 'Login failed'
  }
}
</script>

<style scoped>
/* Anda mungkin perlu menambahkan style di sini jika gradient pada div utama 
  tidak berfungsi, atau jika Anda ingin memastikan elemen menggunakan 100% tinggi viewport.
*/
</style>
