import { lazy } from "react";
const GetPlaylist = lazy(() => import("./components/getPlaylist"));

export default function Page() {
    return (
        <>
            <GetPlaylist />
        </>
    )
};