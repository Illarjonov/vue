<template>
    <form v-on:submit.prevent>
        <h4> Создание поста </h4>
        <my-input
               v-model="post.firstName"
               type="text"
               placeholder="Имя"
        />
        <my-input
               v-model="post.secondName"
               type="text"
               placeholder="Фамилия"
        />
        <my-button
                v-on:click = "createPost"
                style = "align-self: flex-end; margin-top: 15px;"
        >Добавить</my-button>
    </form>
</template>

<script>
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
            createPost(){
                this.post.uuid= Date.now();
                this.$emit('create', this.post);
                //эмит крейт это событие, его мы привяжем в род компоненте
                this.post = {
                    firstName: '',
                    secondName: '',
                    uuid:''
                };
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