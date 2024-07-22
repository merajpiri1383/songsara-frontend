"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "../../src/api"; 
import { changeUser } from "../../src/reducers/user";
import API from "../../src/api";

export default function Auth({ children }) {
    const RedirectLogin = useSelector((state) => state.user.redirect_login );
    const user = useSelector((state) => state.user );
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (RedirectLogin) {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            API.defaults.headers.common.Authorization = null;
            dispatch(changeUser({
                is_login : false ,
                is_staff : false ,
                username : null , 
                email : null ,
                is_active : false ,
            }));
            router.push("/login");
        }
    },[RedirectLogin]);

    useEffect(() => {
        Cookies.get("access_token") && !user.is_login && setUser();
    },[user.is_login]);
    return (
        <>
            {children}
        </>
    )
};