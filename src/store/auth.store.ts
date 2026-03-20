// src/store/auth.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useApi } from '@/composables/useApi'
import { useStorage } from '@/composables/useStorage'
import { ROUTES } from '@/router'
import type { User } from '@/types'

import type { SignInPayload, SignUpPayload } from './../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const { get, set, remove } = useStorage()
  const useAPI = useApi()
  const router = useRouter()

  const token = ref(get<string>('token'))
  const user = ref(get<User>('user'))

  const isAuthenticated = computed((): boolean => {
    return token.value && user.value ? true : false
  })

  const signUp = async (payload: SignUpPayload) => {
    const { username, email, password } = payload
    const response = await useAPI.signUp({
      username: username,
      email: email,
      password: password,
    })
    set('token', response.token)
    set('user', response.user)
    token.value = response.token
    user.value = response.user
    router.push(ROUTES.HOME)
  }

  const signIn = async (payload: SignInPayload) => {
    const { email, password } = payload
    const response = await useAPI.signIn({
      email: email,
      password: password,
    })
    set('token', response.token)
    set('user', response.user)
    token.value = response.token
    user.value = response.user
    router.push(ROUTES.HOME)
  }

  const signOut = async () => {
    remove('token')
    remove('user')
    router.push(ROUTES.SIGN_IN)
  }

  return { token, user, isAuthenticated, signUp, signIn, signOut }
})
