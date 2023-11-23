<template>
     <div class="flex flex-col items-start">
        <LabelText :labelText="'Full Name'" />
        <input 
            type="text" 
            class="px-4 py-2 border focus:ring-gray-500 focus:border-purple-400 focus:shadow-sm focus:shadow-purple-400 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
            :class="errors.name ? 'border-red-500' : ''"
            placeholder="Enter your full name"
            autocomplete="off"
            v-model="input"
            @keyup="validateName"
            @blur="validateName"
            @input="$emit('update:modelValue', $event.target.value)"
        />
        <div class="p-2 text-sm text-red-500" v-if="errors.name">
        {{ errors.name }}
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";
import LabelText from "./Label.vue";
import useFormValidation from '../modules/useFormValidation';
let input = ref(null);
const { validateNameField, errors } = useFormValidation();
const validateName = () => {
    validateNameField("name", input.value);
};
</script>