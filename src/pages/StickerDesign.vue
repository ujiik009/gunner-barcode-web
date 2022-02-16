<template>
  <div>
    <div class="box-content">
      <div class="box-item">
        <div class="item">
          <div>เลือกชนิดสติ๊กเกอร์</div>
          <div>
            <select class="select-item" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div class="item">
          <div>เลือกขนาด</div>
          <div>
            <select class="select-item" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div class="item">
          <div>เลือกรูปแบบ ลักษณะ</div>
          <div>
            <select class="select-item" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
      <div class="box-item">
        <div class="item">
          <div>เลือกสี</div>
          <div>
            <select class="select-item" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div class="item">
          <div>เลือกจำนวนการผลิต</div>
          <div>
            <select class="select-item" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.box-content {
  display: flex;
  padding: 10px;
}
.box-item {
  flex: 1;
}
.select-item{
  width: 250px;
}
.item{
  margin: 20px;
  font-size: 22px;
}
</style>