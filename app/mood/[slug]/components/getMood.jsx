"use client"
import { useParams } from "next/navigation";
import API from "../../../../src/api";
import { useMemo, useState } from "react";
import Loading from "../../../components/loading";
import Link from "next/link";


export default function GetMood() {
    const [data, setData] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const params = useParams();
    const getData = async () => {
        await API.get(`/mood/${params.slug}/all`).then((response) => {
            setData(response.data.results);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        }).finally(() => setTimeout(() => setShowLoading(false), 400));
    };

    useMemo(() => getData(), []);

    console.log(data)

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="px-6">
                    <h1 className="my-4 text-right text-3xl font-semibold text-white">{params.slug}</h1>
                    <div className="grid grid-cols-6 gap-2">
                        {
                            data && data.map((item, index) => {
                                if (item.playlist) {
                                    return (
                                        <Link href={"/playlist/" + item.playlist.slug} key={index}>
                                            <div className="w-full hover:bg-zinc-700">
                                                <img
                                                    src={item.playlist.image}
                                                    className="h-60 w-full object-cover"
                                                />
                                                <h3 className="text-white text-left text-lg font-bold px-1 my-1">{item.playlist.name}</h3>
                                                <h4 className="justify-end gap-3 px-1 my-1 text-zinc-300 flex w-56 overflow-hidden h-6">
                                                    {
                                                        item.playlist.moods.map((mood, index) => {
                                                            return (
                                                                <Link href={"/mood/" + mood.slug}>
                                                                    {mood.name}
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                </h4>
                                                <p className="text-zinc-500 px-1 my-1 text-left">{item.playlist.created_date}</p>
                                            </div>
                                        </Link>
                                    )
                                } else if (item.album) {
                                    return (
                                        <Link href={"/album/" + item.album.slug} key={index}>
                                            <div key={index} className="hover:bg-gray-700 cursor-pointer transition">
                                                <img
                                                    src={item.album.image}
                                                    alt={item.album.name}
                                                    className="h-60 w-full object-cover"
                                                />
                                                <h3 className="text-left text-lg font-semibold text-white px-2 my-1 w-56 h-6">{item.album.name}</h3>
                                                <p className="text-amber-400 text-left w-56 px-2 my-1">{item.album.artist.name}</p>
                                                <p className="text-gray-200 text-left w-56 px-2 my-1">{item.album.genre.name}</p>
                                                <p className="text-gray-400 text-left w-56 px-2 my-1">{item.album.created_date}</p>
                                            </div>
                                        </Link>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
};