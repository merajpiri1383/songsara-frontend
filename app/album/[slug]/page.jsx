import { lazy } from "react";
const GetAlbum = lazy(() => import("./components/getAlbum"));

export default function Page (){
    return (
        <>
        <GetAlbum />
        </>
    )
};