<template>
    <form v-on:submit.prevent>
        <h4> Создание поста </h4>
        <my-input
               v-model='post.firstName'
               type='text'
               placeholder = 'Имя'
        ></my-input>

        <my-input
               v-model='post.secondName'
               type='text'
               placeholder ='Фамилия'
        ></my-input>

        <my-button
                v-on:click = 'createPost'
                style = "align-self: flex-end; margin-top: 15px;"
        >Добавить</my-button>
    </form>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        data(){
            return{
                post:{
                    firstName: '',
                    secondName: '',
                    uuid:''
                }
            }
        },
        methods: {
            ...mapActions({
                createUser: 'post/createUser',
            }),
            createPost(){
                if (this.post.firstName.length > 0 && this.post.secondName.length > 0)  {
                        this.post.uuid = Date.now();
                        this.createUser(this.post);
                        this.$emit('hidenModal');
                        //эмит крейт это событие, его мы привяжем в род компоненте
                        this.post = {
                            firstName: '',
                            secondName: '',
                            uuid: ''
                        }
                } else {alert('Поля не должны быть пустыми')}
            },
        }
    }
</script>

<style scoped>
    form{
        display: flex;
        flex-direction: column;
    }
</style>