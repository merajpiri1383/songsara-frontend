import { lazy } from "react";
const Mood = lazy(() => import("./components/mood"));
const Albums = lazy(() => import("./components/albums"));
const Musics = lazy(() => import("./components/musics"));

export default function Page() {
  return (
    <>
      <Mood />
      <Albums />
      <Musics />
    </>
  )
};