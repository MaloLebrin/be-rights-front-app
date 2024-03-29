import { createApp } from 'vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { globalCookiesConfig } from 'vue3-cookies'
import VCalendar from 'v-calendar'
import Toast, { POSITION } from 'vue-toastification'
import App from './App.vue'
import router from '@/router/index'
import 'vue-toastification/dist/index.css'
import 'v-calendar/dist/style.css'

const app = createApp(App)
const store = createPinia()
app.config.performance = import.meta.env.VITE_DEV

globalCookiesConfig({
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None',
})

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 1000,
})

app.use(store)
app.use(router)
app.use(VCalendar, {})
app.mount('#app')
