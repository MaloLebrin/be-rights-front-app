import library from 'be-right-vue3-lib'
import { createApp } from 'vue'
import router from '@/router/index'
import App from './App.vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { VueCookieNext } from 'vue-cookie-next'
import VCalendar from 'v-calendar'

const app = createApp(App)

const store = createPinia()
app.use(library)
app.use(router)
app.use(store)
app.use(VueCookieNext)
app.use(VCalendar, {
})

app.mount('#app')
