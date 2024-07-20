import { lazy } from "react";
const AddGenre = lazy(() => import("./components/addGenre"));
const Genres = lazy(() => import("./components/genres"));

export default function Page() {
    return (
        <>
            <AddGenre />
            <Genres />
        </>
    )
};