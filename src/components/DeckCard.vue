<template>
  <NCard :title="deck.name" :style="{ cursor: 'pointer' }">
    <p>{{ deck.name }}</p>
    <NButton strong secondary type="error" @click.stop="handleDeletedeck">
      Supprimer
    </NButton>
  </NCard>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'

import { useApi } from '@/composables/useApi'
import { type Deck } from '@/types'

interface ShowDeckProps {
  deck: Deck
}
const props = defineProps<ShowDeckProps>()

const emit = defineEmits(['deleted'])

const message = useMessage()

const api = useApi()

const handleDeletedeck = async () => {
  try {
    await api.deleteDeck(props.deck.id)
    message.success('Deck supprimé avec succès !')

    emit('deleted')
  } catch (error: unknown) {
    if (error instanceof Error) {
      message.error('Erreur lors de la suppression du deck : ' + error.message)
    } else {
      message.error('Une erreur inconnue est survenue')
    }
  }
}
</script>
