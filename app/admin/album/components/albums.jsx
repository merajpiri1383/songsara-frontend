"use client"
import API from "../../../../src/api";
import { useState, useEffect } from "react";
import Loading from "../../../components/loading";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import Link from "next/link";


export default function Albums() {

    const [showLoading, setShowLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const albumToggle = useSelector((state) => state.album.toggle);
    const getData = async () => {
        await API.get("/album/").then((response) => {
            setAlbums(response.data);
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        })
    };

    useEffect(() => {
        setShowLoading(true);
        getData();
    }, [albumToggle]);

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
                                            <h4 className="text-right px-2 my-1 text-amber-400">{album.artist.name}</h4>
                                            <h4 className="text-right px-2 my-1 text-gray-300">{album.genre.name}</h4>
                                            <h4 className="text-right px-2 my-1 text-gray-500">{album.created_date}</h4>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </Fade>
            }
        </>
    )
};