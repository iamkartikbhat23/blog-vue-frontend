
import { createApp } from 'vue' ;
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router';
import './style.css' ;
import App from './App.vue' ;
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8001/api/';
axios.defaults.headers = {
  'Content-Type': 'application/json',
}
// axios.defaults.baseURL = 'https://blogs.kartikbhat.tech/api/';

import { userAuthStore } from './stores/auth'
import setAuthHeader from "./utils/setAuthHeader";


const pinia = createPinia() ;
pinia.use(piniaPluginPersistedstate) ;
var notyf = new Notyf({
    duration: 3000,
    dismissible: true
  });
createApp(App).use(router).use(pinia).mount('#app')

const authStore = userAuthStore() ;
if(authStore.user.token!=null) {
  setAuthHeader(authStore.user.token) ;
} else {
  setAuthHeader(null) ;
}