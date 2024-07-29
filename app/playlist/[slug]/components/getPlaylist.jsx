"use client"
import { lazy, useMemo, useState } from "react";
import API from "../../../../src/api";
import Loading from "../../../components/loading";
import { useParams } from "next/navigation";
import Link from "next/link";
const Info = lazy(() => import("./info"));
const Tracks = lazy(() => import("../../../track/components/tracks"));


export default function GetPlaylist() {
    const [showLoading, setShowLoading] = useState(false);
    const [playlist, setPlaylist] = useState({});
    const params = useParams();
    const getData = async () => {
        await API.get("/playlist/" + params.slug).then((response) => {
            setPlaylist(response.data);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        }).finally(() => setTimeout(() => setShowLoading(false), 400));
    };
    useMemo(() => getData(), []);
    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <>
                    <div className="text-white my-9 px-6 text-lg flex items-center gap-2 select-none">
                        <Link href={"/"} className="hover:text-zinc-500 text-zinc-200">سانگ سرا (جهان موسیقی بی کلام)</Link> /
                        <p>آلبوم بی کلام</p>
                        <p>{playlist.name}</p>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-4 relative p-4">
                            {/* <RightSide album={album} /> */}
                        </div>
                        <div className="col-span-8 p-4">
                            <Info playlist={playlist} />
                            <Tracks tracks={playlist.tracks} />
                        </div>
                    </div>
                </>
            }
        </>
    )
};