<template>
<div class = "post">
    <div class = "inputs">
        <my-input
            class = "input"
            v-model="post.firstName"
            type="text"
            :disabled = "!isDisabledInput"></my-input>
        <my-input
            class = "input"
            v-model="post.secondName"
            type="text"
            :disabled = "!isDisabledInput"></my-input>
    </div>

    <div>
        <my-button
                v-if="!isDisabledInput"
                @click="editOn"
        >Изменить</my-button>
        <my-button
                v-else
                @click="editUser(post)"
        >Сохранить</my-button>

        <my-button
            @click="removePost(post)"
        >Удалить</my-button>
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    data(post){
        return{
            user:{
                firstName:  post.firstName,
                secondName:  post.secondName,
                uuid:  post.uuid
            },
            isDisabledInput: false,
        }
    },
    props:{
        post: {
            type: Object,
            required: true
        }
    },
    methods:{
        ...mapActions({
            editPost: 'post/editUser',
            deleteUser: 'post/deleteUser',
        }),
        removePost(post){
            this.deleteUser(post.uuid)
        },
        editOn(){
            this.isDisabledInput = true
        },
        editUser(post){
            if (post.firstName.length>0 && post.secondName.length>0){
                 this.editPost(post);
                 this.isDisabledInput = false
            } else {
                alert('Поля не должны оставаться пустыми')
            }
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

