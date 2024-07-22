import { lazy } from "react";
const Albums = lazy(() => import("./components/album"));
const AddTrack = lazy(() => import("./components/addTrack"));
const Tracks = lazy(() => import("./components/tracks"));

export default function Page () {
    return (
        <>
        <Albums />
        <AddTrack />
        <Tracks />
        </>
    )
};