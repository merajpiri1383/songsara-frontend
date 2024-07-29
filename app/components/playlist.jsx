'use client'
import { useMemo, useState } from "react";
import API from "../../src/api";
import Loading from "../components/loading";
import { FaAngleLeft } from "react-icons/fa";
import Link from "next/link";

export default function Playlist() {
    const [showLoading, setShowLoading] = useState(true);
    const [playlist, setPlaylist] = useState([]);
    const getData = async () => {
        await API.get("/playlist/").then((response) => {
            setPlaylist(response.data.results);
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
                    <div className="flex items-center justify-between p-3">
                        <h1 className="text-right text-white text-xl font-semibold">پلی لیست</h1>
                        <Link href={"/playlist/"} className="flex justify-between items-center">
                            <p className="text-gray-500"> نمایش همه</p>
                            <FaAngleLeft size={"1rem"} color="gray" />
                        </Link>
                    </div>
                    <div className="playlists m-4">
                        {
                            playlist && playlist.map((item, index) => {
                                return (
                                    <Link href={"/playlist/" + item.slug}>
                                        <div className="playlist w-56 hover:bg-zinc-700">
                                            <img
                                                src={item.image}
                                                className="h-60 w-full object-cover"
                                            />
                                            <h3 className="text-white text-left text-lg font-bold px-1 my-1">{item.name}</h3>
                                            <h4 className="justify-end gap-3 px-1 my-1 text-zinc-300 flex w-56 overflow-hidden h-6">
                                                {
                                                    item.moods.map((mood,index) => {
                                                        return (
                                                            <Link href={"/mood/" + mood.slug}>
                                                                {mood.name}
                                                            </Link>
                                                        )
                                                    })
                                                }
                                            </h4>
                                            <p className="text-zinc-500 px-1 my-1 text-left">{item.created_date}</p>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
};