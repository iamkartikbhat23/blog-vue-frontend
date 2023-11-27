<template>
    <div v-for="post in posts" :key="post.id" class="border border-gray-300 dark:border-purple-400 shadow-md shadow-purple-100 dark:shadow-purple-500 rounded-md p-5 space-y-2 hover:shadow-lg hover:shadow-purple-200 cursor-pointer bg-white dark:bg-gray-600"  >
        <div class="flex flex-col justify-between" :to="{ name: 'post', params: { slug: post.slug }}">
            <RouterLink class="space-y-2 h-[25rem] flex flex-col justify-between"  :to="{ name: 'post', params: { slug: post.slug }}">
                <div class="text-xl text-gray-800 dark:text-gray-100 font-semibold line-clamp-1 capitalize h-[8%]">{{ post.title }}</div>
                <img loading="lazy" class="w-full h-auto object-contain rounded-md " :src="post.image" />
                <div class="text-lg text-gray-700 dark:text-gray-200 line-clamp-4 font-normal h-[29%] md:h-[31%]">{{ post.body }}</div>
                <div class="flex justify-end gap-1 text-sm text-gray-400 h-[10%]">on <div class="italic line-clamp-1 max-w-sm ">{{ post.created_on }}</div></div> 
                <hr>
            </RouterLink>
            <div class="flex justify-between items-end text-gray-600 dark:text-gray-100 pt-4">
                <div v-if="userStore.user.id != null && userStore.user.id == post.author_id" class="flex gap-1">
                    <PostActionButtons :post_id="post.id" />
                </div> 
                <div v-else class="flex gap-1">by <div class="italic line-clamp-1 max-w-sm">{{ post.author }}</div></div> 
                <div class="flex gap-1 text-gray-700 dark:text-gray-100 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#60a5fa" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3b82f6" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                    {{ post.likes }}
                </div>
            </div>
        </div>  
    </div>
</template>
<script setup>
import PostActionButtons from '../components/PostActionButtons.vue';
import { userAuthStore } from "../stores/auth"
import { usePostsStore } from '../stores/posts' ;
import Swal from 'sweetalert2'
const userStore = userAuthStore() ;
const postsStore = usePostsStore() ;
const props = defineProps({
    posts: {
        type: Array,
    },
    type: {
        type: String,
        default: ''
    }
}) ;


</script>