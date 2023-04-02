<template>
    <div>
        <div class="progress-bar-order">
            <div class="stage" :class="{ active: stage >= 1 }">
                <!-- <span><i class="fas fa-check"></i></span> -->
                <span>Order Received</span>
            </div>
            <div class="stage" :class="{ active: stage >= 2 }">
                <!-- <span><i class="fas fa-check"></i></span> -->
                <span>Packing</span>
            </div>
            <div class="stage" :class="{ active: stage >= 3 }">
                <!-- <span><i class="fas fa-truck"></i></span> -->
                <span>Out for Delivery</span>
            </div>
            <div class="stage" :class="{ active: stage >= 4 }">
                <!-- <span><i class="fas fa-check"></i></span> -->
                <span>Delivered</span>
            </div>
        </div>
        <div class="progress-bar-custom" :style="{ width: ((100 / 4) * stage) + '%' }"></div>

        <div class="order-details">
            <h2>Order Details</h2>
            <div class="order-summary">
                <div>
                    <p>Order Number: {{ main_store.$state.order_select.id }}</p>
                    <p>Order Date: {{ main_store.$state.order_select.updated_at }}</p>
                    <p>Order Total: {{ main_store.$state.order_select.orderDetail.length }}</p>
                    <p>Delivery Address : {{ main_store.$state.order_select.delivery_address }}</p>
                    <p>Buyer : {{ main_store.$state.order_select.user.fullname }} </p>
                    <p>Buyer Email: {{ main_store.$state.order_select.user.email }} </p>
                </div>
                <div>
                    <a-select ref="select" v-model="stage" style="width: 300px" :options="stage_arr"></a-select>
                </div>

            </div>
            <div class="order-items">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in main_store.$state.order_select.orderDetail" :key="index">
                            <td><img style="width: 80px;" :src="item.product.img_link" /></td>
                            <td>{{ item.product.product_name }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.product.price }}</td>
                            <td>{{ item.product.price * item.qty }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>


    </div>
</template>
<script>
import { defineComponent } from "vue"
import { useMainStore } from "../../store"
// import axios from "axios";
export default defineComponent({
    data() {
        return {
            stage: 0,
            stage_arr: [
            {
                value: 0,
                label: 'Open Order',
            },
            {
                value: 1,
                label: 'Order Received',
            },
            {
                value: 2,
                label: 'Packing',
            },
            {
                value: 3,
                label: "Out for Delivery",
            },
            {
                value: 4,
                label: 'Delivered',
            },]
        }
    },
    setup() {
        const main_store = useMainStore()

        return {
            main_store
        }
    },
    created() {
        console.log(this.main_store.order_select);
    },
    methods: {

    }
})
</script>
<style scoped>
.order-details {
    margin: 20px;
}

.order-summary {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    align-items: center;
}

.order-summary p {
    margin: 0;
}

.order-items table {
    width: 100%;
    border-collapse: collapse;
}

.order-items th,
.order-items td {
    border: 1px solid #ddd;
    padding: 8px;
}

.order-items th {
    text-align: left;
    background-color: #f2f2f2;
}

.progress-bar-order {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    margin: 20px auto;
    font-size: 16px;
    color: #333;
}

.progress-bar-custom {
    width: 50%;
    height: 20px;
    border-radius: 20px;
    background-color: #2196f3;
}

.stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 25%;
}

.stage span:first-child {
    font-size: 24px;
    margin-bottom: 5px;
}

.stage span:last-child {
    text-align: center;
}

.stage::before {
    content: "";
    position: absolute;
    top: 13px;
    left: -50%;
    width: 100%;
    height: 2px;
    background-color: #ccc;
    z-index: -1;
}

.stage:first-child::before {
    display: none;
}

.stage.active::before {
    background-color: #2196f3;
}

.stage.active span:first-child {
    color: #2196f3;
}
</style>