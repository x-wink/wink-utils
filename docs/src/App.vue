<template>
    <ul>
        <li v-for="(item, index) in lib" :key="index">{{ item }}</li>
    </ul>
</template>

<script setup lang="ts">
    import * as utils from '../../src/index';
    const lib = Object.keys(utils);
</script>

<style scoped lang="less"></style>
