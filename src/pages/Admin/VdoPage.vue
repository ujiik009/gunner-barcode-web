<template>
    <div>
        <div style="height: 100px;">
            <a-button style="float: right;" type="primary" @click="show_model_create_vdo=true">เพิ่ม VDO</a-button>
        </div>
        <div>
            <a-row>
                <a-col :span="6" v-for="(item, index) in vdo" :key="index">
                    <a-card>
                        <LazyYoutube :src="item.url" />
                        <a-button type="danger" danger block @click="deleteVDO(item.id)">ลบ VDO</a-button>
                    </a-card>
                </a-col>
            </a-row>
        </div>
        <a-modal v-model="show_model_create_vdo" title="เพิ่ม VDO" @ok="confirmCreateVdo">
            <a-form ref="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="VDO URL">
                    <a-input v-model="form.url" />
                </a-form-item>
            </a-form>

        </a-modal>
    </div>
</template>
<script>

import { defineComponent } from "vue"
import axios from "axios";
var base_url = process.env.VUE_APP_API_URL


export default defineComponent({
    created() {
        this.getVdo()
    },
    methods: {
        deleteVDO(id){
            this.loading = true
            axios.delete(base_url + `/vdos/${id}`)
                .then(() => {
                    this.getVdo()
                })
                .finally(() => {
                    this.loading = false
                })
        },
        getVdo() {
            this.loading = true
            axios.get(base_url + `/vdos`)
                .then((response) => {


                    this.vdo = response.data.data
                })
                .finally(() => {
                    this.loading = false
                })
        },
        createVDO(cb=()=>{}){
            this.loading = true
            axios.put(base_url + `/vdos`,{...this.form})
                .then(() => {
                    cb()
                })
                .finally(() => {
                    this.loading = false
                })
        },
        confirmCreateVdo() {
            this.createVDO(()=>{
                this.form.url = ""
                this.show_model_create_vdo = false  
                this.getVdo()
            })
        }

    },
    data() {
        return {
            vdo: [],
            loading: false,
            show_model_create_vdo: false,
            labelCol: { span: 4 },
            wrapperCol: { span: 18 },
            form: {
                url: ""
            }
        };
    },
});
</script>