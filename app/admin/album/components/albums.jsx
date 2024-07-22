"use client"
import API from "../../../../src/api";
import { useState, useEffect } from "react";
import Loading from "../../../components/loading";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";


export default function Albums() {

    const [showLoading, setShowLoading] = useState(true);
    const [albums, setAlbums] = useState([]);
    const albumToggle = useSelector((state) => state.album.toggle );
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
                                    <div key={index} className="col-span-1">
                                        <img
                                            src={album.image}
                                            alt={album.name}
                                            className="h-36 object-cover"
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </Fade>
            }
        </>
    )
};