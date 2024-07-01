import { createRouter, createWebHistory } from 'vue-router';
import Activity1 from '@/views/Activity1.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'activity1',
      component: Activity1
    },
    {
      path: '/activity2',
      name: 'activity2',
      component: () => import('@/views/Activity2.vue')
    },
    {
      path: '/activity3',
      name: 'activity3',
      component: () => import('@/views/Activity3.vue')
    }
  ]
})

export default router
