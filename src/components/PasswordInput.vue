
<template>
    <div class="flex flex-col items-start">
        <div v-if="type=='password'" class="w-full text-left">
            <LabelText :labelText="'Password'" />
            <input 
                type="password" 
                class="px-4 py-2 border focus:ring-gray-500 focus:border-purple-400 focus:shadow-sm focus:shadow-purple-400 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                :class="errors.password ? 'border-red-500' : ''"
                placeholder="Enter password"
                autocomplete="off"
                v-model="passwordInput"
                @keyup="validatePassword"
                @blur="validatePassword"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <div class="p-2 text-sm text-red-500" v-if="errors.password">
                {{ errors.password }}
            </div>
        </div>
        <div v-if="type=='confirm'" class="w-full text-left">
            <LabelText :labelText="'Confirm Password'" />
            <input 
                type="password" 
                class="px-4 py-2 border focus:ring-gray-500 focus:border-purple-400 focus:shadow-sm focus:shadow-purple-400 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                :class="errors.confirmPassword ? 'border-red-500' : ''"
                placeholder="Enter password"
                autocomplete="off"
                v-model="confirmPasswordInput"
                @keyup="validateConfirmPassword"
                @blur="validateConfirmPassword"
                @input="$emit('update:modelValue', $event.target.value)"
            />
            <div class="p-2 text-sm text-red-500" v-if="errors.confirmPassword">
                {{ errors.confirmPassword }}
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from "vue";
    import LabelText from "./Label.vue";
    import useFormValidation from "../modules/useFormValidation";
    const props = defineProps({
        type: {
            type: String,
            default: 'password'
        },
        password: {
            type: String,
            default: ''
        }
    })
    let passwordInput = ref("");
    let confirmPasswordInput = ref("");
    const { validatePasswordField,validateConfirmPasswordField, errors } = useFormValidation();

    const validatePassword = () => {
        validatePasswordField("password", passwordInput.value);
    };
    const validateConfirmPassword = () => {
        validateConfirmPasswordField("confirmPassword", confirmPasswordInput.value, props.password);
    };
</script>