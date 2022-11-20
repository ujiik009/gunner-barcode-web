<template>
  <div class="main-menu sticky">
    <div class="main-menu-body">
      <div class="item-section-menu">
        <div class="logo">Gunner Barcode</div>
      </div>
      <div class="item-section-menu">
        <div class="menu-list-sestion">
          <div class="menu-btn">
            <router-link to="/home" class="link">หน้าแรก</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/stickerdesign" class="link">ออกแบบสติ๊กเกอร์</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/claim" class="link">ส่งซ่อม</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/about-me" class="link">ติดต่อเรา</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/vdo" class="link">วีดีโอแนะนำ</router-link>
          </div>
        </div>
      </div>
      <div class="item-section-menu item-section-menu-right" style="padding: 6px;">
        <b-icon icon="cart2" font-scale="2"></b-icon>
        <div
          style="height: 25px;width: 25px;background-color: brown;border-radius: 100%;position: absolute;left: 30px; padding-left: 6px;cursor: pointer;color:white;"
          @click="showModal">
          {{
              carts.length
          }}</div>
      </div>
    </div>
    <b-modal ref="modal-cart" :title="`Cart Item (${carts.length})`" size="lg">
      <div>
        <div v-for="(item, index) in carts" :key="index" style="display:flex">
          <div style="flex:1"><img :src="item.img_link" style="height:100px;width:100px" /></div>
          <div style="flex:2;padding-top: 5%;">{{ item.product_name }}</div>
          <div style="flex:1;padding-top: 5%;">{{ item.price }}</div>
          <div style="flex:1;padding-top: 5%;">{{ item.qty }}</div>
          <div style="flex:1;padding-top: 5%;">
            <b-button variant="danger" @click="removeCart(index)">delete</b-button>
          </div>

        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { useMainStore } from "../store";
import { mapState } from 'pinia'
export default {
  setup() {
    const carts = useMainStore()
    function removeCart(index) {
      carts.removeCart(index)
    }
    return { removeCart }
  },
  methods: {
    showModal() {
      this.$refs['modal-cart'].show()
    }
  },
  computed: {
    ...mapState(useMainStore, ["carts"]),
    lengthItem() {
      return this.itemLength
    }
  },
  watch: {
    carts(newCart) {
      localStorage.setItem("carts", JSON.stringify(newCart))
    }
  }

};
</script>
<style>
.link {
  text-decoration: none;
  color: inherit;

}

.sticky {
  /* position: fixed;
  top: 0;
  width: 100%; */
}

.link:hover:hover {
  color: rgb(232, 142, 255);
}

.main-menu {
  padding-left: 15%;
  padding-right: 15%;
  background-color: rgb(255, 255, 255);
  height: 100px;
}

.main-menu-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: inherit;

}

.item-section-menu-right {
  position: relative;
}

.item-section-menu {
  height: 50px;
}

.logo {
  font-size: 25px;
  font-weight: bold;
  color: rgb(71, 71, 71);
}

.menu-list-sestion {
  display: inline-flex;
}

.menu-list-sestion>div {
  padding: 10px 40px 10px 40px;
  cursor: pointer;
}
</style>