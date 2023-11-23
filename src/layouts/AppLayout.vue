<script setup>
import { onMounted,ref } from "vue" ;
import { userAuthStore } from "../stores/auth"
import Button from '../components/Button.vue';
import axios from "axios";
import { useRouter } from 'vue-router' ;
import setAuthHeader from "../utils/setAuthHeader";
const userStore = userAuthStore() ;
const router = useRouter() ;
const userInfo = ref('') ;

onMounted(async () => {
    console.log("user Store")
    console.log(userStore.user.name)
    if(userStore.user.name!=null) {
        userInfo.value = userStore.user ;
    }
    console.log("user id")
    console.log(userInfo.value.id)
}) ;
const logOut = () => {
    delete axios.defaults.headers.Authorization;
    userStore.resetAuthUser()
    setAuthHeader(false)
    router.push({ name: 'login'}) ;
};
</script>
<template>
   <div class="h-screen w-full p-2 md:p-4">
        <nav class="bg-purple-50 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="min-w-7xl max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="text-4xl">
                    <RouterLink class="text-purple-600 hover:text-purple-600" to="/">
                        BLOGS    
                    </RouterLink>    
                </div>
                <div>
                    <div class="flex gap-5" v-if="userInfo!==''">
                        <RouterLink class="focus:outline-none" :to="{ name: 'authorPosts', params : { author_id:userInfo.id,is_author_user: true } }">
                            Your Posts  
                        </RouterLink>  
                        <div @click="logOut()" class="text-red-500 font-semibold cursor-pointer">
                            Logout
                        </div>
                    </div>
                    <div v-else class="flex gap-2 items-center">
                        <Button class="rounded-2xl ">
                            <RouterLink class="text-white hover:text-white" :to="{ name: 'login' }">
                                Login  
                            </RouterLink>  
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
        <slot></slot>
        <template v-if="userInfo!==''">
            <footer class="fixed bottom-0 left-0 w-full bg-gray-200 text-end p-1 text-sm  text-purple-700">
                logged in as {{ userInfo.name }}
            </footer>
        </template>
   </div>
</template>
