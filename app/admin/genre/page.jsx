import { lazy } from "react";
const AddGenre = lazy(() => import("./components/addGenre"));

export default function Page() {
    return (
        <>
            <AddGenre />
        </>
    )
};