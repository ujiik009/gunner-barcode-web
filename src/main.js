import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import AboutMe from '@/pages/AboutMe.vue'
import Home from '@/pages/Home.vue'
import StickerDesign from '@/pages/StickerDesign.vue'
import Claim from '@/pages/Claim.vue'
import Vdo from '@/pages/Vdo.vue'
Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [
  { path: '/about-me', component: AboutMe },
  { path: '/home', component: Home},
  { path: '/stickerdesign', component: StickerDesign},
  { path: '/claim', component: Claim},
  { path: '/vdo', component: Vdo}
  
  
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
