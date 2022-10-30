<template>
    <div id="container-canvas">

        <div id="canvas-wrap" @mousemove="updateCoordinates">
            <canvas width="1000" height="1000" ref="canvas" id="canvas" @load="drawGrid">

            </canvas>
            <v-stage ref="stage" :config="configKonva" style="position: absolute;top:0"
                @mousedown="handleStageMouseDown" @mousemove="handleStageMouseMove" @mouseup="handleStageMouseUp"
                @touchstart="handleStageMouseDown" @contextmenu="handleContentMenu">
                <v-layer ref="layer-out">
                    <v-transformer ref="transformer"
                        :config="{borderDash: [4, 3],padding:10,anchorFill:'#fd7e14',anchorCornerRadius: 5,borderStroke:'#fd7e14',anchorStroke:'#fd7e14'}" />
                    <div v-for="item in layers" :key="item.name">
                        <div v-switch="item.type">
                            <v-text class="shape" v-if=" item.type == 'text'" :config="item"
                                @transform="handleTransform" @transformend="handleTransformEnd"
                                @dragend="handleTransformEnd" @click="handleClick" @dblclick="handleEditText"
                                @dbtap="handleEditText" />
                            <v-rect class="shape" v-if=" item.type == 'rectangle'" :config="item"
                                @transformend="handleTransformEnd" @dragend="handleTransformEnd" @click="handleClick" />
                            <v-circle class="shape" v-if="item.type == 'circle'" :config="item"
                                @transformend="handleTransformEnd" @dragend="handleTransformEnd" @click="handleClick" />
                            <v-regular-polygon class="shape" v-if=" item.type == 'triangular'" :config="item"
                                @transformend="handleTransformEnd" @dragend="handleTransformEnd" @click="handleClick" />
                            <v-image class="shape" v-if=" item.type == 'image'" :config="item"
                                @transformend="handleTransformEnd" @dragend="handleTransformEnd" @click="handleClick" />
                        </div>

                    </div>
                    <v-rect ref="selection_rectangle" :config="{fill: '#fd7e1475',visible: false}" />

                </v-layer>

            </v-stage>
            <div>
                <button @click="exportImage" class="btn-custom-secondary" id="btn-export" ref="btn-export">ดาว์นโหลด
                    สติกเกอร๋</button>
                <button @click="confirmSicker" class="btn-custom-primary" id="btn-confirm-sticker"
                    ref="btn-confirm-sticker">ยืนยัน สติกเกอร๋</button>
            </div>
            <div id="color-picker">
                <chrome-picker style="width:200px" :value="colors.hex" @input="updateValueColor" />
            </div>
            <div id="layers" :class="{expand_layer:!expand_layer}">
                <div id="layer-title"><span style="margin-right: 5px;">Layers</span><svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-layers" viewBox="0 0 16 16">
                        <path
                            d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z" />
                    </svg>
                    <div style="display: inline;width: 57%;text-align: right;">
                        <b-icon style="cursor: pointer;" v-if="expand_layer" icon="caret-up-fill"
                            @click="expand_layer = false"></b-icon>
                        <b-icon style="cursor: pointer;" v-else icon="caret-down-fill" @click="expand_layer = true">
                        </b-icon>

                    </div>
                </div>
                <div id="layers-body" v-if="expand_layer">

                    <div :class="{visible:!layer.visible,'layer-item':true}" v-for="(layer,index) in layers"
                        :key="layer.name" :ref="layer.name" @contextmenu="context_menu_layer(index,$event)"
                        @click="clickSelectLayerItem(layer.name,index)">
                        <svg style="cursor: pointer" @click="layer.visible = !layer.visible" v-if="layer.visible==true"
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path
                                d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                        <svg style="cursor: pointer" @click="layer.visible = !layer.visible" v-else
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                            <path
                                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                            <path
                                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                        <span @dblclick="layer.name_edit = true" v-if="layer.name_edit == false">{{layer.name_display}}
                        </span>
                        <input class="change_name_input" v-else v-model="layer.name_display"
                            @blur="layer.name_edit = false" />
                    </div>
                </div>
            </div>
            <div id="edit_shape_component" v-if="index_layer_selected>=0" :class="{'set-bottom-layer':!expand_layer}">
                <EditShapeText @change="handleChangeEditShape" v-if="selecteditem.type == 'text' && renderComponent"
                    :data="selecteditem" />
                <EditShapeRectangle @change="handleChangeEditShape"
                    v-if="selecteditem.type == 'rectangle' && renderComponent" :data="selecteditem" />
                <EditShapeTriangular @change="handleChangeEditShape"
                    v-if="selecteditem.type == 'triangular' && renderComponent" :data="selecteditem" />
                <EditShapeCircle @change="handleChangeEditShape" v-if="selecteditem.type == 'circle' && renderComponent"
                    :data="selecteditem" />
                <EditShapeImage @change="handleChangeEditShape" v-if="selecteditem.type == 'image' && renderComponent"
                    :data="selecteditem" />
            </div>
            <!-- {{context_menu_layer_open}} -->
            <div id="context-menu-layer" ref="context_menu_layer" v-show="context_menu_layer_open == true"
                v-click-outside="hide_context_menu_layer">
                <div @click="SendFrontLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-front" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2H5z" />
                    </svg> <span>Send to Front</span>
                </div>
                <div @click="SendBackLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                    </svg> <span>Send to Back</span>
                </div>
                <div @click="SendForwardsLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-layer-forward" viewBox="0 0 16 16">
                        <path
                            d="M8.354.146a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l1 1a.5.5 0 0 0 .708 0L7 4.207V12H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9V4.207l.646.647a.5.5 0 0 0 .708 0l1-1a.5.5 0 0 0 0-.708l-3-3z" />
                        <path
                            d="M1 7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5a.5.5 0 0 0 0-1H1V8h4.5a.5.5 0 0 0 0-1H1zm9.5 0a.5.5 0 0 0 0 1H15v2h-4.5a.5.5 0 0 0 0 1H15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4.5z" />
                    </svg> <span>Send Forwards</span>
                </div>
                <div @click="SendBackwardsLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-layer-backward" viewBox="0 0 16 16">
                        <path
                            d="M8.354 15.854a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708l1-1a.5.5 0 0 1 .708 0l.646.647V4H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9v7.793l.646-.647a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-3 3z" />
                        <path
                            d="M1 9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.5a.5.5 0 0 1 0 1H1v2h4.5a.5.5 0 0 1 0 1H1zm9.5 0a.5.5 0 0 1 0-1H15V6h-4.5a.5.5 0 0 1 0-1H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4.5z" />
                    </svg> <span>Send Backwards</span>
                </div>
                <div @click="duplicate_shape" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                        <path
                            d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                    </svg> <span>Duplicate</span>
                </div>
                <div @click="delete_layer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg> <span>Delete</span>
                </div>
                <div @click="hidden_layer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path
                            d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path
                            d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg> <span>Hidden</span>
                </div>
            </div>
            <div id="context-menu-object" ref="context_menu_object" v-show="context_menu_object_open == true"
                @contextmenu="handleContentMenu" v-click-outside="hide_context_menu_object">
                <div @click="SendFrontLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-front" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm5 10v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2v5a2 2 0 0 1-2 2H5z" />
                    </svg> <span>Send to Front</span>
                </div>
                <div @click="SendBackLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-back" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                    </svg> <span>Send to Back</span>
                </div>
                <div @click="SendForwardsLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-layer-forward" viewBox="0 0 16 16">
                        <path
                            d="M8.354.146a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l1 1a.5.5 0 0 0 .708 0L7 4.207V12H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9V4.207l.646.647a.5.5 0 0 0 .708 0l1-1a.5.5 0 0 0 0-.708l-3-3z" />
                        <path
                            d="M1 7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5a.5.5 0 0 0 0-1H1V8h4.5a.5.5 0 0 0 0-1H1zm9.5 0a.5.5 0 0 0 0 1H15v2h-4.5a.5.5 0 0 0 0 1H15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4.5z" />
                    </svg> <span>Send Forwards</span>
                </div>

                <div @click="SendBackwardsLayer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-layer-backward" viewBox="0 0 16 16">
                        <path
                            d="M8.354 15.854a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708l1-1a.5.5 0 0 1 .708 0l.646.647V4H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9v7.793l.646-.647a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-3 3z" />
                        <path
                            d="M1 9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.5a.5.5 0 0 1 0 1H1v2h4.5a.5.5 0 0 1 0 1H1zm9.5 0a.5.5 0 0 1 0-1H15V6h-4.5a.5.5 0 0 1 0-1H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4.5z" />
                    </svg> <span>Send Backwards</span>
                </div>
                <div @click="duplicate_shape" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" class="bi bi-files" viewBox="0 0 16 16">
                        <path
                            d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                    </svg> <span>Duplicate</span>
                </div>
                <div @click="delete_layer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg> <span>Delete</span>
                </div>
                <div @click="hidden_layer" class="context_menu_item"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                        height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                        <path
                            d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                        <path
                            d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                    </svg> <span>Hidden</span>
                </div>
            </div>
            <div id="panal-left">
                <div id="panal-body">
                    <div class="btn-menu" @mouseenter="open_sub_menu(index,$event)" v-for="(menu,index) in panels_menu"
                        :key="menu.type">
                        <div class="menu" v-html="menu.icon_svg">

                        </div>
                        <div class="sub_menu_box" v-if="menu.sub_menu_open" @mouseleave="close_sub_menu(index,$event)">
                            <div v-for="(sub_menu,index_submenu) in menu.sub_menu" :key="index_submenu"
                                @click="menu_action(sub_menu.type)">
                                <div class="menu sub_menu" v-html="sub_menu.icon_svg">

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <b-modal ref="modal-upload-image" header-close-content :title="`Upload your sticker`" size="lg">
            <div>
                <div id="upload-block">
                    <label id="block-upload-input" for="upload-file-input">
                        <div style="font-size:23px;font-weight: 500;">Upload an image</div>
                        <div>
                            <b-icon icon="cloud-arrow-up-fill" style="width: 120px; height: 120px;color:#ffead8" />
                        </div>
                        <div>(png,jpg, or svg files)</div>
                        <div style="margin-top:30px">Drag an image or Browse</div>
                    </label>
                    <input type="file" id="upload-file-input" accept="image/*" @change="handleChangeFile" />
                </div>

            </div>
        </b-modal>
    </div>
