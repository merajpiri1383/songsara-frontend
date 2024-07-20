import { lazy } from "react";
const AddMood = lazy(() => import("./components/addMood"));
const Moods = lazy(() => import("./components/moods"));

export default function Page () {
    return (
        <>
        <AddMood />
        <Moods />
        </>
    )
}