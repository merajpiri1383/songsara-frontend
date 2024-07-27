"use client"

import { useMemo, useState } from "react";
import API from "../../../../src/api";
import { useSelector } from "react-redux";
import Loading from "../../../components/loading";

export default function ListMusics () {

    const [showLoading , setShowLoading] = useState(true);
    const [musics,setMusics] = useState([]);
    const trackToggle = useSelector((state) => state.track.toggle);
    const getData = async () => {
        API.get("/track/").then((response) => {
            setMusics(response.data);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        }).finally(() => setTimeout(setShowLoading(false) , 400));
    };

    useMemo(() => getData(),[trackToggle]);

    return (
        <>
        {
            showLoading && <Loading />
        }
        {
            !showLoading && <div className="grid grid-cols-4 gap-4 my-6 mx-4">
                {
                    musics[0] && musics.map((music,index) => {
                        return (
                            <div className="col-span-1 hover:bg-gray-700">
                                <img
                                src={music.image}
                                alt={music.name}
                                className="h-60 object-cover w-60"
                                />
                                <h3 className="text-white text-left w-60 px-2 font-semibold my-1">{music.name}</h3>
                                <h4 className="text-amber-400 text-left w-60 px-2 font-semibold my-1">{music.artist.name}</h4>
                                <h4 className="text-gray-200 text-left w-60 px-2 font-semibold my-1">{music.genre.name}</h4>
                                <h4 className="text-gray-500 text-left w-60 px-2 font-semibold my-1">{music.created_date}</h4>
                            </div> 
                        )
                    })
                }
            </div>
        }
        </>
    )
};