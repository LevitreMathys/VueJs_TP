import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import CardsListPage from './pages/CardsListPage.vue'
import CreateDeckPage from './pages/CreateDeckPage.vue'
import DecksGridPage from './pages/DecksGridPage.vue'
import HomePage from './pages/HomePage.vue'
import SignInPage from './pages/SignInPage.vue'
import SignUpPage from './pages/SignUpPage.vue'
import { useAuthStore } from './store/auth.store'

export const ROUTES = {
  HOME: '/',
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  MY_DECKS_LIST: '/mydecks',
  CARDS_LIST: '/cards',
  CREATE_DECK: '/create-deck',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage, meta: { requiresAuth: true } },
  { path: ROUTES.SIGN_UP, component: SignUpPage },
  { path: ROUTES.SIGN_IN, component: SignInPage },
  {
    path: ROUTES.CARDS_LIST,
    component: CardsListPage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.MY_DECKS_LIST,
    component: DecksGridPage,
    meta: { requiresAuth: true },
  },
  {
    path: ROUTES.CREATE_DECK,
    component: CreateDeckPage,
    meta: { requiresAuth: true },
  },
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
