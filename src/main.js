import Vue from 'vue'
import App from './App.vue'

// 添加路由
import router from '@/router'
// 引入基本样式
import './styles/base.css'

import { Toast, Icon, Uploader, Dialog, Field, Picker, Tab, Tabs } from 'vant'
Vue.use(Toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(Picker)
  .use(Tab)
  .use(Tabs)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
