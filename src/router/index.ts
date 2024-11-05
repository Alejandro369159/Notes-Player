import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/NotesPlayerPage.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/pages/TestPlayer.vue')
    }
  ]
})

export default router
