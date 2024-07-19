"use client"
import { useRef } from "react";
import { Provider } from "react-redux";
import Store from "../src/store";

export default function StoreProvider ({children}) {
    const storeRef = useRef();
    if (!storeRef.current) {
        storeRef.current = Store ;
    }
    return (
        <Provider store={storeRef.current}>{children}</Provider>
    )
};