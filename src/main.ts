import { createApp } from 'vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { VueCookieNext } from 'vue-cookie-next'
import VCalendar from 'v-calendar'
import App from './App.vue'
import router from '@/router/index'

const app = createApp(App)
const store = createPinia()

app.use(VueCookieNext)
app.use(store)
app.use(router)
app.use(VCalendar)
app.mount('#app')
