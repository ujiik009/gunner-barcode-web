<template>
  <div class="main-content">

    <!-- Stepper -->
    <div class="content">
      <div class=" md-stepper-horizontal orange">
        <div :class="{'md-step':true,active:step.active,editable:step.editable,done:step.done}"
          v-for="(step,index) in steps" :key="index" @click="clickActive(index)">
          <div class="md-step-circle"><span>{{index+1}}</span></div>
          <div class="md-step-title">{{step.title}}</div>
          <div class="md-step-optional" v-if="step.optional">Optional</div>
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </div>
      </div>
      <div>
        <div v-if="step == 0">
          <div class="box-content">
            <div class="box-item">
              <div class="item">
                <div>เลือกชนิดสติ๊กเกอร์</div>
                <div>
                  <select @click="setSize" class="select-item" name="" id="" v-model="record.sticker_type">
                    <option :value="index" v-for="(condition_item,index) in sticker_condition" :key="index">
                      {{condition_item.name}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="item">
                <div>เลือกขนาด</div>
                <div>
                  <select @click="setType" class="select-item" name="" id="" v-model="record.sticker_size">
                    <option :value="index" v-for="(size_item ,index) in size" :key="index">
                      {{size_item.size}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="item">
                <div>เลือกรูปแบบ ลักษณะ</div>
                <div>
                  <select @click="selectType" class="select-item" name="" id="" v-model="record.sticker_texture">
                    <option :value="index" v-for="(type_item ,index) in type" :key="index">
                      {{type_item.name}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="item">
                <div>เลือกจำนวนการผลิต (ขั้นต่ำ {{min_order}})</div>
                <div>
                  <input class="input-item" type="number" :min="min_order" v-model="record.qty">
                </div>
              </div>
            </div>
            <div class="box-item">
              <div class="item">
                <div>เลือกสี</div>
                <div>
                  <!-- <input class="select-item" type="color" id="favcolor" name="favcolor" value="#fff">
                   -->
                  <chrome-picker style="width:250PX" :value="record.colors.hex" @input="updateValueColor" />
                </div>
              </div>
              <div class="item">
                <div>
                  <button class="btn-custom-primary" style="width: 250PX ;" @click="handleNextButton">ถัดไป</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="step == 1">
          <StickerDesignComponent />


        </div>
        <div v-if="step == 2">ยืนยันแบบ</div>
      </div>

    </div>



  </div>
</template>

<script>
import sticker_condition from "../assets/sticker_condition.json"
import StickerDesignComponent from "../components/StickerDesignComponent.vue"
import { Chrome } from 'vue-color'
// import StickerEditor from "../components/StickerEditor.vue"
export default {
  components: {
    StickerDesignComponent,
    'chrome-picker': Chrome,
    // StickerEditor
  },
  data() {
    return {
      sticker_condition: sticker_condition,
      size: [],
      type: [],
      min_order: 100,
      index_sticker: 0,
      index_size: 0,
      index_type: 0,
      step: 0,

      record: {
        sticker_type: "",
        sticker_size: 0,
        sticker_texture: "",
        colors: { hex: "#FFFFFF" },
        qty: 0
      },
      confirm_record: {
        sticker_type: "",
        sticker_size: "",
        sticker_texture: "",
        color: "#FFFFFF",
        qty: 0
      },
      steps: [
        {
          title: "เลือกขนาด",
          optional: false,
          done: false,
          editable: true,
          active: true
        },
        {
          title: "ออกแบบสตกเกอร์",
          optional: true,
          done: false,
          editable: false,
          active: false
        },
        {
          title: "ยืนยันแบบ",
          optional: false,
          done: false,
          editable: false,
          active: false
        },
      ]
    }
  },
  created() {
    this.loadValue()
  },
  methods: {
    handleNextButton() {
      if (this.record.sticker_type !== "") {
        this.confirm_record.sticker_type = this.sticker_condition[this.record.sticker_type].name
      } else {
        alert("โปรดเลือก เลือกชนิดสติ๊กเกอร์")
        return
      }

      if (this.record.sticker_size !== "") {
        this.confirm_record.sticker_size = this.sticker_condition[this.record.sticker_type].size[this.record.sticker_size].size
      } else {
        alert("โปรดเลือก เลือกขนาด")
        return
      }


      if (this.record.sticker_texture !== "") {
        this.confirm_record.sticker_texture = this.sticker_condition[this.record.sticker_type].size[this.record.sticker_size].type[this.record.sticker_texture].name
      } else {
        alert("โปรดเลือก เลือกขนาด")
        return
      }

      this.confirm_record.color = this.record.colors.hex


      if (this.record.qty >= this.min_order) {
        this.confirm_record.qty = this.record.qty
      }else{
        alert("จำนวนต้องไม่น้อยกว่าขั้นต่ำ")
        return
      }

      this.step = 1

    },
    updateValueColor(e) {
      this.record.colors.hex = e.hex
    },
    loadValue() {
      this.size = this.sticker_condition[this.index_sticker].size
      this.type = this.sticker_condition[this.index_sticker].size[this.index_size].type
      this.min_order = this.sticker_condition[this.index_sticker].size[this.index_size].type[this.index_type].min_order
    },
    setSize(event) {
      // this.size=list
      this.index_sticker = event.target.value
      this.size = this.sticker_condition[event.target.value].size
    },
    setType(event) {
      this.index_size = event.target.value
      this.type = this.sticker_condition[this.index_sticker].size[event.target.value].type
    },
    selectType(event) {
      this.index_type = event.target.value
      this.min_order = this.sticker_condition[this.index_sticker].size[this.index_size].type[event.target.value].min_order
    },
    clickActive(step_number) {
      this.step = step_number
      this.steps[step_number].editable = true
      this.steps[step_number].active = true
      // set step lower then current to done
      this.steps.map((step, index) => {
        if (index < step_number) {
          this.steps[index].done = true
          this.steps[index].editable = false
          this.steps[index].active = true
        } else if (index > step_number) {
          this.steps[index].done = false
          this.steps[index].editable = false
          this.steps[index].active = false
        }
      })
    }
  }
};
</script>

<style>
.main-content {
  height: 100vh;
}

.content {
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 1%;
  position: relative;
}

.box-content {
  display: flex;
  margin-left: 15%;
  margin-right: 15%;
}

.box-item {
  flex: 1;
}

.select-item,
.input-item {
  width: 250px;
}

.item {
  margin: 30px;
  font-size: 22px;
}

.md-stepper-horizontal {
  display: table;
  width: 100%;
  margin: 0 auto;
  background-color: #FFFFFF;
  /* box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .50); */
}

.md-stepper-horizontal .md-step {
  display: table-cell;
  position: relative;
  padding: 24px;
  cursor: pointer;
}

.md-stepper-horizontal .md-step:hover,
.md-stepper-horizontal .md-step:active {
  background-color: rgba(0, 0, 0, 0.04);
}

.md-stepper-horizontal .md-step:active {
  border-radius: 15% / 75%;
}

.md-stepper-horizontal .md-step:first-child:active {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.md-stepper-horizontal .md-step:last-child:active {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.md-stepper-horizontal .md-step:hover .md-step-circle {
  background-color: #757575;
}

.md-stepper-horizontal .md-step:first-child .md-step-bar-left,
.md-stepper-horizontal .md-step:last-child .md-step-bar-right {
  display: none;
}

.md-stepper-horizontal .md-step .md-step-circle {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  background-color: #999999;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
}

.md-stepper-horizontal.green .md-step.active .md-step-circle {
  background-color: #00AE4D;
}

.md-stepper-horizontal.orange .md-step.active .md-step-circle {
  background-color: #F96302;
}

.md-stepper-horizontal .md-step.active .md-step-circle {
  background-color: rgb(33, 150, 243);
}

.md-stepper-horizontal .md-step.done .md-step-circle:before {
  font-family: 'FontAwesome';
  font-weight: 100;
  content: "\f00c";
}

.md-stepper-horizontal .md-step.done .md-step-circle *,
.md-stepper-horizontal .md-step.editable .md-step-circle * {
  display: none;
}

.md-stepper-horizontal .md-step.editable .md-step-circle {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}

.md-stepper-horizontal .md-step.editable .md-step-circle:before {
  font-family: 'FontAwesome';
  font-weight: 100;
  content: "\f040";
}

.md-stepper-horizontal .md-step .md-step-title {
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
}

.md-stepper-horizontal .md-step .md-step-title,
.md-stepper-horizontal .md-step .md-step-optional {
  text-align: center;
  color: rgba(0, 0, 0, .26);
}

.md-stepper-horizontal .md-step.active .md-step-title {
  font-weight: 600;
  color: rgba(0, 0, 0, .87);
}

.md-stepper-horizontal .md-step.active.done .md-step-title,
.md-stepper-horizontal .md-step.active.editable .md-step-title {
  font-weight: 600;
}

.md-stepper-horizontal .md-step .md-step-optional {
  font-size: 12px;
}

.md-stepper-horizontal .md-step.active .md-step-optional {
  color: rgba(0, 0, 0, .54);
}

.md-stepper-horizontal .md-step .md-step-bar-left,
.md-stepper-horizontal .md-step .md-step-bar-right {
  position: absolute;
  top: 36px;
  height: 1px;
  border-top: 1px solid #DDDDDD;
}

.md-stepper-horizontal .md-step .md-step-bar-right {
  right: 0;
  left: 50%;
  margin-left: 20px;
}

.md-stepper-horizontal .md-step .md-step-bar-left {
  left: 0;
  right: 50%;
  margin-right: 20px;
}
</style>