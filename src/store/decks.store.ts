// src/store/cards.store.ts
import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'
import type { Deck, DeckPayload } from '@/types'

export const useDecksStore = defineStore('decks', () => {
  const useAPI = useApi()

  const getDecks = async () => {
    const response = (await useAPI.getMyDecks()) as unknown as { deck: Deck[] }

    return response.deck
  }
  const createDeck = async (playload: DeckPayload) => {
    const { name, cards } = playload

    const response = await useAPI.createDeck({ name, cards })

    return response
  }

  return { getDecks, createDeck }
})
