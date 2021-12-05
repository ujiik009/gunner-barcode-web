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
    <div id="R">6666</div>
  </div>
</template>

<script>
export default {};
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
</style>