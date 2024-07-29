import { lazy } from "react";
const GetMood = lazy(() => import("./components/getMood"));

export default function Page() {
    return (
        <>
            <GetMood />
        </>
    )
};