import Vue from 'vue'
import App from './App.vue'

// 添加路由
import router from '@/router'
// 引入基本样式
import './styles/base.css'

import { Toast, Icon } from 'vant'
Vue.use(Toast)
  .use(Icon)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
