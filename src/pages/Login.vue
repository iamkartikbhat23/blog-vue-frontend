<template>
    <GuestLayout>
      <template v-slot:title>Login</template>
      <template v-slot:content>
        <form  class="flex flex-col space-y-2" @submit.prevent novalidate>
          <EmailInput v-model="user.email" />
          <PasswordInput v-model="user.password"/>
          <Button class="pt-4" @click="loginButtonPressed" >
                  Login
          </Button>
          <div class="text-center py-1">
                <RouterLink class="text-sm" :to="{ name: 'register' }">
                    Register  
                </RouterLink>   
          </div>
        </form>
      </template>
    </GuestLayout>
  </template>
  <script setup>
  import { ref,reactive } from 'vue'
  import GuestLayout from '../layouts/GuestLayout.vue';
  import Button from '../components/Button.vue';
  import EmailInput from '../components/EmailInput.vue';
  import PasswordInput from '../components/PasswordInput.vue';
  import { userAuthStore } from '../stores/auth'
  const authStore = userAuthStore() ;
  let user = reactive({
        email: "",
        password: "",
  });
  const notyf = new Notyf({
                        duration: 3000,
                        dismissible: true
                      });
  const loginButtonPressed = () => {
    if(user.email == "") {
        notyf.error("Email Address cannot be empty");
        return false ;
    }
    if(user.password == "") {
        notyf.error("Password cannot be empty");
        return false ;
    }
    authStore.loginUser(user) ;
  };
  </script>