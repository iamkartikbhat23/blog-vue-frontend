import { createRouter, createWebHistory } from 'vue-router' ;
import RegisterSuccess from '../pages/RegisterSuccess.vue' ;
import Register from '../pages/Register.vue' ;
import Dashboard from '../pages/Dashboard.vue' ;
import ViewPost from '../pages/ViewPost.vue' ;
import AuthorPosts from '../pages/AuthorPosts.vue' ;
import CreatePost from '../pages/CreatePost.vue' ;
import EditPost from '../pages/EditPost.vue' ;
import Login from '../pages/Login.vue' ;
import NotFoundComponent from '../pages/NotFound.vue' ;
import { userAuthStore } from '../stores/auth'


const routes =  [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePost,
    props: true
  },
  {
    path: '/edit-post/:post_id?',
    name: 'edit-post',
    component: EditPost,
    props: true
  },
  {
    path: '/author-posts/:author_id?/:is_author_user?',
    name: 'authorPosts',
    props: true,
    component: AuthorPosts
  },
  {
    path: '/my-posts/:author_id?',
    name: 'myPosts',
    props: true,
    redirect: to => {
      return { name: 'authorPosts', params : { author_id: to.params.author_id } }
    },
  },
  {
    path: '/post/:slug',
    name: 'post',
    component: ViewPost
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register-success',
    name: 'registerSuccess',
    component: RegisterSuccess
  },
  {
      path: '/:catchAll(.*)', 
      component: NotFoundComponent,
      name: 'NotFound'
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode:'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
}) ;

export default router ;

router.beforeEach(async (to,from) => {
  if(from.name !== 'login') {
    const authStore = userAuthStore() ;
    authStore.setReturnUrl(from.fullPath);
  }
});