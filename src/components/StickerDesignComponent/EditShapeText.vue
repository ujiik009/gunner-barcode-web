<template>
    <div>
        <div id="title">
            <span style="margin-right: 5px;">Text</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools"
                viewBox="0 0 16 16">
                <path
                    d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
            </svg>
        </div>

        <div id="form-edit-shap">
            <form>
                <div class="form-group">
                    <label>Text Align</label>
                    <div style="display:flex;justify-content:space-between">
                        <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off"
                            :checked="shape_config.align == 'left'" @click="handleClickAlign('left')">
                        <label class="btn" for="option1">
                            <b-icon icon="text-left" />
                        </label>
                        <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off"
                            :checked="shape_config.align == 'center'" @click="handleClickAlign('center')">
                        <label class="btn" for="option2">
                            <b-icon icon="text-center" />
                        </label>
                        <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off"
                            :checked="shape_config.align == 'right'" @click="handleClickAlign('right')">
                        <label class="btn" for="option3">
                            <b-icon icon="text-right" />
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Vertical Align</label>
                    <div style="display:flex;justify-content:space-between">
                        <input type="radio" class="btn-check" name="VerticaAlign" id="VerticaAlign1" autocomplete="off"
                            :checked="shape_config.verticalAlign == 'top'" @click="handleClickVerticaAlign('top')">
                        <label class="btn" for="VerticaAlign1">
                            <b-icon icon="align-top" />
                        </label>
                        <input type="radio" class="btn-check" name="VerticaAlign" id="VerticaAlign2" autocomplete="off"
                            :checked="shape_config.verticalAlign == 'middle'"
                            @click="handleClickVerticaAlign('middle')">
                        <label class="btn" for="VerticaAlign2">
                            <b-icon icon="align-middle" />
                        </label>
                        <input type="radio" class="btn-check" name="VerticaAlign" id="VerticaAlign3" autocomplete="off"
                            :checked="shape_config.verticalAlign == 'bottom'"
                            @click="handleClickVerticaAlign('bottom')">
                        <label class="btn" for="VerticaAlign3">
                            <b-icon icon="align-bottom" />
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="font_family">Font Family</label>
                    <select class="form-control" id="font_family" v-model="shape_config.fontFamily" @change="updateData"
                        @input="$emit('input', $event)">
                        <option v-for="font in font_family" :key="font">{{font}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="font_size">Font Size</label>
                    <input type="number" class="form-control" id="font_size" v-model="shape_config.fontSize"
                        @keyup="updateData" />
                </div>
                <div class="form-group">
                    <label for="stroke_color">Stroke Color</label>
                    <input type="color" class="form-control" id="stroke_color" v-model="shape_config.stroke"
                        @change="updateData">
                </div>
                <div class="form-group">
                    <label for="StrokeWidth">Stroke Width</label>
                    <input type="range" class="form-range" id="StrokeWidth" min="0" max="15" step="0.01"
                        v-model="shape_config.strokeWidth" @change="updateData">
                </div>
                <div class="form-group">
                    <label for="padding">Padding</label>
                    <input type="number" class="form-control" id="padding" v-model="shape_config.padding"
                        @keyup="updateData" />
                </div>
                <div class="form-group">
                    <label for="customRange1">Opacity</label>
                    <input type="range" class="form-range" id="customRange1" min="0" max="1" step="0.01"
                        v-model="shape_config.opacity" @change="updateData">
                </div>
            </form>

        </div>
        <!-- Edit text only
        {{shape_config}} -->
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    },
    methods: {
        updateData() {
            this.shape_config.cornerRadius = Number(this.shape_config.cornerRadius)
            this.shape_config.strokeWidth = Number(this.shape_config.strokeWidth)
            this.shape_config.padding = Number(this.shape_config.padding)
            this.$emit('change', {
                ...this.shape_config
            })
        },
        handleClickAlign(align) {
            this.shape_config.align = align
            this.updateData()
        },
        handleClickVerticaAlign(verticalAlign) {
            this.shape_config.verticalAlign = verticalAlign
            this.updateData()
        }
    },
    data() {
        return {
            shape_config: {
                text: "",
                align: "left", // can be left, center, or right
                verticalAlign: "top", //top, middle or bottom
                padding: 0,
                fontFamily: "Arial",
                fontSize: 10,
                fontStyle: "normal",
                stroke: "",
                strokeWidth: 0,
                opacity: 1,
                ...this.value
            },
            font_family: [
                "Prompt",
                "Kanit",
                "Sarabun",
                "Mali",
                "Mitr",
                "Sriracha",
                "Charm",

            ]
        }
    },
    mounted() {
        Object.assign(this.shape_config, this.data)
        setTimeout(() => {
            this.updateData()
        }, 20);
    },
}
</script>

<style scoped>
.form-control {
    height: 30px;
    font-size: 13px;
}

#title {
    padding: 5px 10px 5px 10px;
    height: 35px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #ccc;
}


#form-edit-shap {
    padding: 10px;
}
</style>