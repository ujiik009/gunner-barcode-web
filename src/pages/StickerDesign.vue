<template>
  <div>
    <div class="box-content">
      <div class="box-item">
        <div class="item">
          <div>เลือกชนิดสติ๊กเกอร์</div>
          <div>
            <select @click="setSize" class="select-item" name="" id="">
              <option :value="index"  v-for="(condition_item,index) in sticker_condition" :key="index">
                {{condition_item.name}}
              </option>
            </select>
          </div>
        </div>
        <div class="item">
          <div>เลือกขนาด</div>
          <div>
            <select @click="setType" class="select-item" name="" id="">
              <option :value="index" v-for="(size_item ,index) in size" :key="index">
                {{size_item.size}}
              </option>
            </select>
          </div>
        </div>
        <div class="item">
          <div>เลือกรูปแบบ ลักษณะ</div>
          <div>
            <select @click="selectType" class="select-item" name="" id="">
              <option :value="index" v-for="(type_item ,index) in type" :key="index">
                {{type_item.name}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="box-item">
        <div class="item">
          <div>เลือกสี</div>
          <div>
            <input class="select-item" type="color" id="favcolor" name="favcolor" value="#ff">
            <!-- <select class="select-item" name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> -->
          </div>
        </div>
        <div class="item">
          <div>เลือกจำนวนการผลิต{{min_order}} </div>
          <div>
            <input type="number" :min="min_order">
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
      size:[],
      type:[],
      min_order:100,
      index_sticker:0,
      index_size:0,
      index_type:0
    }
  },
  created(){
    this.loadValue()
  },
  methods:{
    loadValue(){
      this.size=this.sticker_condition[this.index_sticker].size
      this.type=this.sticker_condition[this.index_sticker].size[this.index_size].type
      this.min_order=this.sticker_condition[this.index_sticker].size[this.index_size].type[this.index_type].min_order
    },
    setSize(event){
      // this.size=list
      this.index_sticker=event.target.value
      this.size=this.sticker_condition[event.target.value].size
    },
    setType(event){
      this.index_size=event.target.value
      this.type=this.sticker_condition[this.index_sticker].size[event.target.value].type
    },
    selectType(event){
     this.index_type=event.target.value
     this.min_order=this.sticker_condition[this.index_sticker].size[this.index_size].type[event.target.value].min_order
     
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