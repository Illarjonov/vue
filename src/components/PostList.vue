<template>
<div v-if="posts.length > 0">
    <h4> Cписок пользователей </h4>
    <transition-group name="list">
        <post-item
                v-for="post in posts"
                v-bind:post = "post"
                :key="post.uuid"
                @remove="$emit('remove', post)"
                @edit="$emit('edit', user)"
        />
    </transition-group>
</div>
    <h2 v-else>
        Список пуст
    </h2>
</template>

<script>
import PostItem from './PostItem'
    export default {
    components:{
        PostItem
    },
    props:{
        posts:{
            type: Array,
            required: true //для инициализирования надо иметь их
        }
    }
}
</script>

<style scoped>
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
        transition: all 0.5s;
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateX(130px);
    }
    .list-move{
        transition: transform 0.4s ease;
    }

</style>