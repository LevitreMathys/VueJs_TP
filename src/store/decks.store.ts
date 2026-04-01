// src/store/cards.store.ts
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'

export const useDecksStore = defineStore('decks', () => {
  const useAPI = useApi()

  const getDecks = async () => {
    const response = await useAPI.getMyDecks()

    return response
  }

  return { getDecks }
})
