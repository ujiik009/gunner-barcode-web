import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import AboutMe from '@/pages/AboutMe.vue'
import Home from '@/pages/Home.vue'
import StickerDesign from '@/pages/StickerDesign.vue'
import Claim from '@/pages/Claim.vue'
import Vdo from '@/pages/Vdo.vue'
import ProductDetail from '@/pages/ProductDetail'
import * as VueGoogleMaps from 'vue2-google-maps'
import LazyTube from "vue-lazytube";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueKonva from 'vue-konva';
import VSwitch from 'v-switch-case'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { createPinia } from 'pinia'

const pinia = createPinia()
	
Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(LazyTube);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCW2fzdLg2Cahf1PTLjXSEO8_ek5WYmNP4',
    libraries: 'places',
  }
});


Vue.use(VueRouter)
Vue.use(pinia)
Vue.use(VueKonva);
Vue.use(VSwitch)
const routes = [
  { path: '/', redirect: '/home' },
  { path: '/about-me', component: AboutMe },
  { path: '/home', component: Home },
  { path: '/stickerdesign', component: StickerDesign },
  { path: '/claim', component: Claim },
  { path: '/vdo', component: Vdo },
  { path: "/product/detail/:id", component: ProductDetail }


]
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
})
.$mount('#app')
