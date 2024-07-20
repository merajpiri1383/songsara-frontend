import { lazy } from "react";
const Mood = lazy(() => import("./components/mood"));

export default function Page () {
    return (
        <>
        <Mood />
        </>
    )
};