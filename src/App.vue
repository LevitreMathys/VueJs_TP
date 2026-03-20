<template>
  <NConfigProvider>
    <NMessageProvider>
      <NLayout>
        <HeaderBar v-if="isAuthenticated" />
        <NLayoutContent>
          <RouterView />
        </NLayoutContent>
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import HeaderBar from './components/layout/HeaderBar.vue'
import { useAuthStore } from './store/auth.store'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
</script>

<style>
body {
  padding: 0 20px;
}
</style>
