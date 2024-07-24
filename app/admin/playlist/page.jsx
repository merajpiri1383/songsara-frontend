import { lazy } from "react";
const CreatePlaylist = lazy(() => import("./components/createPlaylist"));
const List = lazy(() => import("./components/list"));

export default function Page() {
    return (
        <>
            <CreatePlaylist />
            <List />
        </>
    )
};