</template>
<script>
/**
 * type of layer 
 * 1) Circle
 * 2) Rectangle
 * 3) triangular
 */
import { Chrome } from 'vue-color'
import ClickOutside from 'vue-click-outside'
import { v4 as uuidv4 } from 'uuid';
import Konva from "konva"
import EditShapeText from "./StickerDesignComponent/EditShapeText.vue"
import EditShapeRectangle from "./StickerDesignComponent/EditShapeRectangle.vue"
import EditShapeTriangular from "./StickerDesignComponent/EditShapeTriangular.vue"
import EditShapeCircle from "./StickerDesignComponent/EditShapeCircle.vue"
import EditShapeImage from "./StickerDesignComponent/EditShapeImage.vue"
var const_data = {
    CLICK_LEFT: 0,
    CLICK_RIGHT: 2
}
var x1, y1, x2, y2;
function getPosition(el) {
    var x = 0;
    var y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: y, left: x };
}

function downloadURI(uri, name) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default {
    props: {
        handleStickerResult: Function
    },
    components: {
        'chrome-picker': Chrome,
        EditShapeText,
        EditShapeRectangle,
        EditShapeTriangular,
        EditShapeCircle,
        EditShapeImage
    },
    mounted() {
        this.drawGrid()
    },
    data() {
        return {

            history: [],
            renderComponent: true,
            expand_layer: true,
            configKonva: {

                width: 1000,
                height: 1000
            },
            layers: [

            ],
            selecteditem: null,
            selectedShapeName: '',
            selectedShapeNameMulti: [],
            index_layer_selected: -1,
            x: 0,
            y: 0,
            context_menu_layer_open: false,
            context_menu_object_open: false,
            panels_menu: [
                {
                    type: "image",
                    icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>',
                    sub_menu_open: false,
                    sub_menu: [
                        {
                            type: "image",
                            icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16"><path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/></svg>'
                        }

                    ]

                },
                {
                    type: "text",
                    icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fonts" viewBox="0 0 16 16"><path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"/></svg>',
                    sub_menu_open: false,
                    sub_menu: [
                        {
                            type: "text",
                            icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-fonts" viewBox="0 0 16 16"><path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"/></svg>'
                        }

                    ]

                },
                {
                    type: "shape",
                    icon_svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="currentColor"/></svg>',
                    sub_menu_open: false,
                    sub_menu: [
                        {
                            type: "rectangle",
                            icon_svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="currentColor"/></svg>'
                        },
                        {
                            type: "triangular",
                            icon_svg: '<svg width="32" height="32" viewBox="0 0 50 42" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M25 0L49.2487 42H0.751289L25 0Z" fill="currentColor"/></svg>'
                        },
                        {
                            type: "circle",
                            icon_svg: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="currentColor"/></svg>'
                        },
                    ]
                },
                {
                    type: "undo",
                    icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>',
                    sub_menu_open: false,
                    sub_menu: [
                        {
                            type: "undo",
                            icon_svg: '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-reply-fill" viewBox="0 0 16 16"><path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/></svg>'
                        }
                    ]
                }
            ],
            colors: { hex: "#0d6efd" }
        }
    },
    directives: {
        ClickOutside
    },
    methods: {
        undo() {
            var length_history = this.history.length - 2
            var last_history = this.history[length_history]
            if (last_history) {
                this.layers = [...last_history]
                console.log("undo", length_history, this.history.length);
                this.history.length = length_history + 1
                this.$forceUpdate();
            }


        },
        save_history() {
            setTimeout(() => {
                this.history.push([...this.layers])
            }, 100);

            console.log("save history", this.history.length, "records");
        },
        exportImage() {
            const transformerNode = this.$refs.transformer.getNode();
            var group = new Konva.Group();
            transformerNode.nodes().map((shape) => {
                return shape.clone()
            }).reverse().map((shape) => { group.add(shape) })
            const uri = group.toDataURL({ pixelRatio: 3 });
            downloadURI(uri, "make-by-gunner-barcode-design.png")
        },
        confirmSicker() {
            const transformerNode = this.$refs.transformer.getNode();
            var group = new Konva.Group();
            transformerNode.nodes().map((shape) => {
                return shape.clone()
            }).reverse().map((shape) => { group.add(shape) })
            const uri = group.toDataURL({ pixelRatio: 3 });
            
            this.handleStickerResult(uri)
        },
        showButtonExport(open) {

            if (open == true) {
                this.$refs["btn-export"].style.display = "block"
                this.$refs["btn-confirm-sticker"].style.display = "block"
            } else {
                this.$refs["btn-export"].style.display = "none"
                this.$refs["btn-confirm-sticker"].style.display = "none"
            }


        },
        handleChangeFile(e) {
            var URL = window.webkitURL || window.URL;
            var url = URL.createObjectURL(e.target.files[0]);
            var img = new Image();
            img.src = url;



            var push_image_to_layer = (data) => {
                this.layers.unshift(data)

                setTimeout(() => {
                    this.clickSelectLayerItem(data.name)
                    this.save_history()
                }, 100)
            }

            var length_of_layer = () => {
                return this.layers.length
            }

            img.onload = function () {

                var img_width = img.width;
                var img_height = img.height;

                // calculate dimensions to get max 300px
                var max = 300;
                var ratio = (img_width > img_height ? (img_width / max) : (img_height / max))
                var name = uuidv4()
                push_image_to_layer({
                    type: "image",
                    visible: true,
                    name_edit: false,
                    rotation: 0,
                    x: 50,
                    y: 30,
                    image: img,
                    width: img_width / ratio,
                    height: img_height / ratio,
                    scaleX: 1,
                    scaleY: 1,
                    name,
                    name_display: "image",
                    draggable: true,
                    zIndex: length_of_layer()
                })
            }
        },
        async forceRerender() {
            // Remove MyComponent from the DOM
            this.renderComponent = false;

            // Wait for the change to get flushed to the DOM
            await this.$nextTick();

            // Add the component back in
            this.renderComponent = true;
        },
        SendBackLayer() {

            this.reOrderLayers(this.index_layer_selected, this.layers.length - 1)
        },
        SendFrontLayer() {
            console.log("SendFrontLayer", this.index_layer_selected);
            this.reOrderLayers(this.index_layer_selected, 0)
        },
        SendBackwardsLayer() {
            var next_index = ((this.index_layer_selected + 1) > this.layers.length - 1) ? this.layers.length - 1 : this.index_layer_selected + 1
            this.reOrderLayers(this.index_layer_selected, next_index)
            this.index_layer_selected = next_index
        },
        SendForwardsLayer() {
            console.log("SendForwardsLayer");
            var previous_index = ((this.index_layer_selected - 1) < 0) ? 0 : this.index_layer_selected - 1
            this.reOrderLayers(this.index_layer_selected, previous_index)
            this.index_layer_selected = previous_index
        },
        duplicate_shape() {
            if (this.index_layer_selected >= 0) {
                var shape_data = { ...this.layers[this.index_layer_selected] }
                shape_data.x += 20
                shape_data.y += 20
                shape_data.name = uuidv4()
                shape_data.zIndex = this.layers.length
                this.layers.unshift(shape_data)

                setTimeout(() => {
                    this.clickSelectLayerItem(shape_data.name)
                }, 20)
            }

        },
        reOrderLayers(oldIndex, newIndex) {
            if (oldIndex > newIndex) {
                this.layers.splice(newIndex, 0, this.layers[oldIndex])
                this.layers.splice(oldIndex + 1, 1)
            }
            else {
                this.layers.splice(newIndex + 1, 0, this.layers[oldIndex])
                this.layers.splice(oldIndex, 1)
            }

            this.reIndexLayer()
        },
        reIndexLayer() {

            const stage = this.$refs.stage.getNode();
            this.layers = this.layers.map((layer, index) => {
                layer.zIndex = (this.layers.length - 1) - index
                const selectedNode = stage.findOne('.' + layer.name);
                selectedNode.setZIndex(layer.zIndex)

                return layer
            })
        },
        handleChangeEditShape(shape_config) {
            var find_index = this.layers.findIndex(x => x.name == shape_config.name)
            this.layers[find_index] = { ...shape_config }


            this.clickUnSelectLayerItem()
            this.clickSelectLayerItem(shape_config.name)


        },
        handleDragChange() {
            this.selectedShapeName = '';
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();

            this.layers = this.layers.map((layer, index) => {
                layer.zIndex = (index + 1)
                const selectedNode = stage.findOne('.' + layer.name);

                this.handleTransformEnd({ target: selectedNode, attrs: { name: layer.name } })
                return layer
            })
        },
        updateValueColor(e) {
            this.colors.hex = e.hex
            if (this.selectedShapeName != "") {
                this.layers[this.index_layer_selected].fill = e.hex
            }
        },

        clickSelectLayerItem(name, index = undefined) {
            console.log("clickSelectLayerItem");
            this.selectedShapeName = name
            if (index == undefined) {
                index = this.layers.findIndex(x => x.name == name)
            }
            this.index_layer_selected = index
            this.selecteditem = this.layers[index]

            this.active_layer_action(this.selectedShapeName)
            this.updateTransformer();

        },
        clickUnSelectLayerItem() {
            this.selectedShapeName = '';
            this.selecteditem = null
            this.index_layer_selected = -1
            this.inactive_layer_action()
            this.updateTransformer();
            return;
        },
        handleContentMenu(e) {
            if (e.evt != undefined) {
                e.evt.preventDefault();
            } else {
                e.preventDefault()
            }
        },
        handleTransform(e) {

            var MIN_WIDTH = 20
            e.target.setAttrs({
                width: Math.max(e.target.width() * e.target.scaleX(), MIN_WIDTH),
                height: e.target.height() * e.target.scaleY(),
                scaleX: 1,
                scaleY: 1,
            });
        },
        handleTransformEnd(e) {

            // find element in our state
            console.log("handleTransformEnd");
            const rect = this.layers.find(
                (r) => r.name == e.target.attrs.name
            );
            const find_index = this.layers.findIndex(
                (r) => r.name == e.target.attrs.name
            );
            if (rect && find_index >= 0) {


                // update the state
                rect.x = e.target.x();
                rect.y = e.target.y();
                rect.rotation = e.target.rotation();

                rect.scaleX = e.target.scaleX();
                rect.scaleY = e.target.scaleY();
                rect.width = e.target.width()
                rect.height = e.target.height()
                rect.name = e.target.name()
                this.layers[find_index] = { ...rect }
                this.selecteditem = { ...rect }
                this.forceRerender()
                this.save_history()
                // change fill
            } else {
                console.log(376, "rect undfind", e.target.attrs.name, this.layers.map(x => ({ name: x.name, display: x.name_display })));
            }


        },

        handleStageMouseDown(e) {
            // clicked on stage - clear selection
            var selectionRectangle = this.$refs.selection_rectangle.getNode()
            if (e.target === e.target.getStage()) {
                this.selectedShapeName = '';
                this.clickUnSelectLayerItem()
                this.updateTransformer();
                x1 = e.target.getStage().getPointerPosition().x;
                y1 = e.target.getStage().getPointerPosition().y;
                x2 = e.target.getStage().getPointerPosition().x;
                y2 = e.target.getStage().getPointerPosition().y;

                selectionRectangle.visible(true);
                selectionRectangle.width(0);
                selectionRectangle.height(0);
                this.showButtonExport(false)
                return;
            }

            var rect = this.layers.find(x => x.name == e.target.attrs.name)

            if (selectionRectangle.visible()) {
                return
            } else {
                // clicked on transformer - do nothing
                if (this.selectedShapeNameMulti.length == 0) {
                    if (e.target.getParent()) {
                        const clickedOnTransformer = e.target.getParent().className === 'Transformer';
                        if (clickedOnTransformer) {
                            return;
                        }
                    }

                    // find clicked rect by its name

                    const name = e.target.name();


                    if (rect) {
                        this.selectedShapeName = name;
                        this.index_layer_selected = this.layers.findIndex((r) => r.name === name);
                        // update color picker
                        if (rect.fill) {
                            this.colors.hex = rect.fill
                        }

                        this.selecteditem = { ...rect }
                        this.active_layer_action(this.selectedShapeName)


                    } else {
                        this.selectedShapeName = '';
                    }
                    this.updateTransformer();
                }

            }


        },
        handleStageMouseMove(e) {
            var selectionRectangle = this.$refs.selection_rectangle.getNode()
            if (!selectionRectangle.visible()) {
                return
            }

            e.evt.preventDefault();
            x2 = selectionRectangle.getStage().getPointerPosition().x;
            y2 = selectionRectangle.getStage().getPointerPosition().y;

            selectionRectangle.setAttrs({
                x: Math.min(x1, x2),
                y: Math.min(y1, y2),
                width: Math.abs(x2 - x1),
                height: Math.abs(y2 - y1),
            });
        },
        handleStageMouseUp(e) {

            var selectionRectangle = this.$refs.selection_rectangle.getNode()
            if (!selectionRectangle.visible()) {
                return;
            }
            var stage = selectionRectangle.getStage()
            e.evt.preventDefault();
            // update visibility in timeout, so we can check it in click event
            setTimeout(() => {
                selectionRectangle.visible(false);
            });


            setTimeout(() => {
                var shapes = this.layers.map((layer) => {
                    return stage.findOne('.' + layer.name);
                });



                var box = selectionRectangle.getClientRect();
                var selected = shapes.filter((shape) =>
                    Konva.Util.haveIntersection(box, shape.getClientRect())
                )
                const transformerNode = this.$refs.transformer.getNode();
                transformerNode.nodes(selected);
                this.selectedShapeNameMulti = selected.map(x => x.attrs.name)
                this.selectedShapeName = ''

                if (selected.length > 0) {
                    this.showButtonExport(true)
                }
            }, 1);


        },
        handleClick(e) {
            // console.log(e.target.zIndex());

            if (e.evt.button == const_data.CLICK_RIGHT) {
                this.context_menu_object_open = true
                this.$refs.context_menu_object.style
                this.$refs.context_menu_object.style.top = `${e.evt.y}px`
                this.$refs.context_menu_object.style.left = `${e.evt.x}px`
            }
            e.evt.preventDefault();

        },
        handleEditText() {

            console.log("handleEditText", this.selectedShapeName);
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            const selectedNode = stage.findOne('.' + this.selectedShapeName);
            transformerNode.hide()
            selectedNode.hide()

            // create textarea over canvas with absolute position
            // first we need to find position for textarea
            // how to find it?

            // at first lets find position of text node relative to the stage:
            var textPosition = selectedNode.absolutePosition();

            // so position of textarea will be the sum of positions above:
            var areaPosition = {
                x: stage.container().offsetLeft + textPosition.x,
                y: stage.container().offsetTop + textPosition.y,
            };

            // create textarea and style it
            var textarea = document.createElement('textarea');
            // document.body.appendChild(textarea);
            var container_canvas = document.getElementById("canvas-wrap")
            container_canvas.appendChild(textarea)

            // apply many styles to match text on canvas as close as possible
            // remember that text rendering on canvas and on the textarea can be different
            // and sometimes it is hard to make it 100% the same. But we will try...
            textarea.value = selectedNode.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = selectedNode.width() - selectedNode.padding() * 2 + 'px';
            textarea.style.height =
                selectedNode.height() - selectedNode.padding() * 2 + 5 + 'px';
            textarea.style.fontSize = selectedNode.fontSize() + 'px';
            textarea.style.border = 'none';
            textarea.style.padding = '0px';
            textarea.style.margin = '0px';
            textarea.style.overflow = 'hidden';
            textarea.style.background = 'none';
            textarea.style.outline = 'none';
            textarea.style.resize = 'none';
            textarea.style.lineHeight = selectedNode.lineHeight();
            textarea.style.fontFamily = selectedNode.fontFamily();
            textarea.style.transformOrigin = 'left top';
            textarea.style.textAlign = selectedNode.align();
            textarea.style.color = selectedNode.fill();
            var rotation = selectedNode.rotation();
            var transform = '';
            if (rotation) {
                transform += 'rotateZ(' + rotation + 'deg)';
            }

            var px = 0;
            // also we need to slightly move textarea on firefox
            // because it jumps a bit
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isFirefox) {
                px += 2 + Math.round(selectedNode.fontSize() / 20);
            }
            transform += 'translateY(-' + px + 'px)';

            textarea.style.transform = transform;

            // reset height
            textarea.style.height = 'auto';
            // after browsers resized it we can set actual value
            textarea.style.height = textarea.scrollHeight + 3 + 'px';

            textarea.focus();

            var save_stage = (text, name) => {

                var find_index = this.layers.findIndex(x => x.name == name)
                this.layers[find_index].text = text
                this.selecteditem = { ...this.layers[find_index] }
                this.forceRerender()
            }


            function removeTextarea() {
                textarea.parentNode.removeChild(textarea);
                window.removeEventListener('click', handleOutsideClick);
                selectedNode.show();
                transformerNode.show();
                transformerNode.forceUpdate();
            }

            function setTextareaWidth(newWidth) {
                if (!newWidth) {
                    // set width for placeholder
                    newWidth = selectedNode.placeholder.length * selectedNode.fontSize();
                }
                // some extra fixes on different browsers
                var isSafari = /^((?!chrome|android).)*safari/i.test(
                    navigator.userAgent
                );
                var isFirefox =
                    navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
                if (isSafari || isFirefox) {
                    newWidth = Math.ceil(newWidth);
                }

                var isEdge =
                    document.documentMode || /Edge/.test(navigator.userAgent);
                if (isEdge) {
                    newWidth += 1;
                }
                textarea.style.width = newWidth + 'px';
            }

            textarea.addEventListener('keydown', function (e) {
                // hide on enter
                // but don't hide on shift + enter
                if (e.keyCode === 13 && !e.shiftKey) {
                    selectedNode.text(textarea.value);
                    save_stage(textarea.value, selectedNode.attrs.name)
                    removeTextarea();
                }
                // on esc do not set value back to node
                if (e.keyCode === 27) {
                    removeTextarea();
                }
            });

            textarea.addEventListener('keydown', function () {
                var scale = selectedNode.getAbsoluteScale().x;
                setTextareaWidth(selectedNode.width() * scale);
                textarea.style.height = 'auto';
                textarea.style.height =
                    textarea.scrollHeight + selectedNode.fontSize() + 'px';
            });

            function handleOutsideClick(e) {
                console.log("handleOutsideClick");
                if (e.target !== textarea) {
                    console.log("selectedNode", selectedNode);
                    selectedNode.text(textarea.value);
                    save_stage(textarea.value, selectedNode.attrs.name)
                    removeTextarea();
                }
            }
            setTimeout(() => {
                window.addEventListener('click', handleOutsideClick);
            });
        },
        active_layer_action(name) {
            var el_layer = document.getElementsByClassName("layer-item")
            for (var i = 0; i < el_layer.length; i++) {
                el_layer[i].classList.remove("layer-item-active")
            }
            if (this.$refs[name]) {
                this.$refs[name][0].classList.add("layer-item-active")
            }

        },
        inactive_layer_action() {
            var el_layer = document.getElementsByClassName("layer-item")
            for (var i = 0; i < el_layer.length; i++) {
                el_layer[i].classList.remove("layer-item-active")
            }
        },
        updateTransformer() {
            // here we need to manually attach or detach Transformer node
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            const { selectedShapeName } = this;

            const selectedNode = stage.findOne('.' + selectedShapeName);
            // do nothing if selected node is already attached
            if (selectedNode === transformerNode.node()) {
                return;
            }

            if (selectedNode) {
                // attach to another node
                transformerNode.nodes([selectedNode]);
            } else {
                // remove transformer
                transformerNode.nodes([]);
            }
        },
        updateCoordinates: function () {

        },
        hide_context_menu_layer() {
            this.context_menu_layer_open = false
        },
        hide_context_menu_object() {
            this.context_menu_object_open = false
        },
        context_menu_layer(index_layer, event) {
            this.context_menu_layer_open = true
            this.index_layer_selected = index_layer
            event.preventDefault();
            this.$refs.context_menu_layer.style.top = `${event.y}px`
            this.$refs.context_menu_layer.style.left = `${getPosition(event.target).left + event.target.offsetWidth}px`
        },

        delete_layer() {
            this.layers = this.layers.filter((x, index) => index != this.index_layer_selected)
            this.clickUnSelectLayerItem()
            this.hide_context_menu_layer()
            this.hide_context_menu_object()
        },
        hidden_layer() {
            this.layers[this.index_layer_selected].visible = true
        },
        menu_action(menu_type) {
            this.clickUnSelectLayerItem()
            var name = uuidv4()
            switch (menu_type) {

                case "text": {
                    this.layers.unshift({
                        type: "text",
                        visible: true,
                        name_edit: false,
                        rotation: 0,
                        x: 150,
                        y: 150,
                        text: "Text",
                        fontFamily: "Prompt",
                        fontSize: 32,
                        width: 100,
                        height: 100,
                        scaleX: 1,
                        scaleY: 1,
                        fill: this.colors.hex,
                        name,
                        name_display: "text",
                        draggable: true,
                        zIndex: this.layers.length
                    })
                    setTimeout(() => {
                        this.clickSelectLayerItem(name)
                        this.save_history()
                    }, 100)

                    break;
                }
                case "rectangle": {
                    this.layers.unshift({
                        type: "rectangle",
                        visible: true,
                        name_edit: false,
                        rotation: 0,
                        x: 150,
                        y: 150,
                        width: 100,
                        height: 100,
                        scaleX: 1,
                        scaleY: 1,
                        fill: this.colors.hex,
                        name,
                        name_display: "rectangle",
                        draggable: true,
                        zIndex: this.layers.length
                    })
                    setTimeout(() => {
                        this.clickSelectLayerItem(name)
                        this.save_history()
                    }, 100)
                    break;
                }
                case "circle": {
                    this.layers.unshift({
                        type: "circle",
                        visible: true,
                        name_edit: false,
                        rotation: 0,
                        x: 150,
                        y: 150,
                        width: 100,
                        height: 100,
                        scaleX: 1,
                        scaleY: 1,
                        fill: this.colors.hex,
                        name,
                        name_display: "circle",
                        draggable: true,
                        zIndex: this.layers.length
                    })
                    setTimeout(() => {
                        this.clickSelectLayerItem(name)
                        this.save_history()
                    }, 100)
                    break;
                }
                case "triangular": {
                    this.layers.unshift({
                        type: "triangular",
                        visible: true,
                        name_edit: false,
                        x: 150,
                        y: 150,
                        sides: 3, // จะนวนแฉก
                        radius: 70,
                        fill: this.colors.hex,
                        scaleX: 1,
                        scaleY: 1,
                        name,
                        name_display: "triangular",
                        draggable: true,
                        zIndex: this.layers.length
                    })
                    setTimeout(() => {
                        this.clickSelectLayerItem(name)
                        this.save_history()
                    })
                    break;
                }
                case "image": {
                    this.$refs['modal-upload-image'].show()
                    break;
                }
                case "undo": {
                    this.undo()
                    break;
                }
                default:
                    break;
            }



        },
        drawGrid() {
            //console.log(this.$refs.canvas);
            var canvas = this.$refs.canvas

            var context = canvas.getContext('2d');
            for (var x = 0.5; x < canvas.width; x += 10) {
                context.moveTo(x, 0);
                context.lineTo(x, canvas.width);
            }

            for (var y = 0.5; y < canvas.height; y += 10) {
                context.moveTo(0, y);
                context.lineTo(canvas.height, y);
            }
            context.strokeStyle = "#ddd";
            context.stroke();
        },
        drawObject() {
            console.log("drawObject");
        },
        open_sub_menu(menu_index) {
            this.panels_menu.map((menu, index) => {
                this.panels_menu[index].sub_menu_open = false
            })

            this.panels_menu[menu_index].sub_menu_open = true
        },
        close_sub_menu(menu_index) {
            this.panels_menu[menu_index].sub_menu_open = false
        },
        genName(name) {
            let reg = new RegExp(`^${name}(.+?)|^${name}`, 'gi');
            var layer_match = this.layers.filter((item_layer) => {
                return reg.test(item_layer.name)
            })
            if (layer_match.length > 0) {
                return `${name}${layer_match.length}`
            } else {
                return name
            }
        }
    },

    computed: {

    }

}
</script>
<style scoped>
#container-canvas {
    width: 100%;
    display: flex;
    position: relative;
    justify-content: center;

}

