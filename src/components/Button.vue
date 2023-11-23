<template>
    <div class="flex items-center space-x-4">
            <button 
                :disabled="isButtonDisabled"
                class=" flex justify-center items-center w-full text-white px-4 py-2 rounded-md focus:outline-none"
                :class="isButtonDisabled ? 'disabled:bg-purple-300 disabled:cursor-not-allowed' : 'bg-purple-500 cursor-pointer'">
                <slot></slot>
            </button>
        </div>
</template>
<script setup>
const props = defineProps({
    isButtonDisabled: {
        type: Boolean,
        default: false
    },
}) ;
</script>