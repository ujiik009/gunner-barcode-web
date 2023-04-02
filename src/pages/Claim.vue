<template>
  <div>

    <div class="main-content">
      <div class="img-land-scape">
        <div style="font-size: 40px;">ส่งซ่อมสินค้า</div>
      </div>

      <!-- Stepper -->
      <div class="content">
       
          <b-container fluid="sm">
            <b-row>
              <b-col>
                <b-form-group id="id_card" label="เลขที่ประจำตัวประชาชน" label-for="id_card_input">
                  <b-form-input v-model="record.id_card" id="id_card_input" type="text"
                    placeholder="เลขที่ประจำตัวประชาชน 13 หลัก" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="fullname" label="ชื่อสกุล ลูกค้า" label-for="fullname_input">
                  <b-form-input v-model="record.fullname" id="fullname_input" type="text" placeholder="ชื่อจริงนามสกุล"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group id="product_name" label="ชื่อสินค้า" label-for="product_name_input">
                  <b-form-input v-model="record.product_name" id="product_name_input" type="text"
                    placeholder="ชื่อสินค้า" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="brand" label="ยี่ห้อ" label-for="brand_input">
                  <b-form-input v-model="record.brand" id="brand_input" type="text" placeholder="ยี่ห้อของสินค้า"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group id="buy_date" label="วันที่ซื้อสินค้า" label-for="buy_date_input">
                  <b-form-input id="buy_date_input" v-model="record.buy_date" type="date" placeholder="วันที่ซื้อสินค้า"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="warranty_date" label="วันที่หมดประกันสินค้า" label-for="warranty_date_input">
                  <b-form-input id="warranty_date_input" v-model="record.warranty_date" type="date"
                    placeholder="วันที่หมดประกันสินค้า" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group id="topic_issue" label="หัวข้อการแจ้งซ้อม" label-for="topic_issue_input">
                  <b-form-input id="topic_issue_input" v-model="record.topic_issue" type="text"
                    placeholder="การแจ้งซ้อม" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group label="รายละเอียดปัญหา" label-for="content_issue">
                  <b-form-textarea id="content_issue" v-model="record.content_issue"
                    placeholder="รายละเอียดปัญหาเพื่อประเมินราคา" rows="8">
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group id="remark" label="หมายเหตุ" label-for="remark_input">
                  <b-form-input id="remark_input" v-model="record.remark" type="text" placeholder="การแจ้งซ้อม"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group id="phone_contact" label="เบอร์ติดต่อกลับ" label-for="phone_contact_input">
                  <b-form-input id="phone_contact_input" v-model="record.phone_contact" type="text"
                    placeholder="เบอร์ติดต่อกลับ" required>
                  </b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group id="email" label="E-mail ติดต่อกลับ" label-for="email_input">
                  <b-form-input id="email_input" v-model="record.email" type="text" placeholder="E-mail ติดต่อกลับ"
                    required>
                  </b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

          </b-container>
          <div>
            <button class="btn-custom-primary" style="width: 250px;float: right;"
              @click="submit_claim">บันทึกข้อมูล</button>
          </div>
     
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios"
var base_url = process.env.VUE_APP_API_URL
export default {
  data() {
    return {
      record: {
        id_card: "",
        fullname: "",
        product_name: "",
        brand: "",
        buy_date: "",
        warranty_date: "",
        topic_issue: "",
        content_issue: "",
        remark: "",
        phone_contact: "",
        email: ""
      }
    }
  },
  methods: {
    async submit_claim() {
      try {
        await axios.post(base_url + "/claim/product", { ...this.record })
        alert("บันทึกข้อมูลเรียบร้อย")
      } catch (error) {
        alert(error.message)
      }

    }
  }
}
</script>

<style>
.col {
  margin-bottom: 10px;
}

.main-content {
  height: 100vh;
}

.content {
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 1%;
  position: relative;
}

.img-land-scape {
  height: 200px;
  background-image: url('~@/assets/bg-shop.webp');
  background-position: 0% 45%;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>