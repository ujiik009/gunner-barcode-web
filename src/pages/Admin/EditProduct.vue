<template>
    <div>
        <template>
            <div>
                <a-page-header :title="`Edit Product [${form.product_name}]`" />
                <a-form ref="form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <a-form-item label="Product Name">
                        <a-input v-model="form.product_name" />
                    </a-form-item>
                    <a-form-item label="Brand">
                        <a-input v-model="form.brand" />
                    </a-form-item>
                    <a-form-item label="Model">
                        <a-input v-model="form.model" />
                    </a-form-item>
                    <a-form-item label="Detail">
                        <a-textarea v-model="form.detail" />
                    </a-form-item>
                    <a-form-item label="Category">
                        <a-input v-model="form.category" />
                    </a-form-item>
                    <a-form-item label="Warranty">
                        <a-textarea v-model="form.warranty" />
                    </a-form-item>
                    <a-form-item label="Image Link">
                        <a-input v-model="form.img_link" />
                    </a-form-item>
                    <a-form-item label="Image Example">
                        <img class="img-example" :src="form.img_link" style="width:250px" />
                    </a-form-item>
                    <a-form-item label="Best Seller">
                        <a-switch v-model="form.best_seller" />
                    </a-form-item>
                    <a-form-item label="Price">
                        <a-input-number v-model="form.price" />
                    </a-form-item>
                    <a-form-item label="Discount">
                        <a-input-number v-model="form.discount" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 17 }">
                        <a-button type="primary" @click="submitForm">Submit</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </template>
    </div>
</template>
<script>
import axios from 'axios';
import { defineComponent } from "vue"
// import { Form, Input, InputNumber, Switch, Button, FormItem } from 'ant-design-vue';
import { message } from 'ant-design-vue';
var base_url = process.env.VUE_APP_API_URL
export default defineComponent({
    created() {
        // console.log(this.$route.params.product_id);
        this.getProductById()
    },


    data() {
        return {
            product_id: this.$route.params.product_id,
            form: {
                product_name: "",
                brand: "",
                model: "",
                price: ""
            },
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
    },
    methods: {
        getProductById() {
            axios.get(base_url + `/products/${this.product_id}`)
                .then((response) => {
                    console.log(response.data);
                    this.form = response.data.data
                })
        },
        submitForm() {
            axios.post(base_url + `/products/${this.product_id}`, { ...this.form })
                .then((response) => {
                    console.log(response.data);
                    message.success(response.data.message);
                })
        },
    },
})
</script>
<style scoped>
.img-example {
    border: 1px solid gray;
}
</style>