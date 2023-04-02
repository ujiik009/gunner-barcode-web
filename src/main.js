import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import AboutMe from '@/pages/AboutMe.vue'
import Home from '@/pages/Home.vue'
import StickerDesign from '@/pages/StickerDesign.vue'
import Claim from '@/pages/Claim.vue'
import Vdo from '@/pages/Vdo.vue'
import Login from '@/pages/Login.vue'
import ProductDetail from '@/pages/ProductDetail'
import LazyTube from "vue-lazytube";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueKonva from 'vue-konva';
import VSwitch from 'v-switch-case'
import MainLayout from '@/components/MainLayout.vue'
import AdminPage from "@/pages/AdminPage.vue"
import { DatePicker } from 'ant-design-vue';
import OrderAdminPage from "@/pages/Admin/OrderPage.vue"
import OrderDetail from "@/pages/Admin/OrderDetail.vue"
import ClaimAdminPage from "@/pages/Admin/ClaimPage.vue"
import ProductAdminPage from "@/pages/Admin/ProductPage.vue"
import EditProductAdminPage from "@/pages/Admin/EditProduct.vue"
import Antd from 'ant-design-vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'ant-design-vue/dist/antd.css';
import { createPinia } from 'pinia'

const pinia = createPinia()

Vue.config.productionTip = false
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(LazyTube);
Vue.use(DatePicker);
Vue.use(VueRouter)
Vue.use(pinia)
Vue.use(VueKonva);
Vue.use(VSwitch)
Vue.use(Antd);

const routes = [
  { path: '/', redirect: '/main' },

  {
    path: '/main', component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'stickerdesign', component: StickerDesign },
      { path: 'claim', component: Claim },
      { path: 'vdo', component: Vdo },
      { path: "product/detail/:id", component: ProductDetail },
      { path: 'about-me', component: AboutMe },

    ]
  },
  {
    path: "/admin", component: AdminPage,
    children: [
      {
        path: '', component: OrderAdminPage
      },
      {
        path: 'order', component: OrderAdminPage,
      },
      {
        path: 'order/:order_id', component: OrderDetail
      },
      {
        path: 'claim', component: ClaimAdminPage
      },
      {
        path: 'product', component: ProductAdminPage
      },
      {
        path: 'product/:product_id', component: EditProductAdminPage
      }
    ],
    beforeEnter: (to, from, next) => {
      var user = localStorage.getItem("user")
      if (user) {
        var data_user = JSON.parse(user)
        if (data_user.role == "ADMIN") {
          next()
        } else {
          next("/login")
        }
      } else {
        next("/login")
      }

    }
  },
  { path: "/login", component: Login }




]
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router,
  render: h => h(App),
})
  .$mount('#app')
