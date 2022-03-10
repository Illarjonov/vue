<template>
<div class = 'post'>
    <div v-if="isVisibleInput" class = 'inputs'>
        <my-input
            class = 'input'
            v-model="post.firstName"
            type="text"
            :placeholder=post.firstName
        />
        <my-input
            class = 'input'
            v-model="post.secondName"
            type="text"
            :placeholder=post.secondName
        />
    </div>
    <div v-else >
        <span>{{post.firstName}}</span>
        <span>{{post.secondName}}</span>
    </div>

    <div>
        <my-button
                v-if="!isVisibleInput"
                @click='editOn'
        >Изменить</my-button>
        <my-button
                v-else
                @click='editUser(post)'
        >Сохранить</my-button>

        <my-button
            @click="$emit('remove', post)"
        >Удалить</my-button>
    </div>
</div>
</template>

<script>
import MyInput from "../UI/MyInput";
import {mapActions} from 'vuex'
export default {
    data(post){
        return{
            user:{
                firstName:  post.firstName,
                secondName:  post.secondName,
                uuid:  post.uuid
            },
            isVisibleInput: false,
        }
    },
    components: {MyInput},
    props:{
        post: {
            type: Object,
            required: true
        }
    },
    methods:{
        ...mapActions({
            editPost: 'post/editPost'
        }),
        editOn(){
            this.isVisibleInput = true
        },
        editUser(post){
            this.editPost(post);
            this.isVisibleInput = false
        },

    }
}
</script>

<style scoped>
    .post{
        padding: 15px;
        border: 2px solid teal;
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .inputs {
        display: flex;
        flex-direction: row;
    }
    .input{
        margin: 2px;
        padding: 5px;
    }
    span{
        margin-right: 10px ;
        font-size: 20px;
    }
    button{
        margin: 5px;
    }
</style>

