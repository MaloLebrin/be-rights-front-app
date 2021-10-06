import library from 'be-right-vue3-lib';
import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

const app = createApp(App)
app.use(library)
app.mount('#app')
