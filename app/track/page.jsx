import { lazy } from "react";
const List = lazy(() => import("../components/list"));

export default function Page() {
    return (
        <>
            <h1 className="my-4 text-right px-6 text-3xl font-semibold text-white">تک موسیقی بی کلام</h1>
            <List defaultFilter={"track"} />
        </>
    )
};