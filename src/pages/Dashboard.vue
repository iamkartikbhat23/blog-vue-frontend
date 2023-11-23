<template>
    <AppLayout>
        <div class="max-w-7xl flex justify-center h-auto my-16" >
            <div ref="scrollComponent" v-if="!postsStore.loading" class="grid grid-col-1 grid-row-1 md:grid-cols-3 gap-5 text-left my-5 min-h-min">
                <Posts :posts="postsStore.posts"/>
            </div>
            <div v-if="postsStore.loading" class="w-full h-72 flex items-center justify-center">
                Loading Blogs
            </div>
        </div>
    </AppLayout>
</template>
<script setup>
    import AppLayout from '../layouts/AppLayout.vue' ;
    import { onMounted,onUnmounted,ref  } from "vue" ;
    import { usePostsStore } from '../stores/posts' ;
    import Posts from '../components/Posts.vue';

    const scrollComponent = ref(null) ;

    const scrollCount = ref(0) ;

    const postsStore= usePostsStore() ;
    onMounted(async () => {
        postsStore.getPosts() ;
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
        postsStore.getMorePosts(offset.value) ;
    };
</script>