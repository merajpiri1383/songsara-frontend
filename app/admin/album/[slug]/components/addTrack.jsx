"use client"
import { useState, useEffect } from "react";
import Loading from "../../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../../../src/api";
import { changeToggleTrack } from "../../../../../src/reducers/track";
import { toast } from "react-toastify";

export default function AddTrack({album}) {
    const [showLoading, setShowLoading] = useState([]);
    const dispatch = useDispatch();
    const data = new FormData();


    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        data.append("artist",album.artist.id);
        data.append("genre",album.genre.id);
        data.append("album", parseInt(album.id));
        await API.post("/track/",data).then((response) => {
            dispatch(changeToggleTrack());
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            console.log("error");
            error.response && error.response.status === 401 && submitHandeler();
            error.response && toast.error(Object.values(error.response.data)[0][0]);
            error.response && setTimeout(() => setShowLoading(false),400);
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
                                placeholder="نام فایل را وارد کنید"
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