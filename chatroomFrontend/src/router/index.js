import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import { chatRoomUserInfo } from '@/stores/modules/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Layout/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/LoginPage.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/test/testPage.vue')
    }
  ]
})
router.beforeEach((to) => {
  const useStore = chatRoomUserInfo()
  if (!useStore.userInfo.name && to.path !== '/login') return '/login'
})
export default router
