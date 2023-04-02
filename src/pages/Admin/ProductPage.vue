<template>
    <a-table :columns="columns" :data-source="data" :pagination="pagination" @change="handleTableChange" :loading="loading"
        :scroll="{ y: 600 }">
        <span slot="action" slot-scope="record">
            <a class="ant-dropdown-link" @click="editProduct(record.id)">Edit</a>
        </span>
        <div slot="img_link" slot-scope="record">
            <img :src="record.img_link" style="width: 80px;" />
        </div>

    </a-table>
</template>
<script>
import axios from 'axios';
import { defineComponent } from "vue"
var base_url = process.env.VUE_APP_API_URL
const columns = [
    {
        title: 'รูป',
        key: 'img_link',
        scopedSlots: { customRender: 'img_link' },
    },
    {
        title: 'ชื่อ',
        dataIndex: 'product_name',
        key: 'product_name',
    },
    {
        title: 'ยี่ห้อ',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'รุ่น',
        key: 'model',
        dataIndex: 'model'
    },
    {
        title: 'ราคา',
        key: 'price',
        dataIndex: 'price'
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
    methods: {
        editProduct(product_id) {
            this.$router.push(`/admin/product/${product_id}`)
        },
        getProduct() {
            this.loading = true
            axios.get(base_url + `/products/${this.page}/${this.limit}`)
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