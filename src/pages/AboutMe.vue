<template>
  <div>
    <div class="row-item">
      <div class="col-item">
        <h3>สำนักงานใหญ่</h3>
        <div>
          {{ data1 }}
        </div>
      </div>
      <div class="col-item">
        <h3>พันธ์ทิพย์ ประตูน้ำ</h3>
        <div>
          {{ data2 }}
        </div>
      </div>
    </div>
    <div class="row-item center">

      <img @click="open_map" src="@/assets/map_company.png" style="cursor: pointer;" />

    </div>
    <div>
      <img @click="open_facebook" class="fixed-btn-facebook" src="@/assets/Facebook_logo.png" />
      <img @click="open_line" class="fixed-btn-line" src="@/assets/line_logo.png" />
    </div>
  </div>
</template>

<script>
export default {
  // 13.750978671840915, 100.53738645077931
  data() {
    return {
      data1:
        "30,32 ซอยเพชรเกษม 48 แยก 51 ถนนเพชรเกษม แขวงบางแวก  เขตภาษีเจริญ กรุงเทพฯ 10160 โทร. 02-457-1001 แฟ็กซ์. 02-457-1002",
      data2:
        "ห้อง 304 ชั้น 3 พันธุ์ทิพย์พลาซ่า ประตูน้ำ 604/3 ถนนเพชรบุรี แขวงถนนเพชรบุรี เขตราชเทวี กรุงเทพฯ 10400 โทร. 02-656-5477, 063-642-3282",
      center: { lat: 13.750978671840915, lng: 100.53738645077931 },
    };
  },
  methods: {
    open_facebook() {
      window
        .open("https://web.facebook.com/barcodethaionline/", "_blank")
        .focus();
    },
    open_line() {
      window
        .open("https://page.line.me/barcodethai?openQrModal=true", "_blank")
        .focus();
    },
    open_map() {
      window.open("https://www.google.com/maps/search/?api=1&query=" + this.center.lat + "," + this.center.lng)
      focus();
    }
  },
};
</script>

<style>
.row-item {
  display: flex;
}

.col-item {
  padding: 10px;
  flex: 1;
}

.fixed-btn-facebook {
  background-repeat: no-repeat;
  background-size: auto;
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.fixed-btn-line {
  background-repeat: no-repeat;
  background-size: auto;
  position: fixed;
  bottom: 70px;
  left: 10px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.center {
  justify-content: center;
}
</style>