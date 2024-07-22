"use client"
import { useState, useEffect } from "react";
import Loading from "../../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import API from "../../../../../src/api";

export default function AddTrack() {
    const [showLoading, setShowLoading] = useState([]);
    const album = useSelector((state) => state.album);
    const data = new FormData();
    const submitHandeler = async (e) => {
        e.preventDefault();
        data.append("artist",album.artist.id);
        data.append("genre",album.genre.id);
        data.append("album", parseInt(album.id));
        await API.post("/track/",data).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            error.response && error.response.status === 401 && submitHandeler();
            error.response && console.log(error.response.data);
        })
    };

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <form method="post" onSubmit={submitHandeler} className="my-6">
                        <h2 className="text-right text-amber-400 text-lg font-semibold">افزودن فایل</h2>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">نام</p>
                            <input
                                placeholder="نام آلبوم را وارد کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="text"
                                required
                                onChange={(e) => data.append("name", e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">فایل</p>
                            <input
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="file"
                                required
                                onChange={(e) => data.append("file", e.target.files[0])}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-1 py-3 text-lg text-white hover:bg-amber-500 bg-amber-300 rounded-md font-semibold"> ذخیره</button>
                    </form>
                </Zoom>
            }
        </>
    )
};