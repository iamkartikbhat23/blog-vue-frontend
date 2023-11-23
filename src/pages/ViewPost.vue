<template>
    <AppLayout>
        <div v-if="postsStore.loading" class="w-full h-72 flex items-center justify-center">
                Loading Blogs
        </div>
        <div v-if="!postsStore.loading" class="w-full md:w-[80rem] flex flex-col justify-start h-auto my-20 gap-4">
            <div class=" sticky top-0 start-0 flex justify-between">
                <div class="text-gray-700 text-xl md:text-3xl capitalize text-left">{{ postsStore.post?.title }}</div>
                <div v-if="postsStore.isCurrentBlogsAuthor">
                    <PostActionButtons :post_id="postsStore.post?.id" :type="'page'"/>
                </div>
                <div v-else>
                    <button 
                        @click="postsStore.likeStatus(postsStore.post?.user_like_status,postsStore.post?.id)"
                        class="cursor-pointer text-base flex justify-center items-center gap-1 w-full text-white px-2 py-1 rounded-md focus:outline-none border border-blue-600"
                        :class="postsStore.post?.user_like_status==1 ? 'bg-blue-600' : 'bg-purple-100'">
                        <div v-if="postsStore.post?.user_like_status==1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" class="w-4 h-4">
                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                            </svg>
                        </div>
                        <div v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2563eb" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>
                        </div>
                        <div :class="postsStore.post?.user_like_status==1 ? 'text-white' : 'text-blue-600'">
                            {{ postsStore.post?.user_like_status == 1 ? 'Liked' : 'Like' }}
                        </div>
                    </button>
                </div>
            </div>
            <div class="flex justify-between text-gray-500 text-base md:text-lg px-3">
                <div class="flex gap-2 items-center">
                    by <div class="italic">
                        <RouterLink :to="{ name: 'authorPosts', params : {author_id:postsStore.post?.author_id} }">
                            {{ postsStore.post?.author }}
                        </RouterLink>
                    </div>
                    <div class="flex gap-2 text-sm">on <div class="italic">{{ postsStore.post?.created_on }}</div></div>
                </div>
                <div class="font-bold text-gray-800 text-xl">{{ postsStore.post?.likes }} Likes</div>
            </div>
            <img class="w-full h-full rounded-md" loading="lazy" alt="No Image" :src="postsStore.post?.image" />
            <div class="first-letter:-mt-1 first-letter:ml-4 first-letter:text-3xl md:first-letter:text-6xl first-letter:font-bold first-letter:text-slate-900 first-letter:float-left md:px-2 text-gray-700 text-lg md:text-xl text-left">{{ postsStore.post?.body }}</div>
            <hr class="my-10">
            <div class="flex justify-center font-bold text-2xl px-2">Other recent blogs from {{ postsStore.post?.author }}</div>
            <div v-if="!postsStore.loading" class="grid grid-col-1 grid-row-1 md:grid-cols-3 gap-5 text-left my-10">
                <Posts :posts="postsStore.posts"/>
            </div>
        </div>
    </AppLayout>
</template>
<script setup>
    import AppLayout from '../layouts/AppLayout.vue' ;
    import Posts from '../components/Posts.vue';
    import PostActionButtons from '../components/PostActionButtons.vue';
    import { watchEffect } from "vue" ;
    import { useRoute } from 'vue-router'
    import { usePostsStore } from '../stores/posts' ;

    const postsStore = usePostsStore() ;
   
    const route = useRoute()
    const props = defineProps({
        slug: {
            type: String,
        },
    }) ;
    watchEffect(async () => {
        postsStore.getPostDetail(route.params.slug)
    })
</script>