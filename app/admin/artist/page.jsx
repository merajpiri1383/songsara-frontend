import { lazy } from "react";
const AddArtist = lazy(() => import("./components/addArtist"));
const Artists = lazy(() => import("./components/artists"));

export default function Page () {
    return (
        <>
        <AddArtist /> 
        <Artists />
        </>
    )
} ;