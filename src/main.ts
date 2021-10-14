import library from 'be-right-vue3-lib'
import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import './assets/tailwind.css'
import { createPinia } from 'pinia'

const app = createApp(App)
const store = createPinia()
app.use(library)
app.use(router)
app.use(store)
app.mount('#app')
