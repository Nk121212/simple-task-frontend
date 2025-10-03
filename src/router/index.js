import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Tasks from '../views/Tasks.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/tasks',
    component: Tasks,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/tasks')
  } else {
    next()
  }
})

export default router
