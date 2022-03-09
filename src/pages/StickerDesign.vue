<template>
  <div>
    <div class="box-content">
      <div class="box-item">
        <div class="item">
          <div>เลือกชนิดสติ๊กเกอร์</div>
          <div>
            <select @change="setSize" class="select-item" name="" id="">
              <!-- <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option> -->
              <option :value="index"  v-for="(condition_item,index) in sticker_condition" :key="index">
                {{condition_item.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="item">
          <div>เลือกขนาด</div>
          <div>
            <select class="select-item" name="" id="">
              <!-- <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option> -->
              <option value="" v-for="(size_item ,index) in size" :key="index">
                {{size_item.size}}
              </option>
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
import sticker_condition from "../assets/sticker_condition.json"
export default {
  data(){
    return {
      sticker_condition:sticker_condition,
      size:[]
    }
  },
  methods:{
    setSize(event){
      // this.size=list
      this.size=this.sticker_condition[event.target.value].size
    }
  }
};
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