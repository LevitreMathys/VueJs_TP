<template>
  <NConfigProvider>
    <NMessageProvider>
      <NLayout has-sider style="height: 100vh">
        <NLayoutSider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          show-trigger
        >
          <NMenu
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :value="currentRoute"
            @update:value="router.push($event)"
          />
        </NLayoutSider>

        <NLayout>
          <HeaderBar v-if="isAuthenticated" />
          <NLayoutContent style="padding: 16px">
            <RouterView />
          </NLayoutContent>
        </NLayout>
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import HeaderBar from './components/layout/HeaderBar.vue'
import { useAuthStore } from './store/auth.store'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const router = useRouter()
const route = useRoute()
const currentRoute = computed(() => route.path)

const menuOptions: MenuOption[] = [
  {
    label: 'Decks',
    children: [
      {
        label: 'Mes decks',
        key: '/mydecks',
      },
    ],
  },
  {
    label: 'Cartes disponibles',
    key: '/cards',
  },
]
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  overflow: hidden;
}
</style>
