<template>
    <div>
      <Header/>
      <Menu/>
      <router-view></router-view>
    </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Menu from "@/components/Menu.vue"
export default {
components:{
    Header,
    Menu
}
}
</script>

<style>

</style>