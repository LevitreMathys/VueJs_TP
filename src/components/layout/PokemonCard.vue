<template>
  <NCard
    :title="card.name"
    class="pokemon-card"
    :class="{ 'is-selected': selected, 'is-disabled': disabled }"
    @click="!disabled || selected ? $emit('toggle') : null"
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
import { type Card, POKEMON_TYPE_COLORS } from '@/types'
interface ShowCardProps {
  card: Card
  selected: boolean
  disabled: boolean
}

defineEmits(['toggle'])
defineProps<ShowCardProps>()
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
.pokemon-card {
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  border: 2px solid transparent;
}

.is-selected {
  border-color: #18a058;
  transform: translateY(-5px);
}

.is-disabled:not(.is-selected) {
  opacity: 0.5;
  filter: grayscale(1);
  cursor: not-allowed;
}

.card-overlay {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #18a058;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
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
