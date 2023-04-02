<template>
  <div class="main-menu sticky">
    <div class="main-menu-body">
      <div class="item-section-menu">
        <div class="logo">Gunner Barcode</div>
      </div>
      <div class="item-section-menu">
        <div class="menu-list-sestion">
          <div class="menu-btn">
            <router-link to="/main" class="link">หน้าแรก</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/main/stickerdesign" class="link">ออกแบบสติ๊กเกอร์</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/main/claim" class="link">ส่งซ่อม</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/main/about-me" class="link">ติดต่อเรา</router-link>
          </div>
          <div class="menu-btn">
            <router-link to="/main/vdo" class="link">วีดีโอแนะนำ</router-link>
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
    <b-modal ref="modal-cart" :title="`รายการสินค้า (${carts.length})`" size="lg">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="สินค้า" active>
            <div v-for="(item, index) in mainStore.$state.carts" :key="index" style="display:flex">
              <div style="flex:1"><img :src="item.img_link" style="height:100px;width:100px" /></div>
              <div style="flex:2;padding-top: 5%;">{{ item.product_name }}</div>
              <div style="flex:1;padding-top: 5%;">{{ item.price }}</div>
              <div style="flex:1;padding-top: 5%;">{{ item.qty }}</div>
              <div style="flex:1;padding-top: 5%;">
                <b-button variant="danger" @click="mainStore.removeCart(index)">delete</b-button>
              </div>
            </div>
            <div style="border-top:1px solid #dee2e6;margin-top:10px;">
              <div style="float:right;margin-top: 16px;font-weight: 600;">{{ carts.reduce((acc, current) => {
                  return acc + (current.price * current.qty)
                }, 0)
              }} บาท</div>
            </div>
          </b-tab>
          <b-tab title="ที่อยู่การจัดส่ง">
            <div> <b-form-textarea id="textarea" v-model="delivery_address" placeholder="ที่อยู่การจัดส่ง" rows="6"
                max-rows="10"></b-form-textarea>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <template #modal-footer="{ cancel }">

        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="primary" @click="sendOrder">
          ยืนยันการสั่งซื้อ
        </b-button>
        <b-button size="sm" @click="cancel()">
          ยกเลิก
        </b-button>

      </template>
    </b-modal>
  </div>
</template>

<script>
import { useMainStore } from "../store";
import { mapState } from 'pinia'
import { uuid } from 'uuidv4';
import axios from "axios"
var base_url = process.env.VUE_APP_API_URL
export default {
  data() {
    return {
      delivery_address: ""
    }
  },
  setup() {
    const mainStore = useMainStore()

    return { mainStore }
  },
  methods: {
    showModal() {
      this.$refs['modal-cart'].show()
    },
    async sendOrder() {
      var user_id = this.mainStore.$state.user_id

      var record = {
        user_id,
        delivery_address: this.delivery_address,
        items:this.mainStore.$state.carts.map((item)=>{
          return {
            qty:item.qty,
            product_id:item.id,
            id:uuid()
          }
        })
      }

      try {
        await axios.post(base_url + "/order/product", { ...record })
        alert("บันทึกข้อมูลเรียบร้อย")
      } catch (error) {
        alert(error.message)
      }

      

      console.log(record);

    }
  },
  computed: {
    ...mapState(useMainStore, ["carts"]),
    lengthItem() {
      return this.itemLength
    }
  },
  watch: {
    carts: {
      handler: function (newValue) {
        localStorage.setItem("carts", JSON.stringify(newValue))
      },
      deep: true
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