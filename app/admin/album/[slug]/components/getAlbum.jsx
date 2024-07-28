"use client"
import { lazy, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../../../src/api";
import { useParams } from "next/navigation";
const AddTrack = lazy(() => import("./addTrack"));
const Album = lazy(() => import("./album"));
const Tracks = lazy(() => import("../../../../track/components/tracks"));


export default function () {
    const [album, setAlbum] = useState({});
    const toggle = useSelector((state) => state.album.toggle);
    const trackToggle = useSelector((state) => state.track.toggle)
    const params = useParams();

    const getData = async () => {
        await API.get(`/album/${params.slug}/`).then((response) => {
            setAlbum(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());
    };
    
    useMemo(() => getData(), [toggle,trackToggle]);

    return (
        <>
            {
                album && <Album album={album} />
            }
            {
                album && <AddTrack album={album} />
            }
            {
                album && <Tracks tracks={album.tracks} />
            }
        </>
    )
};