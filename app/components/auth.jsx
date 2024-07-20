"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUser } from "../../src/api";

export default function Auth({ children }) {
    const RedirectLogin = useSelector((state) => state.user.redirect_login );
    const user = useSelector((state) => state.user );
    const router = useRouter();

    useEffect(() => {
        !user.is_login && Cookies.get("access_token") && user. RedirectLogin && router.push("/login");
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