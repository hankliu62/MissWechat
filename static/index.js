import Vue from 'vue'
import VueRouter from 'vue-router'
// import DirectivesPlugin from './directives'
import routeConfig from './routes/routes'
import App from './modules/App/App'

// Vue.use(VueRouter)
// Vue.use(DirectivesPlugin)

const router = new VueRouter({
  hashbang: true,
  mode: 'history',
  saveScrollPosition: true,
  routes: routeConfig
})

// Define your root component for app here
// router.start(App, '#root')

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#root')