#color-picker {

    position: absolute;
    top: 20px;
    right: 20px;
    width: 200px;
    height: 200px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}


#layers {
    /* padding: 10px; */
    position: absolute;
    top: 260px;
    right: 20px;
    width: 200px;
    height: 200px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    transition: height 0.2s !important;
}

#edit_shape_component {
    position: absolute;
    top: 470px;
    right: 20px;
    width: 200px;
    min-height: 200px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}



#layers>#layers-body {

    max-height: 170px;
    overflow-y: auto;

}

#layers>#layer-title {
    /* height: 20px; */
    padding: 5px 10px 5px 10px;
    height: 35px;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #ccc;
}

#layers-body>.visible {
    color: #a0a0a0;
}

#canvas-wrap {
    position: relative
}

.layer-item {
    cursor: pointer;
    padding: 2px 10px 2px 10px;
    display: flex;
    align-items: center;

}

.expand_layer {

    height: 35px !important;
}

.set-bottom-layer {
    top: 305px !important;
}

.layer-item>* {
    margin-right: 5px;
}

.layer-item:hover {
    background-color: rgb(163, 229, 255);
}

.layer-item-active {
    background-color: rgb(163, 229, 255);
}

/* Make this a positioned parent */

canvas {
    width: 1000px;
    height: 1000px;
    background-color: rgb(255, 255, 255);
    border: solid 0.5px #a0a0a0;
}

