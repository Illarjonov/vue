<template>
    <button class = "btn"> <slot></slot> </button>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
    .btn{
        padding: 12px 20px;
        background: none;
        color: teal;
        border: 1px solid teal;
        cursor: pointer;
    }
    .btn:hover{
        background: teal;
        color: #fff;
    }
</style>