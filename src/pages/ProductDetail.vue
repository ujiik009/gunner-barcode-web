<template>
    <div>
        <div style="display:flex;padding-left: 100px;padding-right: 100px;">
            <div style="flex:1;padding:20px;">
                <div>
                    <center>
                        <img :src="product_item.img_link" />
                    </center>
                </div>

            </div>
            <div style="flex:2;padding:20px;">
                <div>
                    <div class="product_name">
                        {{ product_item.product_name }}
                    </div>
                    <div>

                        <div v-html="product_item.detail"></div>
                    </div>
                    <div>

                        <div v-html="product_item.warranty"></div>
                    </div>
                </div>
                <div>
                    <div class="price_number"> {{ product_item.price }} BATH </div>
                    <div>Discount : {{ product_item.discount }}</div>
                </div>
                <div>
                    <input type="number" v-model="qty" id="quantity" name="quantity" min="1"
                        style="margin-right:5px;" />
                    <b-button variant="warning" @click="addCart(product_item,qty)">ADD TO CART</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import { useMainStore } from "../store";
var base_url = process.env.VUE_APP_API_URL
export default {
    data() {
        return {
            qty: 0,
            product_item: {
                id: "",
                product_name: "",
                brand: "",
                model: "",
                detail: "",
                category: "",
                warranty: "",
                img_link: "",
                best_seller: 0,
                price: 0,
                discount: 0
            }
        }
    },
    created() {

        this.getProductDetail(this.$route.params.id)
    },
    methods: {
        getProductDetail(product_id) {
            axios.get(`${base_url}/products/${product_id}`)
                .then((res) => {
                    this.product_item = res.data.data
                })
        },
        addToCart() {
            alert("addToCart")

        }
    },
    setup() {
        const main = useMainStore();
        function addCart(item,qty){
            main.addCart({...item,qty})
        }

        return {
            addCart: addCart,
            cart:main.carts
        }
    }
}
</script>

<style  scoped>
.product_name {
    font-size: 32px;
    font-weight: bold;
}

.price_number {
    font-size: 32px;
    font-weight: bold;
    color: #59c9c9;

}
</style>
