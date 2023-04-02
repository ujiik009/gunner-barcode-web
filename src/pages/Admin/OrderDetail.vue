<template>
    <div>
        Order Detail
    </div>
</template>
<script>
import { defineComponent } from "vue"
// import axios from "axios";
export default defineComponent({
    created() {
        console.log(process.env.VUE_APP_API_URL);
    },
    methods: {

    }
})
</script>