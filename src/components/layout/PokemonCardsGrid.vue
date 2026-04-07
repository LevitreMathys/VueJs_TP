<template>
  <div class="container">
    <NSpin v-if="isLoading" />
    <NEmpty
      v-else-if="cardsList.length === 0"
      description="Aucune carte trouvée"
    />
    <NGrid v-else cols="2 400:3 500:4 600:6">
      <NGridItem v-for="card in cardsList" :key="card.id">
        <PokemonCard :card="card" />
      </NGridItem>
    </NGrid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import PokemonCard from '@/components/layout/PokemonCard.vue'
import { useCardsStore } from '@/store/cards.store'
import type { Card } from '@/types'

const CardsStore = useCardsStore()

const cardsList = ref<Card[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    cardsList.value = await CardsStore.getCards()
  } finally {
    isLoading.value = false
  }
})
</script>
