"use client"
import { useEffect, useState } from "react";
import API from "../../../../src/api";
import { useSelector } from "react-redux";
import Loading from "../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Genres () {
    const [showLoading,setShowLoading] = useState(true);
    const genreToggle = useSelector((state) => state.genre.toggle);
    const [genres,setGenres] = useState([]);
    useEffect(() => {
        (async () => {
            await API.get('/genre/').then((response ) => {
                setGenres(response.data);
                setTimeout(() => setShowLoading(false), 400);
            }).catch((error) => {
                error.response && error.response.status === 400 && toast.error("errror")
            });
            setTimeout(() => setShowLoading(false),400);
        })();
        
    },[genreToggle]);
    return (
        <>
        {
            showLoading && <Loading />
        }
        {
            !showLoading && <Zoom duration={300}>
                <div className="grid grid-cols-4 p-3 gap-3 my-3">
                    {
                        genres && genres.map((genre,index) => {
                            return (
                                <Link href={"/"} key={index}>
                                    <div className="col-span-1 text-white bg-zinc-800 rounded-lg p-3">
                                        <h3 className="text-center font-semibold">{genre.name}</h3>
                                        <p>{genre.text}</p>
                                    </div> 
                                </Link>
                            )
                        })
                    }
                </div>
            </Zoom>
        }
        </>
    )
};