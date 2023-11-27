<template>
    <AppLayout>
        <div class="min-w-[20rem] md:w-[80rem] flex flex-col items-center justify-center my-16" >
            <div class="w-full h-full flex flex-col gap-5 items-start mb-10">
                <div class="text-3xl font-semibold text-gray-700 dark:text-gray-100"> Edit'Post</div>
                <hr>
                <div class="flex flex-col items-start w-full">
                    <Label labelText="Blog Title" class="font-semibold text-xl"/>
                    <input @keyup="validateEntries" v-model="postStore.post.title" type="text" placeholder="Enter Blog title" 
                            class="w-full border focus:outline-purple-400 shadow-lg dark:shadow-md focus:shadow-xl shadow-purple-200 rounded-md px-4 py-2 placeholder:italic dark:text-gray-100 dark:bg-slate-600" 
                            :class="blog.titleError ? 'border-red-500 placeholder:text-red-400' : 'border-purple-900 placeholder:text-purple-400' " />
                    <div class="text-sm text-red-600" :class="blog.titleError!=null ? 'block' : 'hidden'">{{ blog.titleError }}</div>
                </div>
                <div class="flex flex-col items-start w-full">
                    <Label labelText="Blog Description" class="font-semibold text-xl"/>
                    <textarea @keyup="validateEntries" v-model="postStore.post.body" rows="15" type="text" placeholder="Enter blog description here" 
                        class="w-full resize-none border  focus:outline-purple-400 shadow-lg dark:shadow-md focus:shadow-xl shadow-purple-200 rounded-md px-2 py-2 placeholder:italic dark:text-gray-100 dark:bg-slate-600"
                        :class="blog.bodyError ? 'border-red-500 placeholder:text-red-400' : 'border-purple-900 placeholder:text-purple-400' "
                    ></textarea>
                    <div class="text-sm text-red-600" :class="blog.bodyError!=null ? 'block' : 'hidden'">{{ blog.bodyError }}</div>
                </div>
                <div class="flex w-full justify-end">
                    <button 
                        @click="validateBlogContent"
                        class="ml-4 px-8 text-white bg-blue-600 cursor-pointer text-sm flex justify-center items-center gap-1 p-2 rounded-md focus:outline-none border border-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                        </svg>
                        <div>
                            Update
                        </div>
                    </button>
                </div>
                <div></div>
            </div>
        </div>
    </AppLayout>
</template>
<script setup>
import { onMounted } from 'vue'
import Swal from 'sweetalert2';
import Label from "../components/Label.vue";
import AppLayout from '../layouts/AppLayout.vue' ;
import { userAuthStore } from "../stores/auth" ;
import { usePostsStore } from '../stores/posts' ;;
import { useRouter } from 'vue-router' ; 
const router = useRouter() ;
const props = defineProps({
    post_id: {
        type: String,
    }
})  ;
const userStore = userAuthStore() ;
const postStore = usePostsStore() ;

postStore.getPostDetail(props.post_id)

let blog = {
    titleError:null,
    bodyError:null,
};
onMounted(async () => {
    postStore.getPostDetail(props.post_id) 
}) ;


const validateEntries = () => {
    if(postStore.post.title == "") {
        blog.titleError = "Title is needed for Blog"
    }  else {
        if(postStore.post.title.length < 10) {
            blog.titleError = "Title should contain at least 10 characters"
        } else {
            blog.titleError = null ;
        }
    }
    if(postStore.post.body == "") {
        blog.bodyError = "Description is needed for Blog"
    }  else {
        if(postStore.post.body.length < 100) {
            blog.bodyError = "Description should contain at least 50 characters"
        } else {
            blog.bodyError = null ;
        }
    }

    if(blog.titleError==null && blog.bodyError==null) {
        return true
    } 
    return false ;
} ;

const validateBlogContent = ()  => {
    const validationStatus = validateEntries();

    if(validationStatus) {
        const blogData = {
            title: postStore.post.title,
            body: postStore.post.body,
        } ;
        Swal.fire({
            title: "Update this blog",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const status = await postStore.updatePost() ;
                if (status) {
                    router.push({ name: 'authorPosts', params: {  author_id:userStore.user.id,is_author_user: true }}) ;
                }
            }
        });
       
    }
} ;
</script>