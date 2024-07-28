"use client"
import { lazy } from "react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import API from "../../../../src/api";
import Loading from "../../../components/loading";
import Link from "next/link";
const Info = lazy(() => import("./info"));
const Tracks = lazy(() => import("../../../track/components/tracks"));
 
export default function GetAlbum (){

    const [album,setAlbum] = useState({});
    const [showLoading,setShowLoading] = useState(true);
    const params = useParams();
    const getData = async () => {
        await API.get("album/" + params.slug).then((response ) => {
            setAlbum(response.data);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        }).finally(() => setTimeout(() => setShowLoading(false) , 400));
    };

    useMemo(() => getData(),[]);

    return (
        <>
        {
            showLoading && <Loading />
        }
        {
            !showLoading && <div>
                <div className="text-white my-9 px-6 text-lg flex items-center gap-2 select-none">
                    <Link href={"/"} className="hover:text-zinc-500 text-zinc-200">سانگ سرا (جهان موسیقی بی کلام)</Link> / 
                    <Link href={"/"} className="text-zinc-400 hover:text-zinc-500">{album.artist.name}</Link> / 
                    <p>آلبوم بی کلام</p>
                    <p>{album.name}</p>
                </div>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4"></div>
                    <div className="col-span-8 p-4">
                        <Info album={album} />
                        <Tracks tracks={album.tracks} />
                    </div>
                </div>
            </div>
        }
        </>
    )
};