import {lazy} from "react";
const CreatePlaylist = lazy(() => import("./components/createPlaylist"));

export default function Page () {
    return (
        <>
        <CreatePlaylist />
        </>
    )
};