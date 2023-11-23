<template>
    <AppLayout :key="router.fullPath">
        <div class="min-w-[20rem] md:w-[80rem] flex flex-col items-center justify-center h-auto my-16" >
            <div class="flex w-full items-center" v-if="!postsStore.loading">
                <div class="flex w-full justify-between items-center text-lg md:text-2xl py-3">
                    <div v-if="props.is_author_user" class="flex justify-center font-bold px-2">Your Blogs</div>
                    <div v-else class="flex justify-center font-bold px-2" v-if="postsStore.authorPostsCount">Blogs From {{ postsStore.posts[0].author }}</div>
                </div>
                <div class="flex w-full justify-end items-center gap-2">
                    <div class="hidden md:block  " v-if="postsStore.authorPostsCount"
                        :class="postsStore.isCurrentBlogsAuthor ? 'px-4 border-r border-gray-600' : ''">
                        Total {{ postsStore.authorPostsCount }} Blogs
                    </div>
                    <RouterLink :to="{name:'create-post'}">
                        <button 
                            v-if="props.is_author_user"
                            class="ml-4 text-white bg-blue-600 cursor-pointer text-sm flex justify-center items-center gap-1 p-2 rounded-md focus:outline-none border border-blue-600">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>
                            </div>
                            <div>
                                Create New
                            </div>
                        </button>
                    </RouterLink>
                </div>
            </div>
            <div class="md:hidden w-full flex justify-end" v-if="postsStore.authorPostsCount">Total {{ postsStore.authorPostsCount }} Blogs</div>
            <div ref="scrollComponent" class="grid grid-col-1 grid-row-1 md:grid-cols-3 gap-5 text-left mt-5 mb-10 min-h-min">
                <Posts v-if="postsStore.authorPostsCount" :posts="postsStore.posts"/>
                <div v-if="!postsStore.authorPostsCount && !postsStore.loading" class="flex justify-center items-center h-44 col-span-3 text-2xl font-bold">No Blogs Found</div>
            </div>
            <div v-if="postsStore.loading" class="w-full h-full flex items-center justify-center">
                Loading Blogs
            </div>
        </div>
    </AppLayout>
</template>
<script setup>
    import AppLayout from '../layouts/AppLayout.vue' ;
    import { onMounted,onUnmounted,ref,watchEffect  } from "vue" ;
    import { usePostsStore } from '../stores/posts' ;
    import { userAuthStore } from "../stores/auth"
    import Posts from '../components/Posts.vue';
    import { useRouter } from 'vue-router' ; 
    const router = useRouter() ;
    const props = defineProps({
        author_id: {
            type: String,
        },
        is_author_user: {
            type: Boolean,
            default:false
        }
    })   
    console.log('author_id received')
    console.log(props.author_id)
    const userStore = userAuthStore() ;
    const scrollComponent = ref(null) ;

    const scrollCount = ref(0) ;

    const postsStore= usePostsStore() ;
    onMounted(async () => {
        window.addEventListener("scroll",handleScroll) ;
    }) ;

    onUnmounted(async () => {
        window.removeEventListener("scroll",handleScroll) ;
    }) ;

    const handleScroll = (e) => {
        let scrollElement = scrollComponent.value ;
        if(scrollElement.getBoundingClientRect().bottom < window.innerHeight) {
            scrollCount.value++ ;
            loadMorePosts(scrollCount) ;
        }
    }

    const loadMorePosts = (offset) => {
        postsStore.getMorePosts(offset.value,props.author_id) ;
    };

    watchEffect(async () => {
        postsStore.getPosts(props.author_id) ;
    });

</script>