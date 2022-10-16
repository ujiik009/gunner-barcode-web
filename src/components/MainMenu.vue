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
          style="position: absolute;top: 0px;right: -5px;height: 23px;width: 23px;background-color: brown;border-radius: 100%;cursor: pointer; text-align: center;color: aliceblue;">
          5</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

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
.link:hover:hover{
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