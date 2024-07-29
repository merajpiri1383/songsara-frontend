import { lazy } from "react";
const GetTrack = lazy(() => import("./components/getTrack"));

export default function Page() {
    return (
        <>
            <GetTrack />
        </>
    )
};