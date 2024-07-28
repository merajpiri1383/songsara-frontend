"use client"
import API from "../../../../src/api";
import { useState, useEffect, useMemo } from "react";
import Loading from "../../../components/loading";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import Link from "next/link";
import Pagination from "../../../components/pagination";


export default function Albums() {

    const [showLoading, setShowLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const albumToggle = useSelector((state) => state.album.toggle);
    const [currentPage,setCurrentPage] = useState(1);
    const [count,setCount] = useState(0);

    const getData = async () => {
        setShowLoading(true);
        await API.get(`/album/?page=${currentPage}`).then((response) => {
            setAlbums(response.data.results);
            setCount(response.data.count);
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        })
    };

    useMemo(() => {
        getData();
    }, [albumToggle,currentPage]);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Fade duration={300}>
                    <div className="my-6 p-3 grid grid-cols-4 gap-3">
                        {
                            albums[0] && albums.map((album, index) => {
                                return (
                                    <Link key={index} href={`/admin/album/${album.slug}`}>
                                        <div className="col-span-1 hover:bg-zinc-800">
                                            <img
                                                src={album.image}
                                                alt={album.name}
                                                className="h-48 object-cover w-full"
                                            />
                                            <h3 className="text-right px-2 text-white my-1 h-6 overflow-hidden">{album.name}</h3>
                                            {/* <h4 className="text-right px-2 my-1 text-amber-400">{album.artist.name}</h4> */}
                                            <h4 className="text-right px-2 my-1 text-gray-300">{album.genre.name}</h4>
                                            <h4 className="text-right px-2 my-1 text-gray-500">{album.created_date}</h4>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} count={count} />
                </Fade>
            }
        </>
    )
};