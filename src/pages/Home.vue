<template>
  <div style="padding:50px">
    <div>
      <div>
        <h2>โปรโมชั่น</h2>
      </div>
      <div style="display:flex">
        <!-- {{promotions_data}} -->
        <div style="flex:1" v-for="item in promotions_data" :key="item.id">
          <center>
            <b-tooltip :target="item.id"> {{ item.name }}</b-tooltip>
            <img :src="item.images" alt="" :id="item.id">
          </center>
        </div>
        <!-- <div style="flex:1">
          <center><img :src="promotion_img[0]" alt=""></center>
        </div>
        <div style="flex:1">
          <center> <img :src="promotion_img[1]" alt=""></center>
        </div> -->
      </div>
    </div>
    <hr />
    <div>
      <div>
        <h2>สินค้าขายดี</h2>
      </div>
      <div style="display:flex;overflow-y:scroll;width:100vw">
        <div style="flex:1" v-for="(item, index) in best_seller_data" :key="index">
          <center>
            <b-tooltip :target="item.id"> {{ item.product_name }}</b-tooltip>

            <img style="height: 512px;width: 512px;" :src="item.img_link" alt="" :id="item.id"
              @click="openDetail(item.id)" />

          </center>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <div>
        <h2>ทั้งหมด</h2>
      </div>
      <div>
        <b-container fluid>
          <!-- Stack the columns on mobile by making one full-width and the other half-width -->
          <b-row>
            <b-col class="product-item" cols="3" md="3" v-for="product_item in products" :key="product_item.id">
              <div>
                  <b-tooltip :target="product_item.id"> {{ product_item.product_name }}</b-tooltip>
                <img style="height: 512px;width: 512px;" :src="product_item.img_link" alt="" :id="product_item.id"
                  @click="openDetail(product_item.id)" />
                <div style="text-align: center">{{ product_item.product_name }} {{product_item.price}} บาท</div>
              </div>
            </b-col>

          </b-row>


        </b-container>
        <div class="show-more"
          style="text-align: center;font-size: 20;font-weight: bold;color: darkcyan;margin-top: 10px;cursor: pointer;"
          @click="show_more">
          <span>เพิ่มเติม</span>
        </div>
      </div>
    </div>
    <div class="loading-box" v-if="loading">
      <div class="loader"></div>
    </div>

  </div>

</template>

<script>

import axios from "axios"
var base_url = "http://127.0.0.1:3333"
export default {
  components: {
  },
  created() {
    this.getBestSeller()
    this.getPromotions()
    this.getProduct()
  },
  methods: {
    setOpenLoading() {
      this.loading = true
    },
    setCloseLoading() {
      setTimeout(() => {
        this.loading = false
      }, 1500);
    },
    getBestSeller() {
      this.setOpenLoading()
      axios.post(`${base_url}/best_seller`)
        .then((res) => {
          this.best_seller_data = res.data.data
          this.setCloseLoading()
        })
    },
    getPromotions() {
      this.setOpenLoading()
      axios.get(`${base_url}/promotions`)
        .then((res) => {
          this.promotions_data = res.data.data
          this.setCloseLoading()
        })
    },
    openDetail(product_id) {
      this.$router.push(`/product/detail/${product_id}`)
    },
    async getProduct() {
      this.setOpenLoading()
      return axios.get(`${base_url}/products/${this.page}/${this.limit}`)
        .then((res) => {
          this.products = [...this.products, ...res.data.data.data]
          this.setCloseLoading()
          return this.products
        })
    },
    async show_more() {
      this.page += 1
      await this.getProduct()
       window.scrollTo(0, document.body.scrollHeight);
    }
  },
  data: () => ({
    loading: false,
    page: 1,
    limit: 8,
    promotions_data: [],
    best_seller_data: [],
    promotion_img: [
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/promotion%2Fb2.png?alt=media&token=2d6e2fd2-00c6-4a70-bc1d-3b2c3d08eda0",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/promotion%2Fbarcode.jpg?alt=media&token=f2f9f6e2-f69e-4cf8-b5a2-1817c5af4b5b"
    ],
    best_seller: [
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816"
    ],
    products: [

    ]
  }),
};
</script>

<style scoped>
.show-more:hover {
  background-color: #8db5b5;
  color: rgb(253, 255, 255);
}

.loading-box {
  position: fixed;
  z-index: 999;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #8db5b56b;
}

.loader {

  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;


  border: 20px solid #EAF0F6;


  border-radius: 50%;


  border-top: 20px solid #FF7A59;


  width: 200px;


  height: 200px;


  animation: spinner 4s linear infinite;


}




@keyframes spinner {


  0% {
    transform: rotate(0deg);
  }


  100% {
    transform: rotate(360deg);
  }


}
</style>