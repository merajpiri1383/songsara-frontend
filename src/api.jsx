import axios from "axios";
import Cookies from "js-cookie";
import Store from "./store";
import { redirectLoginToggle ,changeUser } from "./reducers/user";

const API = axios.create({
    baseURL : "http://127.0.0.1:8000"
});export default API;

API.interceptors.request.use((config) => {
    if (Cookies.get("access_token")) {
        config.headers.Authorization = `Bearer ${Cookies.get("access_token")}`;
    };
    return config;
});

export async function setUser () {
    await API.get('/user/').then((response) => { 
        Store.dispatch(changeUser({
            is_login : true , 
            email : response.data.email , 
            username : response.data.username , 
            is_active : response.data.is_active ,
            is_staff : response.data.is_staff ,
        }))
    }).catch((error) => {console.log(error)});
}

export async function handle401Error() {
    if (Cookies.get("refresh_token")){
        await API.post('/account/refresh/',{refresh : Cookies.get("refresh_token")}).then((response) => {
            Cookies.set("access_token",response.data["access"],{sameSite: true});
            API.defaults.headers.common.Authorization = `Bearer ${response.data["access"]}`;
            Store.dispatch(redirectLoginToggle(false));
            setUser();
        }).catch((error) => {
            Cookies.remove("refresh_token");
            Store.dispatch(redirectLoginToggle(true));
        } )
    }else {
        Store.dispatch(redirectLoginToggle(true));
    }
}

API.interceptors.response.use((response) => {
    return response;
},(error) => {
    error.response && error.response.status === 401 && handle401Error();
    return Promise.reject(error);
});

export function setToken(access,refresh=null) {
    API.defaults.headers.common.Authorization = `Bearer ${access}`;
    Cookies.set("access_token",access);
    refresh && Cookies.set("refresh_token",refresh);
};