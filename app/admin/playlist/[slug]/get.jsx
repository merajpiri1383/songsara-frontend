"use client"
import { lazy } from "react";
import { useMemo, useState } from "react";
import API from "../../../../src/api";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
const UpdatePlaylist = lazy(() => import("./updatePlaylist"));
const Tracks = lazy(() => import("../../../track/components/tracks"));
const CreateTrack = lazy(() => import("./createTrack"));

export default function Get() {

    const [playlist, setPlaylist] = useState({});
    const playlistToggle = useSelector((state) => state.toggle.playlist);
    const [moods,setMoods] = useState([])
    const [genres,setGenres] = useState([]);
    const params = useParams();
    const getData = async () => {
        await API.get(`/playlist/${params.slug}/`).then((response) => {
            setPlaylist(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());

        await API.get("/mood/").then((response) => {
            setMoods(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());

        await API.get("/genre/").then((response) => {
            setGenres(response.data)
        }).catch((error) => error.response && error.response.status === 401 && getData());
    };
    useMemo(() => {
        getData();
        console.log("get memmo")
    }, [playlistToggle]);

    return (
        <>
            <UpdatePlaylist playlist={playlist} genres={genres} moods={moods} />
            <CreateTrack playlist={playlist} />
            <Tracks tracks={playlist.tracks} />
        </>
    )
};