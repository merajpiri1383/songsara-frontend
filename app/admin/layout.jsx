import { lazy } from "react"
const Permission = lazy(() => import("./components/permission"));
const RightBar = lazy(() => import("./components/rightBar"));

export default function AdminLayout({ children }) {
    return (
        <Permission>
            <div className="grid grid-cols-6">
                <div className="col-span-2 p-2">
                    <RightBar />
                </div>
                <div className="col-span-4 p-2">
                    {children}
                </div>
            </div>
        </Permission>
    )
};