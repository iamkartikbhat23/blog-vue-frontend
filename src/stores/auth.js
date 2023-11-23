import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useRouter } from 'vue-router' ;
import setAuthHeader from "../utils/setAuthHeader";


export const userAuthStore  = defineStore("auth", () => {
    const router = useRouter() ;

    const returnUrl = ref(null);

    var notyf = new Notyf({
        duration: 3000,
        dismissible: true
    });

    const user = ref(
        {
            name: null,
            email: null,
            token: null,
            id: null,
        }
    ) ;

    const setAuthUserDetails = (details) => {
        user.value.name = details.name
        user.value.email = details.email
        user.value.token = details.token
        user.value.id = details.id
    }

    const resetAuthUser = () => {
        user.value.name =  null
        user.value.email = null
        user.value.token =  null
        user.value.id =  null
    }

    const setReturnUrl = (url) => {
        returnUrl.value = url ;
    }

    const registerUser = (userInfo) => {
        axios.post('register',userInfo)
            .then(response => { 
                const apiResponse = response.data ;
                
                if(response.status == 200) {
                    if(apiResponse.success) {
                        notyf.success(apiResponse.message);
                        router.push({ name: 'registerSuccess'})
                    } else {
                        if(apiResponse.data.email!=null) {
                            notyf.error(apiResponse.data.email.at(0));
                        }
                        if(apiResponse.data.name!=null) {
                            notyf.error(apiResponse.data.name.at(0));
                        }
                        if(apiResponse.data.password!=null) {
                            notyf.error(apiResponse.data.password.at(0));
                        }
                    }
                }
            })
            .catch(error => { 
                notyf.error("Something went wrong");
            })
    }

    const loginUser = (user) => {

        axios.post('login',user)
              .then(response => { 
                const apiResponse = response.data ;
                console.log(apiResponse) ;
                if(response.status == 200) {
                  if(apiResponse.success) {
                    notyf.success(apiResponse.message);
                    const userInfo = {
                        name:apiResponse.data.user.name,
                        id:apiResponse.data.user.id,
                        email:apiResponse.data.user.email,
                        token:apiResponse.data.token
                    } ;
                    setAuthUserDetails(userInfo) ;
                    setAuthHeader(apiResponse.data.token)
                    // localStorage.setItem('authUser',JSON.stringify(userInfo));
                    setTimeout(() => {
                        notyf.success('Hi '+apiResponse.data.user.name);
                    },3500);
                    if(returnUrl.value!=null) {
                        router.push(returnUrl.value)
                    } else {
                        router.push('/')
                    }
                  } else {
                    if(apiResponse.data.error=='Unauthorised') {
                      notyf.error("Unauthorized User Credentials");
                    } else {
                      notyf.error({
                        message: apiResponse.data.error,
                        duration: 5000
                      });
                    }
                  }
                }
               })
              .catch(error => { 
                console.error(error);
                 notyf.error("Something went wrong");
               })
    }

    return { user, setAuthUserDetails, resetAuthUser, registerUser, loginUser, returnUrl, setReturnUrl } ;
},{ persist: true }) 
