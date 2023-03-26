<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo">Admin</div>
            <a-menu theme="dark" mode="inline" :default-selected-keys="[]">
                <a-menu-item :key="item_menu.key" v-for="item_menu in menu">
                    <router-link :to="item_menu.path">
                       
                        <a-icon :type="item_menu.icon" :style="{ fontSize: '22px' }" />
                        <span>{{ item_menu.title }}</span>
                    </router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px',overflow: 'auto'}">
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            collapsed: false,
            menu: [
                {
                    key: "1",
                    title: "รายการสั่งซื้อ",
                    path: "/admin/order",
                    icon: "shop"
                },
                {
                    key: "2",
                    title: "รายการส่งซ้อม",
                    path: "/admin/claim",
                    icon: "tool"
                },
                {
                    key: "3",
                    title: "จัดการสินค้า",
                    path: "/admin/product",
                    icon: "control"
                }
            ]
        };
    },
});
</script>
<style scoped>
#components-layout-demo-custom-trigger {
    height: 100vh;
    
}

#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    color: white;
    margin: 16px;

}
.head-example {
  
  display: inline-block;
  margin-left: 15px;
}
</style>