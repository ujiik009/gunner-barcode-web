<template>
  <div id="app">
    <MainLayout />
   
  </div>
</template>

<script>
import MainLayout from "@/components/MainLayout.vue"

export default {
  name: 'App',
  components: {
    MainLayout
  },
  data() {
    return {
      
    }
  }
}
</script>

<style>
/* custom scrollbar */
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
