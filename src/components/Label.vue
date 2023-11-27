<template>
    <label class="leading-loose text-sm dark:text-gray-300">{{ labelText }}</label>
</template>
<script setup>
    const props = defineProps({
        labelText: {
            type: String,
            default: ''
        },
    }) ;
</script>