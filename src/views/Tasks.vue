<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10">
        <div class="card shadow-lg border-0 rounded-4">
          <div class="card-body p-4 p-md-5">
            <h2 class="card-title text-center mb-4 fw-bold text-primary">
              <i class="bi bi-list-check me-2"></i> Daftar Tugas Anda
            </h2>

            <form @submit.prevent="addTask" class="mb-5">
              <div class="input-group">
                <input
                  v-model="newTask"
                  placeholder="Ketik tugas baru di sini..."
                  class="form-control form-control-lg border-primary"
                  aria-label="New Task Input"
                />
                <button type="submit" class="btn btn-primary btn-lg px-4" :disabled="!newTask">
                  <i class="bi bi-plus-lg me-1"></i> Tambah
                </button>
              </div>
            </form>

            <ul class="list-group list-group-flush">
              <li
                v-for="task in tasks"
                :key="task.id"
                class="list-group-item d-flex justify-content-between align-items-center ps-0 pe-2 py-3"
              >
                <span
                  class="flex-grow-1 fs-5"
                  :class="{ 'text-decoration-line-through text-muted': task.completed }"
                >
                  {{ task.title }}
                </span>

                <div class="d-flex align-items-center">
                  <span
                    class="badge me-3 py-2 px-3 fw-bold"
                    :class="task.completed ? 'bg-success' : 'bg-warning text-dark'"
                  >
                    {{ task.completed ? 'Selesai' : 'Tertunda' }}
                  </span>

                  <button
                    @click="toggleTask(task)"
                    class="btn btn-sm"
                    :class="task.completed ? 'btn-outline-secondary' : 'btn-outline-success'"
                    aria-label="Toggle Task Status"
                  >
                    <i
                      :class="
                        task.completed ? 'bi bi-arrow-counterclockwise' : 'bi bi-check2-square'
                      "
                    ></i>
                  </button>

                  <button
                    @click="deleteTask(task.id)"
                    class="btn btn-outline-danger btn-sm ms-2"
                    aria-label="Delete Task"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </li>

              <li
                v-if="tasks.length === 0"
                class="list-group-item text-center text-muted fst-italic py-4"
              >
                Belum ada tugas. Saatnya produktif!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Mengubah dari <script> export default setup() menjadi <script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
const apiUrl = import.meta.env.VITE_API_URL

const tasks = ref([])
const newTask = ref('')

// Semua fungsi tetap sama, hanya menggunakan sintaks <script setup>

const fetchTasks = async () => {
  const token = localStorage.getItem('token')
  // Menambahkan penanganan error dasar
  try {
    const res = await axios.get(`${apiUrl}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    tasks.value = res.data.data
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    // Di aplikasi nyata, Anda mungkin ingin menampilkan pesan error ke pengguna.
  }
}

const addTask = async () => {
  if (!newTask.value.trim()) return
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      `${apiUrl}/tasks`,
      { title: newTask.value.trim() },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    tasks.value.push(res.data)
    newTask.value = ''
  } catch (error) {
    console.error('Failed to add task:', error)
  }
}

const toggleTask = async (task) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.put(
      `${apiUrl}/tasks/${task.id}`,
      { completed: !task.completed },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    // Update task secara lokal
    task.completed = res.data.completed
  } catch (error) {
    console.error('Failed to toggle task:', error)
  }
}

const deleteTask = async (id) => {
  const token = localStorage.getItem('token')
  try {
    await axios.delete(`${apiUrl}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // Filter task secara lokal
    tasks.value = tasks.value.filter((t) => t.id !== id)
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

onMounted(fetchTasks)
</script>

<style scoped>
/* Optional: Jika Anda ingin menggunakan warna kustom di luar skema Bootstrap */
.text-primary {
  color: #0d6efd !important; /* Contoh: Warna Biru Primary Bootstrap */
}
/* Anda juga perlu memastikan icon Bootstrap (seperti bi-list-check) terinstal,
   misalnya dengan mengimpor Bootstrap Icons di index.html atau package Anda. */
</style>
