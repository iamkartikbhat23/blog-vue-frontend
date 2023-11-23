<template>
    <label class="leading-loose text-sm">{{ labelText }}</label>
</template>
<script setup>
    const props = defineProps({
        labelText: {
            type: String,
            default: ''
        },
    }) ;
</script>