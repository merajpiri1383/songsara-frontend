import { lazy } from "react";
const Get = lazy(() => import("./get"));

export default function Page () {
    return (
        <>
        <Get />
        </>
    )
} ;