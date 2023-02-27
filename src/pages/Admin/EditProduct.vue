<template>
    <div>
        Edit Product Page : {{ product_id }}
        {{ product_data.product_name }}
        {{ product_data.brand }}
        {{ product_data.model }}
        {{ product_data.price }}
        <img :src="product_data.img_link"/>
        <a-textarea placeholder="textarea with clear icon" allow-clear v-model="product_data.detail"/>
    </div>
</template>
<script>
import axios from 'axios';
import { defineComponent } from "vue"
var base_url = "http://127.0.0.1:3333"
export default defineComponent({
    created() {
        // console.log(this.$route.params.product_id);
        this.getProductById()
    },
    data() {
        return {
            product_id: this.$route.params.product_id,
            product_data: {
                product_name: "",
                brand: "",
                model: "",
                price: ""
            }
        }
    },
    methods: {
        getProductById() {
            axios.get(base_url + `/products/${this.product_id}`)
                .then((response) => {
                    console.log(response.data);
                    this.product_data = response.data.data
                })
        }
    },
})
</script>