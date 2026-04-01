// src/store/cards.store.ts
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

export const useCardsStore = defineStore('cards', () => {
  const getCards = async () => {
    const useAPI = useApi()
    const response = await useAPI.getCards()

    return response
  }

  return { getCards }
})
