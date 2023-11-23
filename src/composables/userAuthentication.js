import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8001/api/',
    withCredentials: false,
    headers : {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

export default {
    registerUser(body) {
        return apiClient.post('register',body) ;
    },
    loginUser(body) {
        return apiClient.post('login',body) ;
    }
}