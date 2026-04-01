<template>
  <NCard
    :title="deck.name"
    :style="{
      cursor: 'pointer',
    }"
  >
    <p>{{ deck.name }}</p>
  </NCard>
</template>

<script setup lang="ts">
import { type Deck } from '@/types'

interface ShowDeckProps {
  deck: Deck
}
defineProps<ShowDeckProps>()
</script>

<style scoped>
:deep(.n-card) {
  height: 150px;
}
</style>
