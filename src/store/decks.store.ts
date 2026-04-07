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

  const getDeckById = async (id: number) => {
    const response = (await useAPI.getDeck(id)) as unknown as { deck: Deck }
    return response.deck || response
  }

  const updateDeck = async (id: number, payload: DeckPayload) => {
    return await useAPI.updateDeck(id, payload)
  }

  return { getDecks, createDeck, getDeckById, updateDeck }
})
