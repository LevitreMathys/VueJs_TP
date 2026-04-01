<template>
  <NButton type="primary" @click="router.push(ROUTES.CREATE_DECK)">
    Créer un deck
  </NButton>

  <DeckGrid />
</template>

<script lang="ts" setup>
import DeckGrid from '@/components/layout/DeckGrid.vue'
import router, { ROUTES } from '@/router'
</script>
