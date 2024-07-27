import { lazy } from "react";
const CreateMusic = lazy(() => import("./components/createMusic"));
const ListMusics = lazy(() => import("./components/listMusics"));

export default function Music() {
    return (
        <>
            <CreateMusic />
            <ListMusics />
        </>
    )
};