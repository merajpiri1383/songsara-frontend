"use client"
import API from "../../../../src/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/loading";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";

export default function Artists() {

    const [artist, setArtist] = useState([]);
    const artistToggle = useSelector((state) => state.artist.toggle);
    const [showLoading, setShowLoading] = useState(true);
    const getData = async () => {
        await API.get('/artist/').then((response) => {
            setArtist(response.data);
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status == 401 && getData();
        })
    };
    useEffect(() => {
        setShowLoading(true);
        getData();
    }, [artistToggle]);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Fade duration={300}>
                    <div className="grid grid-cols-4 gap-3 p-3">
                        {
                            artist[0] && artist.map((item, index) => {
                                return (
                                    <Link href={"/"} key={index}>
                                        <div className="col-span-1 relative">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-36 w-full object-cover rounded-md"
                                            />
                                            <p className="text-white absolute bottom-0 w-full text-center">{item.name}</p>
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