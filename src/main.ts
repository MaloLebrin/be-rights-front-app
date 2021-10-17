import library from 'be-right-vue3-lib'
import { createApp } from 'vue'
import router from '@/router/index'
import App from './App.vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'
import { VueCookieNext } from 'vue-cookie-next'

const app = createApp(App)
const store = createPinia()
app.use(library)
app.use(router)
app.use(store)

app.use(VueCookieNext)
// VueCookieNext.config({
// 	path: '/',
// 	domain: '',
// 	secure: 'false',//TODO set true in prod
// 	sameSite: '',
// })
VueCookieNext.setCookie('themeBeRight', 'default')
app.mount('#app')
