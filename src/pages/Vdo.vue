<template>
  <div>
    <div>
      <h3>วีดีโอแนะนำ</h3>
    </div>
    <div>
      <b-container class="bv-example-row">
        <b-row class="justify-content-md-center">
          <b-col v-for="(vdo, index) in vdos" :key="index" col lg="6" md="6">
            <LazyYoutube :src="vdo.url" />
          </b-col>
        </b-row>
      </b-container>
      <!-- Youtube Embed -->
      <!-- <LazyYoutube src="https://www.youtube.com/watch?v=Ua5WLUzgbNs" /> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
var base_url = process.env.VUE_APP_API_URL
export default {
  created(){
    this.getVdo()
  },
  methods: {
    getVdo() {
      this.loading = true
      axios.get(base_url + `/vdos`)
        .then((response) => {


          this.vdos = response.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  data() {
    return {
      vdos: [
      ],

    };
  },
};
</script>

<style></style>