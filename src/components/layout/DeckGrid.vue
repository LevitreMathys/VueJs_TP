<template>
  <div class="container">
    <!-- <NEmpty description="Page d'accueil à implémenter (tickets 2 et 3)" /> -->

    <NGrid v-if="!decksList" cols="2 400:3 500:4 600:6">
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

const CardsStore = useDecksStore()

const decksList = ref<Deck[]>([])

onMounted(async () => {
  decksList.value = await CardsStore.getDecks()
})
</script>
