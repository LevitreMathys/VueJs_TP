<template>
  <div v-if="deck" class="container">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      "
    >
      <h1>{{ deck.name }}</h1>
      <NButton type="primary" @click="router.push(`/decks/edit/${deck.id}`)">
        Modifier le deck
      </NButton>
    </div>

    <NGrid cols="2 400:3 500:4 600:6" x-gap="12" y-gap="12">
      <NGridItem v-for="card in deck.cards" :key="card.id">
        <PokemonCard :card="card" :selected="true" :disabled="true" />
      </NGridItem>
    </NGrid>
  </div>
  <NSpin v-else />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PokemonCard from '@/components/layout/PokemonCard.vue'
import { useDecksStore } from '@/store/decks.store'
import type { Deck } from '@/types'

const route = useRoute()
const router = useRouter()
const decksStore = useDecksStore()
const deck = ref<Deck | null>(null)

onMounted(async () => {
  const deckId = Number(route.params.id)
  // Hypothèse : tu as une fonction getDeckById dans ton store
  deck.value = await decksStore.getDeckById(deckId)
})
</script>
