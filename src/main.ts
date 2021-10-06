import library from 'be-right-vue3-lib'
import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import './assets/tailwind.css'

const app = createApp(App)
app.use(library)
app.use(router)
app.mount('#app')
