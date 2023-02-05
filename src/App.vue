<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>
// import MainLayout from "@/components/MainLayout.vue"

export default {
  name: 'App',
  components: {
    // MainLayout
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



.btn-custom-primary {
  margin: 5px;
  display: inline-block;
  font-weight: 400;
  color: #fafdff;
  text-align: center;
  vertical-align: middle;

  user-select: none;
  background-color: #F96302;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn-custom-secondary {
  margin: 5px;
  display: inline-block;
  font-weight: 400;
  color: #fafdff;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: #7e421a;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
