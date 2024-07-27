"use client"

import { useMemo, useState } from "react";
import Loading from "./loading";
import API from "../../src/api";
import { FaAngleLeft } from "react-icons/fa";

export default function Albums() {
    const [showLoading, setShowLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const getData = async () => {
        await API.get("/album/").then((response) => {
            setAlbums(response.data.filter((item, index) => {
                return index < 16;
            }));
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => error.response && error.response.status === 401 && getData());
    };
    useMemo(() => getData(), []);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <>
                   <div className="flex items-center justify-between px-4 my-2">
                        <h1 className="text-white p-2 text-xl font-semibold">آلبوم ها</h1>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500"> نمایش بیشتر</p>
                            <FaAngleLeft size={"1rem"} color="gray" />
                        </div>
                    </div>
                    <div className="albums p-2 mx-4 my-6">
                        {
                            albums.map((album, index) => {
                                return (
                                    <div key={index} className="album hover:bg-gray-700 cursor-pointer transition">
                                        <img
                                            src={album.image}
                                            alt={album.name}
                                            className="h-60 w-56 object-cover"
                                        />
                                        <h3 className="text-left text-lg font-semibold text-white px-2 my-1 w-56 h-6">{album.name}</h3>
                                        <p className="text-amber-400 text-left w-56 px-2 my-1">{album.artist.name}</p>
                                        <p className="text-gray-200 text-left w-56 px-2 my-1">{album.genre.name}</p>
                                        <p className="text-gray-400 text-left w-56 px-2 my-1">{album.created_date}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
};