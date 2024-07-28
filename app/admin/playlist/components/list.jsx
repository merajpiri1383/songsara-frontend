"use client"

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import API from "../../../../src/api";
import Loading from "../../../components/loading";
import Link from "next/link";
import Pagination from "../../../components/pagination";

export default function List() {
    const [showLoading, setShowLoading] = useState();
    const [playlists, setPlaylists] = useState([]);
    const toggle = useSelector((state) => state.toggle.playlist);
    const [currentPage,setCurrentPage] = useState(1);
    const [count,setCount] = useState(0);

    const getData = async () => {
        setShowLoading(true);
        await API.get(`/playlist/?page=${currentPage}`).then((response) => {
            setPlaylists(response.data.results);
            setCount(response.data.count);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData()
        }).finally(() => {
            setTimeout(() => setShowLoading(false), 400)
        });
    };
    useMemo(() => getData() , [toggle , currentPage]);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="grid grid-cols-4 gap-3 my-6">
                    {
                        playlists[0] && playlists.map((playlist, index) => {
                            return (
                                <Link key={index} href={`/admin/playlist/${playlist.slug}`}>
                                    <div className="col-span-1 hover:bg-zinc-700 rounded-sm">
                                        <img
                                            src={playlist.image}
                                            alt={playlist.name}
                                            className="h-60 w-full object-cover"
                                        />
                                        <p className="text-white text-left text-lg font-semibold px-2">{playlist.name}</p>
                                        <p className="text-gray-300 text-left text-md px-2">{playlist.genre.name}</p>
                                        <p className="text-gray-500 text-left text-md px-2">{playlist.created_date}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            }
            <Pagination count={count} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </>
    )
};