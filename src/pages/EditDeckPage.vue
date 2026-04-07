<script setup lang="ts">
import { NInput, useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PokemonCard from '@/components/layout/PokemonCard.vue'
import { useCardsStore } from '@/store/cards.store'
import { useDecksStore } from '@/store/decks.store'
import type { Card } from '@/types'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const cardsStore = useCardsStore()
const decksStore = useDecksStore()

const deckId = Number(route.params.id)
const deckName = ref('')
const selectedCards = ref<number[]>([])
const cardsList = ref<Card[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const [allCards, existingDeck] = await Promise.all([
      cardsStore.getCards(),
      decksStore.getDeckById(deckId),
    ])

    cardsList.value = allCards

    deckName.value = existingDeck.name

    selectedCards.value = existingDeck.cards.map((c: unknown) => c.id)
  } catch (error: unknown) {
    message.error('Impossible de charger le deck' + error)
  } finally {
    isLoading.value = false
  }
})

const handleUpdateDeck = async () => {
  try {
    await decksStore.updateDeck(deckId, {
      name: deckName.value,
      cards: selectedCards.value,
    })
    message.success('Deck mis à jour !')

    // RG4 : Redirection vers la page de détail
    router.push(`/decks/${deckId}`)
  } catch (error) {
    message.error('Erreur lors de la mise à jour' + error)
  }
}

// N'oublie pas la fonction clickedCards pour gérer la sélection (identique à CreateDeck)
const clickedCards = (cardId: number) => {
  const index = selectedCards.value.indexOf(cardId)
  if (index > -1) {
    selectedCards.value.splice(index, 1)
  } else if (selectedCards.value.length < 10) {
    selectedCards.value.push(cardId)
  }
}
</script>

<template>
  <div class="container">
    <NFormItem label="Nom du deck">
      <NInput v-model:value="deckName" />
    </NFormItem>

    <div
      style="margin-bottom: 16px; display: flex; justify-content: space-between"
    >
      <NTag>{{ selectedCards.length }} / 10 sélectionnés</NTag>
      <NButton
        type="primary"
        :disabled="selectedCards.length !== 10 || !deckName"
        @click="handleUpdateDeck"
      >
        Enregistrer les modifications
      </NButton>
    </div>

    <NSpin v-if="isLoading" />
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
