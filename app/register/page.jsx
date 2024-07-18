import { lazy } from "react"
const Register = lazy(() => import("./components/register"));

export default function Page (){
    return (
        <>
        <Register />
        </>
    )
};