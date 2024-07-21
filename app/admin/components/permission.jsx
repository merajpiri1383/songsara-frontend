"use client"
import { useSelector } from "react-redux";
import {useRouter} from "next/navigation";

export default function Permission ({children}){
    const user = useSelector((state) => state.user);
    const router = useRouter();
    if (user.is_active && user.is_staff) {
        return (
            <>
            {children}
            </>
        )
    }else{
        router.push("/")
    }
};