.change_name_input {
    outline: none;
    height: 28px;
    width: 100%;
    border: none;
    background-color: rgb(163, 229, 255);
}

#panal-left {
    border-radius: 10px;
    position: absolute;
    top: calc(50% - 100px);
    left: 20px;
    width: 50px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

}

#panal-body {
    /* position: relative; */
    min-height: 126px;
    width: 50px;
}

.btn-menu {
    position: relative;
}

.sub_menu_box {
    position: absolute;
    top: 0px;
    left: 120%;
    width: 84px;
    /* height: 100px; */
    /* background-color: white; */
    display: flex;
    flex-wrap: wrap;


}

.sub_menu_box>.menu {
    flex: 1 1 160px;
    margin: 10px;

}

.menu {
    position: relative;
    padding: 5px;
    display: flex;
    justify-content: center;
    color: rgb(117, 117, 117);
    cursor: pointer;
}

.sub_menu {
    background-color: rgb(255, 255, 255);
}

#context-menu-layer,
#context-menu-object {

    position: fixed;
    width: 200px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

#context-menu-layer,
#context-menu-object>div {
    border: 0.5px solid rgb(255, 255, 255);
    padding: 5px 10px 5px 10px;
    cursor: pointer;
}

.context_menu_item:hover {
    border: 0.5px solid rgb(156, 210, 255);
}

#upload-block {
    display: flex;
    justify-content: center;
}

#upload-file-input {
    display: none;
}

#block-upload-input {
    text-align: center;
    background-color: #ffba82;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    color: #8b5a31;
}

#block-upload-input:hover {
    background-color: #ef9246;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

#btn-export {
    position: absolute;
    top: 5px;
    left: 5px;
    display: none;
}

#btn-confirm-sticker {
    position: absolute;
    top: 5px;
    left: 180px;
    display: none;
}
</style>

<style>
button.close {
    display: none !important;
}
</style>