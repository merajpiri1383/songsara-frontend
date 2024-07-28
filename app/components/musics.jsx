"use client"
import Loading from "./loading";
import API from "../../src/api";
import { useMemo, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import Link from "next/link";

export default function Musics() {
    const [showLoading, setShowLoading] = useState(true);
    const [musics, setMusics] = useState([]);
    const getData = async () => {
        await API.get("/track/").then((response) => {
            setMusics(response.data.results.filter((item, index) => {
                return index < 14;
            }));
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        }).finally(() => setTimeout(() => setShowLoading(false), 400));
    };
    useMemo(() => getData(),[])

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div>
                    <div className="flex items-center justify-between px-4 my-2">
                        <h1 className="text-white p-2 text-xl font-semibold">تک موسیقی</h1>
                        <Link href={"/track/"} className="flex justify-between items-center">
                            <p className="text-gray-500"> نمایش همه</p>
                            <FaAngleLeft size={"1rem"} color="gray" />
                        </Link>
                    </div>
                    <div className="albums mx-4">
                        {
                            musics[0] && musics.map((music, index) => {
                                return (
                                    <div className="album cursor-pointer hover:bg-zinc-700">
                                        <img
                                            src={music.image}
                                            alt={music.name}
                                            className="h-60 w-56 object-cover"
                                        />
                                        <h3 className="w-56 px-2 my-1 text-white text-lg font-semibold text-left">{music.name}</h3>
                                        <h4 className="w-56 px-2 my-1 text-amber-400 text-left">{music.artist.name}</h4>
                                        <h4 className="w-56 px-2 my-1 text-gray-200 text-left">{music.genre.name}</h4>
                                        <h4 className="w-56 px-2 my-1 text-gray-500 text-left">{music.created_date}</h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
};