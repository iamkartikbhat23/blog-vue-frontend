import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { userAuthStore } from '../stores/auth'


const notyf = new Notyf({
    duration: 3000,
    dismissible: true
});
export const usePostsStore = defineStore("posts", {
       state: () => ({
            posts: [],
            post: null,
            loading: false,
        }),
        getters : {
           authorPostsCount() {
            return this.posts.length;
           },
           isCurrentBlogsAuthor() {
            const authStore = userAuthStore() ;
            if(this.authorPostsCount!=0) {
                return this.posts[0].author_id == authStore.user?.id ;
            } else {
                return false ;
            }
           },
           postDetails() {
            if(this.post!=null) {
                return this.post ;
            }
           }
        },
        actions : {
            async getPosts(authorId = null) {
                this.loading = true;
                const userId = authorId!=null  ? `/${authorId}` : '' ;
                const response = await axios.get(`/posts/0${userId}`) ;
                if(response.status == 200) {
                    console.log("posts");
                    this.posts = response.data.data ;
                } else {
                    notyf.success("Something went wrong");
                }
                this.loading = false;
            },           
            async getMorePosts(offset,authorId = null) {
                console.log("offset");
                console.log(offset);
                const userId = authorId!=null ? `/${authorId}` : '' ;
                const response = await axios.get(`/posts/${offset}${userId}`) ;
                if(response.status == 200) {
                    console.log("posts");
                    this.posts.push(...response.data.data) ;
                } else {
                    notyf.success("Something went wrong");
                }
            },           
            async getPostDetail(slug) {
                console.log("slug")
                console.log(slug)
                this.loading = true;
                const authStore = userAuthStore() ;
                const userId = authStore.user.id != null ? authStore.user.id : '' ;
                const response = await axios.get(`/view-post/${slug}/true/${userId}`) ;
                if(response.status == 200) {
                    console.log(response.data)
                    this.post = response.data.data.post ;
                    this.posts = response.data.data.author_posts ;
                    let imageUrl = this.post?.image;
                    imageUrl = imageUrl.replace('400', '1200')
                    imageUrl = imageUrl.replace('210', '630')
                    this.post.image = imageUrl
                    this.loading = false;
                } else {
                    notyf.success("Something went wrong");
                }
                this.loading = false;
            },   
            
            async deletePost(id) {
                const response = await axios.delete(`delete-post/${id}`) ;
                if(response.status == 200) {
                    this.posts =  this.posts.filter(post => { return post.id !== id; });
                    notyf.success(response.data.message);
                } else {
                    notyf.success("Something went wrong");
                }
            },
            
            async likeStatus(likeStatus,id) {
                const authStore = userAuthStore() ;
                if(authStore.user.name==null) {
                    notyf.error("Please Login to Like the post");
                } else {
                    const likeInfo = {
                        post_id : id,
                        user_id : authStore?.user?.id,
                        status: likeStatus == 1 ? false : true
                    }
                    const response = await axios.post('/post-like-status',likeInfo) ;
                    if(response.status == 200) {
                        notyf.success(response.data.message);
                        this.post.user_like_status = this.post.user_like_status==1 ? 0 : 1 ;
                    } else {
                        notyf.success("Something went wrong");
                    }
                }
                
            },

            async savePost(blog) {
                const authStore = userAuthStore() ;
               
                blog.author_id = authStore.user.id ;
                const response = await axios.post('/save-post',blog) ;
                if(response.status == 200) {
                    notyf.success(response.data.message);
                    // router.go(-1)
                    return true ;
                } else {
                    notyf.success("Something went wrong");
                    return false ;
                }
            }
        }
} );