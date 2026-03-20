import naive from 'naive-ui'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(naive)
app.use(PrimeVue)

app.mount('#app')
