<template>
    <div class="modal" v-if="show" @click="hideModal">
        <div @click.stop class="modal__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    name: 'my-modal',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        ...mapMutations({
            setModalVisible: 'post/setModalVisible'
        }),
        hideModal(){
            this.setModalVisible(false);
        }
    }
}
</script>

<style>
.modal{
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba( 0, 0 , 0, 0.7);
    position: fixed;
    display: flex;
}
.modal__content{
    margin: auto;
    background: white;
    border-radius: 10px;
    padding: 20px;
}
</style>