<template>
  <div class="main-content">
    <div class="img-land-scape">
      <div style="font-size: 40px;">ยินดีต้อนรับ</div>
    </div>
    <div class="content">
      <div style="display: flex;">
        <div style="flex:4">
          <b-container fluid>

            <b-row>
              <b-col class="product-item" cols="4" md="4" sm="1" xs="1" v-for="product_item in filter_product"
                :key="product_item.id">
                <div style="cursor: pointer;">
                  <b-tooltip :target="product_item.id"> {{ product_item.product_name }}</b-tooltip>
                  <img style="height: 350px;width: 350px;" :src="product_item.img_link" alt="" :id="product_item.id"
                    @click="openDetail(product_item.id)" />
                  <div style="text-align: center">{{ product_item.product_name }} {{ product_item.price }} บาท</div>
                </div>
              </b-col>

            </b-row>


          </b-container>
          <div class="show-more"
            style="text-align: center;font-size: 20;font-weight: bold;color: darkcyan;margin-top: 10px;cursor: pointer;"
            @click="show_more">
            <span>เพิ่มเติม</span>
          </div>
          <div class="load-more-panel">

          </div>
        </div>
        <div style="flex:1">
          <div class="box-std">
            <input placeholder="ค้นหา" class="input-search" v-model="text_search" />
          </div>
          <div class="box-std">
            <div style="font-weight: 500;margin-bottom: 5px;font-size: 18px;">Brand</div>
            <div>
              <div v-for="cat in categories" :key="cat.brand">
                <span class="categories" @click="get_product_by_brand(cat.brand)">{{ cat.brand }} ({{ cat.counting
                }})</span>
              </div>
            </div>
          </div>
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
var base_url = process.env.VUE_APP_API_URL
export default {
  components: {
  },
  created() {
    this.getBestSeller()
    this.getPromotions()
    this.getProduct()
    this.getCategories()
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
    get_product_by_brand(brand) {
      this.setOpenLoading()
      axios.post(`${base_url}/get/products/brand`, {
        brand: brand
      })
        .then((res) => {
          this.products = res.data.data
          console.log(res.data);
          this.setCloseLoading()
        })
    },

    openDetail(product_id) {
      this.$router.push(`/main/product/detail/${product_id}`)
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
    async getCategories() {
      this.setOpenLoading()
      return axios.get(`${base_url}/categories`)
        .then((res) => {
          this.categories = [...res.data.data]
          this.setCloseLoading()
          return this.categories
        })
    },
    async show_more() {
      this.page += 1
      await this.getProduct()
      window.scrollTo(0, document.body.scrollHeight);
    }
  },
  computed: {
    filter_product: function () {
      var text_search = this.text_search
      console.log(this.products);
      return this.products.filter((item) => {
        return new RegExp(text_search, "igm").test(item.product_name)
      })
    }
  },
  data: () => ({
    text_search: "",
    loading: false,
    page: 1,
    limit: 9,
    promotions_data: [],
    best_seller_data: [],
    categories: [],
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
.categories {
  cursor: pointer;
}

.categories:hover {
  font-weight: 700;
}

.input-search {
  border: none;
  width: 100%;

}

.input-search:focus {
  outline: none;
}

.load-more-panel {
  height: 40px;
  display: flex;
  justify-content: center;
  /* margin-top: 1%; */
}

.box-std {
  min-height: 30px;
  border-radius: 5px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-bottom: 20px;
  padding: 10px;
}

.img-land-scape {
  height: 200px;
  background-image: url('~@/assets/bg-shop.webp');
  background-position: 0% 45%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-content {

  /* margin-top: 100px; */
  height: 100vh;
}

.content {
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 1%;
}

.show-more:hover {
  color: rgb(36, 80, 80);
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