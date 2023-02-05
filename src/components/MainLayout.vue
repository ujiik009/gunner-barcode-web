<template>
    <div>
    
      <MainMenu/>
      <router-view></router-view>
    </div>
</template>

<script>
// import Header from "@/components/Header.vue"
import MainMenu from "@/components/MainMenu.vue"
export default {
components:{
    // Header,
    MainMenu
}
}
</script>

<style>

</style>