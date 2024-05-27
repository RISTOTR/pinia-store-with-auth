import { createRouter, createWebHistory } from 'vue-router'
import ViewStore from '@/views/ViewStore.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import ViewEdit from '@/views/ViewEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'viewStore',
      component: ViewStore
    },
    {
      path: '/auth',
      name: 'viewAuth',
      component: ViewAuth
    },
    {
      path: '/edit',
      name: 'viewEdit',
      component: ViewEdit
    }
  ]
})

export default router
