import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import 'amfe-flexible'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// app.use(ElementPlus, {
//     locale: zhCn,
//   })

app.use(ElementPlus)
app.use(router)
app.mount('#app')
