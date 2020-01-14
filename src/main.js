import Vue from 'vue'
import App from './App.vue'

// 添加路由
import router from '@/router'
// 引入基本样式
import './styles/base.css'

import { Toast, Icon, Uploader, Dialog, Field, Picker, Tab, Tabs, List, PullRefresh, Search, Button, SwipeCell } from 'vant'
Vue.use(Toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(Picker)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Search)
  .use(Button)
  .use(SwipeCell)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
