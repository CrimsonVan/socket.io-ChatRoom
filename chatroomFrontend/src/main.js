import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores/index'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const app = createApp(App)
app.use(hljsVuePlugin)
app.use(pinia)
app.use(router)
app.mount('#app')
