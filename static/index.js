import Vue from 'vue'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import VueResource from 'vue-resource'
// import DirectivesPlugin from './directives'
import routeConfig from './routes/routes'
import store from './vuex/store'
import App from './modules/App/App'
import 'babel-polyfill'

// Vue.use(VueResource)
// 1. 使用模块化机制编程: vue-router
Vue.use(VueRouter)
// Vue.use(DirectivesPlugin)
Vue.use(MintUI)

// 2. 定义（路由）组件和路由: routeConfig

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  hashbang: true,
  mode: 'history',
  saveScrollPosition: true,
  routes: routeConfig
})

// Define your root component for app here
// vue-router: 1.x.x
// router.start(App, '#root')

// 4. 创建和挂载根实例。 vue-router: 2.x.x
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// 路由器会创建一个 App 实例，并且挂载到选择符 #root 匹配的元素上。
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#root')
