<template>
  <NFormItem label="Nom de votre deck">
    <NInput v-model:value="deckName" placeholder="Entrez le nom du deck..." />
  </NFormItem>

  <div
    style="
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    "
  >
    <NTag :type="selectedCards.length === 10 ? 'success' : 'info'">
      {{ selectedCards.length }} / 10 cartes sélectionnées
    </NTag>

    <NButton
      type="primary"
      :disabled="selectedCards.length !== 10 || !deckName"
      @click="handleCreateDeck"
    >
      Créer le deck
    </NButton>
  </div>

  <div class="container">
    <NSpin v-if="isLoading" />
    <NEmpty v-else-if="cardsList.length === 0" description="Aucune carte" />

    <NGrid v-else cols="2 400:3 500:4 600:6" x-gap="12" y-gap="12">
      <NGridItem v-for="card in cardsList" :key="card.id">
        <PokemonCard
          :card="card"
          :selected="selectedCards.includes(card.id)"
          :disabled="
            selectedCards.length >= 10 && !selectedCards.includes(card.id)
          "
          @toggle="clickedCards(card.id)"
        />
      </NGridItem>
    </NGrid>
  </div>
</template>
<script lang="ts" setup>
import { NInput, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import PokemonCard from '@/components/layout/PokemonCard.vue'
import { useCardsStore } from '@/store/cards.store'
import { useDecksStore } from '@/store/decks.store'
import type { Card } from '@/types'

const message = useMessage()

const deckName = ref('')
const selectedCards = ref<number[]>([])

const CardsStore = useCardsStore()
const decksStore = useDecksStore()

const cardsList = ref<Card[]>([])
const isLoading = ref(true)
const router = useRouter()

onMounted(async () => {
  try {
    cardsList.value = await CardsStore.getCards()
  } finally {
    isLoading.value = false
  }
})

const handleCreateDeck = async () => {
  try {
    await decksStore.createDeck({
      name: deckName.value,
      cards: selectedCards.value,
    })
    message.success('Deck créé avec succès !')
    router.push('/mydecks')
  } catch (error: unknown) {
    if (error instanceof Error) {
      message.error(error.message)
    } else {
      message.error('Une erreur inconnue est survenue')
    }
  }
}

const clickedCards = (cardId: number) => {
  const index = selectedCards.value.indexOf(cardId)

  if (index > -1) {
    selectedCards.value.splice(index, 1)
  } else if (selectedCards.value.length < 10) {
    selectedCards.value.push(cardId)
  }
}
</script>
