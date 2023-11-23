<template >
  <GuestLayout>
    <template v-slot:title>Register</template>
    <template v-slot:content>
      <form class="flex flex-col space-y-2" @submit.prevent novalidate>
        <NameInput v-model="user.name" />
        <EmailInput v-model="user.email" />
        <PasswordInput v-model="user.password"/>
        <PasswordInput v-model="user.confirmPassword" type="confirm" :password="user.password"/>
        <Button class="pt-4" :isButtonDisabled="isSubmitButtonDisabled" 
                @click="registerButtonPressed" >
                  Register
        </Button>
        <div class="text-center py-1">
            <RouterLink class="text-sm" :to="{ name: 'login' }">
                Login  
            </RouterLink>   
        </div>
      </form>
    </template>
  </GuestLayout>
</template>
<script setup>
import { reactive } from 'vue'
import GuestLayout from '../layouts/GuestLayout.vue';
import Button from '../components/Button.vue';
import NameInput from '../components/NameInput.vue';
import EmailInput from '../components/EmailInput.vue';
import PasswordInput from '../components/PasswordInput.vue';
import useFormValidation from "../modules/useFormValidation";
import useSubmitButtonState from "../modules/useSubmitButtonState";

import { userAuthStore } from '../stores/auth'
const authStore = userAuthStore() ;

let user = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
});
const { errors } = useFormValidation();
const { isSubmitButtonDisabled } = useSubmitButtonState(user, errors);

const registerButtonPressed = () => {
  authStore.registerUser(user) ;
};
</script>