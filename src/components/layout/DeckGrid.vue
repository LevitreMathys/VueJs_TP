<template>
  <div class="container">
    <NGrid
      v-if="decksList.length > 0"
      cols="2 400:3 500:4 600:6"
      x-gap="12"
      y-gap="12"
    >
      <NGridItem v-for="deck in decksList" :key="deck.id">
        <DeckCard :deck="deck" />
      </NGridItem>
    </NGrid>

    <NEmpty v-else description="Aucun deck disponible" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useDecksStore } from '@/store/decks.store'
import type { Deck } from '@/types'

import DeckCard from '../DeckCard.vue'

const decksStore = useDecksStore()

const decksList = ref<Deck[]>([])

// onMounted(async () => {
//   const data = await decksStore.getDecks()
//   decksList.value = data
// })

onMounted(async () => {
  const data = await decksStore.getDecks()

  if (data && data.deck) {
    decksList.value = data.deck
  } else {
    decksList.value = Array.isArray(data) ? data : []
  }
})
</script>
