import { lazy } from "react";
const Mood = lazy(() => import("./components/mood"));
const Albums = lazy(() => import("./components/albums"));

export default function Page() {
  return (
    <>
      <Mood />
      <Albums />
    </>
  )
};