<template>
  <div>
    <div><h3>วีดีโอแนะนำ</h3></div>
    <div>
      <b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
          <b-col v-for="(vdo,index) in vdos" :key="index" col lg="6" md="6">
           <LazyYoutube :src="vdo" /> 
          </b-col>
        </b-row>
      </b-container>
      <!-- Youtube Embed -->
      <!-- <LazyYoutube src="https://www.youtube.com/watch?v=Ua5WLUzgbNs" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vdos: [
        "https://www.youtube.com/watch?v=Ua5WLUzgbNs",
        "https://www.youtube.com/watch?v=n6nAo2QylH8",
        "https://www.youtube.com/watch?v=C7H_ciLNqw4",
        "https://www.youtube.com/watch?v=ObkFvwvbIYg",
        "https://www.youtube.com/watch?v=uOJaPH7HuI4",
        "https://www.youtube.com/watch?v=rfr2tTlhUPk",
        "https://www.youtube.com/watch?v=twPfxOVczUs",
        ],

    };
  },
};
</script>

<style>
</style>