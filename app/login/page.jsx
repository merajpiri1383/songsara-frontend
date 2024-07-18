import { lazy } from "react";
const Login = lazy(() => import("./components/login"));

export default function Page() {
    return (
        <>
            <Login />
        </>
    )
};