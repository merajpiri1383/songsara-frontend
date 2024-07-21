import { lazy } from "react";
const Albums = lazy(() => import("./components/albums"));
const AddAlbums = lazy(() => import("./components/addAlbum"));

export default function () {
    return (
        <>
        <AddAlbums /> 
        <Albums />
        </>
    )
} ;