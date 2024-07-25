"use client"
import { lazy, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../../../src/api";
import { useParams } from "next/navigation";
import { changeAlbum } from "../../../../../src/reducers/album";
const AddTrack = lazy(() => import("./addTrack"));
const Album = lazy(() => import("./album"));
const Tracks = lazy(() => import("../../../../track/components/tracks"));


export default function () {
    const [album, setAlbum] = useState({});
    const toggle = useSelector((state) => state.album.toggle);
    const params = useParams();
    const getData = async (signal) => {
        await API.get(`/album/${params.slug}/`,{signal : signal}).then((response) => {
            setAlbum(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());
    };
    // useMemo(() => getData(), [toggle]);
    useEffect(() => {
        const cancelAPI = new AbortController();
        // getData(cancelAPI.signal);
        (async () => {
            await API.get(`/album/${params.slug}/`,{signal : cancelAPI.abort()}).then((response) => {
                setAlbum(response.data);
            }).catch((error) => error.response && error.response.status === 401 && getData());
        })()
        return () => {cancelAPI.abort()};
    },[]);
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