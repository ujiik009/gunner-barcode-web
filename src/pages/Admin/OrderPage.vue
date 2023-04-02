<template>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="handleTableChange" :loading="loading"
        :scroll="{ y: 600 }">
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag"
                :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
                {{ tag.toUpperCase() }}
            </a-tag>
        </span>
        <span slot="action" slot-scope="record">
            <a class="ant-dropdown-link" @click="openOrder(record)">Edit</a>

        </span>
    </a-table>
</template>
<script>
import axios from 'axios';
import { defineComponent } from "vue"
import {useMainStore} from "../../store"
var base_url = process.env.VUE_APP_API_URL
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'ผู้สั่ง',
        dataIndex: 'user.fullname',
        key: 'user.fullname',
    },
    {
        title: 'สถารที่จัดส่ง',
        dataIndex: 'delivery_address',
        key: 'delivery_address',
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];



export default defineComponent({
    created() {
        this.getProduct()
    },
    setup(){
        const main_store = useMainStore()

        return {
            main_store
        }
    },
    methods: {
        openOrder(order_record) {
            this.main_store.selectOrder(order_record)
            this.$router.push(`/admin/order/${order_record.id}`)
        },
        getProduct() {
            this.loading = true
            axios.get(base_url + `/order/product/${this.page}/${this.limit}`)
                .then((response) => {

                    this.pagination.total = response.data.data.total
                    this.data = response.data.data.data.map(x => {
                        return {
                            ...x,
                            key: x.id
                        }
                    })
                })
                .finally(() => {
                    this.loading = false
                })
        },
        handleTableChange(pagination) {
            console.log(pagination);
            this.page = pagination.current
            this.limit = pagination.pageSize
            this.getProduct()
        }

    },
    data() {
        return {
            page: 1,
            limit: 10,
            pagination: { total: 0, ["show-size-changer"]: true },
            data: [],
            columns,
            loading: false
        };
    },
});
</script>