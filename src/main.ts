import { createApp } from 'vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { globalCookiesConfig } from 'vue3-cookies'
import VCalendar from 'v-calendar'
import Toast, { POSITION } from 'vue-toastification'
import App from './App.vue'
import router from '@/router/index'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const store = createPinia()

globalCookiesConfig({
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: import.meta.env.MODE === 'production',
  sameSite: 'None',
})

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 1000,
})

app.use(store)
app.use(router)
app.use(VCalendar)
app.mount('#app')
