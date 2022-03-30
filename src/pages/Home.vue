<template>
  <div>
    <div>
      <div><h2>โปรโมชั่น</h2></div>
      <div style="display:flex">
        <div style="flex:1">
          <center><img :src="promotion_img[0]" alt=""></center>
        </div>
        <div style="flex:1">
         <center> <img :src="promotion_img[1]" alt=""></center>
        </div>
      </div>
    </div>
    <div>
      <div><h2>สินค้าขายดี</h2></div>
      <div style="display:flex;overflow-y:scroll;width:100vw">
        <div style="flex:1" v-for="(item,index) in best_seller" :key="index">
          <center> <img :src="item" alt=""></center>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
    promotion_img:[
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/promotion%2Fb2.png?alt=media&token=2d6e2fd2-00c6-4a70-bc1d-3b2c3d08eda0",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/promotion%2Fbarcode.jpg?alt=media&token=f2f9f6e2-f69e-4cf8-b5a2-1817c5af4b5b"
    ],
    best_seller:[
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816",
      "https://firebasestorage.googleapis.com/v0/b/gunner-barcode.appspot.com/o/best_seller%2FWax%20%E0%B8%82%E0%B8%99%E0%B8%B2%E0%B8%94110mmx300m%20%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2460.00%20ex.VAT.jpg?alt=media&token=05a8e50f-9141-45f6-af5d-930bc7a23816"
    ]
  }),
};
</script>

<style scoped>

</style>