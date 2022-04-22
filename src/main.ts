import { createApp } from 'vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { globalCookiesConfig } from 'vue3-cookies'
import VCalendar from 'v-calendar'
import App from './App.vue'
import router from '@/router/index'

const app = createApp(App)
const store = createPinia()

globalCookiesConfig({
  expireTimes: '30d',
  path: '/',
  domain: '',
  secure: true,
  sameSite: 'None',
})

app.use(store)
app.use(router)
app.use(VCalendar)
app.mount('#app')
