<template>
  <div id="menu">
    <div id="L">
      <div class="menu-item">
        <router-link to="/home">หน้าแรก</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/stickerdesign">ออกแบบสติ๊กเกอร์</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/claim">ส่งซ่อม</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/about-me">ติดต่อเรา</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/vdo">วีดีโอแนะนำ</router-link>
      </div>
    </div>
    <div id="R">
      <div style="height:100%;position: relative;">
        <b-icon icon="cart2" font-scale="2" style="position: absolute;top:6;left:10"></b-icon>
        <div
          style="height: 25px;width: 25px;background-color: brown;border-radius: 100%;position: absolute;left: 30px; padding-left: 6px;cursor: pointer;"
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
.menu-item {
  display: inline-block;
  padding: 15px;
}

.menu-item:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}

#menu {
  width: 100%;
  height: 50px;
  background-color: bisque;
  display: flex;
}

#L {
  background-color: blueviolet;
  flex: 9;
}

#R {
  background-color: coral;
  flex: 1;
}

#cart_icon {
  font-size: 22px;
}
</style>