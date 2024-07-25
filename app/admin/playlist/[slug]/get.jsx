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
    const trackToggle = useSelector((state) => state.track.toggle)
    const [moods,setMoods] = useState([])
    const [genres,setGenres] = useState([]);
    const params = useParams();
    const getData = async (signal) => {
        await API.get(`/playlist/${params.slug}/`,{signal:signal}).then((response) => {
            setPlaylist(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());

        await API.get("/mood/",{signal : signal}).then((response) => {
            setMoods(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());

        await API.get("/genre/",{signal : signal}).then((response) => {
            setGenres(response.data)
        }).catch((error) => error.response && error.response.status === 401 && getData());
    };
    useMemo(() => {
        const cancelAPI = new AbortController();
        getData(cancelAPI.signal);
        console.log("get memmo")
        return () => cancelAPI.abort();
    }, [playlistToggle , trackToggle]);

    return (
        <>
            <UpdatePlaylist playlist={playlist} genres={genres} moods={moods} />
            <CreateTrack playlist={playlist} />
            <Tracks tracks={playlist.tracks} />
        </>
    )
};