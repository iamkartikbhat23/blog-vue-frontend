<script setup>
import { onMounted,ref } from "vue" ;
import { userAuthStore } from "../stores/auth"
import Button from '../components/Button.vue';
import axios from "axios";
import { useRouter } from 'vue-router' ;
import setAuthHeader from "../utils/setAuthHeader";
import { useDark, useToggle } from '@vueuse/core' ;
const userStore = userAuthStore() ;
const router = useRouter() ;
const userInfo = ref('') ;

const isDark = useDark() ;
const toggleDark = useToggle(isDark) ;

onMounted(async () => {
    if(userStore.user.name!=null) {
        userInfo.value = userStore.user ;
    }
}) ;
const logOut = () => {
    delete axios.defaults.headers.Authorization;
    userStore.resetAuthUser()
    setAuthHeader(false)
    router.push({ name: 'login'}) ;
};
</script>
<template>
   <div class="min-h-screen w-full p-2 md:p-4">
        <nav class="bg-purple-50 dark:bg-slate-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div class="min-w-7xl max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="text-4xl">
                    <RouterLink class="text-purple-600 hover:text-purple-600" to="/">
                        BLOGS    
                    </RouterLink>    
                </div>
                <div class="flex items-center gap-2">
                    <svg @click="toggleDark()" v-show="isDark" xmlns="http://www.w3.org/2000/svg" title="light mode" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 cursor-pointer fill-gray-200">
                        <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
                    </svg>
                    <svg @click="toggleDark()" v-show="!isDark" xmlns="http://www.w3.org/2000/svg" title="dark mode" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 cursor-pointer fill-gray-800">
                        <path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd" />
                    </svg>


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
        <main>
            <slot></slot>
        </main>
        <template v-if="userInfo!==''">
            <footer class="fixed bottom-0 left-0 w-full bg-gray-200 text-end p-1 text-sm  text-purple-700">
                logged in as {{ userInfo.name }}
            </footer>
        </template>
   </div>
</template>
