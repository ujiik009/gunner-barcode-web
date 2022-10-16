<template>
    <v-stage ref="stage" :config="configKonva" >
        <v-layer ref="layer">
            <v-circle :config="configCircle"></v-circle>
        </v-layer>
    </v-stage>
</template>
<script>
export default {
    data() {
        return {
            configKonva: {
                width: 1000,
                height: 1000
            },
            configCircle: {
                x: 100,
                y: 100,
                radius: 70,
                fill: "red",
                stroke: "black",
                strokeWidth: 4
            },
        }
    }
}
</script>