import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'
import SignInPage from './pages/SignInPage.vue'
import SignUpPage from './pages/SignUpPage.vue'
import { useAuthStore } from './store/auth.store'

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage, meta: { requiresAuth: true } },
  { path: ROUTES.SIGN_UP, component: SignUpPage },
  { path: ROUTES.SIGN_IN, component: SignInPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  const { isAuthenticated } = storeToRefs(authStore)
  if (to.meta.requiresAuth) {
    if (isAuthenticated.value) {
      return next()
    }
    return router.push(ROUTES.SIGN_IN)
  }
  //   if (!to.meta.requiresAuth) {
  //     if (isAuthenticated.value) {
  //       return router.push(ROUTES.HOME)
  //     }
  //   }
  return next()
})

export default router
