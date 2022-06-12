import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入自定义组件库
import ui from './components/library'
import 'normalize.css'
import '@/assets/styles/common.less'
createApp(App).use(store).use(router).use(ui).mount('#app')
