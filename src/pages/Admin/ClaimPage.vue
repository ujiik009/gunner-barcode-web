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
            <a class="ant-dropdown-link" @click="editProduct(record.id)">Edit</a>

        </span>
    </a-table>
</template>
<script>
import axios from 'axios';
import { defineComponent } from "vue"
var base_url = process.env.VUE_APP_API_URL
const columns = [   
    {
        title: 'ID Card',
        dataIndex: 'id_card',
        key: 'id_card'
    },
    {
        title: 'Full Name',
        dataIndex: 'fullname',
        key: 'fullname'
    },
    {
        title: 'Product Name',
        dataIndex: 'product_name',
        key: 'product_name'
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand'
    },
    {
        title: 'Buy Date',
        dataIndex: 'buy_date',
        key: 'buy_date'
    },
    {
        title: 'Warranty Date',
        dataIndex: 'warranty_date',
        key: 'warranty_date'
    },
    {
        title: 'Topic Issue',
        dataIndex: 'topic_issue',
        key: 'topic_issue'
    },
    {
        title: 'Content Issue',
        dataIndex: 'content_issue',
        key: 'content_issue'
    },
    {
        title: 'Remark',
        dataIndex: 'remark',
        key: 'remark'
    },
    {
        title: 'Phone Contact',
        dataIndex: 'phone_contact',
        key: 'phone_contact'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at'
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at'
    }
    ,
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
            this.$router.push(`/claim/product/${product_id}`)
        },
        getProduct() {
            this.loading = true
            axios.get(base_url + `/claim/product/${this.page}/${this.limit}`)
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