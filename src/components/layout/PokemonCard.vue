<template>
  <NCard
    :title="card.name"
    :style="{
      borderColor: isSelected ? '#00fe9c' : '',
      backgroundColor: isSelected ? 'rgba(0, 254, 156, 0.15)' : '',
      cursor: 'pointer',
    }"
    @click="isSelected = !isSelected"
  >
    <img :src="card.imgUrl" :alt="card.name" />
    <p>#{{ card.pokedexNumber }}</p>
    <p>{{ card.name }}</p>
    <span
      class="type-badge"
      :style="{ backgroundColor: POKEMON_TYPE_COLORS[card.type] }"
    >
      {{ card.type }}
    </span>
    <p>❤️ {{ card.hp }} · ⚔️ {{ card.attack }}</p>
  </NCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { type Card, POKEMON_TYPE_COLORS } from '@/types'

const isSelected = ref(false)

interface ShowCardProps {
  card: Card
}
defineProps<ShowCardProps>()
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}

:deep(.n-card) {
  height: 150px;
}

.type-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}
</style>
