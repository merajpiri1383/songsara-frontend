import { lazy } from "react";
const Nabvbar = lazy(() => import("./components/navbar"));

export default function Page () {
  return (
    <>
    <Nabvbar />
    </>
  )
};