<template>
  <NFormItem path="deckName" label="Nom de votre deck">
    <NInput @keydown.enter.prevent />
  </NFormItem>

  <div style="display: flex; justify-content: flex-end">
    <NButton type="primary"> Créer un deck </NButton>
  </div>

  <PokemonCardsGrid />
</template>

<script lang="ts" setup>
import { NInput } from 'naive-ui'

import PokemonCardsGrid from '@/components/layout/PokemonCardsGrid.vue'
</script>
