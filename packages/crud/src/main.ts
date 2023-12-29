import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import Crud from './index.ts'

import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus).use(Crud).mount('#app')
